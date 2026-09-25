import hashlib
import json
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from unittest.mock import patch

from workflow import Workflow, HKT, atomic, read


class WorkflowTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.website = Path(self.temp.name)
        policy = json.loads((Path(__file__).parent / "policy.json").read_text())
        atomic(self.website / "autonomy/policy.json", policy)
        self.launches = []
        self.flow = Workflow(self.website, lambda key: self.launches.append(key) or 10001)
        self.now = datetime(2026, 9, 25, 16, tzinfo=HKT)
    def tearDown(self):
        self.temp.cleanup()
    def test_repeated_plan_is_idempotent(self):
        self.assertEqual(len(self.flow.plan(self.now)), 2)
        self.assertEqual(len(self.flow.plan(self.now)), 2)
    def test_only_one_worker_and_live_process_not_restarted(self):
        with patch("workflow.alive", return_value=False):
            self.assertEqual(self.flow.tick(self.now), "RUNNING")
        with patch("workflow.alive", return_value=True):
            self.assertEqual(self.flow.tick(self.now), "WORKER_ALIVE")
        self.assertEqual(len(self.launches), 1)
    def test_special_keeps_priority(self):
        atomic(self.website / "daily_special/runtime/state.json", {"days": {"2026-09-25": {"status": "RUNNING"}}})
        self.assertEqual(self.flow.tick(self.now), "SPECIAL_HAS_PRIORITY")
        self.assertFalse(self.launches)
    def test_no_fake_taste_scan(self):
        job = self.flow.plan(self.now)[0]
        path = self.flow.runtime / "receipt.json"
        atomic(path, {"jobId": job["id"], "kind": "taste"})
        with self.assertRaisesRegex(ValueError, "coverage"):
            self.flow.finish(job["id"], path)
        self.assertEqual(read(self.flow.path, {})["jobs"][job["id"]]["status"], "QUEUED")
    def test_public_bytes_are_checked_not_just_process_success(self):
        key = "binary:2026-09-25:" + "a" * 64
        with self.flow.locked() as state:
            state["jobs"][key] = {"id": key, "kind": "binary", "status": "RUNNING", "attempts": 1}
        pdf = b"synthetic-pdf-test-only"
        receipt = {"jobId": key, "kind": "binary", "commit": "a" * 40, "routes": ["/binary/stories/test/"],
            "assets": [{"path": "public/carousels/test.pdf", "sha256": hashlib.sha256(pdf).hexdigest()}],
            "gates": dict.fromkeys(["tests", "seo", "mobile", "githubVerify", "cloudflare"], True),
            "lane": "BUILD", "carouselPages": 6, "carouselReviewSha256": "b" * 64}
        path = self.flow.runtime / "binary.json"
        atomic(path, receipt)
        with self.assertRaisesRegex(ValueError, "differ"):
            self.flow.finish(key, path, fetch=lambda url: b"wrong")
        def fetch(url):
            return pdf if url.endswith(".pdf") else b'https://iamrobin.ai/binary/stories/test/ application/ld+json'
        self.assertEqual(self.flow.finish(key, path, fetch=fetch)["status"], "COMPLETE")
    def test_retry_exhaustion_blocks_not_complete(self):
        self.flow.plan(self.now)
        with self.flow.locked() as state:
            for job in state["jobs"].values():
                job.update(status="RUNNING", attempts=3, pid=-99999)
        with patch("workflow.alive", return_value=False):
            self.flow.tick(self.now)
        self.assertTrue(all(j["status"] == "BLOCKED" for j in read(self.flow.path, {})["jobs"].values()))


if __name__ == "__main__":
    unittest.main()
