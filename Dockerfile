# ============= BUILD STAGE =============
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl3 libc6-compat

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (mejor cache)
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Instalamos pnpm y todas las dependencias (incluidas las dev, necesarias para el build)
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# Copiamos el resto del código
COPY . .

# Generamos el cliente de Prisma 
RUN npx prisma generate

# Construimos la app de Next.js
RUN pnpm run build

# ============= RUNTIME STAGE =============
# Puedes dejar alpine o cambiar a slim si quieres imagen más pequeña y sin problemas
FROM node:20-alpine AS runner

# Necesitamos también openssl en runtime porque el Prisma Client lo usa en tiempo de ejecución
RUN apk add --no-cache openssl3

WORKDIR /app

# Instalamos pnpm global (solo para producción)
RUN npm install -g pnpm

# Copiamos archivos de package
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Instalamos solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Copiamos los artefactos necesarios del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Creamos carpeta de uploads
RUN mkdir -p ./public/uploads && chmod 755 ./public/uploads

# Exponemos puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Migraciones + arranque (ajusta el script si tu package.json lo llama diferente)
CMD ["sh", "-c", "npx prisma migrate deploy && next start"]