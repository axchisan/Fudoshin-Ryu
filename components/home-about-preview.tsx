"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HomeAboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 items-stretch"
        >
          {/* Left: Image */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="w-full aspect-square relative rounded-softer overflow-hidden border border-red-600/40 shadow-lg hover:shadow-red-600/30 transition-all duration-500">
              <Image
                src="/sensei-leonardo-vanegas-martinez-karateoka-portrai.jpg"
                alt="Sensei Leonardo Vanegas Martínez"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 flex flex-col justify-center gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              >
                Sobre Nosotros
              </motion.h2>
              <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full mb-8"></div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-3">Sensei Leonardo Vanegas Martínez</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Instructor oficial de Shotokan Karate-Do afiliado a la Japan Karate Association (JKA). Con más de 20
                años de experiencia en la enseñanza de artes marciales tradicionales, el Sensei Leonardo ha dedicado su
                vida a transmitir los valores fundamentales del karate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-foreground mb-2">Filosofía Fudoshin Ryu</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fudoshin significa "espíritu inmóvil" - la capacidad de mantener la calma y determinación. Nuestra
                escuela sigue la tradición Shotokan pura, enfocada en técnica correcta, disciplina marcial y desarrollo
                del carácter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
              >
                Leer Más <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
