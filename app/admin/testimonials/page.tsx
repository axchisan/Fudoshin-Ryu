"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

interface Testimonial {
  id?: string
  author: string
  content: string
  belt_level?: string
}

export default function TestimonialsPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthed(true)
    fetchTestimonials()
  }, [router])

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/testimonials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/testimonials", {
        method: editing.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        setEditing(null)
        fetchTestimonials()
      }
    } catch (err) {
      console.error("Error saving testimonial:", err)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("¿Eliminar este testimonio?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchTestimonials()
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err)
    }
  }

  if (!isAuthed || isLoading) return null

  return (
    <AdminLayout title="Gestionar Testimonios">
      <div className="space-y-6">
        <button
          onClick={() => setEditing({ author: "", content: "", belt_level: "" })}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          + Nuevo Testimonio
        </button>

        {/* Edit Form */}
        {editing && (
          <div className="bg-gray-900 border-2 border-red-600 p-6 rounded">
            <input
              type="text"
              placeholder="Nombre del alumno"
              value={editing.author}
              onChange={(e) => setEditing({ ...editing, author: e.target.value })}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="text"
              placeholder="Nivel de cinturón"
              value={editing.belt_level || ""}
              onChange={(e) => setEditing({ ...editing, belt_level: e.target.value })}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <textarea
              placeholder="Testimonio"
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={5}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <p className="text-gray-400">No hay testimonios aún</p>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-900 border border-red-600 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.author}</h3>
                    <p className="text-red-400 text-sm">{testimonial.belt_level}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(testimonial)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-800 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
