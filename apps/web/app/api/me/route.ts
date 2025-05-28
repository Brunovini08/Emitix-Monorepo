import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { jwtConstants } from '../../constants';

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, jwtConstants.secret!) as { sub: string; email: string; username: string };
    return NextResponse.json({ user: { name: decoded.username, email: decoded.email, sub: decoded.sub } });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
