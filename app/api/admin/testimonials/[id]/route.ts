import { verifyToken } from "@/lib/auth"

let testimonials: any[] = []

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  testimonials = testimonials.filter((t) => t.id !== params.id)

  return Response.json({ success: true })
}
