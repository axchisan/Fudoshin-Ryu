import { verifyToken } from "@/lib/auth"

let contactMessages: any[] = []

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  contactMessages = contactMessages.filter((m) => m.id !== id)

  return Response.json({ success: true })
}
