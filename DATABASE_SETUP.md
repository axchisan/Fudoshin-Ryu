# Configuración de Base de Datos - Fudoshin Ryu

## Opción 1: PostgreSQL Local (Desarrollo)

### Prerrequisitos
- PostgreSQL 14+ instalado
- Node.js 18+

### Pasos

1. **Crear base de datos:**
   \`\`\`bash
   createdb fudoshin_ryu
   \`\`\`

2. **Crear usuario:**
   \`\`\`bash
   psql -d fudoshin_ryu -c "CREATE USER fudoshin_user WITH PASSWORD 'tu_contraseña';"
   psql -d fudoshin_ryu -c "ALTER ROLE fudoshin_user CREATEDB;"
   psql -d fudoshin_ryu -c "GRANT ALL PRIVILEGES ON DATABASE fudoshin_ryu TO fudoshin_user;"
   \`\`\`

3. **Configurar .env.local:**
   \`\`\`
   DATABASE_URL="postgresql://fudoshin_user:tu_contraseña@localhost:5432/fudoshin_ryu"
   \`\`\`

4. **Ejecutar migraciones:**
   \`\`\`bash
   npm run db:setup
   \`\`\`

## Opción 2: Docker (Desarrollo + Producción)

\`\`\`bash
# Build e iniciar con Docker Compose
docker-compose up -d

# Esperar a que PostgreSQL esté listo (30 segundos)
sleep 30

# Ejecutar migraciones
docker-compose exec app npm run db:setup
\`\`\`

## Opción 3: Coolify con VPS (Producción)

1. **Variables de entorno en Coolify:**
   \`\`\`
   DATABASE_URL=postgresql://fudoshin_user:contraseña_segura@postgres:5432/fudoshin_ryu
   ADMIN_EMAIL=admin@fudoshinryu.com
   ADMIN_PASSWORD=tu_contraseña_fuerte
   NEXT_PUBLIC_APP_URL=https://tu-dominio.com
   \`\`\`

2. **El Dockerfile hace todo automáticamente:**
   - Instala dependencias
   - Genera cliente Prisma
   - Ejecuta migraciones
   - Inicia la app

## Credenciales por defecto

- Email: `admin@fudoshinryu.com`
- Contraseña: `FudoshinRyu2024!`

Cámbialas desde el panel de admin después de loguear.

## Troubleshooting

### Error: "Could not connect to database"
- Verificar que PostgreSQL está corriendo
- Verificar DATABASE_URL en .env.local
- Revisar credenciales de conexión

### Error: "Prisma migration failed"
\`\`\`bash
# Resetear BD (borra todos los datos!)
npx prisma migrate reset
\`\`\`

### Ver logs de migraciones
\`\`\`bash
npx prisma migrate status
