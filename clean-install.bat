@echo off
echo Limpiando proyecto...

REM Eliminar directorios de cache y build
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
if exist .turbo rmdir /s /q .turbo

echo Limpieza completa
echo Instalando dependencias...

REM Instalar dependencias
call npm install

echo Instalacion completa
echo Generando cliente de Prisma...

REM Generar cliente de Prisma
call npm run prisma:generate

echo Todo listo!
echo Ejecuta 'npm run dev' para iniciar el servidor de desarrollo
