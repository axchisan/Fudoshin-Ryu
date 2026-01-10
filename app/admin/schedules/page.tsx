"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Clock, Loader2 } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"

interface Location {
  id: string
  name: string
}

interface Schedule {
  id: string
  locationId: string
  day_of_week: number
  start_time: string
  end_time: string
  level: string
  description: string | null
  location: Location
}

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export default function SchedulesAdmin() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  const [formData, setFormData] = useState({
    locationId: "",
    day_of_week: "1",
    start_time: "",
    end_time: "",
    level: "Principiante",
    description: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [schedulesRes, locationsRes] = await Promise.all([
        fetch("/api/admin/schedules"),
        fetch("/api/admin/locations"),
      ])

      const schedulesData = await schedulesRes.json()
      const locationsData = await locationsRes.json()

      setSchedules(schedulesData.schedules || [])
      setLocations(locationsData.locations || [])
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingSchedule ? `/api/admin/schedules/${editingSchedule.id}` : "/api/admin/schedules"

      const res = await fetch(url, {
        method: editingSchedule ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchData()
        closeModal()
      }
    } catch (error) {
      console.error("[v0] Error saving schedule:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este horario?")) return

    try {
      const res = await fetch(`/api/admin/schedules/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("[v0] Error deleting schedule:", error)
    }
  }

  const openModal = (schedule?: Schedule) => {
    if (schedule) {
      setEditingSchedule(schedule)
      setFormData({
        locationId: schedule.locationId,
        day_of_week: schedule.day_of_week.toString(),
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        level: schedule.level,
        description: schedule.description || "",
      })
    } else {
      setEditingSchedule(null)
      setFormData({
        locationId: locations[0]?.id || "",
        day_of_week: "1",
        start_time: "",
        end_time: "",
        level: "Principiante",
        description: "",
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingSchedule(null)
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
      <AdminHeader title="Horarios" subtitle="Gestiona los horarios de clases" />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => openModal()}
              disabled={locations.length === 0}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              <Plus size={20} />
              Nuevo Horario
            </button>
          </div>

          {locations.length === 0 && (
            <div className="text-center py-12 bg-card border border-red-600/30 rounded-lg mb-6">
              <p className="text-muted-foreground text-lg">Primero debes crear ubicaciones antes de agregar horarios</p>
            </div>
          )}

          <div className="grid gap-6">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-card border border-red-600/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock size={24} className="text-red-600" />
                      <h3 className="text-2xl font-bold text-foreground">{DAYS[schedule.day_of_week]}</h3>
                      <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold">
                        {schedule.level}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      <span className="font-bold">Ubicación:</span> {schedule.location.name}
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <span className="font-bold">Hora:</span> {schedule.start_time} - {schedule.end_time}
                    </p>
                    {schedule.description && <p className="text-muted-foreground text-sm">{schedule.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(schedule)}
                      className="p-2 bg-background border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="p-2 bg-background border border-red-600/30 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {schedules.length === 0 && locations.length > 0 && (
              <div className="text-center py-12 bg-card border border-red-600/30 rounded-lg">
                <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No hay horarios registrados</p>
                <p className="text-muted-foreground text-sm">Agrega tu primer horario usando el botón de arriba</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border-2 border-red-600 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingSchedule ? "Editar Horario" : "Nuevo Horario"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-foreground font-bold mb-2">Ubicación</label>
                <select
                  value={formData.locationId}
                  onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                  required
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Seleccionar ubicación</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Día de la semana</label>
                <select
                  value={formData.day_of_week}
                  onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
                  required
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {DAYS.map((day, index) => (
                    <option key={index} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-bold mb-2">Hora inicio</label>
                  <input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-bold mb-2">Hora fin</label>
                  <input
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                    className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Nivel</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  required
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Todos los niveles">Todos los niveles</option>
                </select>
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Descripción (opcional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Información adicional sobre la clase"
                />
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
                  {editingSchedule ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
