import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        read: false,
        replied: false,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
