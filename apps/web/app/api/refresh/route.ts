import { NextResponse } from "next/server";

export async function POST() {
  const response = await fetch('http://localhost:3030/auth/user/refreshToken', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  console.log("Fez refresh")

  const res = await response.json();
  const nextRes = NextResponse.json(res);

  if (!response.ok) {
    return NextResponse.json({ error: res.error || 'Erro desconhecido' }, { status: response.status });
  }

  return nextRes
}