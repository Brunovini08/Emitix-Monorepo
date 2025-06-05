import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const body = await req.json();
  const response = await fetch('http://localhost:3030/auth/user/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  
  const res = await response.json();

  const nextRes = NextResponse.json(res);

  if (!response.ok) {
    return NextResponse.json({ error: res.error || 'Erro desconhecido' }, { status: response.status });
  }
  
  const cookies = response.headers.getSetCookie();
  cookies?.forEach((cookie) => nextRes.headers.append('Set-Cookie', cookie));
  
  return nextRes;
}
