import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - Fudoshin Ryu",
    description: "Artículos, tips y noticias sobre Shotokan Karate-Do",
  }
}

const blogPosts = [
  {
    id: 1,
    title: "Introducción al Shotokan Karate-Do",
    excerpt: "Aprende los fundamentos del Shotokan, uno de los estilos más populares y tradicionales del karate moderno.",
    image: "/shotokan-karate-introduction.jpg",
    date: "2024-01-15",
    author: "Sensei Leonardo",
    slug: "introduccion-shotokan",
  },
  {
    id: 2,
    title: "La Importancia de la Kata",
    excerpt: "Descubre cómo la práctica de formas (kata) desarrolla técnica, memoria muscular y disciplina mental.",
    image: "/karate-kata-forms.jpg",
    date: "2024-01-10",
    author: "Sensei Leonardo",
    slug: "importancia-kata",
  },
  {
    id: 3,
    title: "Seguridad en el Entrenamiento",
    excerpt: "Protección adecuada, calentamiento correcto y progresión gradual son clave para una práctica segura.",
    image: "/karate-safety-training.jpg",
    date: "2024-01-05",
    author: "Sensei Leonardo",
    slug: "seguridad-entrenamiento",
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-6xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Artículos, tips y noticias sobre Shotokan Karate-Do
            </p>

            <div className="grid gap-12">
              {blogPosts.map((post) => (
                <ScrollReveal key={post.id}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer border border-red-600 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition"
            />
          </div>
          <div className="p-8 flex-1">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <time>{new Date(post.date).toLocaleDateString("es-CO")}</time>
              <span>Por {post.author}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="text-red-600 font-bold group-hover:translate-x-2 transition inline-block">
              Leer más
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
