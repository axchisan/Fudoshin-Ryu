import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const images = await db.galleryImage.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("[v0] Gallery GET error:", error)
    return NextResponse.json({ error: "Error al obtener galería" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { title, image_url, description, category, published } = body

    if (!title || !image_url) {
      return NextResponse.json({ error: "Título e imagen son requeridos" }, { status: 400 })
    }

    const image = await db.galleryImage.create({
      data: {
        title,
        image_url,
        description,
        category: category || "General",
        published: published !== false,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error("[v0] Gallery POST error:", error)
    return NextResponse.json({ error: "Error al crear imagen" }, { status: 500 })
  }
}
