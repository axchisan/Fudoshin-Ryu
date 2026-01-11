import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, level, content, rating, image_url, email, approved, featured, response } = body

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        name,
        level,
        content,
        rating,
        image_url,
        email,
        approved,
        featured,
        response,
        responded_at: response ? new Date() : undefined,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[v0] Testimonials PUT error:", error)
    return NextResponse.json({ error: "Error al actualizar testimonio" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params

    await db.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Testimonials DELETE error:", error)
    return NextResponse.json({ error: "Error al eliminar testimonio" }, { status: 500 })
  }
}
