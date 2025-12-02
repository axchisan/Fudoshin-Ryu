"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function BackButton({ href = "/", label = "Volver", className = "" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-red-600 hover:text-red-500 font-semibold transition-colors duration-300 ${className}`}
    >
      <ArrowLeft size={20} />
      {label}
    </Link>
  )
}
