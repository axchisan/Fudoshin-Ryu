"use client"

import Link from "next/link"
import { ArrowLeft, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
}

export function AdminHeader({ title, subtitle, showBackButton = true }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
