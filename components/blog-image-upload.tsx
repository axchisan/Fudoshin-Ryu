"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Loader2, LinkIcon } from "lucide-react"
import Image from "next/image"

interface BlogImageUploadProps {
  currentImageUrl?: string
  onImageChange: (url: string) => void
  maxSize?: number
}

export function BlogImageUpload({ currentImageUrl, onImageChange, maxSize = 5 }: BlogImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useUrl, setUseUrl] = useState(false)
  const [manualUrl, setManualUrl] = useState(currentImageUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError(null)

    if (file.size > maxSize * 1024 * 1024) {
      setError(`El archivo excede ${maxSize}MB`)
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

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
        throw new Error(data.error || "Error al subir")
      }

      const data = await res.json()
      onImageChange(data.url)
      setPreview(data.url)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al subir"
      setError(message)
      setPreview(null)
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

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualUrl) {
      onImageChange(manualUrl)
      setPreview(manualUrl)
      setError(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`flex-1 py-2 px-4 rounded font-semibold transition ${
            !useUrl ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Upload className="inline mr-2" size={16} />
          Subir Archivo
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`flex-1 py-2 px-4 rounded font-semibold transition ${
            useUrl ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <LinkIcon className="inline mr-2" size={16} />
          URL Externa
        </button>
      </div>

      {useUrl ? (
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div>
            <label className="block text-foreground font-semibold mb-2">URL de la imagen</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="flex-1 bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Aplicar
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
          onClick={() => !isLoading && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-red-600 rounded-lg p-8 text-center cursor-pointer hover:bg-red-600/5 transition"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
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
      )}

      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-red-600">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null)
              onImageChange("")
              setManualUrl("")
            }}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <div className="bg-red-900/20 border border-red-600 text-red-100 p-4 rounded">{error}</div>}
    </div>
  )
}
