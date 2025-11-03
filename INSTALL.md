# 📦 Guía de Instalación - Frontend

## ⚡ Instalación Rápida

### Paso 1: Instalar Dependencias Base
```bash
npm install
```

### Paso 2: Instalar Apollo Client y GraphQL
```bash
npm install apollo-angular@7.0.2 @apollo/client@3.11.0 graphql@16.9.0
```

### Paso 3: Verificar Instalación
```bash
npm list apollo-angular @apollo/client graphql
```

Deberías ver:
```
├── @apollo/client@3.11.0
├── apollo-angular@7.0.2
└── graphql@16.9.0
```

### Paso 4: Ejecutar el Proyecto
```bash
npm start
```

O con Angular CLI:
```bash
ng serve
```

El proyecto estará disponible en: `http://localhost:4200`

## 🔧 Configuración

### Configurar URL del Backend

Edita `src/app/core/graphql/graphql.module.ts`:

```typescript
const uri = 'http://localhost:8080/graphql'; // Cambiar si es necesario
```

### Configurar URL del API REST (Legacy)

Edita `src/app/api.service.ts`:

```typescript
private apiUrl = 'http://localhost:8080/api'; // Cambiar si es necesario
```

## 🚨 Solución de Problemas

### Error: Cannot find module 'apollo-angular'

**Solución:**
```bash
npm install apollo-angular @apollo/client graphql --save
```

### Error: Module not found @apollo/client/core

**Solución:**
```bash
npm install @apollo/client --save
```

### Error de compilación TypeScript

**Solución:**
```bash
# Limpiar caché
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Puerto 4200 ya en uso

**Solución:**
```bash
# Usar otro puerto
ng serve --port 4201
```

## 📋 Dependencias Completas

### Dependencias de Producción
```json
{
  "@angular/animations": "^18.2.0",
  "@angular/common": "^18.2.0",
  "@angular/compiler": "^18.2.0",
  "@angular/core": "^18.2.0",
  "@angular/forms": "^18.2.0",
  "@angular/platform-browser": "^18.2.0",
  "@angular/platform-browser-dynamic": "^18.2.0",
  "@angular/platform-server": "^18.2.0",
  "@angular/router": "^18.2.0",
  "@angular/ssr": "^18.2.10",
  "apollo-angular": "^7.0.2",
  "@apollo/client": "^3.11.0",
  "graphql": "^16.9.0",
  "express": "^4.18.2",
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.4",
  "jwt-decode": "^4.0.0",
  "rxjs": "~7.8.0",
  "sweetalert2": "^11.14.4",
  "tslib": "^2.3.0",
  "zone.js": "~0.14.10"
}
```

### Dependencias de Desarrollo
```json
{
  "@angular-devkit/build-angular": "^18.2.10",
  "@angular/cli": "^18.2.10",
  "@angular/compiler-cli": "^18.2.0",
  "@types/express": "^4.17.17",
  "@types/jasmine": "~5.1.0",
  "@types/node": "^18.18.0",
  "jasmine-core": "~5.2.0",
  "karma": "~6.4.0",
  "karma-chrome-launcher": "~3.2.0",
  "karma-coverage": "~2.2.0",
  "karma-jasmine": "~5.1.0",
  "karma-jasmine-html-reporter": "~2.1.0",
  "typescript": "~5.5.2"
}
```

## ✅ Verificación de Instalación

### 1. Verificar Node.js y npm
```bash
node --version  # Debería ser >= 16.0.0
npm --version   # Debería ser >= 8.0.0
```

### 2. Verificar Angular CLI
```bash
ng version
```

### 3. Verificar Dependencias GraphQL
```bash
npm list | grep -E "apollo|graphql"
```

### 4. Compilar el Proyecto
```bash
ng build
```

Si la compilación es exitosa, todo está correctamente instalado.

## 🎯 Próximos Pasos

1. ✅ Instalar dependencias
2. ✅ Configurar URLs del backend
3. ✅ Ejecutar el proyecto
4. 📖 Leer [MIGRACION_GRAPHQL.md](./MIGRACION_GRAPHQL.md)
5. 🔧 Migrar componentes de REST a GraphQL

## 📚 Recursos

- [Documentación de Apollo Angular](https://apollo-angular.com/docs/)
- [GraphQL Official](https://graphql.org/)
- [Angular Official](https://angular.io/)

## 💡 Consejos

- Usa `npm ci` en lugar de `npm install` para instalaciones más rápidas y consistentes
- Mantén las dependencias actualizadas con `npm outdated`
- Usa `ng serve --open` para abrir automáticamente el navegador
