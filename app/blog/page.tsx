import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackButton } from "@/components/back-button"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { db } from "@/lib/db"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - Fudoshin Ryu",
    description: "Artículos, tips y noticias sobre Shotokan Karate-Do",
  }
}

export const revalidate = 300

async function getBlogPosts() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image_url: true,
        author: true,
        createdAt: true,
      },
    })
    return posts
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error fetching blog posts:", error)
    }
    return []
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-background py-4 px-4 border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <BackButton href="/" label="← Volver al Inicio" />
          </div>
        </section>

        <section className="bg-background py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-6xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground mb-12">Artículos, tips y noticias sobre Shotokan Karate-Do</p>

            {blogPosts.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No hay publicaciones disponibles en este momento</p>
              </div>
            ) : (
              <div className="grid gap-12">
                {blogPosts.map((post) => (
                  <ScrollReveal key={post.id}>
                    <BlogCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function BlogCard({
  post,
}: {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string
    image_url: string | null
    author: string
    createdAt: Date
  }
}) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer border border-red-600 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-600/20 transition">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
              src={post.image_url || "/placeholder.svg?height=400&width=600"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition"
            />
          </div>
          <div className="p-8 flex-1">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <time>{new Date(post.createdAt).toLocaleDateString("es-CO")}</time>
              <span>Por {post.author}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition">{post.title}</h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="text-red-600 font-bold group-hover:translate-x-2 transition inline-block">Leer más</div>
          </div>
        </div>
      </article>
    </Link>
  )
}
