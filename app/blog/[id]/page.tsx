"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

const allPosts = [
  {
    id: "1",
    title: "El Camino del Karate - Propósito y Disciplina",
    excerpt: "Comprende los principios fundamentales del Shotokan Karate-Do...",
    content: `El karate no es solo un conjunto de técnicas de lucha, sino una filosofía de vida que enseña disciplina, respeto y superación personal.

En Fudoshin Ryu, creemos que cada alumno tiene el potencial para transformar su vida a través de la práctica del Shotokan Karate-Do. La disciplina que aprendes en el tatami (colchoneta del dojo) se extiende a todas las áreas de tu vida.

El verdadero karate comienza cuando entiendes que el enemigo no está afuera, sino dentro de ti. La práctica consistente, el respeto por el maestro y los compañeros, y la dedicación a mejorar cada día son los pilares de nuestro entrenamiento.

Bajo la guía del Sensei Leonardo, cada alumno es guiado en su propio camino, respetando su ritmo y celebrando sus avances, sin importar cuán pequeños sean.`,
    date: "2024-12-01",
    author: "Sensei Leonardo Vanegas",
  },
  {
    id: "2",
    title: "Historia del Shotokan - Legado de Gichin Funakoshi",
    excerpt: "Descubre cómo surgió el Shotokan...",
    content: `El Shotokan fue desarrollado por Gichin Funakoshi a principios del siglo XX, combinando técnicas de Okinawa con valores japoneses tradicionales.

Gichin Funakoshi (1868-1957) es conocido como el padre del karate moderno. Pasó su vida perfeccionando y difundiendo el karate, llevándolo de Okinawa a Japón y, eventualmente, al mundo entero.

El término "Shotokan" se refiere a la escuela de karate de Funakoshi. "Shoto" era el seudónimo poético de Funakoshi, y "kan" significa casa o escuela. El estilo se caracteriza por sus posturas firmes, movimientos lineales y énfasis en la técnica poderosa.

En Fudoshin Ryu, mantenemos viva la tradición Shotokan pura, honrando el legado de Funakoshi y los maestros que vinieron después. Cada kata, cada técnica, cada principio que enseñamos está fundamentado en esta tradición milenaria.`,
    date: "2024-11-25",
    author: "Sensei Leonardo Vanegas",
  },
  {
    id: "3",
    title: "Preparación para Exámen de Cinturón",
    excerpt: "Consejos prácticos para prepararte...",
    content: `Un examen de cinturón es una oportunidad para demostrar tu progreso técnico y tu crecimiento como karateoka. No es solo una prueba de habilidad física, sino de mentalidad, dedicación y espíritu.

Para prepararte exitosamente, debes:

1. **Dominar tus katas**: Practica las secuencias de movimientos asignadas para tu nivel. La precisión y la fluidez son clave.

2. **Perfeccionar tus técnicas**: Trabaja en kumite (combate) y las técnicas específicas requeridas. Calidad sobre cantidad.

3. **Fortalecer tu mente**: La confianza viene de la preparación. Visualiza tu éxito y confía en tu entrenamiento.

4. **Mantener la disciplina**: Asiste consistentemente a las clases. El entrenamiento regular es más valioso que las sesiones ocasionales intensas.

5. **Respetar el proceso**: Cada cinturón representa un paso en tu camino. No es sobre llegar rápido, sino sobre llegar bien preparado.

En Fudoshin Ryu, el Sensei te guiará paso a paso en tu preparación, asegurándose de que estés listo no solo técnicamente, sino también mentalmente para avanzar.`,
    date: "2024-11-15",
    author: "Sensei Leonardo Vanegas",
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const post = allPosts.find((p) => p.id === params.id)

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Post no encontrado</h1>
            <Link href="/#blog" className="text-red-600 hover:text-red-400">
              Volver al blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Header */}
        <section className="bg-black py-12 border-b border-red-600">
          <div className="container mx-auto px-4">
            <Link href="/#blog" className="flex items-center gap-2 text-red-600 hover:text-red-400 mb-6 font-semibold">
              <ArrowLeft size={20} />
              Volver al Blog
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-gray-400">
              <span>
                {new Date(post.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>Por {post.author}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="bg-black">
          <div className="container mx-auto px-4 py-8">
            <div className="relative w-full aspect-video rounded-sm overflow-hidden border-2 border-red-600">
              <Image src="/placeholder.svg?key=blog-featured" alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <div key={idx}>
                  {paragraph.startsWith("1.") ||
                  paragraph.startsWith("2.") ||
                  paragraph.startsWith("3.") ||
                  paragraph.startsWith("4.") ||
                  paragraph.startsWith("5.") ? (
                    <div className="ml-4 mb-4">
                      <p className="text-gray-800 leading-relaxed">{paragraph}</p>
                    </div>
                  ) : (
                    <p className="text-gray-800 leading-relaxed mb-6">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Author Bio */}
            <div className="mt-16 pt-8 border-t-2 border-red-600">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">L</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">{post.author}</h3>
                  <p className="text-gray-600">Sensei y fundador de Fudoshin Ryu, afiliado a JKA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Más artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="bg-gray-900 rounded-sm border-2 border-red-600 p-6 hover:bg-red-600 transition group"
                  >
                    <p className="text-red-400 group-hover:text-white text-sm font-bold mb-2">
                      {new Date(relatedPost.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-black mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-black text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
