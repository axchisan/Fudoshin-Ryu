"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LogOut, Menu, X, Home } from "lucide-react"
import { useState } from "react"

interface AdminLayoutProps {
  title: string
  children: React.ReactNode
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (err) {
      console.error("[v0] Logout error:", err)
    } finally {
      router.push("/admin/login")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-red-600/20 p-4 flex flex-col transition-all duration-300 fixed h-full z-40 md:static`}
      >
        <div className="mb-8 flex items-center gap-4 justify-between">
          <div className="w-12 h-12 relative flex-shrink-0 rounded-lg overflow-hidden border border-red-600/30">
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
          </div>
          {sidebarOpen && <span className="text-foreground font-bold text-lg">Admin</span>}
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem href="/admin/dashboard" icon="📊" label="Dashboard" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/settings" icon="⚙️" label="Configuración" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/locations" icon="📍" label="Ubicaciones" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/schedules" icon="🕒" label="Horarios" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/blog" icon="📰" label="Blog" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/gallery" icon="🖼️" label="Galería" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/testimonials" icon="💬" label="Testimonios" sidebarOpen={sidebarOpen} />
          <NavItem href="/admin/messages" icon="📧" label="Mensajes" sidebarOpen={sidebarOpen} />
        </nav>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-500 font-semibold active:scale-95 mb-3"
        >
          <Home size={20} />
          {sidebarOpen && "Sitio Público"}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-500 font-bold active:scale-95"
        >
          <LogOut size={20} />
          {sidebarOpen && "Salir"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-card border-b border-red-600/20 px-6 py-4 flex items-center justify-between md:hidden">
          <h1 className="text-foreground font-bold text-lg">{title}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl hidden md:block mb-6">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          </div>
          {children}
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
      className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-red-600 hover:bg-red-600/10 rounded-lg transition-all duration-500"
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span className="font-medium">{label}</span>}
    </Link>
  )
}
