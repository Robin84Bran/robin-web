import json
import hashlib
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path
from unittest.mock import patch

from special import DailySpecial, HKT, SIGNALS, atomic, read

NOW = datetime(2026, 9, 23, 14, tzinfo=HKT)


class Bot:
    chat_id = 7
    def __init__(self):
        self.calls = []
        self.fail = False
    def configured_chat_matches(self, n):
        return n == 7
    def configured_sender_matches(self, n):
        return n == 7
    def call_api(self, method, payload):
        self.calls.append((method, payload))
        if self.fail:
            raise TimeoutError()
        return {"result": {"message_id": 99}}


class SpecialTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.website = Path(self.temp.name) / "website"
        self.launched = []
        self.feature = DailySpecial(self.website, launcher=lambda day: self.launched.append(day) or 12345)
        self.bot = Bot()
        daily = {"status": "DONE", "gates": {"public200": True, "telegramDelivered": True}}
        atomic(self.website / "daily_briefing/202609/20260923/publish-state.json", {**daily, "actionItem": daily})
        atomic(self.website.parent / "blogs/202609/20260923/actions/publish-state.json", daily)
        atomic(self.feature.site() / "src/data/action-flows/20260923.json", {
            "actions": [{"signal": n, "sources": []} for n in range(1, 9)],
            "editions": {"en": {"actions": [{"title": f"Topic {n}", "steps": ["Research"], "done": "Artifact"} for n in range(1, 9)]}}})
    def tearDown(self):
        self.temp.cleanup()
    def state(self):
        return read(self.feature.path)
    def callback(self, value="4", day="2026-09-23", sender=7, mid=99, uid=1):
        return {"update_id": uid, "callback_query": {"id": "abc", "from": {"id": sender},
            "data": f"ds:{day}:{value}", "message": {"message_id": mid, "chat": {"id": 7}}}}
    def test_offer_after_all_three_and_once(self):
        self.assertEqual(self.feature.tick(self.bot, NOW), "SENT")
        self.feature.tick(self.bot, NOW)
        self.assertEqual(len(self.bot.calls), 1)
        data = self.bot.calls[0][1]
        buttons = sum(data["reply_markup"]["inline_keyboard"], [])
        self.assertEqual(len(buttons), 8)
        self.assertNotIn("Signal 5", [b["text"] for b in buttons])
    def test_autonomous_policy_selects_without_prompt_and_preserves_legacy(self):
        atomic(self.website / "autonomy/policy.json", {"effectiveDate": "2026-09-23", "specialsPerWeek": 4,
            "specialWeekdays": [0, 1, 3, 5], "interests": ["swarm"]})
        flow = self.feature.flow("2026-09-23")
        for item in flow["actions"]:
            item["sources"] = ["https://example.com/evidence"]
        flow["editions"]["en"]["actions"][0]["title"] = "Swarm emergence"
        atomic(self.feature.site() / "src/data/action-flows/20260923.json", flow)
        with patch("special.alive", return_value=False):
            self.feature.tick(self.bot, NOW)
        self.assertFalse(self.bot.calls)
        self.assertEqual(self.launched, ["2026-09-23"])
        entry = self.state()["days"]["2026-09-23"]
        self.assertEqual(entry["selection"], 1)
        self.assertEqual(entry["selectedBy"], "OWNER_AUTHORIZED_AUTONOMY")
        with patch("special.alive", return_value=True):
            self.feature.tick(self.bot, NOW)
        self.assertEqual(len(self.launched), 1)
    def test_incomplete_release_no_prompt(self):
        atomic(self.website.parent / "blogs/202609/20260923/actions/publish-state.json", {"status": "DONE", "gates": {"public200": False}})
        self.feature.tick(self.bot, NOW)
        self.assertEqual(self.bot.calls, [])
    def test_no_response_expires_no_job(self):
        self.feature.tick(self.bot, NOW)
        self.feature.tick(self.bot, NOW + timedelta(days=1))
        self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "NO")
        self.assertFalse(self.launched)
    def test_select_one_queue_then_launch_once(self):
        self.feature.tick(self.bot, NOW)
        self.feature.handle(self.bot, self.callback(), NOW)
        self.feature.handle(self.bot, self.callback("6", uid=2), NOW)
        entry = self.state()["days"]["2026-09-23"]
        self.assertEqual((entry["status"], entry["selection"]), ("QUEUED", 4))
        with patch("special.alive", return_value=False):
            self.feature.tick(self.bot, NOW)
        with patch("special.alive", return_value=True):
            self.feature.tick(self.bot, NOW)
        self.assertEqual(self.launched, ["2026-09-23"])
    def test_no_and_duplicate_are_idempotent(self):
        self.feature.tick(self.bot, NOW)
        self.feature.handle(self.bot, self.callback("no"), NOW)
        self.feature.handle(self.bot, self.callback("no"), NOW)
        self.feature.tick(self.bot, NOW)
        self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "NO")
        self.assertFalse(self.launched)
    def test_unauthorized_invalid_and_stale_do_not_select(self):
        self.feature.tick(self.bot, NOW)
        self.assertFalse(self.feature.handle(self.bot, self.callback(sender=8), NOW))
        self.assertFalse(self.feature.handle(self.bot, self.callback("5"), NOW))
        self.feature.handle(self.bot, self.callback(mid=100), NOW)
        self.feature.handle(self.bot, self.callback(uid=2), NOW + timedelta(days=1))
        self.assertIsNone(self.state()["days"]["2026-09-23"]["selection"])
    def test_plain_text_not_intercepted_during_intake(self):
        self.feature.tick(self.bot, NOW)
        update = {"update_id": 1, "message": {"from": {"id": 7}, "chat": {"id": 7}, "text": "4", "reply_to_message": {"message_id": 99}}}
        self.assertFalse(self.feature.handle(self.bot, update, NOW, intake_active=True))
        self.assertTrue(self.feature.handle(self.bot, update, NOW))
    def test_send_timeout_never_resends_automatically(self):
        self.bot.fail = True
        self.feature.tick(self.bot, NOW)
        self.feature.tick(self.bot, NOW)
        self.assertEqual(len(self.bot.calls), 1)
        self.assertEqual(self.state()["days"]["2026-09-23"]["delivery"]["status"], "UNKNOWN")
    def test_failed_ack_selection_survives_restart(self):
        self.feature.tick(self.bot, NOW)
        self.bot.fail = True
        self.feature.handle(self.bot, self.callback(), NOW)
        replacement = DailySpecial(self.website)
        self.assertEqual(read(replacement.path)["days"]["2026-09-23"]["selection"], 4)
    def test_retry_limit_not_completion(self):
        self.feature.tick(self.bot, NOW)
        self.feature.handle(self.bot, self.callback(), NOW)
        with self.feature.locked() as state:
            state["days"]["2026-09-23"]["attempts"] = 3
        self.feature.tick(self.bot, NOW)
        self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "BLOCKED")
        self.assertFalse(self.launched)
    def test_finish_requires_selection_and_commit(self):
        with self.assertRaises(ValueError):
            self.feature.finish("2026-09-23", "a" * 40, "unused")
        with self.assertRaises(ValueError):
            self.feature.finish("../bad", "a" * 40, "unused")
    def test_private_state_mode(self):
        self.feature.tick(self.bot, NOW)
        self.assertEqual(self.feature.path.stat().st_mode & 0o777, 0o600)

    def test_resume_offer_before_delivery(self):
        self.feature.tick(self.bot, NOW)
        with self.feature.locked() as state:
            state["days"]["2026-09-23"]["delivery"] = None
        self.bot.calls.clear()
        self.feature.tick(self.bot, NOW)
        self.feature.tick(self.bot, NOW)
        self.assertEqual(len(self.bot.calls), 1)

    def test_finish_needs_matching_public_proof_and_is_idempotent(self):
        self.feature.tick(self.bot, NOW)
        self.feature.handle(self.bot, self.callback(), NOW)
        artifact = self.website / "artifact.md"
        artifact.write_text("# Verified research\n")
        sha = hashlib.sha256(artifact.read_bytes()).hexdigest()
        url = "https://iamrobin.ai/ouroboros/202609/20260923/special/"
        receipt = {"date": "2026-09-23", "signal": 4, "url": url, "commit": "a"*40,
                   "artifactSha256": sha, "scope": "RESEARCH_ARTIFACT_ONLY"}
        class Response:
            status = 200
            def __init__(self, data): self.data = data
            def __enter__(self): return self
            def __exit__(self, *args): pass
            def read(self): return self.data
        def fetch(request, **kwargs):
            self.assertEqual(request.get_header("User-agent"), "iamrobin-daily-special-verifier/1.0 (+https://iamrobin.ai)")
            self.assertEqual(kwargs.get("timeout"), 30)
            link = request.full_url
            if link.endswith("artifact.md"): return Response(artifact.read_bytes())
            if link.endswith("receipts.json"): return Response(json.dumps([receipt]).encode())
            locale = "zh-Hans" if "zh-hans" in link else "zh-Hant" if "zh-hant" in link else "ja" if link.endswith("ja/") else "en"
            return Response((f'<html lang="{locale}">{link} application/ld+json Daily Special ' + 'rel="alternate" '*4).encode())
        with patch("special.urlopen", side_effect=fetch):
            self.feature.finish("2026-09-23", "a"*40, artifact, complete=False)
            self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "QUEUED")
            receipt["artifactSha256"] = "0"*64
            with self.assertRaises(ValueError): self.feature.finish("2026-09-23", "a"*40, artifact)
            self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "QUEUED")
            receipt["artifactSha256"] = sha
            self.feature.finish("2026-09-23", "a"*40, artifact)
            self.feature.finish("2026-09-23", "a"*40, artifact)
            self.assertEqual(self.state()["days"]["2026-09-23"]["status"], "COMPLETE")


if __name__ == "__main__":
    unittest.main()
