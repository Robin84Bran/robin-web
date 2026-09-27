"""Narrow, fail-closed Telegram intake for Robin's Meaning diary.

This module never polls Telegram and never publishes. The existing
volatility_lab_bot remains the sole getUpdates consumer. It may enqueue a
message only after both the configured chat and configured sender match.
"""

from __future__ import annotations

import hashlib
import fcntl
import json
import os
import re
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

HKT = ZoneInfo("Asia/Hong_Kong")
DEFAULT_PUBLISHING_ROOT = Path(
    "/Users/headlessnick/RobinOS2/00_identity_output/publishing"
)
COMMANDS = {"/diary_publish": "PUBLISH", "/diary_draft": "DRAFT"}


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _command_token(text: str) -> str:
    first = text.split(maxsplit=1)[0].lower() if text.strip() else ""
    return first.split("@", 1)[0]


def is_diary_message(text: str) -> bool:
    return _command_token(text) in {*COMMANDS, '/diary_done', '/diary_status', '/diary_cancel'}


def _slugify(title: str) -> str:
    ascii_slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    if ascii_slug:
        return ascii_slug[:60].rstrip("-")
    return "entry-" + hashlib.sha256(title.encode("utf-8")).hexdigest()[:10]


def _identity_hash(value: str | int) -> str:
    return hashlib.sha256(str(value).encode("utf-8")).hexdigest()


def _parse_message(text: str) -> tuple[str, str, str]:
    if "\n" not in text:
        raise ValueError("Diary format: /diary_publish Title, then start the body on the next line.")
    first_line, body = text.split("\n", 1)
    command_parts = first_line.strip().split(maxsplit=1)
    command = command_parts[0].lower().split("@", 1)[0]
    title = command_parts[1].strip() if len(command_parts) == 2 else ""
    if command not in COMMANDS or not title:
        raise ValueError("Diary format: /diary_publish Title, then start the body on the next line.")
    if not body:
        raise ValueError("Diary body is empty.")
    return COMMANDS[command], title, body


def enqueue_diary_message(
    text: str,
    *,
    update_id: int,
    message_id: int | None,
    message_date: int | None,
    chat_id: str | int,
    sender_id: str | int,
    authorized_chat_id: str | int,
    authorized_sender_id: str | int,
    publishing_root: Path | None = None,
    collecting: bool = False,
) -> dict[str, Any]:
    """Validate authority and atomically enqueue one immutable diary source."""
    if str(chat_id) != str(authorized_chat_id) or str(sender_id) != str(authorized_sender_id):
        raise PermissionError("Diary intake authority mismatch.")

    intent, title, body = _parse_message(text)
    received = (
        datetime.fromtimestamp(message_date, HKT)
        if message_date is not None
        else datetime.now(HKT)
    )
    # Freeze the diary date at the first message, using Telegram's HKT timestamp.
    # A replay, later part or /diary_done must never move an existing entry.
    date = (received.date() + timedelta(days=int(received.hour >= 13))).isoformat()
    slug = _slugify(title)
    entry_slug = f"{date}-{slug}"
    canonical_url = f"https://iamrobin.ai/meaning/diary/{date[:7].replace('-', '')}/{entry_slug}/"
    root = publishing_root or DEFAULT_PUBLISHING_ROOT
    queue_path = root / "inbox" / f"telegram-{update_id}.json"

    existing = json.loads(queue_path.read_text(encoding='utf-8')) if queue_path.exists() else None
    if existing is not None:
        return existing

    record: dict[str, Any] = {
        "schemaVersion": 1,
        "id": f"telegram-{update_id}",
        "source": "telegram",
        "intent": intent,
        "status": "RECEIVED" if intent == "PUBLISH" else "DRAFT",
        "date": date,
        "datePolicy": "first-message-hkt-1300-v1",
        "entrySlug": entry_slug,
        "title": title,
        "body": body,
        "bodySha256": hashlib.sha256(body.encode("utf-8")).hexdigest(),
        "language": "und",
        "receivedAtHkt": received.isoformat(),
        "enqueuedAt": utc_now_iso(),
        "telegram": {
            "updateId": update_id,
            "messageId": message_id,
            "chatIdentitySha256": _identity_hash(chat_id),
            "senderIdentitySha256": _identity_hash(sender_id),
        },
        "canonicalUrl": canonical_url if intent == "PUBLISH" else None,
        "banner": {"status": "PENDING", "style": "tasteful pale shoujo manga"},
        "receipt": {"status": "PENDING" if intent == "PUBLISH" else "NOT_APPLICABLE"},
        "history": [{"at": utc_now_iso(), "status": "RECEIVED" if intent == "PUBLISH" else "DRAFT"}],
    }
    if collecting:
        record['status'] = 'COLLECTING'
        record['history'] = [{'at': utc_now_iso(), 'status': 'COLLECTING'}]
        return record
    _private_write(queue_path, record)
    return record


