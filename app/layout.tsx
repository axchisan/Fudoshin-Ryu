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

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "Fudoshin Ryu - Shotokan Karate-Do JKA",
    description: "Escuela de Artes Marciales Shotokan Karate-Do tradicional",
    type: "website",
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
