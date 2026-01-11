import { writeFile, mkdir, unlink, access } from "fs/promises"
import path from "path"
import { randomBytes } from "crypto"
import { constants } from "fs"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
    await access(UPLOAD_DIR, constants.W_OK)
  } catch (error) {
    console.error("Error creating/accessing upload directory:", error)
    throw new Error("Upload directory is not accessible or writable")
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
    // Ensure upload directory exists and is writable
    await ensureUploadDir()

    // Generate unique filename
    const ext = file.name.split(".").pop()
    const filename = `${randomBytes(16).toString("hex")}.${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes), { mode: 0o644 })

    return {
      filename,
      url: `/uploads/${filename}`,
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("EACCES")) {
        console.error("Permission denied writing to upload directory:", UPLOAD_DIR)
        throw new Error("No se tienen permisos para guardar archivos. Contacta al administrador.")
      }
      if (error.message.includes("ENOSPC")) {
        console.error("No space left on device")
        throw new Error("No hay espacio disponible en el servidor")
      }
    }
    console.error("File upload error:", error)
    throw new Error("Error al subir archivo")
  }
}

export async function deleteFile(filename: string): Promise<void> {
  if (!filename) {
    return
  }

  try {
    const filepath = path.join(UPLOAD_DIR, filename)

    // Security check: ensure file is in upload directory
    if (!filepath.startsWith(UPLOAD_DIR)) {
      throw new Error("Invalid file path")
    }

    try {
      await access(filepath, constants.F_OK)
    } catch {
      // File doesn't exist, that's ok
      return
    }

    await unlink(filepath)
  } catch (error) {
    if (error instanceof Error && !error.message.includes("ENOENT")) {
      console.error("Error deleting file:", error)
    }
    // Don't throw - deletion is not critical
  }
}
