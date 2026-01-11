# Solución para el error de módulos no encontrados

Este es un problema común de caché de Turbopack en Next.js 16. 

## Solución rápida:

Ejecuta estos comandos en tu terminal:

```bash
# 1. Detener el servidor (Ctrl+C si está corriendo)

# 2. Eliminar caché y carpetas de build
rm -rf .next
rm -rf node_modules/.cache

# 3. Reinstalar dependencias (opcional pero recomendado)
npm install

# 4. Reiniciar el servidor
npm run dev
```

## Si el problema persiste:

```bash
# Limpieza completa
rm -rf .next
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

## Verificación:

Todos los componentes existen en la carpeta `components/`:
- ✅ navbar.tsx
- ✅ footer.tsx
- ✅ theme-provider.tsx
- ✅ hero-section.tsx
- ✅ home-about-preview.tsx
- ✅ home-schedule-preview.tsx
- ✅ home-gallery-preview.tsx
- ✅ home-blog-preview.tsx
- ✅ home-testimonials-preview.tsx

El problema es solo el caché de Turbopack que no está detectando los archivos correctamente.
