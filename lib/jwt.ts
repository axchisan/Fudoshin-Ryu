// lib/jwt.ts
import { jwtVerify, SignJWT } from "jose";

// Clave secreta (en producción siempre viene de process.env.JWT_SECRET)
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-super-largo-y-seguro-para-dev-12345678901234567890"
);

export interface JWTPayload {
  adminId: string;
  email: string;
  iat?: number;
  exp?: number;
  // Esto es lo que faltaba: permitir cualquier otra propiedad (requerido por jose)
  [key: string]: unknown;
}

export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>) // ← también funciona sin cast si pones el index signature arriba
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    // jose ya garantiza que payload tiene index signature, así que el cast es seguro
    return payload as JWTPayload;
  } catch (error) {
    console.error("[JWT] Verification failed:", error);
    return null;
  }
}
