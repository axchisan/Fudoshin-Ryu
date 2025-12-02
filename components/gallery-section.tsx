"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  alt: string
}

const defaultGalleryImages: GalleryImage[] = [
  { id: "1", url: "/placeholder.svg?key=g1", alt: "Entrenamiento de karate" },
  { id: "2", url: "/placeholder.svg?key=g2", alt: "Práctica de katas" },
  { id: "3", url: "/placeholder.svg?key=g3", alt: "Alumnos en el dojo" },
  { id: "4", url: "/placeholder.svg?key=g4", alt: "Examen de cinturón" },
  { id: "5", url: "/placeholder.svg?key=g5", alt: "Evento especial" },
  { id: "6", url: "/placeholder.svg?key=g6", alt: "Torneo interno" },
  { id: "7", url: "/placeholder.svg?key=g7", alt: "Clase de niños" },
  { id: "8", url: "/placeholder.svg?key=g8", alt: "Ceremonia de graduación" },
]

interface GallerySectionProps {
  images?: GalleryImage[]
}

export function GallerySection({ images = defaultGalleryImages }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-16">Galería</h2>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square overflow-hidden rounded-sm border-2 border-red-600 hover:border-red-400 transition"
            >
              <Image
                src={image.url || "/placeholder.svg?key=default"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white font-bold">Ver</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-red-600 transition"
              >
                <X size={32} />
              </button>
              <div className="relative aspect-square w-full">
                <Image
                  src={selectedImage.url || "/placeholder.svg?key=default"}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-center mt-4">{selectedImage.alt}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="text-center">
          <p className="text-gray-400">{images.length} fotos de nuestras actividades en Fudoshin Ryu</p>
        </div>
      </div>
    </section>
  )
}
