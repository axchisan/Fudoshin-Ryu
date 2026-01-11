"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Testimonial {
  id: string
  name: string
  level: string
  content: string
  rating: number
  image_url?: string
  response?: string
}

export function HomeTestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/site/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.slice(0, 4))
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Cargando testimonios...</p>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Lo que dicen nuestros alumnos</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full"></div>
          <p className="text-muted-foreground mt-4 text-lg">Testimonios de miembros de nuestra comunidad</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border-l-4 border-red-600 rounded-lg p-6 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} className="fill-red-600 text-red-600" />
                  ))}
              </div>

              <p className="text-foreground text-lg mb-4 leading-relaxed italic">{testimonial.content}</p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-foreground font-bold">{testimonial.name}</p>
                  <p className="text-red-600 text-sm">{testimonial.level}</p>
                </div>
              </div>

              {testimonial.response && (
                <div className="mt-4 p-4 bg-red-600/10 rounded-lg border border-red-600/30">
                  <p className="text-xs text-red-600 font-semibold mb-1">Respuesta del Sensei:</p>
                  <p className="text-foreground text-sm">{testimonial.response}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
