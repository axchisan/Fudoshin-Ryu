import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fudoshin Ryu - Shotokan Karate-Do JKA",
  description:
    "Escuela de Artes Marciales Shotokan Karate-Do tradicional en Vélez, Santander. Sensei Leonardo Vanegas Martínez. Fuerza • Honor • Disciplina",
  generator: "v0.app",
  keywords: "karate, shotokan, JKA, artes marciales, vélez santander, fudoshin",
  openGraph: {
    title: "Fudoshin Ryu - Shotokan Karate-Do JKA",
    description: "Escuela de Artes Marciales Shotokan Karate-Do tradicional",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="fudoshin-theme"
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
