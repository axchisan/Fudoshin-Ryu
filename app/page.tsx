// Home page - Hero section only
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Fudoshin Ryu - Inicio",
  description: "Bienvenido a Fudoshin Ryu, escuela de Shotokan Karate-Do tradicional JKA en Vélez, Santander",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />

        {/* Quick Navigation Cards to Other Sections */}
        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">Explora el Dojo</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickNavCard
                title="Sobre Nosotros"
                description="Conoce al Sensei y la filosofía del dojo"
                href="/about"
              />
              <QuickNavCard title="Horarios" description="Clases en Vélez, Barbosa y Guavatá" href="/schedule" />
              <QuickNavCard title="Galería" description="Fotos de clases, torneos y eventos" href="/gallery" />
              <QuickNavCard title="Blog" description="Artículos y noticias del karate" href="/blog" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function QuickNavCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="p-6 bg-card border border-red-600 rounded hover:shadow-lg hover:shadow-red-600/20 transition-all"
    >
      <h3 className="text-xl font-bold mb-2 text-red-600">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  )
}
