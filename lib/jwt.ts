// JWT utilities for secure token management
import { jwtVerify, SignJWT } from "jose"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "tu-clave-secreta-muy-larga-cambia-en-produccion-123456",
)

export interface JWTPayload {
  adminId: string
  email: string
  iat?: number
  exp?: number
}

export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as JWTPayload
  } catch (error) {
    console.error("[v0] JWT verification failed:", error)
    return null
  }
}
