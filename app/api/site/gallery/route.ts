import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 300

export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ images })
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching gallery:", error)
    }
    return NextResponse.json({ error: "Error al obtener galería" }, { status: 500 })
  }
}
