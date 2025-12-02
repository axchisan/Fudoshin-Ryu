import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { randomBytes } from "crypto"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {
    console.error("[v0] Error creating upload directory:", error)
  }
}

export async function uploadFile(file: File): Promise<{ filename: string; url: string }> {
  // Validate file
  if (!file) {
    throw new Error("No file provided")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB limit")
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)")
  }

  try {
    // Ensure upload directory exists
    await ensureUploadDir()

    // Generate unique filename
    const ext = file.name.split(".").pop()
    const filename = `${randomBytes(16).toString("hex")}.${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    return {
      filename,
      url: `/uploads/${filename}`,
    }
  } catch (error) {
    console.error("[v0] File upload error:", error)
    throw new Error("Error al subir archivo")
  }
}

export async function deleteFile(filename: string): Promise<void> {
  try {
    const filepath = path.join(UPLOAD_DIR, filename)
    // Security check: ensure file is in upload directory
    if (!filepath.startsWith(UPLOAD_DIR)) {
      throw new Error("Invalid file path")
    }

    const { unlink } = await import("fs/promises")
    await unlink(filepath)
  } catch (error) {
    console.error("[v0] File delete error:", error)
    throw new Error("Error al eliminar archivo")
  }
}
