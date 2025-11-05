import { NextRequest, NextResponse } from 'next/server';

// Whitelist target hosts to avoid open proxy
const ALLOWED_HOSTS = new Set([
  'w6nmrq-dtyrko-laserx2-2c2c5aee.koyeb.app',
  'bsc.meowrpc.com',
]);

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  } as HeadersInit;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  const target = new URL(url);
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
  }

  const upstream = await fetch(target.toString(), { method: 'GET', headers: {} });
  const buf = await upstream.arrayBuffer();
  const res = new NextResponse(buf, { status: upstream.status });
  upstream.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'content-encoding') return; // avoid double compression issues
    res.headers.set(k, v);
  });
  // Set permissive CORS back to browser
  const origin = req.headers.get('origin');
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.headers.set(k, v as string));
  return res;
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  const target = new URL(url);
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
  }
  const body = await req.arrayBuffer();
  const headers: HeadersInit = {};
  req.headers.forEach((v, k) => {
    if (['host', 'origin', 'referer'].includes(k.toLowerCase())) return;
    headers[k] = v;
  });

  const upstream = await fetch(target.toString(), {
    method: 'POST',
    headers,
    body,
  });
  const buf = await upstream.arrayBuffer();
  const res = new NextResponse(buf, { status: upstream.status });
  upstream.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'content-encoding') return;
    res.headers.set(k, v);
  });
  const origin = req.headers.get('origin');
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.headers.set(k, v as string));
  return res;
}
