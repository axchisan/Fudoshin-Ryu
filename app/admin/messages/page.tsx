"use client"

import { useEffect, useState } from "react"
import { Loader2, Mail, Phone, Calendar, Check, X } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  createdAt: Date
  read: boolean
  replied: boolean
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages")
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
      }
    } catch (err) {
      console.error("[v0] Error fetching messages:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?")) return

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setSelectedMessage(null)
        fetchMessages()
      }
    } catch (err) {
      console.error("[v0] Error deleting message:", err)
    }
  }

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read }),
      })

      if (res.ok) {
        fetchMessages()
      }
    } catch (err) {
      console.error("[v0] Error updating message:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Mensajes de Contacto" subtitle="Gestiona los mensajes recibidos desde el formulario" />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-2">
              {messages.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground">No hay mensajes</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full p-4 rounded-lg text-left border transition ${
                      selectedMessage?.id === msg.id
                        ? "bg-red-600 border-red-600"
                        : msg.read
                          ? "bg-card border-border hover:border-red-600"
                          : "bg-card border-red-600/50 hover:border-red-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p
                        className={`font-bold ${selectedMessage?.id === msg.id ? "text-white" : msg.read ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {msg.name}
                      </p>
                      {!msg.read && selectedMessage?.id !== msg.id && (
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">NUEVO</span>
                      )}
                    </div>
                    <p
                      className={`text-sm mb-1 ${selectedMessage?.id === msg.id ? "text-white" : "text-muted-foreground"}`}
                    >
                      {msg.email}
                    </p>
                    <p
                      className={`text-xs truncate ${selectedMessage?.id === msg.id ? "text-white" : "text-muted-foreground"}`}
                    >
                      {msg.message}
                    </p>
                  </button>
                ))
              )}
            </div>

            {/* Message Detail */}
            {selectedMessage ? (
              <div className="bg-card border border-red-600/30 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{selectedMessage.name}</h3>
                  <div className="flex gap-2">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id, true)}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        title="Marcar como leído"
                      >
                        <Check size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="text-red-600" size={18} />
                    <div>
                      <p className="text-muted-foreground text-xs">Email</p>
                      <a href={`mailto:${selectedMessage.email}`} className="text-red-600 hover:text-red-500">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="text-red-600" size={18} />
                      <div>
                        <p className="text-muted-foreground text-xs">Teléfono</p>
                        <a href={`tel:${selectedMessage.phone}`} className="text-foreground hover:text-red-600">
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="text-red-600" size={18} />
                    <div>
                      <p className="text-muted-foreground text-xs">Fecha</p>
                      <p className="text-foreground">{new Date(selectedMessage.createdAt).toLocaleString("es-CO")}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-background rounded-lg border border-border">
                  <p className="text-muted-foreground text-xs mb-2">Mensaje</p>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
                >
                  <X size={18} />
                  Eliminar Mensaje
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border p-12 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center">Selecciona un mensaje para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
