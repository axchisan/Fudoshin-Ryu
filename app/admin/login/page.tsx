"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión")
        return
      }

      window.location.href = "/admin/dashboard"
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
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
          <p className="text-muted-foreground mt-2">Fudoshin Ryu - Shotokan Karate-Do</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border-2 border-red-600 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-background border border-red-600 text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50 transition-all duration-300"
                placeholder="admin@fudoshinryu.com"
              />
            </div>

            <div>
              <label className="block text-foreground font-bold mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full bg-background border border-red-600 text-foreground px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50 transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex gap-3 bg-red-900/20 border border-red-600 text-red-100 p-4 rounded-lg">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
