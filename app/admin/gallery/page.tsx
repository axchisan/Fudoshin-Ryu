"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin-layout"
import { ImageUpload } from "@/components/image-upload"
import { X, Loader2 } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  image_url: string
  description?: string
  category?: string
  published: boolean
  createdAt: string
}

export default function GalleryPage() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("Todas")

  useEffect(() => {
    fetchImages()
  }, [])

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
      const title = filename.split(".")[0]
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          image_url: url,
          category: "Clases",
          published: true,
        }),
      })

      if (!res.ok) {
        throw new Error("Error al guardar imagen")
      }

      fetchImages()
    } catch (err) {
      console.error("[v0] Error saving image:", err)
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
        <div className="bg-card border border-red-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Subir Fotos</h2>
          <ImageUpload onUpload={handleImageUpload} />
        </div>

        {/* Gallery Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Fotos en la Galería</h2>

          {images.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No hay imágenes en la galería</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((image) => (
                <div key={image.id} className="group relative bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold truncate">{image.title}</h3>
                    {image.category && <p className="text-gray-300 text-sm">{image.category}</p>}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    disabled={isDeleting === image.id}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
                  >
                    {isDeleting === image.id ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
