# ============= BUILD STAGE =============
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl3 libc6-compat \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Dependencias
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

# Generar cliente Prisma ANTES de copiar el resto del código
RUN npx prisma generate

# Ahora copiar el resto
COPY . .

# Build
RUN pnpm run build

# ============= RUNTIME STAGE =============
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl3 \
    && ln -sf /usr/lib/openssl-3/libcrypto.so.3 /usr/lib/libcrypto.so \
    && ln -sf /usr/lib/openssl-3/libssl.so.3 /usr/lib/libssl.so

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# Copiar artefactos generados
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN mkdir -p ./public/uploads && chmod 755 ./public/uploads

EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["sh", "-c", "npx prisma migrate deploy && next start"]