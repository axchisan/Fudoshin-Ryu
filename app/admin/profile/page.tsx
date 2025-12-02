"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Loader2, Save } from "lucide-react"

interface AdminInfo {
  id: string
  email: string
  name: string
}

interface ProfileForm {
  name: string
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function AdminProfilePage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchAdmin()
  }, [])

  const fetchAdmin = async () => {
    try {
      const res = await fetch("/api/admin/auth/me")
      if (!res.ok) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setAdmin(data.admin)
      setForm((prev) => ({
        ...prev,
        name: data.admin.name,
        email: data.admin.email,
      }))
    } catch (err) {
      console.error("[v0] Error fetching admin:", err)
      setMessage({ type: "error", text: "Error al cargar perfil" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSaving(true)

    try {
      // Validaciones
      if (form.newPassword && form.newPassword !== form.confirmPassword) {
        setMessage({ type: "error", text: "Las contraseñas no coinciden" })
        setIsSaving(false)
        return
      }

      if (form.newPassword && !form.currentPassword) {
        setMessage({ type: "error", text: "Debes ingresar tu contraseña actual para cambiarla" })
        setIsSaving(false)
        return
      }

      const res = await fetch("/api/admin/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setMessage({ type: "error", text: data.error || "Error al actualizar perfil" })
        return
      }

      setMessage({ type: "success", text: "Perfil actualizado correctamente" })
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      // Recargar datos
      setTimeout(() => fetchAdmin(), 1000)
    } catch (err) {
      console.error("[v0] Error updating profile:", err)
      setMessage({ type: "error", text: "Error al conectar con el servidor" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Mi Perfil">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="animate-spin text-red-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Mi Perfil">
      <div className="max-w-2xl">
        {/* Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded border ${
              message.type === "success"
                ? "bg-green-900/20 border-green-600 text-green-100"
                : "bg-red-900/20 border-red-600 text-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-red-600 rounded-lg p-8 space-y-6">
          {/* Profile Info */}
          <div className="bg-background/50 p-6 rounded border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Información de Perfil</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-bold mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-foreground font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-background/50 p-6 rounded border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Cambiar Contraseña</h3>
            <p className="text-sm text-muted-foreground mb-4">Deja en blanco para no cambiar la contraseña</p>

            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-bold mb-2">Contraseña Actual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-foreground font-bold mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-foreground font-bold mb-2">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving && <Loader2 size={20} className="animate-spin" />}
            {isSaving ? "Guardando..." : "Guardar Cambios"}
            <Save size={20} />
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
