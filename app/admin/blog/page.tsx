"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

interface BlogPost {
  id?: string
  title: string
  content: string
  excerpt: string
  featured_image?: string
}

export default function BlogPage() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthed(true)
    fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/blog", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (err) {
      console.error("Error fetching posts:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePost = async () => {
    if (!editing) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/blog", {
        method: editing.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        setEditing(null)
        fetchPosts()
      }
    } catch (err) {
      console.error("Error saving post:", err)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return

    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error("Error deleting post:", err)
    }
  }

  if (!isAuthed || isLoading) return null

  return (
    <AdminLayout title="Gestionar Blog">
      <div className="space-y-6">
        <button
          onClick={() => setEditing({ title: "", content: "", excerpt: "" })}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          + Nueva Publicación
        </button>

        {/* Edit Form */}
        {editing && (
          <div className="bg-gray-900 border-2 border-red-600 p-6 rounded">
            <input
              type="text"
              placeholder="Título"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <textarea
              placeholder="Extracto"
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              rows={2}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <textarea
              placeholder="Contenido"
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={8}
              className="w-full bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSavePost}
                className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-400">No hay publicaciones aún</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 border border-red-600 p-4 rounded flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold text-white">{post.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{post.excerpt.substring(0, 100)}...</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditing(post)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => post.id && handleDeletePost(post.id)}
                    className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-800 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
