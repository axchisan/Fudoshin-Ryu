import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const testimonials = await db.testimonial.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("[v0] Testimonials GET error:", error)
    return NextResponse.json({ error: "Error al obtener testimonios" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { name, level, content, rating, image_url, approved, featured } = body

    if (!name || !content || !level) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        level,
        content,
        rating: rating || 5,
        image_url,
        approved: approved !== false,
        featured: featured || false,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[v0] Testimonials POST error:", error)
    return NextResponse.json({ error: "Error al crear testimonio" }, { status: 500 })
  }
}
