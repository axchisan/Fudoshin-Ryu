import { verifyToken } from "@/lib/auth"

const contactMessages: any[] = []

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json(contactMessages)
}

export async function POST(request: Request) {
  const message = await request.json()
  message.id = Date.now().toString()
  message.created_at = new Date()
  message.read = false
  contactMessages.push(message)

  return Response.json({ success: true })
}
