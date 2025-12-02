# Setup de Fudoshin Ryu - Guía Completa

## Requisitos Previos

- Node.js 18+
- PostgreSQL 14+
- Git

## Instalación Local (Desarrollo)

### 1. Clonar y configurar

\`\`\`bash
git clone <tu-repo>
cd fudoshin-ryu
npm install
# o con pnpm
pnpm install
\`\`\`

### 2. Configurar base de datos PostgreSQL

\`\`\`bash
# Crear base de datos
createdb fudoshin_ryu

# Crear usuario
psql -d fudoshin_ryu -c "CREATE USER fudoshin_user WITH PASSWORD 'tu_contraseña';"
psql -d fudoshin_ryu -c "ALTER ROLE fudoshin_user CREATEDB;"
psql -d fudoshin_ryu -c "GRANT ALL PRIVILEGES ON DATABASE fudoshin_ryu TO fudoshin_user;"
\`\`\`

### 3. Configurar variables de entorno

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local`:
\`\`\`
DATABASE_URL="postgresql://fudoshin_user:tu_contraseña@localhost:5432/fudoshin_ryu"
JWT_SECRET="genera-una-cadena-larga-aleatoria-aqui"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### 4. Inicializar base de datos

\`\`\`bash
npm run db:setup
# Esto ejecuta migraciones y siembra datos iniciales
\`\`\`

### 5. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

Accede a `http://localhost:3000`

**Panel Admin**: `http://localhost:3000/admin`
- Email: `admin@fudoshinryu.com`
- Contraseña: `FudoshinRyu2024!`

## Deployment en Coolify/VPS

### 1. Preparar VPS

\`\`\`bash
# SSH a tu VPS
ssh root@tu-vps-ip

# Instalar dependencias
apt update
apt install -y curl git docker.io docker-compose

# Iniciar Docker
systemctl start docker
systemctl enable docker
\`\`\`

### 2. Clonar proyecto

\`\`\`bash
cd /home
git clone <tu-repo> fudoshin-ryu
cd fudoshin-ryu
\`\`\`

### 3. Crear .env en VPS

\`\`\`bash
cat > .env.production << 'EOF'
DATABASE_URL="postgresql://fudoshin_user:contraseña_fuerte_aqui@postgres:5432/fudoshin_ryu"
JWT_SECRET="genera-una-cadena-larga-aleatoria-aqui"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://tu-dominio.com"
ADMIN_EMAIL="admin@fudoshinryu.com"
ADMIN_PASSWORD="contraseña_super_segura_aqui"
DB_PASSWORD="contraseña_fuerte_aqui"
EOF
\`\`\`

### 4. Desplegar con Docker Compose

\`\`\`bash
docker-compose up -d
\`\`\`

Espera 30-60 segundos para que PostgreSQL inicie, luego:

\`\`\`bash
docker-compose exec app npm run db:setup
\`\`\`

### 5. Configurar Nginx (Reverse Proxy)

\`\`\`bash
apt install -y nginx certbot python3-certbot-nginx
\`\`\`

Crear `/etc/nginx/sites-available/fudoshin`:

\`\`\`nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_cache_bypass \\$http_upgrade;
    }
}
\`\`\`

\`\`\`bash
ln -s /etc/nginx/sites-available/fudoshin /etc/nginx/sites-enabled/
systemctl restart nginx

# SSL con Let's Encrypt
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
\`\`\`

## Primera vez usando el Admin

1. Accede a `/admin/login`
2. Login con credenciales por defecto
3. Ve a "Mi Perfil" y **cambia la contraseña inmediatamente**
4. Edita el contenido del dojo desde los diferentes módulos

## Estructura de Carpetas

\`\`\`
fudoshin-ryu/
├── app/
│   ├── page.tsx              # Home
│   ├── about/                # Sobre nosotros
│   ├── schedule/             # Horarios
│   ├── gallery/              # Galería
│   ├── blog/                 # Blog
│   ├── contact/              # Contacto
│   ├── admin/                # Panel admin
│   ├── api/                  # API routes
│   └── layout.tsx
├── components/               # Componentes reutilizables
├── lib/                      # Utilities
├── prisma/
│   └── schema.prisma         # Schema de BD
├── public/
│   └── uploads/              # Imágenes subidas
├── scripts/                  # Scripts de setup
├── Dockerfile
├── docker-compose.yml
└── package.json
\`\`\`

## Mantenimiento

### Backup de base de datos

\`\`\`bash
# Backup local
pg_dump -U fudoshin_user fudoshin_ryu > backup_$(date +%Y%m%d).sql

# Backup en VPS con Docker
docker-compose exec -T postgres pg_dump -U fudoshin_user fudoshin_ryu > backup_$(date +%Y%m%d).sql
\`\`\`

### Restaurar backup

\`\`\`bash
psql -U fudoshin_user fudoshin_ryu < backup_20240115.sql
\`\`\`

### Actualizar código

\`\`\`bash
git pull origin main
npm install
npm run build
docker-compose restart app
\`\`\`

## Troubleshooting

### Error: "Could not connect to database"
- Verificar que PostgreSQL está corriendo
- Verificar DATABASE_URL en .env
- Verificar credenciales

### Error: "Prisma migration failed"
\`\`\`bash
# Resetear (CUIDADO: borra todos los datos)
npx prisma migrate reset
\`\`\`

### Ver logs en producción
\`\`\`bash
docker-compose logs app -f
docker-compose logs postgres -f
\`\`\`

## Soporte

Para problemas contacta al equipo de desarrollo o abre un issue en el repositorio.
