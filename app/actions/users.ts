'use server'
import { supabase } from "../supabaseClient";

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