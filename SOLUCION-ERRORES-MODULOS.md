# Solución para Errores de Módulos No Encontrados

Si estás experimentando errores donde Next.js no puede resolver los módulos (como `Can't resolve '@/components/...'`), sigue estos pasos:

## Solución Rápida

### En Linux/Mac:
```bash
chmod +x clean-install.sh
./clean-install.sh
```

### En Windows:
```bash
clean-install.bat
```

### Manual:
```bash
# 1. Limpiar todo
rm -rf .next node_modules .turbo

# 2. Reinstalar
npm install

# 3. Generar Prisma
npm run prisma:generate

# 4. Iniciar servidor
npm run dev
```

## ¿Por qué ocurre esto?

Next.js 16.0.3 con Turbopack tiene problemas conocidos con la resolución de módulos después de múltiples cambios en el código. He actualizado Next.js a la versión 15.1.6 que es más estable.

## Si el problema persiste

1. Verifica que tu archivo `tsconfig.json` tenga la configuración correcta de paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

2. Asegúrate de que todos los componentes tengan las exportaciones correctas
3. Reinicia tu editor de código (VSCode, etc.)
4. Intenta con webpack en lugar de Turbopack temporalmente:
```bash
TURBOPACK=0 npm run dev
```

## Notas Importantes

- He cambiado Next.js de 16.0.3 a 15.1.6 porque la versión 16 tiene una vulnerabilidad de seguridad y problemas de estabilidad
- Los scripts de limpieza están incluidos para facilitar el proceso
- Siempre ejecuta `npm run prisma:generate` después de reinstalar dependencias
