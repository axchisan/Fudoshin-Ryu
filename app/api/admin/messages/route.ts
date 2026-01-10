import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-helpers"

export async function GET(request: Request) {
  try {
    const session = await getAdminSession(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("[v0] Error fetching messages:", error)
    return NextResponse.json({ messages: [] })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, read, replied } = await request.json()

    await db.contactMessage.update({
      where: { id },
      data: { read, replied },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
