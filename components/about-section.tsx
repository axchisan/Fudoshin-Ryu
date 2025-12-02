"use client"

import Image from "next/image"

interface AboutSectionProps {
  content?: {
    biography?: string
    philosophy?: string
    lineage?: string
  }
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-16">Sobre Nosotros</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Foto del Sensei */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square relative bg-gray-900 rounded-sm border-2 border-red-600 overflow-hidden">
              <Image
                src="/sensei-leonardo-vanegas-martinez-karateoka-portrai.jpg"
                alt="Sensei Leonardo Vanegas Martínez"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-3xl font-bold text-red-600 mb-4">Sensei Leonardo Vanegas Martínez</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                {content?.biography ||
                  "Instructor oficial de Shotokan Karate-Do afiliado a la Japan Karate Association (JKA). Con más de 20 años de experiencia en la enseñanza de artes marciales tradicionales, el Sensei Leonardo ha dedicado su vida a transmitir los valores fundamentales del karate: disciplina, respeto y mejora personal constante."}
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white mb-3">Filosofía Fudoshin Ryu</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                {content?.philosophy ||
                  'Fudoshin significa "espíritu inmóvil" - la capacidad de mantener la calma y la determinación en cualquier situación. Nuestra escuela sigue la tradición Shotokan pura, enfocada en técnica correcta, disciplina marcial y desarrollo del carácter. Cada alumno es valorado como parte de una comunidad dedicada a la excelencia.'}
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white mb-3">Linaje JKA y SKD Colombia</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                {content?.lineage ||
                  "Afiliados a la Shotokan Karate-Do Colombia (SKD) y respaldados por la Japan Karate Association, garantizamos la autenticidad y calidad de la enseñanza tradicional. Nuestro linaje conecta directamente con los maestros japoneses más reconocidos del Shotokan."}
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-900 p-8 rounded-sm border-l-4 border-red-600">
          <div>
            <h4 className="text-2xl font-bold text-red-600 mb-3">Fuerza</h4>
            <p className="text-gray-300">
              Desarrollo físico, mental y emocional a través del entrenamiento disciplinado.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-red-600 mb-3">Honor</h4>
            <p className="text-gray-300">
              Respeto por la tradición, los maestros, los compañeros y el camino del guerrero.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-red-600 mb-3">Disciplina</h4>
            <p className="text-gray-300">Compromiso consistente con la mejora personal y la excelencia técnica.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
