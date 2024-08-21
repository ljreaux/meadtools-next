'use server'
import { supabase } from "../supabaseClient";

export async function getYeasts() {
  const { data: yeasts, error } = await supabase.from('yeasts').select('*').order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return yeasts;
}

export async function getYeastByCategory(brand: string) {
  const { data: yeasts, error } = await supabase.from('yeasts').select("*").ilike('brand', brand)
  if (error) {
    throw new Error(error.message);
  }
  return yeasts;
}

export async function getYeastByName(name: string) {
  const { data: yeast, error } = await supabase.from('yeasts').select("*").eq('name', name)
  if (error) {
    throw new Error(error.message);
  }
  return yeast;
}

export async function getYeastById(id: string) {
  const { data: yeast, error } = await supabase.from('yeasts').select("*").eq('id', id)
  if (error) {
    throw new Error(error.message);
  }
  return yeast;
}