import { getYeastByName } from "@/app/actions/yeasts"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { yeastName } }: { params: { yeastName: string } }) {
  const [yeast] = await getYeastByName(yeastName)
  if (!yeast) {
    return NextResponse.json({
      message: 'No Yeast Found',
      status: 404,
    })
  }
  return NextResponse.json(yeast)
}