import { getYeastById } from "@/app/actions/yeasts"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  const [yeast] = await getYeastById(id)
  if (!yeast) {
    return NextResponse.json({
      message: 'No Yeast Found',
      status: 404,
    })
  }
  return NextResponse.json(yeast)
}