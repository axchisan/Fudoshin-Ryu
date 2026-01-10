# Guía del Panel de Administración

## Acceso al Panel

1. Ve a `https://tudominio.com/admin/login`
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"

**Credenciales**:
- Email: `admin@fudoshinryu.com`
- Contraseña: `FudoshinRyu2024!`

## Dashboard Principal

Al iniciar sesión, verás:
- **Estadísticas**: Número de mensajes, posts y fotos
- **Acciones Rápidas**: Botones para acceder rápidamente a cada sección

## Editar Contenido (/admin/content)

Aquí puedes editar los textos principales del sitio:

### Biografía del Sensei
- Texto que aparece en la sección "Sobre Nosotros"
- Máximo: Sin límite, pero mantén entre 200-500 palabras
- Haz clic en "Guardar Cambios"

### Filosofía Fudoshin Ryu
- Descripción de la filosofía de la escuela
- Aparece en la sección "Sobre Nosotros"
- Recomendación: 200-400 palabras

### Linaje JKA y SKD Colombia
- Información sobre la afiliación
- Aparece en la sección "Sobre Nosotros"

**Pasos**:
1. Modifica los textos que desees
2. Haz clic en "Guardar Cambios"
3. Verás un mensaje de confirmación

## Gestionar Blog (/admin/blog)

### Crear Nueva Publicación

1. Haz clic en "+ Nueva Publicación"
2. Rellena:
   - **Título**: Título del artículo (máx 100 caracteres)
   - **Extracto**: Resumen que aparece en la lista (máx 200 caracteres)
   - **Contenido**: El texto completo del artículo
3. Haz clic en "Guardar"

### Editar una Publicación

1. Encuentra el post en la lista
2. Haz clic en "Editar"
3. Modifica lo que necesites
4. Haz clic en "Guardar"

### Eliminar una Publicación

1. Encuentra el post
2. Haz clic en "Eliminar"
3. Confirma en el popup

## Gestionar Galería (/admin/gallery)

### Subir Fotos

1. Haz clic en "Seleccionar Archivos"
2. Elige una o varias fotos (JPG, PNG)
3. Haz clic en "Subir Imágenes"
4. Espera a que termine

**Formatos permitidos**: JPG, PNG, WebP
**Tamaño máximo recomendado**: 5MB por foto

### Eliminar Fotos

1. Pasa el ratón sobre la foto
2. Haz clic en la "X" roja que aparece
3. Confirma que deseas eliminar

## Gestionar Testimonios (/admin/testimonials)

### Agregar Testimonio

1. Haz clic en "+ Nuevo Testimonio"
2. Rellena:
   - **Nombre del alumno**: Nombre completo
   - **Nivel de cinturón**: Ej: "Cinturón Naranja"
   - **Testimonio**: Lo que dijo el alumno (máx 500 caracteres)
3. Haz clic en "Guardar"

### Editar Testimonio

1. Encuentra el testimonio en la lista
2. Haz clic en "Editar"
3. Modifica lo que necesites
4. Haz clic en "Guardar"

### Eliminar Testimonio

1. Haz clic en "Eliminar"
2. Confirma la acción

## Ver Mensajes de Contacto (/admin/messages)

### Leer Mensajes

1. En la lista de la izquierda, verás todos los mensajes
2. Haz clic en uno para ver los detalles
3. Podrás ver:
   - Nombre del contacto
   - Email
   - Teléfono (si lo proporcionó)
   - Fecha del mensaje
   - El mensaje completo

### Responder Mensajes

Los mensajes incluyen:
- Email (puedes responder directamente desde tu cliente de email)
- WhatsApp (si incluye teléfono)

### Eliminar Mensaje

1. Selecciona el mensaje
2. Haz clic en "Eliminar Mensaje"

## Recomendaciones

✅ **Haz**:
- Revisa regularmente los mensajes
- Mantén el contenido actualizado
- Comprueba que las fotos se vean bien
- Usa títulos claros en los posts
- Haz una copia de seguridad de contenido importante

❌ **No hagas**:
- No compartas tu contraseña
- No uses caracteres especiales sin necesidad
- No subas fotos de muy baja calidad
- No escribas textos extremadamente largos en los campos pequeños
- No borres información sin hacer una copia de seguridad

## Soporte

Si encuentras problemas:
1. Intenta cerrar sesión y volver a iniciar
2. Limpia el caché del navegador
3. Usa un navegador diferente
4. Contacta con el desarrollador

---

**Recuerda**: El sitio es tuyo, mantenerlo actualizado hará que los alumnos siempre tengan información fresca y relevante.
\`\`\`

\`\`\`text file=".env.example"
# Ejemplo de variables de entorno
# Copiar a .env.local y llenar con valores reales

# Base de datos (opcional, para futura expansión)
DATABASE_URL="postgresql://user:password@localhost:5432/fudoshin_ryu"

# Email (opcional)
RESEND_API_KEY="re_xxxxx"

# Google Maps (opcional, si usas Maps API)
NEXT_PUBLIC_GOOGLE_MAPS_KEY="AIzaSy..."

# Stripe (opcional, para pagos futuros)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
