import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export async function middleware(request: NextRequest) {
  // Proteger rutas /admin/*
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Permitir acceso a login sin autenticación
    if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin") {
      return NextResponse.next()
    }

    // Verificar token para otras rutas admin
    const token = request.cookies.get("adminToken")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const payload = await verifyToken(token)
      if (!payload) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch (error) {
      console.error("[v0] Proxy verification error:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
