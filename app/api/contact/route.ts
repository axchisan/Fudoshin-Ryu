export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()

  // In a real app, save to database
  console.log("Contact message:", { name, email, phone, message })

  return Response.json({ success: true })
}
