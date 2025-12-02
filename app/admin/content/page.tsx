"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

export default function ContentPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [content, setContent] = useState({
    biography: "",
    philosophy: "",
    lineage: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthed(true)
    fetchContent()
  }, [router])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/content", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setContent(data)
      }
    } catch (err) {
      console.error("Error fetching content:", err)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage("")

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      })

      if (res.ok) {
        setMessage("Contenido guardado exitosamente")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      setMessage("Error al guardar el contenido")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthed) return null

  return (
    <AdminLayout title="Editar Contenido">
      <div className="space-y-6">
        {/* Biography */}
        <div>
          <label className="block text-white font-bold mb-2">Biografía del Sensei</label>
          <textarea
            value={content.biography}
            onChange={(e) => setContent({ ...content, biography: e.target.value })}
            rows={6}
            className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Philosophy */}
        <div>
          <label className="block text-white font-bold mb-2">Filosofía Fudoshin Ryu</label>
          <textarea
            value={content.philosophy}
            onChange={(e) => setContent({ ...content, philosophy: e.target.value })}
            rows={6}
            className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Lineage */}
        <div>
          <label className="block text-white font-bold mb-2">Linaje JKA y SKD Colombia</label>
          <textarea
            value={content.lineage}
            onChange={(e) => setContent({ ...content, lineage: e.target.value })}
            rows={6}
            className="w-full bg-black border border-red-600 text-white px-4 py-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded ${message.includes("Error") ? "bg-red-900 border border-red-600" : "bg-green-900 border border-green-600"} text-white`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition disabled:bg-gray-600"
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </AdminLayout>
  )
}
