"""Portable regression gate for the deployed single-consumer diary bridge."""
import hashlib
from datetime import datetime
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

    def test_hkt_cutoff_and_calendar_rollovers(self):
        cases = [
            ('2026-09-27T12:59:59+08:00', '2026-09-27'),
            ('2026-09-27T13:00:00+08:00', '2026-09-28'),
            ('2026-09-27T23:59:59+08:00', '2026-09-28'),
            ('2026-09-28T00:00:00+08:00', '2026-09-28'),
            ('2026-09-27T05:00:00+00:00', '2026-09-28'),
            ('2026-09-30T13:00:00+08:00', '2026-10-01'),
            ('2026-12-31T13:00:00+08:00', '2027-01-01'),
            ('2028-02-28T13:00:00+08:00', '2028-02-29'),
            ('2028-02-29T13:00:00+08:00', '2028-03-01'),
        ]
        for i, (timestamp, expected) in enumerate(cases, 1):
            with self.subTest(timestamp=timestamp):
                root = self.root / str(i)
                args = dict(update_id=i, message_id=i, message_date=int(datetime.fromisoformat(timestamp).timestamp()),
                            chat_id='123', sender_id='123', authorized_chat_id='123',
                            authorized_sender_id='123', publishing_root=root)
                record = bridge.enqueue_diary_message('/diary_publish Date\nbody', **args)
                self.assertEqual(record['date'], expected)
                self.assertTrue(record['entrySlug'].startswith(expected))
                self.assertIn(expected[:7].replace('-', '') + '/' + expected, record['canonicalUrl'])
                self.assertEqual(record['receivedAtHkt'], datetime.fromisoformat(timestamp).astimezone(bridge.HKT).isoformat())
                args['message_date'] += 86400
                self.assertEqual(bridge.enqueue_diary_message('/diary_publish Date\nbody', **args), record)

    def test_collection_date_stays_fixed_across_cutoff_and_midnight(self):
        timestamp = lambda value: int(datetime.fromisoformat(value).timestamp())
        reply = self.send('/diary_publish Tonight\nfirst', message_date=timestamp('2026-09-27T20:00:00+08:00'))
        self.assertIn('Diary date: 2026-09-28', reply)
        self.send('last', 2, message_date=timestamp('2026-09-28T14:00:00+08:00'))
        reply = self.send('/diary_done', 3, message_date=timestamp('2026-09-28T14:01:00+08:00'))
        self.assertIn('Diary date: 2026-09-28', reply)
        self.assertEqual(json.loads((self.root / 'inbox/telegram-1.json').read_text())['date'], '2026-09-28')

    def test_legacy_record_is_not_redated_on_replay(self):
        args = dict(update_id=1, message_id=1, message_date=int(datetime.fromisoformat('2026-09-27T20:00:00+08:00').timestamp()),
                    chat_id='123', sender_id='123', authorized_chat_id='123',
                    authorized_sender_id='123', publishing_root=self.root)
        record = bridge.enqueue_diary_message('/diary_publish Legacy\nbody', **args)
        record['date'] = '2026-09-27'
        record.pop('datePolicy')
        path = self.root / 'inbox/telegram-1.json'
        path.write_text(json.dumps(record))
        before = path.read_bytes()
        self.assertEqual(bridge.enqueue_diary_message('/diary_publish Legacy\nbody', **args), record)
        self.assertEqual(path.read_bytes(), before)


if __name__ == '__main__':
    unittest.main()
