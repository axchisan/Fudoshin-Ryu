import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-helpers"

// GET all blog posts (admin)
export async function GET(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 })
  }
}

// POST create new blog post
export async function POST(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, slug, excerpt, content, image_url, author, published } = await request.json()

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image_url: image_url || null,
        author: author || "Sensei Leonardo Vanegas",
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error("[v0] Error creating blog post:", error)
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 })
  }
}
