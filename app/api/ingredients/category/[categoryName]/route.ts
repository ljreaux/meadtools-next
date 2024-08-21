import { getIngredientByCategory } from "@/app/actions/ingredients"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { categoryName } }: { params: { categoryName: string } }) {
  const ingredients = await getIngredientByCategory(categoryName)

  if (!ingredients) {
    return NextResponse.json({
      message: 'Failed to fetch ingredients',
      status: 500,
    })
  }
  return NextResponse.json(ingredients)

}