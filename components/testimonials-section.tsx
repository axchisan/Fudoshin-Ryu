"use client"
import { Star } from "lucide-react"

interface Testimonial {
  id: string
  author: string
  belt_level: string
  content: string
  avatar?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    author: "Juan Carlos García",
    belt_level: "Cinturón Naranja",
    content:
      "Fudoshin Ryu cambió mi vida completamente. Aprendí disciplina, respeto y confianza en mí mismo. El Sensei Leonardo es un maestro excepcional.",
  },
  {
    id: "2",
    author: "María López Rodríguez",
    belt_level: "Cinturón Amarillo",
    content:
      "La mejor decisión fue unirme a este dojo. No solo aprendes karate, sino filosofía de vida. Una comunidad increíble.",
  },
  {
    id: "3",
    author: "Carlos Mendez",
    belt_level: "Cinturón Verde",
    content:
      "Con el Sensei aprendí que el verdadero poder viene del control y la disciplina. Cada clase es una lección de vida.",
  },
  {
    id: "4",
    author: "Ana Martínez",
    belt_level: "Cinturón Azul",
    content:
      "El ambiente en Fudoshin Ryu es familiar y profesional. Todos nos ayudamos a mejorar. Recomiendo este dojo sin dudarlo.",
  },
]

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
}

export function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-4">Lo que dicen nuestros alumnos</h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Testimonios de miembros de nuestra comunidad</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-900 rounded-sm border-l-4 border-red-600 p-8 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={18} className="fill-red-600 text-red-600" />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-bold">{testimonial.author}</p>
                  <p className="text-red-400 text-sm">{testimonial.belt_level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
