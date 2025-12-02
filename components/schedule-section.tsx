"use client"

import { MapPin, Clock } from "lucide-react"

interface Location {
  name: string
  city: string
  address: string
  schedule: {
    day: string
    time: string
    level: string
  }[]
  mapUrl?: string
}

interface ScheduleSectionProps {
  locations?: Location[]
}

const defaultLocations: Location[] = [
  {
    name: "Sede Principal - Vélez",
    city: "Vélez, Santander",
    address: "Calle Principal, Vélez, Santander",
    schedule: [
      { day: "Lunes", time: "18:00 - 19:30", level: "Principiantes" },
      { day: "Miércoles", time: "18:00 - 19:30", level: "Intermedio" },
      { day: "Viernes", time: "18:00 - 19:30", level: "Avanzado" },
      { day: "Sábado", time: "09:00 - 10:30", level: "Niños" },
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d-73.6!3d5.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Sede Barbosa",
    city: "Barbosa, Santander",
    address: "Centro Deportivo, Barbosa, Santander",
    schedule: [
      { day: "Martes", time: "17:00 - 18:30", level: "Principiantes" },
      { day: "Jueves", time: "17:00 - 18:30", level: "Todos los niveles" },
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2!2d-73.5!3d5.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
  {
    name: "Sede Guavatá",
    city: "Guavatá, Santander",
    address: "Polideportivo Municipal, Guavatá, Santander",
    schedule: [
      { day: "Miércoles", time: "19:00 - 20:30", level: "Todos los niveles" },
      { day: "Sábado", time: "14:00 - 15:30", level: "Niños y Adolescentes" },
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3990.0!2d-73.4!3d5.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  },
]

export function ScheduleSection({ locations = defaultLocations }: ScheduleSectionProps) {
  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-black mb-16">Horarios y Ubicaciones</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {locations.map((location, idx) => (
            <div
              key={idx}
              className="bg-black rounded-sm border-2 border-red-600 overflow-hidden hover:shadow-lg hover:shadow-red-600/30 transition"
            >
              {/* Map */}
              <div className="w-full h-48 bg-gray-900 relative">
                {location.mapUrl ? (
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Mapa no disponible</div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-3">{location.name}</h3>

                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold">{location.city}</p>
                    <p className="text-gray-400 text-sm">{location.address}</p>
                  </div>
                </div>

                <div className="border-t border-red-600 pt-4 mt-4">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Clock size={18} className="text-red-600" /> Horarios
                  </h4>
                  <div className="space-y-3">
                    {location.schedule.map((sched, sidx) => (
                      <div key={sidx} className="text-sm">
                        <p className="text-gray-300 font-semibold">{sched.day}</p>
                        <p className="text-red-400">{sched.time}</p>
                        <p className="text-gray-400 text-xs">{sched.level}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-red-600 text-white p-8 rounded-sm">
          <h3 className="text-2xl font-bold mb-2">¿Listo para comenzar tu entrenamiento?</h3>
          <p className="mb-4">Contáctanos para más información sobre niveles, cuotas y requisitos</p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-black text-red-600 font-bold rounded hover:bg-gray-900 transition"
          >
            Enviar Mensaje
          </a>
        </div>
      </div>
    </section>
  )
}
