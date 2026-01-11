import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 600

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
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching schedules:", error)
    }
    return NextResponse.json({ schedules: [] })
  }
}
