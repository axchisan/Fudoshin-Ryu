"use client"

import Link from "next/link"
import Image from "next/image"
import { safeFormatDate } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  featured_image?: string
  date: string
  author: string
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "El Camino del Karate - Propósito y Disciplina",
    excerpt:
      "Comprende los principios fundamentales del Shotokan Karate-Do y cómo transforman la vida de nuestros alumnos...",
    content:
      "El karate no es solo un conjunto de técnicas de lucha, sino una filosofía de vida que enseña disciplina, respeto y superación personal...",
    date: "2024-12-01",
    author: "Sensei Leonardo Vanegas",
  },
  {
    id: "2",
    title: "Historia del Shotokan - Legado de Gichin Funakoshi",
    excerpt:
      "Descubre cómo surgió el Shotokan de la mano del maestro Gichin Funakoshi y su impacto en el karate moderno...",
    content:
      "El Shotokan fue desarrollado por Gichin Funakoshi a principios del siglo XX, combinando técnicas de Okinawa con valores japoneses tradicionales...",
    date: "2024-11-25",
    author: "Sensei Leonardo Vanegas",
  },
  {
    id: "3",
    title: "Preparación para Exámen de Cinturón",
    excerpt: "Consejos prácticos para prepararte exitosamente para tu próximo examen de cinturón en Fudoshin Ryu...",
    content:
      "Un examen de cinturón es una oportunidad para demostrar tu progreso técnico y tu crecimiento como karateoka...",
    date: "2024-11-15",
    author: "Sensei Leonardo Vanegas",
  },
]

interface BlogSectionProps {
  posts?: BlogPost[]
}

export function BlogSection({ posts = defaultBlogPosts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-black mb-4">Blog • Noticias</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Artículos sobre karate, filosofía marcial y vida en el dojo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-black rounded-sm border-2 border-red-600 overflow-hidden hover:shadow-lg hover:shadow-red-600/30 transition"
            >
              {/* Featured Image */}
              <div className="relative w-full h-48 bg-gray-900">
                <Image
                  src={post.featured_image || "/placeholder.svg?key=blog"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-red-600 text-sm font-bold mb-2">
                  {safeFormatDate(post.date, "es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) || "Fecha no disponible"}
                </p>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <p className="text-gray-500 text-xs mb-4">{post.author}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-block px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition text-sm"
                >
                  Leer Más
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
