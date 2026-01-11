"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface GalleryImage {
  id: string
  title: string
  image_url: string
  category: string | null
  alt_text: string | null
}

export function HomeGalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/site/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages((data.images || []).slice(0, 6))
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Cargando galería...</p>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Galería</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full mb-6"></div>
          <p className="text-muted-foreground">No hay imágenes disponibles aún.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Galería</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full"></div>
          <p className="text-muted-foreground mt-4 text-lg">Momentos destacados de nuestro dojo</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {images.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-softer h-64 cursor-pointer hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500"
            >
              <Image
                src={item.image_url || "/placeholder.svg?height=400&width=400"}
                alt={item.alt_text || item.title}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                {item.category && <p className="text-red-400 text-sm font-semibold">{item.category}</p>}
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
          >
            Ver Galería Completa <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
