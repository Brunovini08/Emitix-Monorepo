// app/api/signout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", "", { path: "/", expires: new Date(0) });
  response.cookies.set("refreshToken", "", { path: "/", expires: new Date(0) });

  return response;
}
