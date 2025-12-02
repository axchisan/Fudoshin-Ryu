// Home page - Enhanced with full content sections
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HomeAboutPreview } from "@/components/home-about-preview"
import { HomeSchedulePreview } from "@/components/home-schedule-preview"
import { HomeGalleryPreview } from "@/components/home-gallery-preview"
import { HomeBlogPreview } from "@/components/home-blog-preview"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Fudoshin Ryu - Inicio",
  description: "Bienvenido a Fudoshin Ryu, escuela de Shotokan Karate-Do tradicional JKA en Vélez, Santander",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <HomeAboutPreview />
        <HomeSchedulePreview />
        <HomeGalleryPreview />
        <HomeBlogPreview />
      </main>
      <Footer />
    </>
  )
}
