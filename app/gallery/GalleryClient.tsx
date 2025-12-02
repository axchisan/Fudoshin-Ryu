"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { X } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    title: "Clases en Vélez",
    category: "Clases",
    image: "/karate-class-training.jpg",
  },
  {
    id: 2,
    title: "Torneo Regional",
    category: "Torneos",
    image: "/karate-tournament-competition.jpg",
  },
  {
    id: 3,
    title: "Graduación",
    category: "Graduaciones",
    image: "/karate-belt-graduation.jpg",
  },
  {
    id: 4,
    title: "Evento Comunitario",
    category: "Eventos",
    image: "/karate-community-event.jpg",
  },
  {
    id: 5,
    title: "Kata en Barbosa",
    category: "Clases",
    image: "/karate-kata-technique.jpg",
  },
  {
    id: 6,
    title: "Demostración Avanzada",
    category: "Eventos",
    image: "/karate-demonstration.jpg",
  },
]

export function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)
  const [filter, setFilter] = useState("Todas")

  const categories = ["Todas", "Clases", "Torneos", "Graduaciones", "Eventos"]
  const filtered = filter === "Todas" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-6xl font-bold mb-8">Galería</h1>

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image) => (
                <ScrollReveal key={image.id}>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="group cursor-pointer overflow-hidden rounded-lg"
                  >
                    <div className="relative aspect-square bg-card">
                      <Image
                        src={image.image || "/placeholder.svg"}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                        <div>
                          <p className="text-white font-bold">{image.title}</p>
                          <p className="text-gray-300 text-sm">{image.category}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
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
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={32} />
          </button>
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
