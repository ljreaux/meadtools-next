import { checkAuth } from "@/app/actions/users";
import { supabase } from "@/app/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params: { recipeId } }: { params: { recipeId: string } }) {
  const userId = await checkAuth()

  if (typeof userId !== "object") {
    const { data } = await supabase.from('recipes').select('*')
      .eq('id', parseInt(recipeId))
    const { user_id } = data?.[0]
    console.log(user_id === userId)
    if (user_id !== parseInt(userId)) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 })
    }


    await supabase.from('recipes').delete().eq('id', parseInt(recipeId))
    return NextResponse.json("Recipe deleted successfully", { status: 200 });
  }
  return NextResponse.json(userId)

}