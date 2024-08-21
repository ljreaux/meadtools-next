import { getYeastByCategory } from "@/app/actions/yeasts";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { brand } }: { params: { brand: string } }) {
  const yeasts = await getYeastByCategory(brand)

  if (!yeasts) {
    return NextResponse.json({
      message: 'Failed to fetch yeasts',
      status: 500,
    })
  }
  return NextResponse.json(yeasts)
}