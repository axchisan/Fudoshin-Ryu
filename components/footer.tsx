import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black border-t border-red-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Fudoshin Ryu */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative mb-4">
              <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
            </div>
            <p className="text-white text-sm text-center">Fudoshin Ryu</p>
          </div>

          {/* SKD Colombia */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative mb-4">
              <Image src="/images/logo-shotokan-colombia.png" alt="SKD Colombia" fill className="object-contain" />
            </div>
            <p className="text-white text-sm text-center">SKD Colombia</p>
          </div>

          {/* JKA */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative mb-4">
              <Image src="/images/logo-jka.png" alt="JKA" fill className="object-contain" />
            </div>
            <p className="text-white text-sm text-center">JKA</p>
          </div>

          {/* Contact Info */}
          <div className="text-white text-sm text-center">
            <p className="font-bold mb-2">Contacto</p>
            <p className="text-gray-300">Vélez, Santander</p>
            <p className="text-gray-300">Colombia</p>
          </div>
        </div>

        <div className="border-t border-red-600 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fudoshin Ryu • Shotokan Karate-Do JKA</p>
          <p className="text-xs mt-2">Sensei Leonardo Vanegas Martínez</p>
        </div>
      </div>
    </footer>
  )
}
