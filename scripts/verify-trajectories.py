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

def field_value(record, field):
    for part in field.split('.'):
        record = json.loads(record) if part == '$json' else record[int(part)] if isinstance(record, list) else record[part]
    return record

count = 0
for gallery in galleries:
    for case in gallery['cases']:
        covered = []
        for beat in case['story']:
            indices = beat['steps']
            assert indices and all(isinstance(i, int) and 0 <= i < len(case['steps']) for i in indices)
            covered.extend(indices)
            sources = [case['steps'][i] for i in indices]
            assert len({s['session'] for s in sources}) == 1, f'Story merges sessions: {case["id"]}'
            kinds = {s['kind'] for s in sources}
            assert len(kinds) == 1 or kinds <= {'agent', 'tool'}, f'Story merges memory with activity: {case["id"]}'
            if 'highlight' in beat:
                assert beat['highlightStep'] in indices
                assert beat['highlight'] in case['steps'][beat['highlightStep']]['quote'], f'Highlight differs: {case["id"]}'
            if kinds & {'memory-write', 'memory-read'}:
                assert beat.get('highlight'), f'Memory story needs a verbatim note: {case["id"]}'
        assert covered == list(range(len(case['steps']))), f'Story drops or reorders evidence: {case["id"]}'
        for step in case['steps']:
            src = step['source']
            path = args.transcripts / src['dataset'] / src['path']
            raw = path.read_bytes()
            assert hashlib.sha256(raw).hexdigest() == src['sha256'], f'File differs: {path}'
            rows = [json.loads(line) for line in raw.splitlines()]
            record = rows[src['line'] - 1]
            value = field_value(record, src['field'])
            assert step['quote'] in value, f'Quote differs: {case["id"]}, session {step["session"]}'
            if step['kind'] == 'memory-write':
                index = int(src['field'].split('.')[1])
                call = record['tool_calls'][index]
                assert call['name'] == 'workspace_write'
                assert call['args']['path'] == step['workspace']
                acknowledgement = next((row for row in rows[src['line']:]
                    if row.get('tool_call_id') == call['id']), None)
                if acknowledgement:
                    assert not acknowledgement.get('is_error', False)
                    assert 'Wrote ' in (acknowledgement.get('content') or acknowledgement.get('text', ''))
                else:
                    # One archived session ends on the write request. Its next
                    # session's read must prove that the quoted text persisted.
                    later_reads = [st for st in case['steps'] if st['kind'] == 'memory-read'
                        and st['workspace'] == step['workspace'] and st['session'] > step['session']]
                    persisted = False
                    for st in later_reads:
                        rs = st['source']
                        read_rows = [json.loads(line) for line in (args.transcripts / rs['dataset'] / rs['path']).read_bytes().splitlines()]
                        persisted |= step['quote'] in field_value(read_rows[rs['line'] - 1], rs['field'])
                    assert persisted, f'Unconfirmed memory write: {case["id"]}, session {step["session"]}'
            if step['kind'] in ('memory-read', 'tool'):
                calls = {call['id']: call for row in rows[:src['line']-1] for call in row.get('tool_calls', [])}
                call = calls[record['tool_call_id']]
                assert call['name'] == step['tool']
                if step['kind'] == 'memory-read':
                    assert call['name'] == 'workspace_read'
                    assert call['args']['path'] == step['workspace']
            count += 1
print(f'PASS: {count} excerpts match pinned public transcripts, source lines, fields, memory operations, and visual-story provenance.')
