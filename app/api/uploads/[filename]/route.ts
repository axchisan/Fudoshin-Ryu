import { NextResponse } from "next/server"
import { readFile, access } from "fs/promises"
import { constants } from "fs"
import path from "path"

const FALLBACK_UPLOAD_DIR = "/tmp/uploads"

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params

    // Security: only allow alphanumeric, dash, underscore, and dot
    if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 })
    }

    const filepath = path.join(FALLBACK_UPLOAD_DIR, filename)

    // Security check: ensure file is in upload directory
    if (!filepath.startsWith(FALLBACK_UPLOAD_DIR)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 })
    }

    // Check if file exists
    try {
      await access(filepath, constants.F_OK)
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const file = await readFile(filepath)

    // Determine content type from extension
    const ext = filename.split(".").pop()?.toLowerCase()
    const contentTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    }

    const contentType = contentTypes[ext || ""] || "application/octet-stream"

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[v0] Error serving file:", error)
    return NextResponse.json({ error: "Error serving file" }, { status: 500 })
  }
}
