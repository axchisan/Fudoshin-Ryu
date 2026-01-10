"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { X, Loader2 } from "lucide-react"
import { BackButton } from "@/components/back-button"

interface GalleryImage {
  id: string
  title: string
  category: string
  image_url: string
  description: string | null
}

export function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [filter, setFilter] = useState("Todas")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/site/gallery")
      const data = await res.json()
      setImages(data.images || [])
    } catch (error) {
      console.error("[v0] Error fetching gallery images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Extract unique categories from images
  const categories = ["Todas", ...Array.from(new Set(images.map((img) => img.category)))]
  const filtered = filter === "Todas" ? images : images.filter((img) => img.category === filter)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-4 px-4 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <BackButton href="/" label="← Volver al Inicio" />
          </div>
        </section>

        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-6xl font-bold mb-8">Galería</h1>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={48} className="animate-spin text-red-600" />
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No hay imágenes disponibles en este momento</p>
              </div>
            ) : (
              <>
                {/* Filters */}
                <div className="flex gap-4 mb-12 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2 rounded font-bold transition ${
                        filter === cat
                          ? "bg-red-600 text-white"
                          : "bg-card border border-red-600 text-foreground hover:bg-red-600/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <p className="text-muted-foreground">No hay imágenes en esta categoría</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((image) => (
                      <ScrollReveal key={image.id}>
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="group cursor-pointer overflow-hidden rounded-lg"
                        >
                          <div className="relative aspect-square bg-card">
                            <Image
                              src={image.image_url || "/placeholder.svg"}
                              alt={image.title}
                              fill
                              className="object-cover group-hover:scale-110 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                              <div>
                                <p className="text-white font-bold">{image.title}</p>
                                <p className="text-gray-300 text-sm">{image.category}</p>
                                {image.description && (
                                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{image.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-4xl">
            <div className="relative w-full aspect-square mb-4">
              <Image
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-2">{selectedImage.category}</p>
              {selectedImage.description && <p className="text-gray-400 text-sm">{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
