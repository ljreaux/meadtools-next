import { getYeasts } from "@/app/actions/yeasts";
import { NextResponse } from "next/server";

export async function GET() {
  const yeasts = await getYeasts();

  if (!yeasts) {
    return NextResponse.json({
      message: 'Failed to fetch yeasts',
      status: 500,
    })
  }
  return NextResponse.json(yeasts)
}