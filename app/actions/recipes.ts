'use server'
import { supabase } from "../supabaseClient";
export type Recipe = {
  id: number,
  name: string,
  user_id: number,
  advanced: boolean,
  nutrientData: string,
  recipeData: string,
  primaryNotes: string[],
  secondaryNotes: string[],
  nuteInfo: string,
  yanContribution: string,
  yanFromSource: string,
  private: boolean
}
export async function getUserRecipes(userId: string): Promise<Recipe[]> {
  console.log(userId)
  const { data: recipes, error } = await supabase.from("recipes").select("*").eq('user_id', parseInt(userId))

  if (error) throw new Error(error.message)
  return recipes

}