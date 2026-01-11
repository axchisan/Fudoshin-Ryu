"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { BlogImageUpload } from "@/components/blog-image-upload"
import { Loader2, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  author: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch("/api/admin/auth/me")
      if (!authRes.ok) {
        router.push("/admin/login")
        return
      }
      fetchPosts()
    } catch (err) {
      console.error("[v0] Auth error:", err)
      router.push("/admin/login")
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog")
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (err) {
      console.error("[v0] Error fetching posts:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSavePost = async () => {
    if (!editing || !editing.title || !editing.excerpt || !editing.content) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsSaving(true)
    try {
      const slug = editing.slug || generateSlug(editing.title)
      const postData = {
        ...editing,
        slug,
        author: editing.author || "Sensei Leonardo Vanegas",
        published: editing.published || false,
      }

      const url = editing.id ? `/api/admin/blog/${editing.id}` : "/api/admin/blog"
      const method = editing.id ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (res.ok) {
        setEditing(null)
        fetchPosts()
      } else {
        alert("Error al guardar la publicación")
      }
    } catch (err) {
      console.error("[v0] Error saving post:", err)
      alert("Error al guardar la publicación")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error("[v0] Error deleting post:", err)
    }
  }

  const togglePublished = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      })

      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error("[v0] Error toggling published:", err)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Gestionar Blog">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="animate-spin text-red-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Gestionar Blog">
      <div className="space-y-6">
        <button
          onClick={() =>
            setEditing({
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              image_url: "",
              author: "Sensei Leonardo Vanegas",
              published: false,
            })
          }
          className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-500 active:scale-95"
        >
          + Nueva Publicación
        </button>

        {/* Edit Form */}
        {editing && (
          <div className="bg-card border-2 border-red-600/50 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {editing.id ? "Editar Publicación" : "Nueva Publicación"}
            </h3>

            <div>
              <label className="block text-foreground font-semibold mb-2">Título *</label>
              <input
                type="text"
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Título de la publicación"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Slug (URL) {editing.title && !editing.slug && "(se generará automáticamente)"}
              </label>
              <input
                type="text"
                value={editing.slug || ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder={editing.title ? generateSlug(editing.title) : "slug-de-la-publicacion"}
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Extracto *</label>
              <textarea
                value={editing.excerpt || ""}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                rows={2}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Breve descripción..."
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Contenido *</label>
              <textarea
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={12}
                className="w-full bg-background border border-border text-foreground px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Contenido completo (puedes usar Markdown)..."
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">Imagen del Blog (Opcional)</label>
              <BlogImageUpload
                currentImageUrl={editing.image_url}
                onImageChange={(url) => setEditing({ ...editing, image_url: url })}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published || false}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-600"
                />
                <span className="text-foreground font-semibold">Publicar inmediatamente</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSavePost}
                disabled={isSaving}
                className="flex-1 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Guardando...
                  </span>
                ) : (
                  "Guardar"
                )}
              </button>
              <button
                onClick={() => setEditing(null)}
                disabled={isSaving}
                className="flex-1 bg-muted text-muted-foreground font-bold py-3 rounded-lg hover:bg-muted/80 transition-all duration-500 disabled:opacity-50 active:scale-95"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Publicaciones</h3>
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No hay publicaciones aún</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-red-600/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
                      {post.published ? (
                        <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-semibold rounded-full border border-green-600/30">
                          Publicado
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-600/30">
                          Borrador
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{post.excerpt.substring(0, 150)}...</p>
                    <p className="text-xs text-muted-foreground">
                      Por {post.author} • {new Date(post.createdAt).toLocaleDateString("es-ES")}
                    </p>
                    {post.image_url && <p className="text-xs text-green-600 mt-1">Con imagen</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePublished(post)}
                      className="p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-300"
                      title={post.published ? "Despublicar" : "Publicar"}
                    >
                      {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                      onClick={() => setEditing(post)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 bg-muted hover:bg-destructive text-foreground hover:text-destructive-foreground rounded-lg transition-all duration-300"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
