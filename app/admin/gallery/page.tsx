"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin-layout"
import { ImageUpload } from "@/components/image-upload"
import { X, Loader2, Edit2, Save } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  image_url: string
  thumbnail_url?: string
  description?: string
  category: string
  alt_text?: string
  tags?: string
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

const CATEGORIES = ["Clases", "Torneos", "Graduaciones", "Eventos", "General"]

export default function GalleryPage() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("Todas")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<GalleryImage>>({})

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch("/api/admin/auth/me")
      if (!authRes.ok) {
        router.push("/admin/login")
        return
      }
      fetchImages()
    } catch (err) {
      console.error("[v0] Auth error:", err)
      router.push("/admin/login")
    }
  }

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/gallery")
      if (!res.ok) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setImages(data)
    } catch (err) {
      console.error("[v0] Error fetching images:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (url: string, filename: string) => {
    try {
      const title = filename.split(".")[0].replace(/[-_]/g, " ")
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          image_url: url,
          category: "General",
          published: true,
          order: images.length,
        }),
      })

      if (!res.ok) {
        throw new Error("Error al guardar imagen")
      }

      fetchImages()
    } catch (err) {
      console.error("[v0] Error saving image:", err)
      alert("Error al guardar la imagen")
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return

    setIsDeleting(id)
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Error al eliminar imagen")
      }

      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch (err) {
      console.error("[v0] Error deleting image:", err)
      alert("Error al eliminar imagen")
    } finally {
      setIsDeleting(null)
    }
  }

  const startEditing = (image: GalleryImage) => {
    setEditingId(image.id)
    setEditData({
      title: image.title,
      description: image.description || "",
      category: image.category,
      alt_text: image.alt_text || "",
      tags: image.tags || "",
    })
  }

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })

      if (!res.ok) {
        throw new Error("Error al actualizar imagen")
      }

      setEditingId(null)
      fetchImages()
    } catch (err) {
      console.error("[v0] Error updating image:", err)
      alert("Error al actualizar la imagen")
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Galería">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="animate-spin text-red-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  const filtered = filter === "Todas" ? images : images.filter((img) => img.category === filter)

  return (
    <AdminLayout title="Galería">
      <div className="space-y-8">
        {/* Upload Section */}
        <div className="bg-card border border-red-600/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Subir Fotos</h2>
          <ImageUpload onUpload={handleImageUpload} />
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("Todas")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === "Todas"
                ? "bg-red-600 text-white"
                : "bg-card border border-border text-foreground hover:border-red-600/50"
            }`}
          >
            Todas ({images.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-red-600 text-white"
                  : "bg-card border border-border text-foreground hover:border-red-600/50"
              }`}
            >
              {cat} ({images.filter((img) => img.category === cat).length})
            </button>
          ))}
        </div>

        {/* Gallery Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Fotos en la Galería</h2>

          {images.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No hay imágenes en la galería</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image) => (
                <div key={image.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  {editingId === image.id ? (
                    <div className="p-4 space-y-3">
                      <div className="aspect-video relative mb-3">
                        <Image
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      <input
                        type="text"
                        value={editData.title || ""}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full bg-background border border-border text-foreground px-3 py-2 rounded text-sm"
                        placeholder="Título"
                      />

                      <select
                        value={editData.category || "General"}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="w-full bg-background border border-border text-foreground px-3 py-2 rounded text-sm"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>

                      <textarea
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full bg-background border border-border text-foreground px-3 py-2 rounded text-sm resize-none"
                        placeholder="Descripción"
                        rows={2}
                      />

                      <input
                        type="text"
                        value={editData.alt_text || ""}
                        onChange={(e) => setEditData({ ...editData, alt_text: e.target.value })}
                        className="w-full bg-background border border-border text-foreground px-3 py-2 rounded text-sm"
                        placeholder="Texto alternativo (accesibilidad)"
                      />

                      <input
                        type="text"
                        value={editData.tags || ""}
                        onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                        className="w-full bg-background border border-border text-foreground px-3 py-2 rounded text-sm"
                        placeholder="Etiquetas (separadas por comas)"
                      />

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => saveEdit(image.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold transition flex items-center justify-center gap-2"
                        >
                          <Save size={16} /> Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2 rounded text-sm font-semibold transition"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="group relative">
                      <div className="aspect-video relative">
                        <Image
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.alt_text || image.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="text-foreground font-bold truncate mb-1">{image.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{image.category}</p>
                        {image.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{image.description}</p>
                        )}
                        {image.tags && (
                          <div className="flex gap-1 flex-wrap mb-3">
                            {image.tags.split(",").map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(image.createdAt).toLocaleDateString("es-ES")}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => startEditing(image)}
                          className="bg-muted hover:bg-muted/80 text-foreground p-2 rounded shadow-lg"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          disabled={isDeleting === image.id}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded shadow-lg disabled:opacity-50"
                          title="Eliminar"
                        >
                          {isDeleting === image.id ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
