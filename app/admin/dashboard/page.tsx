"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"

interface AdminInfo {
  id: string
  email: string
  name: string
}

interface DashboardStats {
  totalMessages: number
  totalPosts: number
  totalImages: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    totalPosts: 0,
    totalImages: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth/me")
      if (!res.ok) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setAdmin(data.admin)
      fetchStats()
    } catch (err) {
      console.error("[v0] Auth check error:", err)
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error("[v0] Error fetching stats:", err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (err) {
      console.error("[v0] Logout error:", err)
    } finally {
      router.push("/admin/login")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground text-lg">Cargando...</p>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="flex h-screen bg-background">
      {/* ... existing sidebar code ... */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-red-600 p-4 flex flex-col transition-all duration-300 fixed h-full z-40 md:static`}
      >
        <div className="mb-8 flex items-center gap-4 justify-between">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
          </div>
          {sidebarOpen && <span className="text-foreground font-bold text-lg">Admin</span>}
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem href="/admin/dashboard" icon="📊" label="Dashboard" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/profile" icon="👤" label="Mi Perfil" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/content" icon="📝" label="Contenido" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/blog" icon="📰" label="Blog" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/gallery" icon="🖼️" label="Galería" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/testimonials" icon="💬" label="Testimonios" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/messages" icon="📧" label="Mensajes" sidebarOpen={sidebarOpen} />
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition font-bold"
        >
          <LogOut size={20} />
          {sidebarOpen && "Salir"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-card border-b border-red-600 px-6 py-4 flex items-center justify-between md:hidden">
          <h1 className="text-foreground font-bold text-lg">Panel Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenido, {admin.name}</h1>
              <p className="text-muted-foreground">Gestiona el contenido del dojo desde aquí</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Mensajes" count={stats.totalMessages} icon="📧" />
              <StatCard title="Publicaciones" count={stats.totalPosts} icon="📝" />
              <StatCard title="Imágenes" count={stats.totalImages} icon="🖼️" />
            </div>

            {/* Quick Actions */}
            <div className="bg-card border-2 border-red-600 rounded p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickActionButton href="/admin/content" label="Editar Contenido" />
                <QuickActionButton href="/admin/blog" label="Nueva Publicación" />
                <QuickActionButton href="/admin/gallery" label="Subir Fotos" />
                <QuickActionButton href="/admin/profile" label="Mi Perfil" />
                <QuickActionButton href="/admin/testimonials" label="Gestionar Testimonios" />
                <QuickActionButton href="/admin/messages" label="Ver Mensajes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  sidebarOpen,
}: {
  href: string
  icon: string
  label: string
  sidebarOpen: boolean
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-background rounded transition"
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </Link>
  )
}

function StatCard({ title, count, icon }: { title: string; count: number; icon: string }) {
  return (
    <div className="bg-card border-2 border-red-600 rounded p-6">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="text-3xl font-bold text-red-600">{count}</p>
        </div>
      </div>
    </div>
  )
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block bg-background border border-red-600 hover:bg-red-600 text-foreground hover:text-white font-bold py-3 px-4 rounded text-center transition"
    >
      {label}
    </Link>
  )
}
