import { getUserById } from "@/app/actions/users";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies()
  const token = cookie.get('token')
  if (!token) return NextResponse.json({
    message: 'Unauthorized',
    status: 401,
  })

  const { value } = token
  const secret = process.env.JWT_SECRET || ""

  try {
    const { userId } = verify(value, secret) as JwtPayload

    if (!userId) return NextResponse.json({
      message: 'Invalid token',
      status: 401,
    });

    const user = await getUserById(userId);

    return NextResponse.json({ message: 'Authenticated', user, status: 200 })
  }
  catch (error) {
    return NextResponse.json({
      message: 'Invalid token',
      status: 401,
    })
  }
}