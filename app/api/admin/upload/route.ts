import { uploadFile } from "@/lib/file-upload"
import { getAdminSession } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const { filename, url } = await uploadFile(file)

    return NextResponse.json({ filename, url, success: true })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    const message = error instanceof Error ? error.message : "Error al subir archivo"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
