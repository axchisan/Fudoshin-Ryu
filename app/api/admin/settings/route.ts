import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET site settings
export async function GET() {
  try {
    let settings = await db.siteSettings.findFirst()

    // Si no existe, crear configuración por defecto
    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          dojo_name: "Fudoshin Ryu",
          sensei_name: "Leonardo Vanegas Martínez",
          sensei_bio: "",
          dojo_philosophy: "",
          dojo_motto: "",
          jka_affiliation: "Afiliado a Japan Karate Association (JKA)",
          phone: "",
          email: "",
          instagram_url: "",
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("[v0] Error fetching settings:", error)
    return NextResponse.json({ error: "Error al obtener configuración" }, { status: 500 })
  }
}

// PUT update site settings
export async function PUT(request: Request) {
  try {
    const body = await request.json()

    const settings = await db.siteSettings.findFirst()

    if (!settings) {
      // Crear si no existe
      const newSettings = await db.siteSettings.create({
        data: body,
      })
      return NextResponse.json({ settings: newSettings })
    }

    // Actualizar existente
    const updated = await db.siteSettings.update({
      where: { id: settings.id },
      data: body,
    })

    return NextResponse.json({ settings: updated })
  } catch (error) {
    console.error("[v0] Error updating settings:", error)
    return NextResponse.json({ error: "Error al actualizar configuración" }, { status: 500 })
  }
}
