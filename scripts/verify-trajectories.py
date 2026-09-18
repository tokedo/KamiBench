"""Verify the behavior-card quotes against downloaded, pinned public transcripts.

python3 scripts/verify-trajectories.py /path/to/public-transcripts

The directory must contain <dataset>/<path> as referenced in
blog/trajectories/behaviors.json, downloaded from Hugging Face at the record's
revision. Checks whole-file SHA256, the JSONL line and field, and that every
quote segment is a verbatim substring of that field. It does not recalculate
experimental results.
"""
import argparse, hashlib, json
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('transcripts', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
records = json.loads((root / 'blog/trajectories/behaviors.json').read_text())

def field_value(record, field):
    for part in field.split('.'):
        record = record[int(part)] if isinstance(record, list) else record[part]
    return record

checked = 0
for case in records['cases']:
    for stage in case['stages']:
        if stage['kind'] != 'stage':
            continue
        for src in [stage['transcript']] + ([stage['note']['source']] if 'source' in stage['note'] else []):
            path = args.transcripts / src['dataset'] / src['path']
            data = path.read_bytes()
            if 'sha256' in src:
                assert hashlib.sha256(data).hexdigest() == src['sha256'], f'SHA256 mismatch: {path}'
            lines = data.decode().splitlines()
            assert 1 <= src['line'] <= len(lines), f'Line out of range: {case["id"]} S{stage["session"]}'
        note = stage['note']
        if 'source' in note:
            src = note['source']
            line = (args.transcripts / src['dataset'] / src['path']).read_text().splitlines()[src['line'] - 1]
            field = field_value(json.loads(line), src['field'])
            for seg in note['quote']:
                assert seg in field, f'Quote segment not found: {case["id"]} S{stage["session"]}: {seg[:50]!r}'
                checked += 1
print(f'verified {checked} quote segments across {len(records["cases"])} cards')
