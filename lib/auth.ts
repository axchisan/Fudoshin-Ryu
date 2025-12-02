const ADMIN_CREDENTIALS = {
  email: "admin@fudoshinryu.com",
  password: "FudoshinRyu2024!",
}

export function verifyCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function generateToken(): string {
  return Buffer.from(Math.random().toString()).toString("base64")
}

const validTokens = new Set<string>()

export function createToken(): string {
  const token = generateToken()
  validTokens.add(token)
  return token
}

export function verifyToken(token: string): boolean {
  return validTokens.has(token)
}

export function invalidateToken(token: string): void {
  validTokens.delete(token)
}
