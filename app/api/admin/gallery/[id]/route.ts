import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { deleteFile } from "@/lib/file-upload"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const image = await db.galleryImage.findUnique({
      where: { id },
    })

    if (!image) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 })
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error("[v0] Gallery GET error:", error)
    return NextResponse.json({ error: "Error al obtener imagen" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, published } = body

    const { id } = await params
    const image = await db.galleryImage.update({
      where: { id },
      data: {
        title,
        description,
        category,
        published,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error("[v0] Gallery PUT error:", error)
    return NextResponse.json({ error: "Error al actualizar imagen" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await params
    const image = await db.galleryImage.findUnique({
      where: { id },
    })

    if (!image) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 })
    }

    // Extract filename from URL
    const filename = image.image_url.split("/").pop()
    if (filename) {
      try {
        await deleteFile(filename)
      } catch (err) {
        console.error("[v0] Error deleting file:", err)
      }
    }

    // Delete from database
    await db.galleryImage.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Gallery DELETE error:", error)
    return NextResponse.json({ error: "Error al eliminar imagen" }, { status: 500 })
  }
}
