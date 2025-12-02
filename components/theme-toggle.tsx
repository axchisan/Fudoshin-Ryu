"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center p-2 rounded-lg border border-red-600/20 hover:border-red-600/50 hover:bg-red-600/10 transition-all duration-500"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-600" />}
    </button>
  )
}
