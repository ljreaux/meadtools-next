'use server'
import { supabase } from "../supabaseClient";

export async function getAllIngredients() {
  const { data: ingredients, error } = await supabase.from('ingredients').select('*').order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return ingredients;
}

export async function getIngredientByCategory(category: string) {
  const { data: ingredients, error } = await supabase.from('ingredients').select('*').ilike('category', category).order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return ingredients;
}

export async function getIngredientByName(name: string) {
  const { data: ingredient, error } = await supabase.from('ingredients').select('*').ilike('name', name).order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return ingredient;
}