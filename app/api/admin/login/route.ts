import { db } from "@/lib/db"
import { verifyPassword } from "@/lib/password"
import { createToken } from "@/lib/jwt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    // Find admin in database
    const admin = await db.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await verifyPassword(password, admin.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken({
      adminId: admin.id,
      email: admin.email,
    })

    // Save session to database
    await db.adminSession.create({
      data: {
        adminId: admin.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })

    return NextResponse.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error al procesar solicitud" }, { status: 500 })
  }
}
