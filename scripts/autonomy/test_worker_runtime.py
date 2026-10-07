import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from worker_runtime import worker_command


class WorkerRuntimeTest(unittest.TestCase):
    def test_missing_old_app_uses_existing_cli_and_scoped_model(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            cli = root / 'codex'
            cli.touch(); cli.chmod(0o700)
            (root / 'daily_briefing').mkdir()
            (root / 'daily_briefing/publisher.config.json').write_text(
                json.dumps({'recoveryModel': 'fixture-model'}))
            self.assertEqual(worker_command(root, [root / 'old-app', cli]),
                             [str(cli), 'exec', '--model', 'fixture-model'])

    def test_path_fallback_preserves_default_when_no_scoped_model(self):
        with tempfile.TemporaryDirectory() as tmp, patch('worker_runtime.shutil.which', return_value='/existing/codex'):
            self.assertEqual(worker_command(tmp, []), ['/existing/codex', 'exec'])

    def test_missing_runtime_fails_without_installing(self):
        with patch('worker_runtime.shutil.which', return_value=None):
            with self.assertRaises(FileNotFoundError):
                worker_command('/unused', [])
