import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime12Hour(time24: string): string {
  try {
    const [hours, minutes] = time24.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  } catch {
    return time24
  }
}

export function formatTime24Hour(time12: string): string {
  try {
    const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!match) return time12

    const [, hours, minutes, period] = match
    let hours24 = Number.parseInt(hours)

    if (period.toUpperCase() === "PM" && hours24 !== 12) {
      hours24 += 12
    } else if (period.toUpperCase() === "AM" && hours24 === 12) {
      hours24 = 0
    }

    return `${hours24.toString().padStart(2, "0")}:${minutes}`
  } catch {
    return time12
  }
}
