import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("[v0] Error fetching gallery:", error)
    return NextResponse.json({ error: "Error al obtener galería" }, { status: 500 })
  }
}
