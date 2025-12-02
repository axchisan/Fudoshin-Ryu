import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value

    if (!token) {
      return null
    }

    const payload = await verifyToken(token)
    return payload
  } catch (error) {
    console.error("[v0] Session verification error:", error)
    return null
  }
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("adminToken")
}
