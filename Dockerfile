# ============= BUILD STAGE =============
FROM node:20-alpine AS builder

RUN apk add --no-cache \
    openssl3 \
    libc6-compat \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

# Cache de dependencias
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Generar cliente Prisma (ahora SÍ funciona)
RUN npx prisma generate

# Build de Next.js
RUN pnpm run build

# ============= RUNTIME STAGE =============
FROM node:20-alpine AS runner

# También en runtime (Prisma lo necesita al iniciar)
RUN apk add --no-cache \
    openssl3 \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# Copiar artefactos
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN mkdir -p ./public/uploads && chmod 755 ./public/uploads

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["sh", "-c", "npx prisma migrate deploy && next start"]