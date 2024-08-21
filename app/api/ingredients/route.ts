import { getAllIngredients } from "@/app/actions/ingredients";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await getAllIngredients();

  if (!ingredients) {
    return NextResponse.json({
      message: 'Failed to fetch ingredients',
      status: 500,
    })
  }
  return NextResponse.json(ingredients)
}