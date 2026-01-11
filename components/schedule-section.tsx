"use client"

import { MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

interface Schedule {
  id: string
  day_of_week: number
  start_time: string
  end_time: string
  level: string
  description: string | null
}

interface Location {
  id: string
  name: string
  address: string
  description: string | null
  map_embed_url: string | null
  is_main: boolean
  schedules: Schedule[]
}

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export function ScheduleSection() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/site/locations")
      const data = await res.json()
      setLocations(data.locations || [])
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section id="schedule" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-black dark:text-white mb-16">
            Horarios y Ubicaciones
          </h2>
          <div className="text-center text-muted-foreground">Cargando...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="schedule" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-black dark:text-white mb-16">
          Horarios y Ubicaciones
        </h2>

        {locations.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No hay ubicaciones disponibles en este momento</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-black dark:bg-gray-800 rounded-lg border-2 border-red-600 overflow-hidden hover:shadow-lg hover:shadow-red-600/30 transition"
                >
                  {/* Map */}
                  <div className="w-full h-48 bg-gray-900 relative">
                    {location.map_embed_url ? (
                      <iframe
                        src={location.map_embed_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Mapa no disponible
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-bold text-red-600">{location.name}</h3>
                      {location.is_main && (
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          PRINCIPAL
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-gray-400 text-sm">{location.address}</p>
                        {location.description && <p className="text-gray-500 text-xs mt-1">{location.description}</p>}
                      </div>
                    </div>

                    {location.schedules.length > 0 && (
                      <div className="border-t border-red-600 pt-4 mt-4">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Clock size={18} className="text-red-600" /> Horarios
                        </h4>
                        <div className="space-y-3">
                          {location.schedules.slice(0, 4).map((sched) => (
                            <div key={sched.id} className="text-sm">
                              <p className="text-gray-300 font-semibold">{DAYS[sched.day_of_week]}</p>
                              <p className="text-red-400">
                                {sched.start_time} - {sched.end_time}
                              </p>
                              <p className="text-gray-400 text-xs">{sched.level}</p>
                            </div>
                          ))}
                          {location.schedules.length > 4 && (
                            <p className="text-gray-500 text-xs italic">
                              +{location.schedules.length - 4} horario(s) más
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-red-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">¿Listo para comenzar tu entrenamiento?</h3>
              <p className="mb-4">Contáctanos para más información sobre niveles, cuotas y requisitos</p>
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-black text-red-600 font-bold rounded hover:bg-gray-900 transition"
              >
                Enviar Mensaje
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
