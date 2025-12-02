// Password hashing utilities
import bcrypt from "bcryptjs"

// For production, use bcryptjs: npm install bcryptjs
// This is a simple example using crypto (not recommended for production)
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
