import hashlib
import json
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
from unittest.mock import patch
from research_handoff import due_research, fingerprint, validate_packet, REQUIRED_SECTIONS
from workflow import Workflow, atomic, read

NOW = datetime(2026, 11, 16, 10, tzinfo=ZoneInfo('Asia/Hong_Kong'))

def parent():
    return {'kind':'intelligence','status':'COMPLETE','verifiedAt':NOW.isoformat(),
        'receiptSha256':'a'*64,'receipt':{'commit':'b'*40,'routes':['/intelligence/new-question/','/intelligence/'],
        'gates':dict.fromkeys(('tests','seo','mobile','githubVerify','cloudflare'), True)}}

class ResearchHandoffTest(unittest.TestCase):
    def test_only_verified_playable_releases_queue_one_source_bound_kickoff(self):
        jobs={'intelligence:2026-W47':parent()}
        child=due_research(jobs,NOW)[0]
        self.assertEqual(child['playableRoute'],'/intelligence/new-question/')
        self.assertEqual(child['sourceReceiptSha256'],fingerprint(jobs['intelligence:2026-W47']['receipt']))
        jobs[child['id']]=child
        self.assertEqual(due_research(jobs,NOW),[])
    def test_no_historical_backfill_no_pending_release_no_failed_gate(self):
        for mutation in [dict(verifiedAt='2026-11-09T10:00:00+08:00'),dict(status='RUNNING'),dict(receiptSha256='')]:
            p=parent();p.update(mutation)
            self.assertEqual(due_research({'intelligence:2026-W47':p},NOW),[])
        p=parent();p['receipt']['gates']['cloudflare']=False
        self.assertEqual(due_research({'intelligence:2026-W47':p},NOW),[])
    def test_no_council_route_or_unpinned_commit(self):
        p=parent();p['receipt']['routes']=['/intelligence/','/intelligence/council/test/']
        self.assertEqual(due_research({'intelligence:2026-W47':p},NOW),[])
        p=parent();p['receipt']['commit']='main'
        self.assertEqual(due_research({'intelligence:2026-W47':p},NOW),[])
    def test_private_packet_needs_correct_source_hash_and_all_sections(self):
        with tempfile.TemporaryDirectory() as temp:
            jobs={'intelligence:2026-W47':parent()};job=due_research(jobs,NOW)[0]
            flow=Workflow(temp);folder=flow.folder(job['id']);folder.mkdir(parents=True)
            packet=folder/'kickoff.md'
            text='https://iamrobin.ai/intelligence/new-question/\n'+'\n'.join('## '+s+'\n'+('Measured baseline and alternative to test. '*7) for s in REQUIRED_SECTIONS)
            packet.write_text(text)
            receipt={'sourceReceiptSha256':job['sourceReceiptSha256'],'packetPath':str(packet),'packetSha256':hashlib.sha256(packet.read_bytes()).hexdigest()}
            validate_packet(job,receipt,flow.runtime,jobs)
            receipt['sourceReceiptSha256']='f'*64
            with self.assertRaisesRegex(ValueError,'source receipt mismatch'):validate_packet(job,receipt,flow.runtime,jobs)
            receipt['sourceReceiptSha256']=job['sourceReceiptSha256'];packet.write_text('Incomplete')
            with self.assertRaisesRegex(ValueError,'hash mismatch'):validate_packet(job,receipt,flow.runtime,jobs)
    def test_parent_finish_verifies_bytes_before_handoff_and_notifies_once(self):
        with tempfile.TemporaryDirectory() as temp:
            flow=Workflow(temp);key='intelligence:2026-W47';snap=flow.runtime/'snapshot.json';atomic(snap,{'actualSources':['test fixture']})
            receipt={'jobId':key,'kind':'intelligence','reviewPeriod':'2026-W47',
                'coverage':{k:{'status':'READ','sources':['test fixture']} for k in ('memory','pinned','recent')},
                'snapshotPath':str(snap),'snapshotSha256':hashlib.sha256(snap.read_bytes()).hexdigest(),
                'commit':'b'*40,'routes':['/intelligence/new-question/'],'assets':[{'path':'public/new-question/model.mjs','sha256':hashlib.sha256(b'model').hexdigest()}],
                'gates':dict.fromkeys(('tests','seo','mobile','githubVerify','cloudflare'),True)}
            with flow.locked() as state:state['jobs'][key]={'id':key,'kind':'intelligence','status':'RUNNING'}
            file=flow.runtime/'receipt.json';atomic(file,receipt)
            with patch('workflow.notify_research',return_value={'status':'CONFIRMED'}) as notice:
                with self.assertRaisesRegex(ValueError,'differ'):flow.finish(key,file,fetch=lambda url:b'wrong')
                self.assertFalse(any(v.get('kind')=='research' for v in read(flow.path,{})['jobs'].values()))
                fetch=lambda url:b'model' if url.endswith('.mjs') else b'https://iamrobin.ai/intelligence/new-question/ application/ld+json'
                result=flow.finish(key,file,fetch=fetch)
                self.assertEqual(len(result['researchJobs']),1)
                flow.finish(key,file,fetch=fetch)
                self.assertEqual(notice.call_count,1)
                # Rechecking the same historical DONE source must not turn it into a new release.
                with flow.locked() as state:
                    state['jobs']={key:state['jobs'][key]}
                    state['jobs'][key]['verifiedAt']='2026-11-09T10:00:00+08:00'
                flow.finish(key,file,fetch=fetch)
                self.assertEqual(notice.call_count,1)
                self.assertFalse(any(v.get('kind')=='research' for v in read(flow.path,{})['jobs'].values()))
