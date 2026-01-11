import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image_url: true,
        createdAt: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Error al obtener artículos" }, { status: 500 })
  }
}
