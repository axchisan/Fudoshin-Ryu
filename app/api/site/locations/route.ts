import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const locations = await db.location.findMany({
      include: {
        schedules: {
          orderBy: { day_of_week: "asc" },
        },
      },
      orderBy: { is_main: "desc" },
    })

    return NextResponse.json(locations)
  } catch (error) {
    console.error("[v0] Error fetching locations:", error)
    return NextResponse.json({ error: "Error al obtener ubicaciones" }, { status: 500 })
  }
}
