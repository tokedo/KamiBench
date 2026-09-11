"""Index archived transcripts for editorial discovery, not experimental scoring.

Usage: python3 scripts/index-trajectory-corpus.py LAB_EXPERIMENTS OUTPUT_DIRECTORY

Reads originals once, excludes publication duplicates and retired run 003.
Writes a local SQLite index and aggregate coverage.json. The index contains
full transcript content: keep it outside the public site/repository.
Tool results associate with the nearest preceding matching call ID, so reused
IDs in the Gemini adapter do not collapse an entire session into one call.
Workspace reads include reference documents; they are not own-memory counts.
Memory diffs are lexical candidate-discovery aids, not measured learning.
"""
import json,sqlite3,hashlib,collections,difflib,argparse
from pathlib import Path
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('experiments',type=Path)
parser.add_argument('output',type=Path)
args=parser.parse_args()
root=args.experiments
out=args.output
out.mkdir(parents=True,exist_ok=True)
db=sqlite3.connect(out/'corpus.sqlite')
db.executescript('DROP TABLE IF EXISTS sessions; DROP TABLE IF EXISTS events; CREATE TABLE sessions(arm TEXT,session INT,path TEXT,sha256 TEXT,rows INT); CREATE TABLE events(arm TEXT,session INT,line INT,kind TEXT,tool TEXT,field TEXT,text TEXT,novel TEXT);')
counts=collections.Counter(); excluded=collections.Counter(); invalid=[]; mem={}; reads=collections.Counter(); writes=collections.Counter()
for p in sorted(root.rglob('session-*.jsonl')):
 if 'publication' in p.parts: excluded['publication_duplicates']+=1;continue
 arm=p.parent.parent.name
 if arm.startswith('003-'): excluded['retired_003']+=1;continue
 session=int(p.stem.split('-')[1]); raw=p.read_bytes(); lines=raw.splitlines();counts[arm]+=1
 db.execute('INSERT INTO sessions VALUES(?,?,?,?,?)',(arm,session,str(p),hashlib.sha256(raw).hexdigest(),len(lines)))
 calls={}
 for n,line in enumerate(lines,1):
  try:r=json.loads(line)
  except Exception as e:invalid.append([str(p),n,str(e)]);continue
  for i,c in enumerate(r.get('tool_calls',[])):
   calls[c['id']]=c
   name=c.get('name','');args=c.get('args',{})
   if name=='workspace_write':
    txt=args.get('content','');key=(arm,args.get('path',''));old=mem.get(key,'');mem[key]=txt
    novel='\n'.join(x[2:] for x in difflib.ndiff(old.splitlines(),txt.splitlines()) if x.startswith('+ '));writes[arm]+=1
    db.execute('INSERT INTO events VALUES(?,?,?,?,?,?,?,?)',(arm,session,n,'memory-write',name,f'tool_calls.{i}.args.content',txt,novel))
   else:db.execute('INSERT INTO events VALUES(?,?,?,?,?,?,?,?)',(arm,session,n,'call',name,f'tool_calls.{i}.args',json.dumps(args),''))
  txt=r.get('text') or r.get('content')
  if isinstance(txt,str):
   field='text' if r.get('text') else 'content';c=calls.get(r.get('tool_call_id'),{});name=c.get('name','')
   kind='memory-read' if name=='workspace_read' else 'tool' if r.get('role') in ('tool_result','tool') else r.get('role','')
   if kind=='memory-read':reads[arm]+=1
   db.execute('INSERT INTO events VALUES(?,?,?,?,?,?,?,?)',(arm,session,n,kind,name,field,txt,''))
db.commit()
report={'sessions_by_arm':dict(sorted(counts.items())),'total_transcript_files':sum(counts.values()),'excluded':dict(excluded),'invalid_json_lines':invalid,'memory_writes':dict(writes),'workspace_reads':dict(reads),'indexed_events':db.execute('SELECT count(*) FROM events').fetchone()[0]}
(out/'coverage.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
