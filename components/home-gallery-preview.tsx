"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomeGalleryPreview() {
  const galleryItems = [
    {
      src: "/karate-class-training.jpg",
      title: "Clases de Entrenamiento",
      category: "Clases",
    },
    {
      src: "/karate-tournament-competition.jpg",
      title: "Torneos y Competencias",
      category: "Torneos",
    },
    {
      src: "/karate-belt-graduation.jpg",
      title: "Graduaciones y Cinturones",
      category: "Eventos",
    },
  ]

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
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-softer h-64 cursor-pointer hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500"
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-red-400 text-sm font-semibold">{item.category}</p>
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
