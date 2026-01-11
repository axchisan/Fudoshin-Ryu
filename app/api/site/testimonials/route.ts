import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 300

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { approved: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        level: true,
        content: true,
        rating: true,
        image_url: true,
        response: true,
        responded_at: true,
      },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching testimonials:", error)
    }
    return NextResponse.json({ error: "Error al obtener testimonios" }, { status: 500 })
  }
}
