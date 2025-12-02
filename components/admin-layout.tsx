"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface AdminLayoutProps {
  title: string
  children: React.ReactNode
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 border-r border-red-600 p-4 flex flex-col transition-all duration-300 fixed h-full z-40 md:static`}
      >
        <div className="mb-8 flex items-center gap-4 justify-between">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-lg">Admin</span>}
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem href="/admin/dashboard" icon="📊" label="Dashboard" sidebarOpen={sidebarOpen} />
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
        <div className="bg-gray-900 border-b border-red-600 px-6 py-4 flex items-center justify-between md:hidden">
          <h1 className="text-white font-bold text-lg">{title}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl hidden md:block mb-6">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
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
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded transition">
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </Link>
  )
}
