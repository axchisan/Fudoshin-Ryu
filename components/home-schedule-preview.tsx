"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Schedule {
  day_of_week: number
  start_time: string
  end_time: string
  level: string
}

interface Location {
  id: string
  name: string
  address: string
  schedules: Schedule[]
}

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export function HomeSchedulePreview() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/site/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.slice(0, 3))
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Error loading locations:", err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Cargando horarios...</p>
        </div>
      </section>
    )
  }

  if (locations.length === 0) {
    return (
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Horarios y Ubicaciones</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full mb-6"></div>
          <p className="text-muted-foreground">No hay ubicaciones disponibles aún.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Horarios y Ubicaciones</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-red-600/20 rounded-full"></div>
          <p className="text-muted-foreground mt-4 text-lg">Clases disponibles en nuestras sedes</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {locations.map((location, idx) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border border-red-600/30 rounded-softer p-6 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-red-600 mb-2">{location.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={16} />
                <p className="text-sm">{location.address}</p>
              </div>

              <div className="space-y-3">
                {location.schedules.slice(0, 4).map((sched, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-semibold text-foreground">{DAYS[sched.day_of_week]}</p>
                    <div className="flex items-center gap-2 text-red-600 mt-1">
                      <Clock size={14} />
                      <p>
                        {sched.start_time} - {sched.end_time}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">{sched.level}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
          >
            Ver Todos los Horarios <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
