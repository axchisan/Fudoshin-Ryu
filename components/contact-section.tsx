"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Mail, Phone } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
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
              <div className="flex items-start gap-4">
                <Mail className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <a href="mailto:info@fudoshinryu.com" className="text-red-400 hover:text-red-300">
                    info@fudoshinryu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">Teléfono</h4>
                  <a href="tel:+573001234567" className="text-red-400 hover:text-red-300">
                    +57 (300) 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MessageCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold mb-1">WhatsApp</h4>
                  <a href="https://wa.me/573001234567" className="text-red-400 hover:text-red-300">
                    Enviar mensaje directo
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-bold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition"
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-sm border-2 border-red-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  rows={5}
                  className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                  placeholder="Tu mensaje..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition"
              >
                Enviar Mensaje
              </button>

              {submitted && (
                <div className="bg-green-900 border border-green-600 text-green-100 p-4 rounded">
                  ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/573001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition hover:shadow-red-600/50 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </section>
  )
}
