import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Contacto - Fudoshin Ryu",
  description: "Ponte en contacto con Fudoshin Ryu. Envía tu mensaje o llámanos",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
