# Guía de Deployment

## Opción 1: Vercel (Recomendado)

Vercel es la plataforma oficial de Vercel y es perfecta para Next.js.

### Pasos:

1. **Sube tu proyecto a GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/fudoshin-ryu.git
   git push -u origin main
   \`\`\`

2. **Ve a vercel.com**
   - Inicia sesión con GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio
   - Configura las variables de entorno si es necesario
   - Haz clic en "Deploy"

3. **Tu sitio estará en**: https://fudoshin-ryu.vercel.app

### Configurar dominio personalizado

1. En Vercel, ve a Settings → Domains
2. Agrega tu dominio (ej: fudoshinryu.com)
3. Sigue las instrucciones para actualizar los registros DNS

## Opción 2: Netlify

### Pasos:

1. Sube a GitHub (igual que arriba)

2. Ve a netlify.com
   - Inicia sesión
   - Haz clic en "New site from Git"
   - Conecta GitHub
   - Selecciona tu repositorio

3. Configuración:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. Deploy automático

## Opción 3: Railway

### Pasos:

1. Ve a railway.app
2. Crea una nueva cuenta
3. Crea un nuevo proyecto
4. Conecta GitHub
5. Selecciona tu repositorio
6. Railway detectará que es Next.js y configurará automáticamente
7. Deploy

## Opción 4: Docker + VPS

Para más control, puedes usar Docker en un VPS (DigitalOcean, AWS, etc.)

### Dockerfile:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Build y run:

\`\`\`bash
docker build -t fudoshin-ryu .
docker run -p 3000:3000 fudoshin-ryu
\`\`\`

## Variables de Entorno en Producción

Para cada plataforma, configura:

**Vercel**:
- Settings → Environment Variables
- Agrega cada variable

**Netlify**:
- Site settings → Build & deploy → Environment
- Agrega cada variable

**Railway**:
- Project → Variables
- Agrega cada variable

## Monitoreo

Después de deployar:

1. ✅ Verifica que el sitio carga
2. ✅ Prueba el login del admin
3. ✅ Prueba el formulario de contacto
4. ✅ Verifica que las imágenes se ven bien
5. ✅ Prueba en mobile
6. ✅ Verifica la velocidad (Lighthouse)

### Lighthouse

En Chrome DevTools:
1. Presiona F12
2. Ve a Lighthouse
3. Genera reporte
4. Objetivo: Verde (>90)

## Backup Automático

Si usas una base de datos:

**Vercel**: Usa Vercel Postgres o conecta tu BD existente

**Railway**: Ofrece backups automáticos

**VPS**: Configura tu propio script de backup

\`\`\`bash
# Ejemplo: cron job para backup diario
0 2 * * * pg_dump -U user fudoshin_ryu > /backups/$(date +\%Y\%m\%d).sql
\`\`\`

## SSL/HTTPS

Todas las plataformas proporcionan SSL automático y gratuito. ✅

## Optimizaciones en Producción

1. **Habilitar compresión**: Vercel lo hace automáticamente
2. **CDN**: Vercel Edge Network (automático)
3. **Caché**: Configurar headers de caché
4. **Imágenes**: Next/Image optimiza automáticamente

## Dominio Personalizado

El sitio debería estar en: **fudoshinryu.com**

Registra el dominio en:
- Namecheap
- GoDaddy
- Google Domains
- Tu registrador preferido

Luego, apunta los registros DNS a tu plataforma de hosting.

## Soporte Inicial

Si algo falla:

1. Revisa los logs
2. Verifica que .env esté configurado
3. Intenta redeploy
4. Limpia caché del navegador
5. Contacta con soporte de la plataforma

---

¡Tu sitio está en vivo! 🚀
\`\`\`

\`\`\`text file="CHECKLIST.md"
# Checklist - Antes de Ir en Vivo

## Frontend
- [ ] Todos los textos están en español
- [ ] Los logos se ven correctamente
- [ ] Las imágenes se cargan sin errores
- [ ] El sitio se ve bien en mobile
- [ ] El sitio se ve bien en tablet
- [ ] El sitio se ve bien en desktop
- [ ] Todos los links funcionan
- [ ] El formulario de contacto funciona
- [ ] WhatsApp flotante funciona
- [ ] Menú de navegación funciona

## Admin
- [ ] Puedes iniciar sesión
- [ ] Puedes editar contenido
- [ ] Puedes crear posts de blog
- [ ] Puedes subir fotos
- [ ] Puedes agregar testimonios
- [ ] Puedes ver mensajes
- [ ] Todos los botones funcionan

## SEO
- [ ] Meta tags configurados
- [ ] Open Graph tags configurados
- [ ] Favicon visible
- [ ] Sitemap.xml (opcional pero recomendado)
- [ ] Robots.txt configurado

## Seguridad
- [ ] HTTPS habilitado
- [ ] Contraseña de admin es fuerte
- [ ] Variables de entorno seguras
- [ ] No hay datos sensibles en el código

## Performance
- [ ] Lighthouse score > 90
- [ ] Tiempo de carga < 3 segundos
- [ ] Imágenes optimizadas
- [ ] No hay console errors

## Contenido
- [ ] Biografía del Sensei actualizada
- [ ] Filosofía completada
- [ ] Horarios correctos
- [ ] Ubicaciones correctas
- [ ] Teléfono correcto
- [ ] Email correcto
- [ ] Links de redes sociales correctos
- [ ] Al menos 2-3 posts de blog
- [ ] Al menos 5-10 fotos en galería
- [ ] Al menos 2-3 testimonios

## Dominio
- [ ] Dominio registrado (fudoshinryu.com)
- [ ] DNS apuntando al host
- [ ] SSL configurado

## Backup
- [ ] Código en GitHub
- [ ] Backup de contenido (si hay BD)

## Post-Lanzamiento
- [ ] Compartir con amigos/familia
- [ ] Publicar en redes sociales
- [ ] Solicitar a alumnos que visiten
- [ ] Recolectar feedback
- [ ] Monitorear el tráfico

---

¡Listo para lanzar! 🚀
