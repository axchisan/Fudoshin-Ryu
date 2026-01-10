"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, Mail, Phone } from "lucide-react"
import { BackButton } from "@/components/back-button"

interface SiteSettings {
  phone?: string
  whatsapp?: string
  email?: string
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
}

export function ContactSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/site/settings")
      const data = await res.json()
      setSettings(data.settings)
    } catch (error) {
      console.error("[v0] Error fetching settings:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-black py-4 px-4 border-b border-red-600">
        <div className="container mx-auto px-4">
          <BackButton href="/" label="← Volver al Inicio" />
        </div>
      </div>

      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-16">Contacto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Ponte en Contacto</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Contáctanos para información sobre clases, niveles, cuotas y más detalles sobre Fudoshin Ryu.
                </p>
              </div>

              <div className="space-y-6">
                {settings?.email && (
                  <div className="flex items-start gap-4">
                    <Mail className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="text-white font-bold mb-1">Email</h4>
                      <a href={`mailto:${settings.email}`} className="text-red-400 hover:text-red-300">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.phone && (
                  <div className="flex items-start gap-4">
                    <Phone className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="text-white font-bold mb-1">Teléfono</h4>
                      <a href={`tel:${settings.phone}`} className="text-red-400 hover:text-red-300">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.whatsapp && (
                  <div className="flex items-start gap-4">
                    <MessageCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="text-white font-bold mb-1">WhatsApp</h4>
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300"
                      >
                        Enviar mensaje directo
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {(settings?.facebook_url || settings?.instagram_url || settings?.youtube_url) && (
                <div>
                  <h4 className="text-white font-bold mb-4">Síguenos</h4>
                  <div className="flex gap-4">
                    {settings?.facebook_url && (
                      <a
                        href={settings.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition"
                        aria-label="Facebook"
                      >
                        F
                      </a>
                    )}
                    {settings?.instagram_url && (
                      <a
                        href={settings.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition"
                        aria-label="Instagram"
                      >
                        I
                      </a>
                    )}
                    {settings?.youtube_url && (
                      <a
                        href={settings.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition"
                        aria-label="YouTube"
                      >
                        Y
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900 p-8 rounded-lg border-2 border-red-600">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                    placeholder="+57 (300) 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none disabled:opacity-50"
                    placeholder="Tu mensaje..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>

                {submitted && (
                  <div className="bg-green-900 border border-green-600 text-green-100 p-4 rounded-lg">
                    ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* WhatsApp Floating Button */}
        {settings?.whatsapp && (
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition hover:shadow-red-600/50 hover:shadow-xl"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={24} />
          </a>
        )}
      </section>
    </>
  )
}
