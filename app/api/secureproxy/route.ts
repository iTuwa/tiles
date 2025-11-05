import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as HeadersInit });
}

export async function GET() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as HeadersInit });
}

export async function POST() {
  return new NextResponse(null, { status: 204, headers: corsHeaders as HeadersInit });
}
