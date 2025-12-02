import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-background border-t border-red-600/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Fudoshin Ryu */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 relative mb-4 rounded-lg overflow-hidden border border-red-600/20 group-hover:border-red-600/50 transition-smooth p-2">
              <Image src="/images/logo-principal.jpeg" alt="Fudoshin Ryu" fill className="object-contain" />
            </div>
            <p className="text-foreground text-sm text-center font-semibold">Fudoshin Ryu</p>
          </div>

          {/* SKD Colombia */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 relative mb-4 rounded-lg overflow-hidden border border-red-600/20 group-hover:border-red-600/50 transition-smooth p-2">
              <Image src="/images/logo-shotokan-colombia.png" alt="SKD Colombia" fill className="object-contain" />
            </div>
            <p className="text-foreground text-sm text-center font-semibold">SKD Colombia</p>
          </div>

          {/* JKA */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 relative mb-4 rounded-lg overflow-hidden border border-red-600/20 group-hover:border-red-600/50 transition-smooth p-2">
              <Image src="/images/logo-jka.png" alt="JKA" fill className="object-contain" />
            </div>
            <p className="text-foreground text-sm text-center font-semibold">JKA</p>
          </div>

          {/* Contact Info */}
          <div className="text-foreground text-sm text-center">
            <p className="font-bold mb-3 text-red-600">Contacto</p>
            <p className="text-muted-foreground mb-1">Vélez, Santander</p>
            <p className="text-muted-foreground">Colombia</p>
          </div>
        </div>

        <div className="border-t border-red-600/20 pt-8 text-center text-muted-foreground">
          <p className="text-sm">&copy; {new Date().getFullYear()} Fudoshin Ryu • Shotokan Karate-Do JKA</p>
          <p className="text-xs mt-2 text-muted-foreground/70">Sensei Leonardo Vanegas Martínez</p>
        </div>
      </div>
    </footer>
  )
}
