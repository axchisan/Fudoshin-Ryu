import { verifyToken } from "@/lib/auth"

const blogPosts: any[] = [
  {
    id: "1",
    title: "Bienvenido a Fudoshin Ryu",
    excerpt: "Conoce nuestra escuela de Shotokan Karate-Do",
    content: "Contenido del primer post...",
  },
]

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json(blogPosts)
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await request.json()
  post.id = Date.now().toString()
  blogPosts.push(post)

  return Response.json({ success: true })
}

export async function PUT(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const post = await request.json()
  const index = blogPosts.findIndex((p) => p.id === post.id)

  if (index !== -1) {
    blogPosts[index] = post
  }

  return Response.json({ success: true })
}
