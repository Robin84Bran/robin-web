"""Resolve existing Codex and the website-scoped model without changing globals."""
import json
import os
from pathlib import Path
import shutil


def worker_command(website, candidates=None):
    candidates = candidates if candidates is not None else (
        Path('/Users/headlessnick/Desktop/ChatGPT.app/Contents/Resources/codex'),
        Path('/Applications/ChatGPT.app/Contents/Resources/codex'),
        Path('/Users/headlessnick/.local/bin/codex'),
    )
    binary = next((str(path) for path in candidates
                   if path.is_file() and os.access(path, os.X_OK)), None)
    binary = binary or shutil.which('codex')
    if not binary:
        raise FileNotFoundError('No existing Codex executable is available')
    config = Path(website) / 'daily_briefing' / 'publisher.config.json'
    model = json.loads(config.read_text()).get('recoveryModel') if config.exists() else None
    command = [binary, 'exec']
    if isinstance(model, str) and model.strip():
        command.extend(['--model', model])
    return command
