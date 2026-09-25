"""Pure scheduling decisions; no network, messages or execution authority."""
import json
from datetime import date, timedelta
from pathlib import Path


def load(website, day):
    path = Path(website) / "autonomy/policy.json"
    policy = json.loads(path.read_text()) if path.exists() else {}
    if policy.get("effectiveDate", "9999-12-31") > day:
        return {}
    # Preference snapshots may change attention, never cadence or authority.
    folder = Path(website) / "autonomy/runtime/preferences"
    snapshots = sorted(p for p in folder.glob("????-??.json") if p.stem <= day[:7])
    if snapshots:
        snapshot = json.loads(snapshots[-1].read_text())
        interests = snapshot.get("interests")
        if isinstance(interests, list) and interests and len(interests) <= 32 and all(isinstance(x, str) and 0 < len(x) <= 80 for x in interests):
            policy = {**policy, "interests": interests}
    return policy


def week_key(day):
    year, week, _ = date.fromisoformat(day).isocalendar()
    return f"{year}-W{week:02d}"


def completed_specials(days, day):
    return [key for key, entry in days.items()
            if week_key(key) == week_key(day) and key <= day
            and entry.get("status") == "COMPLETE" and entry.get("receipt", {}).get("url")
            and entry.get("receipt", {}).get("artifactSha256")]


def special_due(policy, days, day):
    if not policy or day in days:
        return False
    weekday = date.fromisoformat(day).weekday()
    count = len(completed_specials(days, day))
    target = policy["specialsPerWeek"]
    # Base cadence Mon/Tue/Thu/Sat; catch up on spare days after a failed run.
    expected_before_today = sum(1 for scheduled in policy["specialWeekdays"] if scheduled < weekday)
    return count < target and (weekday in policy["specialWeekdays"] or count < min(target, expected_before_today))


def rank_options(options, policy, days, day):
    recent = [entry.get("selection") for key, entry in days.items()
              if date.fromisoformat(day) - timedelta(days=7) <= date.fromisoformat(key) < date.fromisoformat(day)]
    def rank(item):
        number, option = item
        text = json.dumps(option, ensure_ascii=False).lower()
        match = sum(1 for word in policy["interests"] if word.lower() in text)
        return (match - recent.count(int(number)), -int(number))
    eligible = [(str(n), value) for n, value in options.items() if int(n) in (1, 2, 3, 4, 6, 7, 8) and value.get("sources")]
    if not eligible:
        return None
    number, _ = max(eligible, key=rank)
    return int(number)


def due_jobs(policy, jobs, special_days, day):
    """Stable period/source IDs survive restarts. Never equate queued with done."""
    if not policy:
        return []
    requested = [(f"taste:{day[:7]}", "taste", day),
                 (f"intelligence:{week_key(day)}", "intelligence", day)]
    for source_day, entry in sorted(special_days.items()):
        if source_day >= policy["effectiveDate"] and source_day <= day and entry.get("status") == "COMPLETE" and entry.get("receipt", {}).get("artifactSha256"):
            requested.append((f"binary:{source_day}:{entry['receipt']['artifactSha256']}", "binary", source_day))
    return [{"id": key, "kind": kind, "date": source_day, "status": "QUEUED", "attempts": 0}
            for key, kind, source_day in requested if key not in jobs]
