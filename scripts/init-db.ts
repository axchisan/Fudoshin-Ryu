// scripts/init-db.ts
import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

// Helper para hashear contraseña (mismo método que usas en login)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
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
      console.log("[seed] Esto es normal en entornos ya inicializados o si prefieres crear el admin manualmente.")
    } else {
      const hashed = hashPassword(password)

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

  // 2. Crear configuraciones del sitio (solo si no existen)
  const settings = await prisma.siteSettings.findFirst()
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        dojo_name: "Fudoshin Ryu",
        sensei_name: "Leonardo Vanegas Martínez",
        phone: "+57 300 123 4567",
        email: process.env.ADMIN_EMAIL || "contacto@fudoshinryu.com",
        instagram_url: "https://instagram.com/fudoshinryu",
      },
    })
    console.log("[seed] Configuración del sitio creada")
  }

  // 3. Crear sedes (solo si no existen)
  const locations = await prisma.location.findMany()
  if (locations.length === 0) {
    await prisma.location.createMany({
      data: [
        {
          name: "Vélez",
          address: "Vélez, Santander, Colombia",
          is_main: true,
        },
        {
          name: "Barbosa",
          address: "Barbosa, Santander, Colombia",
        },
        {
          name: "Guavatá",
          address: "Guavatá, Santander, Colombia",
        },
      ],
    })
    console.log("[seed] Sedes creadas: Vélez (principal), Barbosa, Guavatá")
  }

  console.log("[seed] Seed completado con éxito!")
}

main()
  .catch((e) => {
    console.error("[seed] Error en seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
