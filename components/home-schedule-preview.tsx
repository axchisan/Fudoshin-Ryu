"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HomeSchedulePreview() {
  const locations = [
    {
      name: "Vélez (Principal)",
      city: "Vélez, Santander",
      schedules: [
        { day: "Lunes", time: "18:00 - 19:30", level: "Principiantes" },
        { day: "Miércoles", time: "18:00 - 19:30", level: "Intermedio" },
        { day: "Viernes", time: "18:00 - 19:30", level: "Avanzado" },
        { day: "Sábado", time: "09:00 - 10:30", level: "Niños" },
      ],
    },
    {
      name: "Barbosa",
      city: "Barbosa, Santander",
      schedules: [
        { day: "Martes", time: "17:00 - 18:30", level: "Principiantes" },
        { day: "Jueves", time: "17:00 - 18:30", level: "Todos" },
      ],
    },
    {
      name: "Guavatá",
      city: "Guavatá, Santander",
      schedules: [
        { day: "Miércoles", time: "19:00 - 20:30", level: "Todos" },
        { day: "Sábado", time: "14:00 - 15:30", level: "Niños" },
      ],
    },
  ]

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
          <p className="text-muted-foreground mt-4 text-lg">Clases disponibles en tres sedes principales</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {locations.map((location, idx) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border border-red-600/30 rounded-softer p-6 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-red-600 mb-2">{location.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={16} />
                <p className="text-sm">{location.city}</p>
              </div>

              <div className="space-y-3">
                {location.schedules.map((sched) => (
                  <div key={`${location.name}-${sched.day}`} className="text-sm">
                    <p className="font-semibold text-foreground">{sched.day}</p>
                    <div className="flex items-center gap-2 text-red-600 mt-1">
                      <Clock size={14} />
                      <p>{sched.time}</p>
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
