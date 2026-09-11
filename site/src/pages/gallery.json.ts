import { trajectoryCases } from '../lib/trajectories';

export function GET() {
  return new Response(JSON.stringify({
    description: 'Selected exploratory case studies. Verbatim excerpts; annotations are editorial. Outcomes describe sequences, not models or runs.',
    reviewed: '2026-09-11',
    cases: trajectoryCases,
  }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
