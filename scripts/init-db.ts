import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function main() {
  console.log("[seed] Iniciando seed de base de datos...")

  // 1. Crear admin solo si NO existe ninguno y se proporcionan las variables
  const adminCount = await prisma.admin.count()

  if (adminCount === 0) {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
      console.log("[seed] No se encontraron ADMIN_EMAIL y/o ADMIN_PASSWORD → no se crea admin por defecto.")
      console.log("[seed] El admin debe ser creado manualmente.")
    } else {
      const hashed = await hashPassword(password)

      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashed,
          name: "Administrador Principal",
        },
      })

      console.log(`[seed] Admin creado exitosamente: ${admin.email}`)
    }
  } else {
    console.log(`[seed] Ya existen ${adminCount} admin(s). Saltando creación.`)
  }

  const settings = await prisma.siteSettings.findFirst()
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        dojo_name: "Fudoshin Ryu",
        sensei_name: "Leonardo Vanegas Martínez",
        sensei_bio: "",
        dojo_philosophy: "",
        dojo_motto: "",
        jka_affiliation: "Afiliado a Japan Karate Association (JKA)",
        phone: "",
        email: process.env.ADMIN_EMAIL || "",
        instagram_url: "",
      },
    })
    console.log("[seed] Configuración del sitio creada (datos mínimos)")
  }

  console.log(
    "[seed] Seed completado. El sensei debe agregar ubicaciones, horarios, blog, galería desde el panel admin.",
  )
}

main()
  .catch((e) => {
    console.error("[seed] Error en seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
