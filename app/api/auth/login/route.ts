import { getUserByEmail } from "@/app/actions/users";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { serialize } from 'cookie';
import { NextResponse } from "next/server";

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days


export async function POST(req: Request) {
  const body = await req.json();
  const [user] = await getUserByEmail(body.email);

  if (!user) return NextResponse.json({
    message: "User not found",
    status: 401,
  });


  const auth = await bcrypt.compare(body.password, user.password);

  if (!auth) return NextResponse.json({
    message: "Invalid credentials",
    status: 401,
  });


  const secret = process.env.JWT_SECRET || ""

  const token = sign({ userId: user.id }, secret, { expiresIn: MAX_AGE });
  const serialized = serialize('token', token, {

    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  })

  return new Response(JSON.stringify({ message: 'Authenticated' }), {
    headers: {
      'Set-Cookie': serialized,
    },
  });
}