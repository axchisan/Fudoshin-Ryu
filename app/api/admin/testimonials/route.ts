import { verifyToken } from "@/lib/auth"

const testimonials: any[] = [
  {
    id: "1",
    author: "Juan Pérez",
    belt_level: "Cinturón Naranja",
    content: "Excelente experiencia en Fudoshin Ryu...",
  },
]

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  return Response.json(testimonials)
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const testimonial = await request.json()
  testimonial.id = Date.now().toString()
  testimonials.push(testimonial)

  return Response.json({ success: true })
}

export async function PUT(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token || !verifyToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const testimonial = await request.json()
  const index = testimonials.findIndex((t) => t.id === testimonial.id)

  if (index !== -1) {
    testimonials[index] = testimonial
  }

  return Response.json({ success: true })
}
