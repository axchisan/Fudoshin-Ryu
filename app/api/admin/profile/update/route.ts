import { db } from "@/lib/db"
import { getAdminSession } from "@/lib/auth-helpers"
import { verifyPassword, hashPassword } from "@/lib/password"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { name, email, currentPassword, newPassword } = await request.json()

    const admin = await db.admin.findUnique({
      where: { id: session.adminId },
    })

    if (!admin) {
      return NextResponse.json({ error: "Admin no encontrado" }, { status: 404 })
    }

    // If trying to change password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Debes ingresar tu contraseña actual" }, { status: 400 })
      }

      const passwordMatch = await verifyPassword(currentPassword, admin.password)
      if (!passwordMatch) {
        return NextResponse.json({ error: "Contraseña actual incorrecta" }, { status: 401 })
      }
    }

    // Update admin
    const hashedPassword = newPassword ? await hashPassword(newPassword) : admin.password

    const updated = await db.admin.update({
      where: { id: session.adminId },
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return NextResponse.json({ admin: updated, message: "Perfil actualizado correctamente" })
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
  }
}
