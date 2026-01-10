import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET single schedule
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const schedule = await db.schedule.findUnique({
      where: { id },
      include: {
        location: true,
      },
    })

    if (!schedule) {
      return NextResponse.json({ error: "Horario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("[v0] Error fetching schedule:", error)
    return NextResponse.json({ error: "Error al obtener horario" }, { status: 500 })
  }
}

// PUT update schedule
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { locationId, day_of_week, start_time, end_time, level, description } = body

    const schedule = await db.schedule.update({
      where: { id },
      data: {
        locationId,
        day_of_week: Number.parseInt(day_of_week),
        start_time,
        end_time,
        level,
        description,
      },
      include: {
        location: true,
      },
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("[v0] Error updating schedule:", error)
    return NextResponse.json({ error: "Error al actualizar horario" }, { status: 500 })
  }
}

// DELETE schedule
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.schedule.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting schedule:", error)
    return NextResponse.json({ error: "Error al eliminar horario" }, { status: 500 })
  }
}
