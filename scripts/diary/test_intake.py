"""Portable regression gate for the deployed single-consumer diary bridge."""
import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import diary_bridge as bridge


class IntakeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def send(self, text, number=1, **overrides):
        args = dict(update_id=number, message_id=number, message_date=1787360400,
                    chat_id='123', sender_id='123', authorized_chat_id='123',
                    authorized_sender_id='123', publishing_root=self.root)
        args.update(overrides)
        return bridge.maybe_handle_diary_message(text, **args)

    def test_multipart_restart_duplicate_and_seal(self):
        parts = ['🌸 ' + 'a' * 4096, '  第二段\n\n' + 'b' * 4096, 'Last paragraph.']
        self.send('/diary_publish Long\n' + parts[0])
        self.send(parts[1], 2)
        self.send(parts[1], 2)
        self.send(parts[2], 3)
        self.assertFalse((self.root / 'inbox').exists())
        self.assertIn('3 parts', self.send('/diary_done', 4))
        path = self.root / 'inbox/telegram-1.json'
        original = path.read_bytes()
        record = json.loads(original)
        self.assertEqual(record['body'], '\n\n'.join(parts))
        self.assertEqual(record['bodySha256'], hashlib.sha256(record['body'].encode()).hexdigest())
        self.send('/diary_done', 4)
        self.assertEqual(path.read_bytes(), original)
        self.assertEqual(path.stat().st_mode & 0o777, 0o600)
        self.send('/diary_publish Next\nnew', 5)
        self.send(parts[1], 2)
        self.assertIn('1 parts', self.send('/diary_status', 6))

    def test_auth_corruption_and_commands_fail_closed(self):
        self.send('/diary_publish Draft\nbody')
        with self.assertRaises(PermissionError):
            self.send('bad', 2, sender_id='999')
        self.assertIn('not added', self.send('/daily_publish', 3))
        self.assertIn('command alone', self.send('/diary_done extra text', 4))
        self.assertFalse((self.root / 'inbox').exists())
        self.send('/diary_cancel', 5)
        record = json.loads((self.root / 'inbox/telegram-1.json').read_text())
        self.assertEqual(record['status'], 'DRAFT')
        self.assertIsNone(record['canonicalUrl'])

    def test_interrupted_completion_is_idempotent(self):
        self.send('/diary_publish Crash\nfirst')
        self.send('last', 2)
        writer = bridge._private_write
        def interrupted(path, value):
            if path.parent.name == 'diary-intake':
                raise OSError('interrupted session commit')
            writer(path, value)
        with patch.object(bridge, '_private_write', interrupted):
            with self.assertRaises(OSError):
                self.send('/diary_done', 3)
        path = self.root / 'inbox/telegram-1.json'
        original = path.read_bytes()
        self.send('/diary_done', 3)
        self.assertEqual(path.read_bytes(), original)


if __name__ == '__main__':
    unittest.main()
