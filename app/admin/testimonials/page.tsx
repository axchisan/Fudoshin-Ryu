"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Loader2, Trash2, Star, MessageSquare, CheckCircle, XCircle } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  level: string
  content: string
  rating: number
  image_url?: string
  email?: string
  approved: boolean
  featured: boolean
  response?: string
  responded_at?: string
  createdAt: string
}

export default function TestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null)
  const [responding, setResponding] = useState<string | null>(null)
  const [responseText, setResponseText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch("/api/admin/auth/me")
      if (!authRes.ok) {
        router.push("/admin/login")
        return
      }
      fetchTestimonials()
    } catch (err) {
      console.error("[v0] Auth error:", err)
      router.push("/admin/login")
    }
  }

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials")
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (err) {
      console.error("[v0] Error fetching testimonials:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTestimonial = async () => {
    if (!editing || !editing.name || !editing.level || !editing.content) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsSaving(true)
    try {
      const url = editing.id ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials"
      const method = editing.id ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        setEditing(null)
        fetchTestimonials()
      } else {
        alert("Error al guardar testimonio")
      }
    } catch (err) {
      console.error("[v0] Error saving testimonial:", err)
      alert("Error al guardar testimonio")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveResponse = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id)
    if (!testimonial) return

    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...testimonial,
          response: responseText,
        }),
      })

      if (res.ok) {
        setResponding(null)
        setResponseText("")
        fetchTestimonials()
      }
    } catch (err) {
      console.error("[v0] Error saving response:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleApproval = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...testimonial,
          approved: !testimonial.approved,
        }),
      })

      if (res.ok) {
        fetchTestimonials()
      }
    } catch (err) {
      console.error("[v0] Error toggling approval:", err)
    }
  }

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...testimonial,
          featured: !testimonial.featured,
        }),
      })

      if (res.ok) {
        fetchTestimonials()
      }
    } catch (err) {
      console.error("[v0] Error toggling featured:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este testimonio?")) return

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchTestimonials()
      }
    } catch (err) {
      console.error("[v0] Error deleting testimonial:", err)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Gestionar Testimonios">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="animate-spin text-red-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestionar Testimonios">
      <div className="space-y-6">
        <button
          onClick={() =>
            setEditing({
              name: "",
              level: "",
              content: "",
              rating: 5,
              approved: true,
              featured: false,
            })
          }
          className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
        >
          + Nuevo Testimonio
        </button>

        {/* Edit Form */}
        {editing && (
          <div className="bg-card border-2 border-red-600/50 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {editing.id ? "Editar Testimonio" : "Nuevo Testimonio"}
            </h3>

            <div>
              <label className="block text-foreground font-semibold mb-2">Nombre *</label>
              <input
                type="text"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Nombre del alumno"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Nivel de Cinturón *</label>
              <input
                type="text"
                value={editing.level || ""}
                onChange={(e) => setEditing({ ...editing, level: e.target.value })}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Ej: Cinturón Amarillo, 5to Kyu, etc."
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Testimonio *</label>
              <textarea
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={5}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="El testimonio del alumno..."
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.approved || false}
                  onChange={(e) => setEditing({ ...editing, approved: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-600"
                />
                <span className="text-foreground font-semibold">Aprobado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.featured || false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-600"
                />
                <span className="text-foreground font-semibold">Destacado</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSaveTestimonial}
                disabled={isSaving}
                className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Guardando...
                  </span>
                ) : (
                  "Guardar"
                )}
              </button>
              <button
                onClick={() => setEditing(null)}
                disabled={isSaving}
                className="flex-1 bg-muted text-muted-foreground font-bold py-3 rounded-lg hover:bg-muted/80 transition-all duration-500 disabled:opacity-50 active:scale-95"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Testimonials List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Testimonios</h3>
          {testimonials.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No hay testimonios aún</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
                      <span className="text-sm text-muted-foreground">{testimonial.level}</span>
                      {testimonial.approved ? (
                        <span title="Aprobado">
                          <CheckCircle size={18} className="text-green-500" />
                        </span>
                      ) : (
                        <span title="Pendiente">
                          <XCircle size={18} className="text-yellow-500" />
                        </span>
                      )}
                      {testimonial.featured && (
                        <span title="Destacado">
                          <Star size={18} className="text-yellow-500 fill-yellow-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{testimonial.content}</p>
                    {testimonial.response && (
                      <div className="bg-muted/50 p-3 rounded-lg mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Respuesta del Sensei:</p>
                        <p className="text-foreground text-sm">{testimonial.response}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApproval(testimonial)}
                      className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-300"
                      title={testimonial.approved ? "Desaprobar" : "Aprobar"}
                    >
                      {testimonial.approved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(testimonial)}
                      className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-300"
                      title={testimonial.featured ? "Quitar destacado" : "Destacar"}
                    >
                      <Star size={18} className={testimonial.featured ? "fill-yellow-500 text-yellow-500" : ""} />
                    </button>
                    <button
                      onClick={() => {
                        setResponding(testimonial.id)
                        setResponseText(testimonial.response || "")
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                      title="Responder"
                    >
                      <MessageSquare size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 bg-muted hover:bg-destructive text-foreground hover:text-destructive-foreground rounded-lg transition-all duration-300"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Response Form */}
                {responding === testimonial.id && (
                  <div className="mt-4 p-4 bg-background rounded-lg border border-red-600/30">
                    <label className="block text-foreground font-semibold mb-2">Respuesta del Sensei:</label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={3}
                      className="w-full bg-card border border-border text-foreground px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600 mb-3"
                      placeholder="Escribe tu respuesta..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveResponse(testimonial.id)}
                        disabled={isSaving}
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {isSaving ? "Guardando..." : "Guardar Respuesta"}
                      </button>
                      <button
                        onClick={() => {
                          setResponding(null)
                          setResponseText("")
                        }}
                        className="bg-muted text-foreground font-semibold py-2 px-4 rounded-lg hover:bg-muted/80 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
