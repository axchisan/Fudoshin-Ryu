import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 600

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
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching locations:", error)
    }
    return NextResponse.json({ error: "Error al obtener ubicaciones" }, { status: 500 })
  }
}
