import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

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
    icon: "/icon-light-32x32.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
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
