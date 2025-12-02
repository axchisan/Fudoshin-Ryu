"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onUpload: (url: string, filename: string) => void
  maxSize?: number
  accept?: string
}

export function ImageUpload({ onUpload, maxSize = 5, accept = "image/*" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError(null)

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload file
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Upload failed")
      }

      const data = await res.json()
      onUpload(data.url, data.filename)
      setPreview(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-red-600 rounded-lg p-8 text-center cursor-pointer hover:bg-red-600/5 transition"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-red-600" size={32} />
            <p className="text-muted-foreground">Subiendo...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className="text-red-600" />
            <p className="font-bold text-foreground">Arrastra o haz clic para subir</p>
            <p className="text-sm text-muted-foreground">Máximo {maxSize}MB</p>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-red-600">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Error */}
      {error && <div className="bg-red-900/20 border border-red-600 text-red-100 p-4 rounded">{error}</div>}
    </div>
  )
}
