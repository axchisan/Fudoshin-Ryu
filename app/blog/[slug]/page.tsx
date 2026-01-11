import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import type { Metadata } from "next"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await db.blogPost.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true, image_url: true },
  })

  if (!post) {
    return {
      title: "Artículo no encontrado - Fudoshin Ryu",
    }
  }

  return {
    title: `${post.title} - Fudoshin Ryu`,
    description: post.excerpt,
    openGraph: post.image_url
      ? {
          images: [post.image_url],
        }
      : undefined,
  }
}

async function getBlogPost(slug: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug, published: true },
    })
    return post
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Header */}
        <section className="bg-card py-12 border-b border-red-600/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-red-600 hover:text-red-400 mb-6 font-semibold transition"
            >
              <ArrowLeft size={20} />
              Volver al Blog
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-muted-foreground">
              <span>
                {new Date(post.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>Por {post.author}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image_url && (
          <div className="bg-card">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-red-600/20">
                <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph, idx) => {
                if (!paragraph.trim()) return null

                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1
                  const text = paragraph.replace(/^#+\s*/, "")

                  if (level === 1) {
                    return (
                      <h1 key={idx} className="text-4xl font-bold text-foreground mb-4 mt-8">
                        {text}
                      </h1>
                    )
                  }
                  if (level === 2) {
                    return (
                      <h2 key={idx} className="text-3xl font-bold text-foreground mb-3 mt-6">
                        {text}
                      </h2>
                    )
                  }
                  if (level === 3) {
                    return (
                      <h3 key={idx} className="text-2xl font-bold text-foreground mb-2 mt-4">
                        {text}
                      </h3>
                    )
                  }
                }

                if (paragraph.match(/^\d+\./)) {
                  return (
                    <div key={idx} className="ml-4 mb-4">
                      <p className="text-foreground leading-relaxed">{paragraph}</p>
                    </div>
                  )
                }

                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={idx} className="list-disc ml-6 mb-4">
                      <li className="text-foreground leading-relaxed">{paragraph.replace(/^- /, "")}</li>
                    </ul>
                  )
                }

                return (
                  <p key={idx} className="text-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Author Bio */}
            <div className="mt-16 pt-8 border-t-2 border-red-600/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{post.author}</h3>
                  <p className="text-muted-foreground">Sensei y fundador de Fudoshin Ryu, afiliado a JKA</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
