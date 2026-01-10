import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET single location
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const location = await db.location.findUnique({
      where: { id },
      include: {
        schedules: {
          orderBy: [{ day_of_week: "asc" }, { start_time: "asc" }],
        },
      },
    })

    if (!location) {
      return NextResponse.json({ error: "Ubicación no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ location })
  } catch (error) {
    console.error("[v0] Error fetching location:", error)
    return NextResponse.json({ error: "Error al obtener ubicación" }, { status: 500 })
  }
}

// PUT update location
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, address, latitude, longitude, is_main } = body

    const location = await db.location.update({
      where: { id },
      data: {
        name,
        address,
        latitude: latitude ? Number.parseFloat(latitude) : null,
        longitude: longitude ? Number.parseFloat(longitude) : null,
        is_main,
      },
    })

    return NextResponse.json({ location })
  } catch (error) {
    console.error("[v0] Error updating location:", error)
    return NextResponse.json({ error: "Error al actualizar ubicación" }, { status: 500 })
  }
}

// DELETE location
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.location.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting location:", error)
    return NextResponse.json({ error: "Error al eliminar ubicación" }, { status: 500 })
  }
}
