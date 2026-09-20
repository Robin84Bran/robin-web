"""One private daily content action, hosted by the existing Telegram consumer.

Standard library only. Runtime is private and never part of the public site.
Completion is Robin's self-report, not proof of publication or distribution.
"""
from __future__ import annotations

import fcntl
import hashlib
import json
import os
import re
import tempfile
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

HKT = ZoneInfo("Asia/Hong_Kong")
COMMANDS = {"/one_action", "/one_done", "/one_carry"}


def read_json(path, default=None):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    fd, name = tempfile.mkstemp(dir=path.parent, prefix=".one-action-")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            json.dump(value, stream, ensure_ascii=False, indent=2)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(name, path)
        directory = os.open(path.parent, os.O_RDONLY)
        try:
            os.fsync(directory)
        finally:
            os.close(directory)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def field(text, key):
    header = text.split("---", 2)[1] if text.startswith("---\n") else ""
    match = re.search(r"^" + re.escape(key) + r":\s*(.+)$", header, re.M)
    return match.group(1).strip().strip('\"\'') if match else ""


class OneAction:
    def __init__(self, website: Path, runtime: Path | None = None):
        self.website = Path(website)
        self.runtime = runtime or self.website / "content_checkin" / "runtime"
        self.path = self.runtime / "state.json"

    @contextmanager
    def locked(self):
        self.runtime.mkdir(parents=True, exist_ok=True, mode=0o700)
        with (self.runtime / "state.lock").open("a") as lock:
            os.chmod(lock.name, 0o600)
            fcntl.flock(lock, fcntl.LOCK_EX)
            state = read_json(self.path, {"version": 1, "days": {}, "actions": {}, "updates": {}})
            if state.get("version") != 1 or not all(isinstance(state.get(k), dict) for k in ("days", "actions", "updates")):
                raise ValueError("Invalid One Action state; preserve for recovery")
            yield state
            atomic_json(self.path, state)

    def candidates(self, today):
        """Only released, due English articles; never source bodies or drafts."""
        blogs = self.website.parent / "blogs"
        files = sorted(blogs.glob("??????/????????/action_item/article.md"), reverse=True)
        files += sorted(blogs.glob("??????/????????/blog/article.md"), reverse=True)
        candidates = []
        for path in files:
            issue = path.parent.parent.name
            if not re.fullmatch(r"\d{8}", issue) or issue > today.replace("-", ""):
                continue
            release = read_json(path.parent / "publish-state.json", {})
            manifest = read_json(path.parent / "manifest.json", {})
            if release.get("status") != "DONE" and manifest.get("status") != "PUBLISHED":
                continue
            text = path.read_text(encoding="utf-8")
            title, url = field(text, "title"), field(text, "canonical")
            if not title or field(text, "draft") == "true":
                continue
            if not re.fullmatch(r"https://iamrobin\.ai/ouroboros/\d{6}/\d{8}/(?:action_item|blog)/", url):
                continue
            if not re.search(r"\bAI\b|artificial intelligence|model|agent|compute|robot|inference|evaluation|infrastructure", title + " " + field(text, "excerpt"), re.I):
                continue
            candidates.append({"title": title, "url": url})
        return candidates[:60]

    def ensure_day(self, state, day):
        if day in state["days"]:
            return state["days"][day]
        pending = next((a for a in reversed(list(state["actions"].values())) if a["status"] == "OPEN"), None)
        if pending is None:
            # Progress through a small, reusable explanation / diligence /
            # distribution sequence before moving on to another published piece.
            steps = [
                ("explain", "Write three plain-English sentences: what it is, why it matters, and one limit.", "Write one plain-English sentence explaining its key idea."),
                ("invest", "Write one diligence question an angel investor should ask about this AI idea.", "Write just one investor question beginning ‘What evidence would show…?’"),
                ("share", "Share this existing article with one sentence explaining why it matters, on your preferred channel.", "Draft one sentence to accompany this link; sending it can wait."),
            ]
            for source in self.candidates(day):
                for kind, task, small in steps:
                    key = hashlib.sha256((source["url"] + kind).encode()).hexdigest()[:16]
                    if key not in state["actions"]:
                        pending = {"id": key, **source, "kind": kind, "task": task, "small": small,
                                   "status": "OPEN", "created": day, "carries": 0}
                        break
                if pending:
                    break
            if pending is None:
                key = "own-" + day
                pending = {"id": key, "title": "One AI idea from your existing work", "url": "",
                           "kind": "explain", "task": "Write one sentence explaining an AI idea you have already worked on.",
                           "small": "Name one AI idea you would like to explain.", "status": "OPEN", "created": day, "carries": 0}
            state["actions"][pending["id"]] = pending
        entry = {"actionId": pending["id"], "status": "OPEN", "delivery": None}
        state["days"][day] = entry
        return entry

    def prompt(self, state, day):
        entry = self.ensure_day(state, day)
        action = state["actions"][entry["actionId"]]
        task = action["small"] if action["carries"] >= 2 else action["task"]
        text = ("IAmRobin.ai Content & Distribution — One Action\n"
                "Did you complete one concrete content or distribution action today?\n"
                f"If not, one small step:\n{action['title']}\n{task}")
        if action["url"]:
            text += "\n" + action["url"]
        text += "\nDone = completed this. Something else? /one_done + a few words."
        text += "\n今天完成一个内容或传播行动了吗？完成点 Done；明天继续点 Carry forward。"
        buttons = [[{"text": "Done ✓", "callback_data": f"oa:{day}:done"},
                    {"text": "Carry forward →", "callback_data": f"oa:{day}:carry"}]]
        return {"text": text, "reply_markup": {"inline_keyboard": buttons}, "disable_web_page_preview": True}

    def tick(self, bot, now=None, force=False):
        now = (now or datetime.now(HKT)).astimezone(HKT)
        day = now.date().isoformat()
        # One evening window, with catch-up inside it; no late-night backlog.
        if not force and not (20 * 60 + 30 <= now.hour * 60 + now.minute < 23 * 60):
            return "NOT_DUE"
        session = read_json(bot.daily_root / "telegram-intake" / "session.json", {})
        if not force and session.get("status") in {"ACTIVE", "VALIDATION_FAILED"}:
            return "INTAKE_ACTIVE"
        with self.locked() as state:
            entry = self.ensure_day(state, day)
            if entry["status"] != "OPEN" or entry.get("delivery"):
                return "ALREADY_HANDLED"
            payload = self.prompt(state, day)
            # Persist the sending boundary before network I/O. An ambiguous
            # timeout must not turn a daily check-in into repeated nudges.
            entry["delivery"] = {"status": "SENDING", "at": now.isoformat()}
            atomic_json(self.path, state)
            try:
                response = bot.call_api("sendMessage", {"chat_id": bot.chat_id, **payload})
                message_id = response.get("result", {}).get("message_id")
                if not isinstance(message_id, int):
                    raise ValueError("No Telegram delivery receipt")
                entry["delivery"].update(status="SENT", messageId=message_id)
            except Exception:
                entry["delivery"]["status"] = "UNKNOWN"
                atomic_json(self.path, state)
                raise
        return "SENT"

    def handle(self, bot, update, now=None, intake_active=False):
        """Return True only for this feature. Authenticate before retaining data."""
        now = (now or datetime.now(HKT)).astimezone(HKT)
        day = now.date().isoformat()
        callback = update.get("callback_query") or {}
        message = callback.get("message") or update.get("message") or {}
        sender = callback.get("from") or message.get("from") or {}
        chat = message.get("chat") or {}
        if not bot.configured_chat_matches(chat.get("id")) or not bot.configured_sender_matches(sender.get("id")):
            return False
        text = str(message.get("text") or "").strip()
        token = text.split(maxsplit=1)[0].split("@", 1)[0].lower() if text else ""
        action, target = None, day
        if callback:
            match = re.fullmatch(r"oa:(\d{4}-\d{2}-\d{2}):(done|carry)", str(callback.get("data", "")))
            if not match:
                return False
            target, action = match.groups()
        elif token in COMMANDS:
            action = {"/one_action": "show", "/one_done": "done", "/one_carry": "carry"}[token]
            if message.get("date") is not None:
                target = datetime.fromtimestamp(int(message["date"]), HKT).date().isoformat()
        elif not intake_active and text.lower() in {"done", "done ✓", "carry forward", "完成", "明天继续"}:
            action = "done" if text.lower() in {"done", "done ✓", "完成"} else "carry"
        else:
            return False
        update_id = str(update["update_id"])
        with self.locked() as state:
            # Plain replies only when responding to our prompt, or today's
            # prompt is pending; never intercept source intake or diary text.
            if not callback and token not in COMMANDS:
                reply_id = (message.get("reply_to_message") or {}).get("message_id")
                reply_day = next((d for d, e in state["days"].items() if reply_id and (e.get("delivery") or {}).get("messageId") == reply_id), None)
                today = state["days"].get(day, {})
                if reply_day:
                    target = reply_day
                elif not today.get("delivery") or today.get("status") != "OPEN":
                    return False
            receipt = state["updates"].get(update_id)
            if receipt is None:
                entry = state["days"].get(target)
                if callback and (not entry or (entry.get("delivery") or {}).get("messageId") != message.get("message_id")):
                    reply = "That check-in is unavailable. Use /one_action."
                elif target != day:
                    reply = "That check-in is from another day. Use /one_action for today. / 今日请用 /one_action。"
                else:
                    entry = self.ensure_day(state, day)
                    if action == "show":
                        if entry["status"] == "OPEN":
                            reply = None
                        else:
                            reply = "Done for today. See you tomorrow. / 今天已完成，明天见。" if entry["status"] == "DONE" else "Saved for tomorrow. / 已留到明天继续。"
                    elif entry["status"] == "DONE":
                        reply = "Already done for today. / 今天已经完成。"
                    elif action == "carry":
                        if entry["status"] != "CARRY_FORWARD":
                            state["actions"][entry["actionId"]]["carries"] += 1
                        entry["status"] = "CARRY_FORWARD"
                        reply = "Saved. Same action tomorrow. / 记住了，明天接着做。"
                    else:
                        entry.update(status="DONE", completedAt=now.isoformat(), evidence="ROBIN_SELF_REPORT")
                        detail = text.partition(" ")[2].strip() if token == "/one_done" else ""
                        if detail:
                            # A different completed action counts for the day;
                            # it does not falsely complete the suggested one.
                            entry["completedOtherAction"] = detail[:1000]
                        else:
                            selected = state["actions"][entry["actionId"]]
                            selected.update(status="DONE", completedAt=now.isoformat(),
                                            completedTask=selected["small"] if selected["carries"] >= 2 else selected["task"],
                                            evidence="ROBIN_SELF_REPORT", publicDistributionEvidence="UNKNOWN")
                        reply = "Done. One action is enough today. / 记下了，今天一个行动就够了。"
                receipt = {"at": now.isoformat(), "reply": reply, "acknowledged": False}
                state["updates"][update_id] = receipt
                atomic_json(self.path, state)
            if receipt["acknowledged"]:
                return True
            if callback:
                try:
                    bot.call_api("answerCallbackQuery", {"callback_query_id": callback["id"], "text": receipt["reply"][:190]})
                except RuntimeError as exc:
                    # Telegram expires callback IDs; the saved choice survives.
                    if "query is too old" not in str(exc).lower() and "query id is invalid" not in str(exc).lower():
                        raise
                    receipt["acknowledgmentExpired"] = True
            elif receipt["reply"] is not None:
                bot.call_api("sendMessage", {"chat_id": bot.chat_id, "text": receipt["reply"]})
            else:
                result = bot.call_api("sendMessage", {"chat_id": bot.chat_id, **self.prompt(state, day)})
                message_id = result.get("result", {}).get("message_id")
                if not isinstance(message_id, int):
                    raise ValueError("No Telegram delivery receipt")
                state["days"][day]["delivery"] = {"status": "SENT", "messageId": message_id, "at": now.isoformat()}
            receipt["acknowledged"] = True
        return True
