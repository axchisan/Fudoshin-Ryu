import { GalleryClient } from "./GalleryClient"

export const metadata = {
  title: "Galería - Fudoshin Ryu",
  description: "Fotos de clases, torneos, graduaciones y eventos de Fudoshin Ryu",
}

export const revalidate = 300

export default function GalleryPage() {
  return <GalleryClient />
}
