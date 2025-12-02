import { verifyToken } from "@/lib/auth"

let siteContent = {
  biography: "Instructor oficial de Shotokan Karate-Do afiliado a la Japan Karate Association (JKA)...",
  philosophy: 'Fudoshin significa "espíritu inmóvil"...',
  lineage: "Afiliados a la Shotokan Karate-Do Colombia (SKD)...",
}

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json(siteContent)
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  siteContent = { ...siteContent, ...data }

  return Response.json({ success: true })
}
