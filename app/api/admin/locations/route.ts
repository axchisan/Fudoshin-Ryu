import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET all locations
export async function GET() {
  try {
    const locations = await db.location.findMany({
      orderBy: [{ is_main: "desc" }, { name: "asc" }],
      include: {
        schedules: {
          orderBy: [{ day_of_week: "asc" }, { start_time: "asc" }],
        },
      },
    })

    return NextResponse.json({ locations })
  } catch (error) {
    console.error("[v0] Error fetching locations:", error)
    return NextResponse.json({ error: "Error al obtener ubicaciones" }, { status: 500 })
  }
}

// POST create new location
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, address, latitude, longitude, is_main } = body

    if (!name || !address) {
      return NextResponse.json({ error: "Nombre y dirección requeridos" }, { status: 400 })
    }

    const location = await db.location.create({
      data: {
        name,
        address,
        latitude: latitude ? Number.parseFloat(latitude) : null,
        longitude: longitude ? Number.parseFloat(longitude) : null,
        is_main: is_main || false,
      },
    })

    return NextResponse.json({ location })
  } catch (error) {
    console.error("[v0] Error creating location:", error)
    return NextResponse.json({ error: "Error al crear ubicación" }, { status: 500 })
  }
}
