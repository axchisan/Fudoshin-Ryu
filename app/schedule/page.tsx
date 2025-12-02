import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackButton } from "@/components/back-button"

export const metadata = {
  title: "Horarios - Fudoshin Ryu",
  description: "Clases disponibles en Vélez, Barbosa y Guavatá, Santander",
}

const locations = [
  {
    name: "Vélez",
    address: "Vélez, Santander, Colombia",
    phone: "+57 312 5555555",
    schedules: [
      { day: "Lunes", time: "3:00 PM - 4:30 PM", level: "Principiante" },
      { day: "Miércoles", time: "3:00 PM - 4:30 PM", level: "Intermedio" },
      { day: "Viernes", time: "5:00 PM - 6:30 PM", level: "Avanzado" },
      { day: "Sábado", time: "9:00 AM - 10:30 AM", level: "Todas las edades" },
    ],
  },
  {
    name: "Barbosa",
    address: "Barbosa, Santander, Colombia",
    phone: "+57 312 5555556",
    schedules: [
      { day: "Martes", time: "4:00 PM - 5:30 PM", level: "Principiante" },
      { day: "Jueves", time: "4:00 PM - 5:30 PM", level: "Intermedio" },
    ],
  },
  {
    name: "Guavatá",
    address: "Guavatá, Santander, Colombia",
    phone: "+57 312 5555557",
    schedules: [
      { day: "Miércoles", time: "5:00 PM - 6:30 PM", level: "Principiante" },
      { day: "Sábado", time: "10:30 AM - 12:00 PM", level: "Intermedio/Avanzado" },
    ],
  },
]

export default function SchedulePage() {
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
            <p className="text-xl text-muted-foreground mb-12">
              Clases disponibles en nuestras tres sedes en Santander
            </p>

            <div className="grid gap-12">
              {locations.map((location) => (
                <ScrollReveal key={location.name}>
                  <LocationCard location={location} />
                </ScrollReveal>
              ))}
            </div>
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
    name: string
    address: string
    phone: string
    schedules: Array<{ day: string; time: string; level: string }>
  }
}) {
  return (
    <div className="border border-red-600 rounded-lg p-8 hover:shadow-lg hover:shadow-red-600/20 transition">
      <h2 className="text-3xl font-bold mb-2 text-red-600">{location.name}</h2>
      <p className="text-muted-foreground mb-4">{location.address}</p>
      <p className="text-muted-foreground mb-6">Teléfono: {location.phone}</p>

      <h3 className="text-xl font-bold mb-4">Clases</h3>
      <div className="grid gap-3">
        {location.schedules.map((schedule, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-card rounded border border-border">
            <div>
              <p className="font-bold">{schedule.day}</p>
              <p className="text-sm text-muted-foreground">{schedule.time}</p>
            </div>
            <span className="px-3 py-1 bg-red-600/20 text-red-600 rounded text-sm font-medium">{schedule.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