def maybe_handle_diary_message(
    text: str,
    **kwargs: Any,
) -> str | None:
    if (str(kwargs['chat_id']) != str(kwargs['authorized_chat_id']) or
            str(kwargs['sender_id']) != str(kwargs['authorized_sender_id'])):
        raise PermissionError('Diary intake authority mismatch.')
    root = kwargs.get('publishing_root') or DEFAULT_PUBLISHING_ROOT
    runtime = root / 'runtime' / 'diary-intake'
    runtime.mkdir(parents=True, exist_ok=True, mode=0o700)
    os.chmod(runtime, 0o700)
    with (runtime / 'intake.lock').open('a') as lock:
        os.chmod(lock.name, 0o600)
        fcntl.flock(lock, fcntl.LOCK_EX)
        state_path = _state_path(root, kwargs['chat_id'], kwargs['sender_id'])
        state = _read_state(state_path)
        key = str(kwargs['update_id'])
        digest = hashlib.sha256(text.encode('utf-8')).hexdigest()
        if key in state['receipts']:
            receipt = state['receipts'][key]
            if receipt['sha256'] != digest:
                raise RuntimeError('Diary update ID collision; source retained.')
            return receipt['reply']
        record = state.get('active')
        command = _command_token(text)
        if not record and not is_diary_message(text):
            return None
        if command in COMMANDS:
            if record:
                reply = 'A diary is still collecting. Send /diary_done to finish, or /diary_cancel to keep it privately. Then start another.'
            else:
                try:
                    record = enqueue_diary_message(text, collecting=True, **kwargs)
                except ValueError as exc:
                    return str(exc)
                if record['status'] != 'COLLECTING':
                    return 'This diary start was already queued; it has not been reopened.'
                record['parts'] = [_part(text.split('\n', 1)[1], kwargs)]
                record['intake'] = {'version': 2, 'sealed': False, 'separator': '\n\n'}
                state['active'] = record
                reply = _progress(record)
        elif command == '/diary_status':
            reply = _progress(record) if record else 'No diary is collecting. Start with /diary_publish Title, then the body on the next line.'
        elif command in ('/diary_done', '/diary_cancel'):
            if len(text.strip().split()) != 1:
                reply = 'Send the end command alone. Paste any remaining diary text in a separate message first; it has not been added or published.'
            elif not record:
                reply = 'No diary is collecting. Your previously sealed diary has not been changed.'
            else:
                record['intake'].update(sealed=True, sealedByUpdateId=kwargs['update_id'], sealedAt=utc_now_iso())
                if command == '/diary_cancel':
                    record.update(intent='DRAFT', canonicalUrl=None, receipt={'status': 'NOT_APPLICABLE'})
                record['status'] = 'RECEIVED' if record['intent'] == 'PUBLISH' else 'DRAFT'
                record['history'].append({'at': utc_now_iso(), 'status': record['status']})
                queue_path = root / 'inbox' / f"{record['id']}.json"
                if queue_path.exists():
                    old = json.loads(queue_path.read_text(encoding='utf-8'))
                    # A crash after queue commit but before session commit is safe to replay.
                    if old['bodySha256'] != record['bodySha256'] or old.get('intake') != record['intake']:
                        # sealedAt is regenerated on retry; the immutable completion ID is authoritative.
                        if (old['bodySha256'] != record['bodySha256'] or
                                old.get('intake', {}).get('sealedByUpdateId') != kwargs['update_id']):
                            raise RuntimeError('Diary queue collision; original preserved.')
                else:
                    _private_write(queue_path, record)
                state['active'] = None
                reply = (f"Diary safely sealed: {record['title']}\nDiary date: {record['date']} (HKT)\n{len(record['parts'])} parts · {len(record['body'])} characters.\n" +
                         ('Queued for the next 13:00 HKT diary batch. The verified URL follows publication.' if record['intent'] == 'PUBLISH' else 'Saved privately; no publication.'))
        elif text.lstrip().startswith('/'):
            reply = 'Diary collection is active. This command was not added to the body. Finish with /diary_done or save privately with /diary_cancel before switching tasks.'
        else:
            # Preserve each message verbatim, with an explicit paragraph boundary between batches.
            record['parts'].append(_part(text, kwargs))
            record['body'] = '\n\n'.join(part['text'] for part in record['parts'])
            record['bodySha256'] = hashlib.sha256(record['body'].encode('utf-8')).hexdigest()
            reply = _progress(record)
        state['receipts'][key] = {'sha256': digest, 'reply': reply}
        _private_write(state_path, state)
        return reply


def _part(text: str, values: dict) -> dict:
    return {'text': text, 'updateId': values['update_id'], 'messageId': values['message_id'],
            'sha256': hashlib.sha256(text.encode('utf-8')).hexdigest()}


def _progress(record: dict) -> str:
    return (f"Diary saved: {record['title']}\nDiary date: {record['date']} (HKT)\n{len(record['parts'])} parts · {len(record['body'])} characters.\n"
            'Paste the remaining parts, then send /diary_done. Nothing publishes before that. /diary_status checks progress.')


def _state_path(root: Path, chat_id: str | int, sender_id: str | int) -> Path:
    identity = _identity_hash(f'{chat_id}:{sender_id}')
    return root / 'runtime' / 'diary-intake' / f'{identity}.json'


def _read_state(path: Path) -> dict:
    # Fail closed on damaged state; never turn corruption into an empty session.
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {'active': None, 'receipts': {}}


def diary_intake_active(chat_id: str | int, sender_id: str | int, publishing_root: Path | None = None) -> bool:
    return bool(_read_state(_state_path(publishing_root or DEFAULT_PUBLISHING_ROOT, chat_id, sender_id)).get('active'))


def _private_write(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    fd, temporary = tempfile.mkstemp(prefix='.diary-', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as handle:
            json.dump(value, handle, ensure_ascii=False, indent=2)
            handle.write('\n')
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
