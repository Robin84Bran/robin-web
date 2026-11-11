"""Private, source-bound Research kickoffs after a verified weekly playable release.
No scheduler, model execution, publication or capital authority is added here.
"""
import hashlib
import json
import re
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

EFFECTIVE = "2026-11-11"
REQUIRED_SECTIONS = ("Seed and evidence", "Rival explanations", "Falsifiable question", "Study design", "Robin joins")


def fingerprint(receipt):
    return hashlib.sha256(json.dumps(receipt, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def due_research(jobs, now):
    result = []
    for parent_id, parent in list(jobs.items()):
        receipt = parent.get("receipt", {})
        if parent.get("kind") != "intelligence" or parent.get("status") != "COMPLETE":
            continue
        if parent.get("verifiedAt", "")[:10] < EFFECTIVE or not parent.get("receiptSha256"):
            continue
        if not all(receipt.get("gates", {}).get(k) is True for k in ("tests", "seo", "mobile", "githubVerify", "cloudflare")):
            continue
        routes = [r for r in receipt.get("routes", []) if re.fullmatch(r"/intelligence/[a-z0-9-]+/", r)]
        if not routes or not re.fullmatch(r"[a-f0-9]{40}", receipt.get("commit", "")):
            continue
        digest = fingerprint(receipt)
        key = f"research:{parent_id}:{digest[:16]}"
        if key in jobs:
            continue
        result.append({"id": key, "kind": "research", "date": now.date().isoformat(),
            "status": "QUEUED", "attempts": 0, "sourceJobId": parent_id,
            "sourceReceiptSha256": digest, "sourceCommit": receipt["commit"],
            "playableRoute": routes[0], "phase": "PRIVATE_RESEARCH_KICKOFF"})
    return result


def validate_packet(job, receipt, runtime, jobs):
    parent = jobs.get(job.get("sourceJobId"), {})
    if parent.get("kind") != "intelligence" or parent.get("status") != "COMPLETE" or fingerprint(parent.get("receipt", {})) != job.get("sourceReceiptSha256"):
        raise ValueError("Research source changed or is not verified")
    if receipt.get("sourceReceiptSha256") != job.get("sourceReceiptSha256"):
        raise ValueError("Research source receipt mismatch")
    packet = Path(receipt.get("packetPath", "")).resolve()
    folder = Path(runtime).resolve() / hashlib.sha256(job["id"].encode()).hexdigest()[:20]
    if not packet.is_relative_to(folder) or not packet.is_file():
        raise ValueError("Research packet must stay in its private job folder")
    body = packet.read_bytes()
    if hashlib.sha256(body).hexdigest() != receipt.get("packetSha256"):
        raise ValueError("Research packet hash mismatch")
    text = body.decode()
    if len(text) < 600 or not all(f"## {section}" in text for section in REQUIRED_SECTIONS):
        raise ValueError("Research kickoff needs evidence, alternatives, question, design and Robin invitation")
    if "https://iamrobin.ai" + job["playableRoute"] not in text:
        raise ValueError("Research packet must link its verified playable source")


def notify_research(website, key):
    script = Path(__file__).with_name("notify_research.mjs")
    node = shutil.which("node")
    if not node:
        return {"status": "UNKNOWN", "reason": "Existing Node runtime unavailable"}
    try:
        run = subprocess.run([node, str(script), "--website", str(website), "--key", key],
            capture_output=True, text=True, timeout=45, check=False)
        if run.returncode == 0:
            return json.loads(run.stdout)
    except (OSError, ValueError, subprocess.TimeoutExpired):
        pass
    return {"status": "UNKNOWN", "reason": "Delivery unconfirmed; inspect private notice receipt before retry"}
