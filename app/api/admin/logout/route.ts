import { db } from "@/lib/db"
import { verifyToken } from "@/lib/jwt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token no proporcionado" }, { status: 401 })
    }

    // Verify and delete session
    const payload = await verifyToken(token)
    if (payload) {
      await db.adminSession.deleteMany({
        where: { token },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 })
  }
}
