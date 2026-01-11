#!/bin/bash

echo "🧹 Limpiando proyecto..."

# Eliminar directorios de caché y build
rm -rf .next
rm -rf node_modules
rm -rf node_modules/.cache
rm -rf .turbo

echo "✅ Limpieza completa"
echo "📦 Instalando dependencias..."

# Instalar dependencias
npm install

echo "✅ Instalación completa"
echo "🔨 Generando cliente de Prisma..."

# Generar cliente de Prisma
npm run prisma:generate

echo "✅ Todo listo!"
echo "🚀 Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
