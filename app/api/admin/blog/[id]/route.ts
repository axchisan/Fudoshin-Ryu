import { verifyToken } from "@/lib/auth"

let blogPosts: any[] = [
  {
    id: "1",
    title: "Bienvenido a Fudoshin Ryu",
    excerpt: "Conoce nuestra escuela",
    content: "Contenido...",
  },
]

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  blogPosts = blogPosts.filter((p) => p.id !== id)

  return Response.json({ success: true })
}
