import { getIngredientByName } from "@/app/actions/ingredients"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { ingredientName } }: { params: { ingredientName: string } }) {
  const [ingredient] = await getIngredientByName(ingredientName)

  if (!ingredient) {
    return NextResponse.json({
      message: 'Failed to fetch ingredients',
      status: 500,
    })
  }
  return NextResponse.json(ingredient)

}