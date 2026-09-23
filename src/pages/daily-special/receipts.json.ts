import receipts from '../../data/daily-special-receipts.json';
export function GET() {
  return new Response(JSON.stringify(receipts), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
