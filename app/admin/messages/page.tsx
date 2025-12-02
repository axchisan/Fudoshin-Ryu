"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

interface ContactMessage {
  id?: string
  name: string
  email: string
  phone?: string
  message: string
  created_at?: string
  read?: boolean
}

export default function MessagesPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthed(true)
    fetchMessages()
  }, [router])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (err) {
      console.error("Error fetching messages:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("¿Eliminar este mensaje?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        setSelectedMessage(null)
        fetchMessages()
      }
    } catch (err) {
      console.error("Error deleting message:", err)
    }
  }

  if (!isAuthed || isLoading) return null

  return (
    <AdminLayout title="Mensajes de Contacto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-2">
          {messages.length === 0 ? (
            <p className="text-gray-400">No hay mensajes</p>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full p-4 rounded text-left border transition ${
                  selectedMessage?.id === msg.id
                    ? "bg-red-600 border-red-600"
                    : "bg-gray-900 border-gray-700 hover:border-red-600"
                }`}
              >
                <p className={`font-bold ${selectedMessage?.id === msg.id ? "text-white" : "text-white"}`}>
                  {msg.name}
                </p>
                <p className={`text-sm ${selectedMessage?.id === msg.id ? "text-white" : "text-gray-400"}`}>
                  {msg.email}
                </p>
                <p className={`text-xs truncate ${selectedMessage?.id === msg.id ? "text-white" : "text-gray-500"}`}>
                  {msg.message}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Message Detail */}
        {selectedMessage && (
          <div className="bg-gray-900 border-2 border-red-600 p-6 rounded">
            <h3 className="text-2xl font-bold text-white mb-4">{selectedMessage.name}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-red-400">{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <p className="text-gray-400 text-sm">Teléfono</p>
                  <p className="text-white">{selectedMessage.phone}</p>
                </div>
              )}
              {selectedMessage.created_at && (
                <div>
                  <p className="text-gray-400 text-sm">Fecha</p>
                  <p className="text-white">{new Date(selectedMessage.created_at).toLocaleDateString("es-ES")}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Mensaje</p>
              <p className="text-white leading-relaxed">{selectedMessage.message}</p>
            </div>

            <button
              onClick={() => handleDelete(selectedMessage.id)}
              className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition"
            >
              Eliminar Mensaje
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
