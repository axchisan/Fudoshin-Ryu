import { writeFile, mkdir, unlink, access } from "fs/promises"
import path from "path"
import { randomBytes } from "crypto"
import { constants } from "fs"

const PRIMARY_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const FALLBACK_UPLOAD_DIR = "/tmp/uploads"
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

let UPLOAD_DIR = PRIMARY_UPLOAD_DIR

async function getWritableUploadDir(): Promise<string> {
  // Try primary directory first
  try {
    await mkdir(PRIMARY_UPLOAD_DIR, { recursive: true })
    await access(PRIMARY_UPLOAD_DIR, constants.W_OK)
    UPLOAD_DIR = PRIMARY_UPLOAD_DIR
    return PRIMARY_UPLOAD_DIR
  } catch {
    // Primary not writable, try fallback
    console.log("[v0] Primary upload dir not writable, using fallback:", FALLBACK_UPLOAD_DIR)
  }

  // Try fallback directory
  try {
    await mkdir(FALLBACK_UPLOAD_DIR, { recursive: true })
    await access(FALLBACK_UPLOAD_DIR, constants.W_OK)
    UPLOAD_DIR = FALLBACK_UPLOAD_DIR
    return FALLBACK_UPLOAD_DIR
  } catch (error) {
    console.error("[v0] Fallback upload dir not writable:", error)
    throw new Error("No se puede acceder al directorio de uploads")
  }
}

export async function ensureUploadDir() {
  try {
    const dir = await getWritableUploadDir()
    console.log("[v0] Using upload directory:", dir)
    return dir
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
    const uploadDir = await ensureUploadDir()

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const filename = `${randomBytes(16).toString("hex")}.${ext}`
    const filepath = path.join(uploadDir, filename)

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes), { mode: 0o644 })

    // Return URL based on which directory was used
    const url = uploadDir === PRIMARY_UPLOAD_DIR ? `/uploads/${filename}` : `/api/uploads/${filename}`

    return { filename, url }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("EACCES")) {
        console.error("[v0] Permission denied writing to upload directory")
        throw new Error("No se tienen permisos para guardar archivos. Contacta al administrador.")
      }
      if (error.message.includes("ENOSPC")) {
        console.error("[v0] No space left on device")
        throw new Error("No hay espacio disponible en el servidor")
      }
      // Re-throw if already a user-friendly message
      if (error.message.startsWith("No se") || error.message.startsWith("Solo se")) {
        throw error
      }
    }
    console.error("[v0] File upload error:", error)
    throw new Error("Error al subir archivo")
  }
}

export async function deleteFile(filename: string): Promise<void> {
  if (!filename) {
    return
  }

  // Try both directories
  const dirsToTry = [PRIMARY_UPLOAD_DIR, FALLBACK_UPLOAD_DIR]

  for (const dir of dirsToTry) {
    try {
      const filepath = path.join(dir, filename)

      // Security check: ensure file is in upload directory
      if (!filepath.startsWith(dir)) {
        continue
      }

      try {
        await access(filepath, constants.F_OK)
        await unlink(filepath)
        console.log("[v0] Deleted file:", filepath)
        return
      } catch {
        // File doesn't exist in this directory, try next
        continue
      }
    } catch (error) {
      // Continue to next directory
      continue
    }
  }

  // File not found in any directory, that's ok
  console.log("[v0] File not found for deletion:", filename)
}

// Get the current upload directory for serving files
export function getUploadDir(): string {
  return UPLOAD_DIR
}
