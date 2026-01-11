import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ToriiGate } from "@/components/torii-gate"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionSeparator } from "@/components/section-separator"
import { BackButton } from "@/components/back-button"
import { db } from "@/lib/db"

export const metadata = {
  title: "Sobre Nosotros - Fudoshin Ryu",
  description: "Conoce al Sensei Leonardo Vanegas Martínez y la filosofía de Fudoshin Ryu",
}

export const revalidate = 600

async function getSiteSettings() {
  try {
    const settings = await db.siteSettings.findFirst()
    return settings
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching site settings:", error)
    }
    return null
  }
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  const senseiName = settings?.sensei_name || "Leonardo Vanegas Martínez"
  const senseiBio = settings?.sensei_bio || "Maestro de Karate Shotokan con más de 20 años de experiencia"
  const senseiImage = settings?.sensei_image_url || "/sensei-leonardo-vanegas-martinez-karateoka-portrai.jpg"
  const senseiRank = settings?.sensei_rank || "5to Dan"
  const senseiExperience = settings?.sensei_experience_years || 20
  const senseiSpecialties = settings?.sensei_specialties || "Kata, Kumite, Bunkai"

  const dojoName = settings?.dojo_name || "Fudoshin Ryu"
  const dojoPhilosophy =
    settings?.dojo_philosophy || "Cultivar la fuerza del espíritu, honor en la tradición, disciplina en la práctica"
  const dojoMotto = settings?.dojo_motto || "Fuerza • Honor • Disciplina"
  const jkaAffiliation = settings?.jka_affiliation || "Afiliado a Japan Karate Association (JKA)"
  const dojoFoundedYear = settings?.dojo_founded_year || 2010
  const dojoDescription = settings?.dojo_description || "Escuela de Karate Shotokan tradicional JKA"

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
              {dojoDescription} - Donde la tradición de Shotokan Karate-Do se transmite con respeto, honor y disciplina
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
                  <Image src={senseiImage || "/placeholder.svg"} alt={senseiName} fill className="object-cover" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Sensei {senseiName}</h2>
                  <p className="text-red-600 text-xl font-semibold mb-4">{senseiRank}</p>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{senseiBio}</p>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="bg-card p-4 rounded-lg border border-red-600/20">
                        <p className="text-foreground font-bold text-3xl">{senseiExperience}+</p>
                        <p className="text-sm">Años de experiencia</p>
                      </div>
                      <div className="bg-card p-4 rounded-lg border border-red-600/20">
                        <p className="text-foreground font-bold text-lg">{senseiRank}</p>
                        <p className="text-sm">Cinturón Negro</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">Especialidades:</p>
                      <p>{senseiSpecialties}</p>
                    </div>
                    <p className="text-sm italic">{jkaAffiliation}</p>
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
              <h2 className="text-4xl font-bold mb-4 text-center">Filosofía {dojoName}</h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{dojoPhilosophy}</p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {dojoMotto.split("•").map((value, idx) => (
                <PhilosophyCard
                  key={idx}
                  title={value.trim()}
                  description={
                    idx === 0
                      ? "Fortaleza del espíritu y cuerpo, desarrollada a través de la práctica disciplinada y consistente."
                      : idx === 1
                        ? "Respeto hacia los maestros, compañeros y la tradición del Shotokan Karate-Do."
                        : "Compromiso inquebrantable con el crecimiento personal y la excelencia en cada técnica."
                  }
                  icon={idx === 0 ? "💪" : idx === 1 ? "⛩️" : "🥋"}
                />
              ))}
            </div>
          </div>
        </section>

        <SectionSeparator />

        {/* JKA Affiliation */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold mb-4">Afiliación JKA</h2>
              <p className="text-lg text-muted-foreground mb-4">{jkaAffiliation}</p>
              <p className="text-muted-foreground mb-8">Fundado en {dojoFoundedYear}</p>

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
