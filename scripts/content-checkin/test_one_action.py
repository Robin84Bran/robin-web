import json
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path

from one_action import HKT, OneAction, atomic_json, read_json


class Bot:
    chat_id = "123"

    def __init__(self, website):
        self.daily_root = website / "daily_briefing"
        self.calls = []
        self.fail = False

    def configured_chat_matches(self, value):
        return str(value) == "123"

    def configured_sender_matches(self, value):
        return str(value) == "456"

    def call_api(self, method, payload):
        if self.fail:
            raise RuntimeError("Simulated ambiguous transport failure")
        self.calls.append((method, payload))
        return {"ok": True, "result": {"message_id": len(self.calls) + 100}}


class CheckinTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.website = Path(self.temp.name) / "website"
        self.feature = OneAction(self.website)
        self.bot = Bot(self.website)
        self.now = datetime(2026, 9, 20, 20, 30, tzinfo=HKT)
        self.day = self.now.date().isoformat()
        self.article("20260920")

    def article(self, date, status="DONE", draft="false", title="Who evaluates AI models?"):
        package = self.website.parent / "blogs" / date[:6] / date / "action_item"
        package.mkdir(parents=True, exist_ok=True)
        (package / "article.md").write_text(
            f'---\ntitle: "{title}"\ndraft: {draft}\ncanonical: "https://iamrobin.ai/ouroboros/{date[:6]}/{date}/action_item/"\n---\nBody.', encoding="utf-8")
        atomic_json(package / "publish-state.json", {"status": status})

    def state(self):
        return read_json(self.feature.path)

    def click(self, action, update=1, date=None, sender=456, message_id=None):
        day = date or self.day
        delivery = self.state()["days"][day]["delivery"]
        return {"update_id": update, "callback_query": {
            "id": str(update), "from": {"id": sender}, "data": f"oa:{day}:{action}",
            "message": {"message_id": message_id or delivery["messageId"], "chat": {"id": 123}}}}

    def message(self, text, update=2, **extra):
        return {"update_id": update, "message": {"chat": {"id": 123}, "from": {"id": 456}, "text": text, **extra}}

    def test_one_prompt_per_hkt_day_across_restart(self):
        self.assertEqual(self.feature.tick(self.bot, self.now - timedelta(minutes=1)), "NOT_DUE")
        self.assertEqual(self.feature.tick(self.bot, self.now), "SENT")
        restarted = OneAction(self.website)
        self.assertEqual(restarted.tick(self.bot, self.now), "ALREADY_HANDLED")
        self.assertEqual(len(self.bot.calls), 1)
        self.assertIn("Who evaluates AI models?", self.bot.calls[0][1]["text"])
        self.assertEqual(self.feature.path.stat().st_mode & 0o777, 0o600)

    def test_done_is_idempotent_and_no_more_actions_today(self):
        self.feature.tick(self.bot, self.now)
        click = self.click("done")
        self.feature.handle(self.bot, click, self.now)
        self.feature.handle(self.bot, click, self.now)
        self.assertEqual(len(self.bot.calls), 2)
        self.assertEqual(self.state()["days"][self.day]["status"], "DONE")
        self.assertEqual(self.feature.tick(self.bot, self.now), "ALREADY_HANDLED")
        self.feature.handle(self.bot, self.click("carry", update=3), self.now)
        self.assertEqual(self.state()["days"][self.day]["status"], "DONE")

    def test_carry_remembers_and_shrinks_after_two_distinct_days(self):
        self.feature.tick(self.bot, self.now)
        original = self.state()["days"][self.day]["actionId"]
        self.feature.handle(self.bot, self.click("carry"), self.now)
        self.feature.handle(self.bot, self.click("carry", update=9), self.now)
        self.assertEqual(self.state()["actions"][original]["carries"], 1)
        tomorrow = self.now + timedelta(days=1)
        day2 = tomorrow.date().isoformat()
        self.feature.tick(self.bot, tomorrow)
        self.assertEqual(self.state()["days"][day2]["actionId"], original)
        self.feature.handle(self.bot, self.click("carry", 2, day2), tomorrow)
        self.feature.tick(self.bot, tomorrow + timedelta(days=1))
        self.assertIn("Write one plain-English sentence", self.bot.calls[-1][1]["text"])

    def test_no_response_keeps_one_action(self):
        self.feature.tick(self.bot, self.now)
        self.feature.tick(self.bot, self.now + timedelta(days=1))
        self.assertEqual(len(self.state()["actions"]), 1)

    def test_other_completed_action_does_not_complete_suggestion(self):
        self.feature.tick(self.bot, self.now)
        self.feature.handle(self.bot, self.message("/one_done Shared my existing explainer"), self.now)
        state = self.state()
        entry = state["days"][self.day]
        self.assertEqual(entry["status"], "DONE")
        self.assertEqual(entry["evidence"], "ROBIN_SELF_REPORT")
        self.assertEqual(state["actions"][entry["actionId"]]["status"], "OPEN")

    def test_late_button_cannot_mark_today_or_yesterday_done(self):
        self.feature.tick(self.bot, self.now)
        yesterday_click = self.click("done")
        self.feature.tick(self.bot, self.now + timedelta(days=1))
        self.feature.handle(self.bot, yesterday_click, self.now + timedelta(days=1))
        self.assertTrue(all(e["status"] == "OPEN" for e in self.state()["days"].values()))

    def test_foreign_sender_and_forged_message_rejected(self):
        self.feature.tick(self.bot, self.now)
        self.assertFalse(self.feature.handle(self.bot, self.click("done", sender=999), self.now))
        self.feature.handle(self.bot, self.click("done", message_id=999), self.now)
        self.assertEqual(self.state()["days"][self.day]["status"], "OPEN")

    def test_daily_intake_keeps_bare_text_but_buttons_work(self):
        atomic_json(self.bot.daily_root / "telegram-intake/session.json", {"status": "ACTIVE"})
        self.assertEqual(self.feature.tick(self.bot, self.now), "INTAKE_ACTIVE")
        self.feature.tick(self.bot, self.now, force=True)
        self.assertFalse(self.feature.handle(self.bot, self.message("Done"), self.now, intake_active=True))
        self.assertTrue(self.feature.handle(self.bot, self.click("done"), self.now, intake_active=True))

    def test_unrelated_text_and_diary_are_not_consumed(self):
        self.assertFalse(self.feature.handle(self.bot, self.message("Done"), self.now))
        self.assertFalse(self.feature.handle(self.bot, self.message("/diary_publish Entry\nDone"), self.now))
        self.assertFalse(self.feature.handle(self.bot, self.message("Daily briefing with Done in body"), self.now))

    def test_future_draft_unreleased_and_non_ai_excluded(self):
        self.article("20260921")
        self.article("20260919", status="READY")
        self.article("20260918", draft="true")
        self.article("20260917", title="The beach")
        self.assertEqual(len(self.feature.candidates(self.day)), 1)

    def test_fallback_does_not_invent_url(self):
        self.article("20260920", status="READY")
        self.feature.tick(self.bot, self.now)
        self.assertNotIn("https://", self.bot.calls[0][1]["text"])

    def test_ambiguous_send_preserves_state_and_does_not_spam(self):
        self.bot.fail = True
        with self.assertRaises(RuntimeError):
            self.feature.tick(self.bot, self.now)
        self.assertEqual(self.state()["days"][self.day]["delivery"]["status"], "UNKNOWN")
        self.bot.fail = False
        self.assertEqual(self.feature.tick(self.bot, self.now), "ALREADY_HANDLED")
        self.feature.handle(self.bot, self.message("/one_action"), self.now)
        self.assertEqual(self.state()["days"][self.day]["delivery"]["status"], "SENT")

    def test_failed_ack_does_not_lose_done_and_replay_finishes(self):
        self.feature.tick(self.bot, self.now)
        click = self.click("done")
        self.bot.fail = True
        with self.assertRaises(RuntimeError):
            self.feature.handle(self.bot, click, self.now)
        self.assertEqual(self.state()["days"][self.day]["status"], "DONE")
        self.bot.fail = False
        self.feature.handle(self.bot, click, self.now)
        self.assertTrue(self.state()["updates"]["1"]["acknowledged"])

    def test_quiet_hours_and_corrupt_state_preserved(self):
        self.assertEqual(self.feature.tick(self.bot, self.now.replace(hour=23)), "NOT_DUE")
        self.feature.runtime.mkdir(parents=True, exist_ok=True)
        self.feature.path.write_text("broken", encoding="utf-8")
        with self.assertRaises(json.JSONDecodeError):
            self.feature.tick(self.bot, self.now)
        self.assertEqual(self.feature.path.read_text(), "broken")

    def test_delayed_command_cannot_complete_wrong_day(self):
        yesterday = int((self.now - timedelta(days=1)).timestamp())
        self.feature.handle(self.bot, self.message("/one_done", date=yesterday), self.now)
        self.assertFalse(self.state()["days"])


if __name__ == "__main__":
    unittest.main()
