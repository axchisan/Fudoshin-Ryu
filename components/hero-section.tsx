"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ToriiGate } from "./torii-gate"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center pt-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96">
          <ToriiGate />
        </div>
      </div>

      {/* Background accent lines - Japanese minimalist aesthetic */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-full bg-red-600"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-red-600"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo Principal - with animation */}
          <motion.div
            className="w-32 h-32 md:w-48 md:h-48 relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" priority />
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fudoshin Ryu
          </motion.h1>

          {/* Subtítulo */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light">Escuela de Artes Marciales</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Shotokan Karate-Do Tradicional JKA • Vélez, Santander • Sensei Leonardo Vanegas Martínez
            </p>
          </motion.div>

          {/* Lema */}
          <motion.div
            className="my-8 py-8 border-t border-b border-red-600/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-3xl md:text-5xl font-bold text-red-600 tracking-wider">Fuerza • Honor • Disciplina</p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all duration-500 shadow-lg hover:shadow-red-600/50 active:scale-95"
            >
              Únete al Dojo
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-red-600 text-red-600 font-bold text-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 active:scale-95"
            >
              Contacto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
