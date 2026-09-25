import unittest
import json
import tempfile
from pathlib import Path
from autonomy_policy import completed_specials, due_jobs, rank_options, special_due, week_key, load

POLICY = {"effectiveDate": "2026-09-25", "specialsPerWeek": 4,
          "specialWeekdays": [0, 1, 3, 5], "interests": ["swarm", "emergence", "payments"]}


def complete():
    return {"status": "COMPLETE", "receipt": {"url": "https://iamrobin.ai/example/", "artifactSha256": "a" * 64}}


class PolicyTest(unittest.TestCase):
    def test_taste_changes_attention_not_authority_or_cadence(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); (root/'autonomy/runtime/preferences').mkdir(parents=True)
            (root/'autonomy/policy.json').write_text(json.dumps(POLICY))
            (root/'autonomy/runtime/preferences/2026-09.json').write_text(json.dumps({'interests':['reconciliation'],'specialsPerWeek':0,'asymmetryAutonomous':True}))
            (root/'autonomy/runtime/preferences/2026-10.json').write_text(json.dumps({'interests':['future taste']}))
            policy=load(root,'2026-09-25')
            self.assertEqual(policy['interests'],['reconciliation'])
            self.assertEqual(policy['specialsPerWeek'],4)
            self.assertNotIn('asymmetryAutonomous',policy)
            self.assertEqual(load(root,'2026-09-24'),{})

    def test_four_successful_days_then_no_quota_filler(self):
        days = {}
        selected = []
        for n in range(28, 31):
            day = f"2026-09-{n}"
            if special_due(POLICY, days, day):
                days[day] = complete()
                selected.append(day)
        for n in range(1, 5):
            day = f"2026-10-0{n}"
            if special_due(POLICY, days, day):
                days[day] = complete()
                selected.append(day)
        self.assertEqual(selected, ["2026-09-28", "2026-09-29", "2026-10-01", "2026-10-03"])

    def test_failure_catches_up_without_claiming_completed(self):
        days = {"2026-09-28": {"status": "BLOCKED"}, "2026-09-29": complete()}
        self.assertTrue(special_due(POLICY, days, "2026-09-30"))
        self.assertEqual(len(completed_specials(days, "2026-09-30")), 1)

    def test_no_duplicate_and_no_receipt_no_completion(self):
        days = {"2026-09-28": {"status": "COMPLETE"}}
        self.assertFalse(special_due(POLICY, days, "2026-09-28"))
        self.assertEqual(completed_specials(days, "2026-09-29"), [])

    def test_iso_week_boundary(self):
        self.assertEqual(week_key("2027-01-01"), "2026-W53")

    def test_rank_eligible_with_sources_and_no_signal_five(self):
        options = {"5": {"title": "swarm emergence", "sources": ["x"]},
                   "1": {"title": "swarm emergence", "sources": ["x"]},
                   "2": {"title": "swarm emergence payments", "sources": []},
                   "4": {"title": "payments", "sources": ["x"]}}
        self.assertEqual(rank_options(options, POLICY, {}, "2026-09-25"), 1)
        self.assertIsNone(rank_options({"1": {"sources": []}}, POLICY, {}, "2026-09-25"))

    def test_period_jobs_once_and_binary_only_after_verified_special(self):
        days = {"2026-09-25": complete(), "2026-09-26": {"status": "QUEUED"}}
        jobs = due_jobs(POLICY, {}, days, "2026-09-26")
        self.assertEqual([j["kind"] for j in jobs], ["taste", "intelligence", "binary"])
        self.assertEqual(due_jobs(POLICY, {j["id"]: j for j in jobs}, days, "2026-09-26"), [])
        self.assertEqual(due_jobs({}, {}, days, "2026-09-26"), [])


if __name__ == "__main__":
    unittest.main()
