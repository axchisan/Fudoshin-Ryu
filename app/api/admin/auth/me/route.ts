import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const admin = await db.admin.findUnique({
      where: { id: session.adminId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    if (!admin) {
      return NextResponse.json({ error: "Admin no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ admin })
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    return NextResponse.json({ error: "Error al verificar sesión" }, { status: 500 })
  }
}
