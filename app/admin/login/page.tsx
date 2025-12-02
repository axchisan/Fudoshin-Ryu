"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AlertCircle, Loader2 } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Error al iniciar sesión")
        return
      }

      // Success - redirect to dashboard
      router.push("/admin/dashboard")
    } catch (err) {
      setError("Error al conectar con el servidor")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 relative mx-auto mb-4">
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
          <p className="text-muted-foreground mt-2">Fudoshin Ryu - Shotokan Karate-Do</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border-2 border-red-600 rounded p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                placeholder="admin@fudoshinryu.com"
              />
            </div>

            <div>
              <label className="block text-foreground font-bold mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex gap-3 bg-red-900/20 border border-red-600 text-red-100 p-4 rounded">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={20} className="animate-spin" />}
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <p className="text-muted-foreground text-sm text-center mt-6">Solo para administradores del dojo</p>
        </div>
      </div>
    </div>
  )
}
