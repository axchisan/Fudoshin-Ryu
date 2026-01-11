import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const revalidate = 600

export async function GET() {
  try {
    let settings = await db.siteSettings.findFirst()

    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          sensei_name: "Leonardo Vanegas Martínez",
          sensei_bio: "Instructor oficial de Shotokan Karate-Do afiliado a la Japan Karate Association (JKA).",
          dojo_name: "Fudoshin Ryu",
          dojo_philosophy: "Fudoshin significa espíritu inmóvil - la capacidad de mantener la calma y determinación.",
          dojo_motto: "Fuerza • Honor • Disciplina",
          jka_affiliation: "Afiliado a Japan Karate Association (JKA)",
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching site settings:", error)
    }
    return NextResponse.json({ error: "Error al obtener configuración" }, { status: 500 })
  }
}
