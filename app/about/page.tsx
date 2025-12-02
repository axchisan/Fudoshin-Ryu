import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ToriiGate } from "@/components/torii-gate"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionSeparator } from "@/components/section-separator"
import { BackButton } from "@/components/back-button"

export const metadata = {
  title: "Sobre Nosotros - Fudoshin Ryu",
  description: "Conoce al Sensei Leonardo Vanegas Martínez y la filosofía de Fudoshin Ryu",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-4 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl">
            <BackButton href="/" label="← Volver al Inicio" />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative min-h-[50vh] bg-gradient-to-b from-background to-card flex items-center justify-center py-16 px-4">
          <div className="absolute top-12 right-12 w-24 h-32 text-red-600 opacity-10">
            <ToriiGate />
          </div>

          <div className="container mx-auto max-w-4xl relative z-10">
            <h1 className="text-6xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Fudoshin Ryu - Donde la tradición de Shotokan Karate-Do se transmite con respeto, honor y disciplina
            </p>
          </div>
        </section>

        <SectionSeparator />

        {/* Sensei Profile */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="w-full aspect-square relative rounded-lg overflow-hidden shadow-2xl shadow-red-600/20">
                  <Image
                    src="/sensei-leonardo-vanegas-martinez-karateoka-portrai.jpg"
                    alt="Sensei Leonardo Vanegas Martínez"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Sensei Leonardo Vanegas Martínez</h2>
                  <div className="space-y-6 text-muted-foreground">
                    <p>
                      Con más de 20 años de dedicación al Shotokan Karate-Do, el Sensei Leonardo Vanegas Martínez ha
                      dedicado su vida a preservar la tradición y excelencia de esta disciplina marcial.
                    </p>
                    <p>
                      Afiliado con la Japan Karate Association (JKA), representa los valores fundamentales del karate:
                      Fuerza en el cuerpo, honor en las acciones, y disciplina en la mente.
                    </p>
                    <p>
                      Su metodología combina la técnica tradicional con una pedagogía moderna, creando un ambiente donde
                      cada estudiante puede alcanzar su potencial máximo.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <SectionSeparator />

        {/* Dojo Philosophy */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-8 text-center">Filosofía Fudoshin Ryu</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <PhilosophyCard
                title="Fuerza"
                description="Fortaleza del espíritu y cuerpo, desarrollada a través de la práctica disciplinada y consistente."
                icon="💪"
              />
              <PhilosophyCard
                title="Honor"
                description="Respeto hacia los maestros, compañeros y la tradición del Shotokan Karate-Do."
                icon="⛩️"
              />
              <PhilosophyCard
                title="Disciplina"
                description="Compromiso inquebrantable con el crecimiento personal y la excelencia en cada técnica."
                icon="🥋"
              />
            </div>
          </div>
        </section>

        <SectionSeparator />

        {/* JKA Affiliation */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-8">Afiliación JKA</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fudoshin Ryu es parte de Shotokan Karate-Do Colombia (SKD Colombia), directamente afiliada con la Japan
                Karate Association.
              </p>

              <div className="flex justify-center gap-8 flex-wrap mt-12">
                <div className="w-24 h-24 relative">
                  <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
                </div>
                <div className="w-24 h-24 relative">
                  <Image src="/images/logo-shotokan-colombia.png" alt="SKD Colombia" fill className="object-contain" />
                </div>
                <div className="w-24 h-24 relative">
                  <Image src="/images/logo-jka.png" alt="JKA" fill className="object-contain" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function PhilosophyCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <ScrollReveal className="p-8 border border-red-600 rounded text-center hover:bg-background/50 transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-red-600">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </ScrollReveal>
  )
}
