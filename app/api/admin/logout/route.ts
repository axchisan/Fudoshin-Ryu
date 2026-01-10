import { db } from "@/lib/db"
import { verifyToken } from "@/lib/jwt"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value

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

    const response = NextResponse.json({ success: true })
    response.cookies.delete("adminToken")

    return response
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 })
  }
}
