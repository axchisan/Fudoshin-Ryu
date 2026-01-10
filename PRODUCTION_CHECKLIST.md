# Checklist para Producción

## Seguridad

- [ ] Cambiar `JWT_SECRET` a un valor aleatorio largo
- [ ] Cambiar `ADMIN_PASSWORD` a una contraseña fuerte
- [ ] Cambiar contraseña del admin en panel después de login
- [ ] Habilitar HTTPS/SSL con Let's Encrypt
- [ ] Configurar firewall para permitir solo puertos 80 y 443
- [ ] Desactivar SSH password, usar solo keys
- [ ] Actualizar PostgreSQL a versión estable más reciente

## Performance

- [ ] Configurar Nginx con caché estático
- [ ] Verificar compresión gzip habilitada
- [ ] Optimizar imágenes en galería
- [ ] Configurar CDN si es necesario

## Monitoreo

- [ ] Configurar logs centralizados
- [ ] Setup de alertas para errores
- [ ] Monitoreo de espacio en disco
- [ ] Monitoreo de uso de BD

## Backups

- [ ] Configurar backups automáticos de BD
- [ ] Configurar backups automáticos de uploads
- [ ] Probar restauración de backups

## SEO

- [ ] Verificar metadata en todas las páginas
- [ ] Verificar sitemap.xml
- [ ] Verificar robots.txt
- [ ] Testear con Google Search Console

## Testing

- [ ] Probar login/logout
- [ ] Probar upload de imágenes
- [ ] Probar edición de contenido
- [ ] Probar responsividad en móvil
- [ ] Probar tema oscuro/claro
