"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, MapPin, Loader2 } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"

interface Location {
  id: string
  name: string
  address: string
  description: string | null
  map_embed_url: string | null
  is_main: boolean
  schedules?: any[]
}

export default function LocationsAdmin() {
  const router = useRouter()
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    map_embed_url: "",
    is_main: false,
  })

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/admin/locations")
      const data = await res.json()
      setLocations(data.locations || [])
    } catch (error) {
      console.error("[v0] Error fetching locations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingLocation ? `/api/admin/locations/${editingLocation.id}` : "/api/admin/locations"

      const res = await fetch(url, {
        method: editingLocation ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchLocations()
        closeModal()
      }
    } catch (error) {
      console.error("[v0] Error saving location:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta ubicación?")) return

    try {
      const res = await fetch(`/api/admin/locations/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchLocations()
      }
    } catch (error) {
      console.error("[v0] Error deleting location:", error)
    }
  }

  const openModal = (location?: Location) => {
    if (location) {
      setEditingLocation(location)
      setFormData({
        name: location.name,
        address: location.address,
        description: location.description || "",
        map_embed_url: location.map_embed_url || "",
        is_main: location.is_main,
      })
    } else {
      setEditingLocation(null)
      setFormData({
        name: "",
        address: "",
        description: "",
        map_embed_url: "",
        is_main: false,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingLocation(null)
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
      <AdminHeader title="Ubicaciones" subtitle="Gestiona las sedes del dojo" />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-bold shadow-md ml-auto"
            >
              <Plus size={20} />
              Nueva Ubicación
            </button>
          </div>

          <div className="grid gap-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-card border border-red-600/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={24} className="text-red-600" />
                      <h3 className="text-2xl font-bold text-foreground">{location.name}</h3>
                      {location.is_main && (
                        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                          PRINCIPAL
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{location.address}</p>
                    {location.description && (
                      <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
                    )}
                    {location.map_embed_url && <p className="text-sm text-green-600 font-medium">Mapa configurado</p>}
                    {location.schedules && location.schedules.length > 0 && (
                      <p className="text-sm text-red-600 mt-2 font-medium">
                        {location.schedules.length} horario(s) configurado(s)
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(location)}
                      className="p-2 bg-background border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="p-2 bg-background border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {locations.length === 0 && (
              <div className="text-center py-12 bg-card border border-red-600/30 rounded-lg">
                <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No hay ubicaciones registradas</p>
                <p className="text-muted-foreground text-sm">Agrega tu primera sede usando el botón de arriba</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border-2 border-red-600 rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingLocation ? "Editar Ubicación" : "Nueva Ubicación"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-foreground font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Ej: Vélez"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Dirección</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Ej: Vélez, Santander, Colombia"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Descripción (opcional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Información adicional sobre la ubicación"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">URL del mapa (Google Maps Embed)</label>
                <input
                  type="url"
                  value={formData.map_embed_url}
                  onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ve a Google Maps, haz clic en "Compartir" → "Insertar mapa" y copia la URL
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_main"
                  checked={formData.is_main}
                  onChange={(e) => setFormData({ ...formData, is_main: e.target.checked })}
                  className="w-5 h-5 accent-red-600"
                />
                <label htmlFor="is_main" className="text-foreground font-bold">
                  Sede Principal
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg hover:bg-red-600/10 transition-all duration-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-bold"
                >
                  {editingLocation ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
