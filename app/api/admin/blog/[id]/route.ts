import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-helpers"

// GET single blog post
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const post = await db.blogPost.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json({ error: "Post no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return NextResponse.json({ error: "Error al obtener publicación" }, { status: 500 })
  }
}

// PUT update blog post
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { title, slug, excerpt, content, image_url, author, published } = await request.json()

    const post = await db.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image_url: image_url || null,
        author: author || "Sensei Leonardo Vanegas",
        published,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error("[v0] Error updating blog post:", error)
    return NextResponse.json({ error: "Error al actualizar publicación" }, { status: 500 })
  }
}

// DELETE blog post
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await db.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting blog post:", error)
    return NextResponse.json({ error: "Error al eliminar publicación" }, { status: 500 })
  }
}
