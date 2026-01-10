"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { useEffect, useState } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  createdAt: string
}

export function HomeBlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/site/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 3))
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Error loading blog posts:", err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Cargando artículos...</p>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog y Artículos</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full mb-6"></div>
          <p className="text-muted-foreground">No hay artículos disponibles aún.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog y Artículos</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full"></div>
          <p className="text-muted-foreground mt-4 text-lg">Conocimiento y sabiduría del mundo del karate</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border border-red-600/30 rounded-softer p-6 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500 flex flex-col"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <CalendarDays size={16} />
                <time>{new Date(post.createdAt).toLocaleDateString("es-ES")}</time>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="text-red-600 font-semibold hover:text-red-700 transition-all duration-500 flex items-center gap-2"
              >
                Leer más <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
          >
            Ver Todos los Artículos <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
