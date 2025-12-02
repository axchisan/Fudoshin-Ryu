"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-background border-b border-red-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">Fudoshin Ryu</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-foreground hover:text-red-600 transition font-medium">
              Sobre Nosotros
            </Link>
            <Link href="/schedule" className="text-foreground hover:text-red-600 transition font-medium">
              Horarios
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-red-600 transition font-medium">
              Galería
            </Link>
            <Link href="/blog" className="text-foreground hover:text-red-600 transition font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-foreground hover:text-red-600 transition font-medium">
              Contacto
            </Link>
            <ThemeToggle />
            <Link
              href="/admin"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-red-600 py-4">
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-foreground hover:text-red-600 transition font-medium">
                Sobre Nosotros
              </Link>
              <Link href="/schedule" className="text-foreground hover:text-red-600 transition font-medium">
                Horarios
              </Link>
              <Link href="/gallery" className="text-foreground hover:text-red-600 transition font-medium">
                Galería
              </Link>
              <Link href="/blog" className="text-foreground hover:text-red-600 transition font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-foreground hover:text-red-600 transition font-medium">
                Contacto
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
