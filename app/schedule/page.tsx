import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackButton } from "@/components/back-button"
import { db } from "@/lib/db"
import { MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Horarios - Fudoshin Ryu",
  description: "Clases disponibles en Vélez, Barbosa y Guavatá, Santander",
}

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

async function getScheduleData() {
  try {
    const locations = await db.location.findMany({
      include: {
        schedules: {
          orderBy: [{ day_of_week: "asc" }, { start_time: "asc" }],
        },
      },
      orderBy: [{ is_main: "desc" }, { name: "asc" }],
    })

    return locations
  } catch (error) {
    console.error("[v0] Error fetching schedule data:", error)
    return []
  }
}

export default async function SchedulePage() {
  const locations = await getScheduleData()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-4 px-4 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <BackButton href="/" label="← Volver al Inicio" />
          </div>
        </section>

        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-6xl font-bold mb-4">Horarios de Clases</h1>
            <p className="text-xl text-muted-foreground mb-12">Clases disponibles en nuestras sedes en Santander</p>

            {locations.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No hay horarios disponibles en este momento</p>
              </div>
            ) : (
              <div className="grid gap-12">
                {locations.map((location) => (
                  <ScrollReveal key={location.id}>
                    <LocationCard location={location} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function LocationCard({
  location,
}: {
  location: {
    id: string
    name: string
    address: string
    description: string | null
    map_embed_url: string | null
    is_main: boolean
    schedules: Array<{
      id: string
      day_of_week: number
      start_time: string
      end_time: string
      level: string
      description: string | null
    }>
  }
}) {
  return (
    <div className="border border-red-600 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition">
      {/* Map Section */}
      {location.map_embed_url && (
        <div className="w-full h-64 bg-gray-900">
          <iframe
            src={location.map_embed_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      {/* Content Section */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold text-red-600">{location.name}</h2>
          {location.is_main && (
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">PRINCIPAL</span>
          )}
        </div>

        <div className="flex items-start gap-2 mb-4">
          <MapPin className="text-red-600 flex-shrink-0 mt-1" size={20} />
          <p className="text-muted-foreground">{location.address}</p>
        </div>

        {location.description && <p className="text-muted-foreground mb-6 text-sm">{location.description}</p>}

        {location.schedules.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-4 mt-6">
              <Clock className="text-red-600" size={20} />
              <h3 className="text-xl font-bold">Horarios de Clases</h3>
            </div>
            <div className="grid gap-3">
              {location.schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-card rounded border border-border gap-2"
                >
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{DAYS[schedule.day_of_week]}</p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.start_time} - {schedule.end_time}
                    </p>
                    {schedule.description && (
                      <p className="text-xs text-muted-foreground mt-1">{schedule.description}</p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-red-600/20 text-red-600 rounded text-sm font-medium self-start sm:self-center">
                    {schedule.level}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm italic mt-4">No hay horarios configurados para esta ubicación</p>
        )}
      </div>
    </div>
  )
}
