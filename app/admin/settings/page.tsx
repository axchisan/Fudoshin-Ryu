"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Loader2, Save, User, Building2, Phone, Instagram, Upload } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"

interface SiteSettings {
  sensei_name: string
  sensei_bio: string
  sensei_image_url?: string
  dojo_name: string
  dojo_philosophy: string
  dojo_motto: string
  jka_affiliation: string
  phone?: string
  whatsapp?: string
  email?: string
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings")
      const data = await res.json()
      setSettings(data.settings)
    } catch (error) {
      console.error("[v0] Error fetching settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setSuccessMessage("Configuración guardada exitosamente")
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-red-600" />
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Configuración del Sitio" subtitle="Administra la información del dojo y del sensei" />

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {successMessage && (
            <div className="mb-6 bg-green-900/20 border border-green-600 text-green-100 p-4 rounded-lg">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-8">
            {/* Información del Sensei */}
            <div className="bg-card border border-red-600/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <User size={24} className="text-red-600" />
                <h2 className="text-2xl font-bold text-foreground">Información del Sensei</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground font-bold mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={settings.sensei_name}
                    onChange={(e) => handleChange("sensei_name", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Leonardo Vanegas Martínez"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Biografía</label>
                  <textarea
                    value={settings.sensei_bio}
                    onChange={(e) => handleChange("sensei_bio", e.target.value)}
                    rows={6}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Escribe sobre tu experiencia, logros y filosofía..."
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">
                    <Upload size={16} className="inline mr-2" />
                    URL de la foto del sensei
                  </label>
                  <input
                    type="url"
                    value={settings.sensei_image_url || ""}
                    onChange={(e) => handleChange("sensei_image_url", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="https://example.com/sensei-photo.jpg"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Esta foto se mostrará en la página principal del sitio
                  </p>
                </div>
              </div>
            </div>

            {/* Información del Dojo */}
            <div className="bg-card border border-red-600/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 size={24} className="text-red-600" />
                <h2 className="text-2xl font-bold text-foreground">Información del Dojo</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground font-bold mb-2">Nombre del Dojo</label>
                  <input
                    type="text"
                    value={settings.dojo_name}
                    onChange={(e) => handleChange("dojo_name", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Fudoshin Ryu"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Filosofía</label>
                  <textarea
                    value={settings.dojo_philosophy}
                    onChange={(e) => handleChange("dojo_philosophy", e.target.value)}
                    rows={4}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Describe la filosofía y valores del dojo..."
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Lema del Dojo</label>
                  <input
                    type="text"
                    value={settings.dojo_motto}
                    onChange={(e) => handleChange("dojo_motto", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Fuerza • Honor • Disciplina"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Afiliación JKA</label>
                  <input
                    type="text"
                    value={settings.jka_affiliation}
                    onChange={(e) => handleChange("jka_affiliation", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Afiliado a Japan Karate Association (JKA)"
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-card border border-red-600/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Phone size={24} className="text-red-600" />
                <h2 className="text-2xl font-bold text-foreground">Información de Contacto</h2>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground font-bold mb-2">Teléfono</label>
                    <input
                      type="text"
                      value={settings.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-bold mb-2">WhatsApp</label>
                    <input
                      type="text"
                      value={settings.whatsapp || ""}
                      onChange={(e) => handleChange("whatsapp", e.target.value)}
                      className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="contacto@fudoshinryu.com"
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-card border border-red-600/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Instagram size={24} className="text-red-600" />
                <h2 className="text-2xl font-bold text-foreground">Redes Sociales</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-foreground font-bold mb-2">Instagram</label>
                  <input
                    type="url"
                    value={settings.instagram_url || ""}
                    onChange={(e) => handleChange("instagram_url", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="https://instagram.com/fudoshinryu"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">Facebook</label>
                  <input
                    type="url"
                    value={settings.facebook_url || ""}
                    onChange={(e) => handleChange("facebook_url", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="https://facebook.com/fudoshinryu"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-bold mb-2">YouTube</label>
                  <input
                    type="url"
                    value={settings.youtube_url || ""}
                    onChange={(e) => handleChange("youtube_url", e.target.value)}
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="https://youtube.com/@fudoshinryu"
                  />
                </div>
              </div>
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
