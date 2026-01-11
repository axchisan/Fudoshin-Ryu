"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface SiteSettings {
  sensei_name: string
  sensei_bio: string
  sensei_image_url: string | null
  dojo_philosophy: string
}

export function HomeAboutPreview() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    fetch("/api/site/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {})
  }, [])

  if (!settings) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Cargando...</p>
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
          className="flex flex-col lg:flex-row gap-12 items-stretch"
        >
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="w-full aspect-square relative rounded-softer overflow-hidden border border-red-600/40 shadow-lg hover:shadow-red-600/30 transition-all duration-500">
              <Image
                src={settings.sensei_image_url || "/sensei-leonardo-vanegas-martinez-karateoka-portrai.jpg"}
                alt={`Sensei ${settings.sensei_name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>

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
              <h3 className="text-2xl font-bold text-red-600 mb-3">Sensei {settings.sensei_name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{settings.sensei_bio}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-foreground mb-2">Filosofía del Dojo</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">{settings.dojo_philosophy}</p>
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
