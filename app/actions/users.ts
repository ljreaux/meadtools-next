'use server'
import { cookies } from "next/headers";
import { supabase } from "../supabaseClient";
import { NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";

export async function getUserByEmail(email: string) {
  const { data: user, error } = await supabase.from('users').select('*').eq('email', email)
  if (error) {
    throw new Error(error.message);
  }
  return user;
}

export async function getUserById(id: string) {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', id)
    if (error || !data) {
      throw new Error(error.message);
    }

    const [user] = data as { id: number, email: string, password: string, google_id: null | string, role: 'admin' | "user" }[]

    const { password, google_id, ...rest } = user

    return rest;
  }
  catch (error) {
    return error
  }
}

export const checkAuth = async (): Promise<{ message: string, status: number } | string> => {
  const cookie = cookies()
  const token = cookie.get('token')
  if (!token) return ({
    message: 'Unauthorized',
    status: 401,
  })
  const { value } = token
  const secret = process.env.JWT_SECRET || ""

  const { userId } = await verify(value, secret) as JwtPayload

  if (!userId) return ({
    message: 'Invalid token',
    status: 401,
  })

  return userId;

}
