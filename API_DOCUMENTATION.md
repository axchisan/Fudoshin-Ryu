# Documentación de API

## Autenticación

Todos los endpoints de admin requieren autenticación JWT vía cookies.

### Login

\`\`\`
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@fudoshinryu.com",
  "password": "tu_contraseña"
}

Response: 200 OK
{
  "token": "eyJ...",
  "admin": { "id": "...", "email": "...", "name": "..." }
}
\`\`\`

### Logout

\`\`\`
POST /api/admin/logout
Authorization: Bearer <token>

Response: 200 OK
{ "success": true }
\`\`\`

### Verificar sesión

\`\`\`
GET /api/admin/auth/me

Response: 200 OK
{
  "admin": { "id": "...", "email": "...", "name": "..." }
}
\`\`\`

## Galería

### Listar imágenes

\`\`\`
GET /api/admin/gallery

Response: 200 OK
[
  { "id": "...", "title": "...", "image_url": "...", "category": "..." }
]
\`\`\`

### Subir imagen

\`\`\`
POST /api/admin/upload
Content-Type: multipart/form-data

file: <binary>

Response: 200 OK
{ "filename": "...", "url": "/uploads/..." }
\`\`\`

### Crear imagen en galería

\`\`\`
POST /api/admin/gallery
Content-Type: application/json

{
  "title": "Clase de Karate",
  "image_url": "/uploads/...",
  "category": "Clases",
  "published": true
}

Response: 201 Created
{ "id": "...", "title": "...", ... }
\`\`\`

### Eliminar imagen

\`\`\`
DELETE /api/admin/gallery/<id>

Response: 200 OK
{ "success": true }
\`\`\`

## Blog

### Listar posts

\`\`\`
GET /api/admin/blog

Response: 200 OK
[ { "id": "...", "title": "...", "slug": "...", ... } ]
\`\`\`

### Crear post

\`\`\`
POST /api/admin/blog
Content-Type: application/json

{
  "title": "Mi artículo",
  "slug": "mi-articulo",
  "excerpt": "...",
  "content": "...",
  "published": true
}

Response: 201 Created
{ "id": "...", ... }
\`\`\`

## Estadísticas

\`\`\`
GET /api/admin/stats

Response: 200 OK
{
  "totalMessages": 5,
  "totalPosts": 3,
  "totalImages": 12,
  "totalTestimonials": 8
}
\`\`\`
