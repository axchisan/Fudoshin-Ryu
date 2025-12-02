import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Query real database stats
    const [totalMessages, totalPosts, totalImages, totalTestimonials] = await Promise.all([
      db.contactMessage.count(),
      db.blogPost.count({ where: { published: true } }),
      db.galleryImage.count({ where: { published: true } }),
      db.testimonial.count({ where: { approved: true } }),
    ])

    return NextResponse.json({
      totalMessages,
      totalPosts,
      totalImages,
      totalTestimonials,
    })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 })
  }
}
