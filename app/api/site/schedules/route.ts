import { db } from "@/lib/db"
import { NextResponse } from "next/server"

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
    return NextResponse.json({ schedules: [] })
  }
}
