# ========= BUILD STAGE =========
FROM node:20-alpine AS builder

# instalar dependencias del sistema
RUN apk add --no-cache openssl3 libc6-compat \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

# asegurar que el build se haga con NODE_ENV=development para que se instalen devDependencies
ENV NODE_ENV=development

# copiar package.json + lockfile para aprovechar cache
COPY package.json package-lock.json ./

# instalar dependencias (npm ci ejecuta scripts y descarga engines necesarios)
RUN npm ci --legacy-peer-deps

# copiar prisma y generar el cliente (ahora que los engines están instalados)
COPY prisma ./prisma
RUN npx prisma generate --schema=prisma/schema.prisma

# copiar el resto del código y construir (Next.js)
COPY . .
RUN npm run build

# ========= RUNTIME STAGE =========
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl3 \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

# NODE_ENV=production en runtime
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiamos package.json y package-lock.json para referencia (no instalamos deps aquí)
COPY package.json package-lock.json ./

# Copiar artefactos generados desde el builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copiar node_modules completos que se generaron en el builder
# esto asegura que los engines de Prisma y demás binarios estén disponibles
COPY --from=builder /app/node_modules ./node_modules

# permisos para uploads
RUN mkdir -p ./public/uploads && chmod 755 ./public/uploads

EXPOSE 3000

# En runtime ejecutamos migraciones y levantamos Next.js
CMD ["sh", "-c", "npx prisma migrate deploy && next start -p 3000"]
