"""Verify published excerpts against downloaded, pinned public transcripts.

python3 scripts/verify-trajectories.py /path/to/public-transcripts

The directory must contain <dataset>/<arm>/transcripts/session-NNNN.jsonl
downloaded from Hugging Face at the source record's revision. This checks
whole-file SHA256, exact JSONL line/field, excerpt bytes, and memory provenance.
It does not recalculate experimental results.
"""
import argparse
import hashlib
import json
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('transcripts', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
galleries = json.loads((root / 'blog/trajectories/learning-from-experience.json').read_text())
count = 0
for gallery in galleries:
    for case in gallery['cases']:
        for step in case['steps']:
            src = step['source']
            path = args.transcripts / src['dataset'] / src['path']
            raw = path.read_bytes()
            assert hashlib.sha256(raw).hexdigest() == src['sha256'], f'File differs: {path}'
            rows = [json.loads(line) for line in raw.splitlines()]
            record = rows[src['line'] - 1]
            value = record
            for part in src['field'].split('.'):
                value = value[int(part)] if isinstance(value, list) else value[part]
            assert step['quote'] in value, f'Quote differs: {case["id"]}, session {step["session"]}'
            if step['kind'] == 'memory-write':
                index = int(src['field'].split('.')[1])
                call = record['tool_calls'][index]
                assert call['name'] == 'workspace_write'
                assert call['args']['path'] == step['workspace']
            if step['kind'] in ('memory-read', 'tool'):
                calls = {call['id']: call for row in rows[:src['line']-1] for call in row.get('tool_calls', [])}
                call = calls[record['tool_call_id']]
                assert call['name'] == step['tool']
                if step['kind'] == 'memory-read':
                    assert call['name'] == 'workspace_read'
                    assert call['args']['path'] == step['workspace']
            count += 1
print(f'PASS: {count} excerpts match pinned public transcripts, source lines, fields, and memory operations.')
