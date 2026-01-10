import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET all schedules
export async function GET() {
  try {
    const schedules = await db.schedule.findMany({
      include: {
        location: true,
      },
      orderBy: [{ day_of_week: "asc" }, { start_time: "asc" }],
    })

    return NextResponse.json({ schedules })
  } catch (error) {
    console.error("[v0] Error fetching schedules:", error)
    return NextResponse.json({ error: "Error al obtener horarios" }, { status: 500 })
  }
}

// POST create new schedule
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { locationId, day_of_week, start_time, end_time, level, description } = body

    if (!locationId || day_of_week === undefined || !start_time || !end_time || !level) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    const schedule = await db.schedule.create({
      data: {
        locationId,
        day_of_week: Number.parseInt(day_of_week),
        start_time,
        end_time,
        level,
        description: description || null,
      },
      include: {
        location: true,
      },
    })

    return NextResponse.json({ schedule })
  } catch (error) {
    console.error("[v0] Error creating schedule:", error)
    return NextResponse.json({ error: "Error al crear horario" }, { status: 500 })
  }
}
