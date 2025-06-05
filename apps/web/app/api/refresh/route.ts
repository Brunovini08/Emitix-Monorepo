import { NextResponse } from "next/server";

export async function POST() {
  const backendRes = await fetch('http://localhost:3030/auth/user/refreshtoken', {
    method: "POST",
    credentials: "include",
  });

  const data = await backendRes.json();

  const response = NextResponse.json(data, {
    status: backendRes.status,
  });

  // Repassa cookies se tiver
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
