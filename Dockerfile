# ========= BUILD STAGE =========
FROM node:20-alpine AS builder

# instalar dependencias del sistema
RUN apk add --no-cache openssl3 libc6-compat \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# copiar package.json + lockfile para aprovechar cache
COPY package.json package-lock.json* ./

RUN npm install --legacy-peer-deps

# copiar prisma y generar el cliente
COPY prisma ./prisma/
RUN npx prisma generate --schema=./prisma/schema.prisma

# copiar el resto del código
COPY . .

RUN npm run build

# ========= RUNTIME STAGE =========
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl3 \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# permisos para uploads
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
