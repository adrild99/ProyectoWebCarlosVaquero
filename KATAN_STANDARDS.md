# KATAN STUDIO — Estándares de Desarrollo

Documento de política oficial. Aplica a todos los proyectos de la agencia:
**KatanWeb · VianaNails · KikoteApp · JennyRecords · ProyectoCarlos · Osman**

Última revisión: 2026-05-18

---

## 1. Git Workflow — Feature Branching

### Regla principal

Toda tarea nueva, corrección o mejora se desarrolla en una rama propia creada desde `Develop`.
Los cambios llegan a `main` **exclusivamente** a través de Pull Request revisado.

```
main              ← producción, protegida
  └── Develop     ← integración continua
        ├── feature/nombre-descriptivo
        ├── fix/nombre-del-bug
        └── chore/nombre-de-la-tarea
```

### Nomenclatura de ramas obligatoria

| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feature/` | Nueva funcionalidad |
| `fix/` | Corrección de bug |
| `chore/` | Mantenimiento, dependencias, configuración |
| `docs/` | Documentación únicamente |
| `refactor/` | Refactorización sin cambio funcional |

**Ejemplos correctos:**
```
feature/formulario-multistep
fix/header-mobile-overflow
chore/upgrade-vite-v8
docs/actualizar-readme
```

### Prohibido explícitamente

- **Ramas por nombre de persona** (`rama-pepe`, `adrild-cambios`, `trabajo-maria`) — inrastreables, crean conflictos y no describen qué contienen.
- Push directo a `main` o `Develop` sin PR.
- Ramas con nombres genéricos (`test`, `prueba`, `temporal`, `wip`).

### Mensaje de commit

Formato: `tipo: descripción en imperativo`

```
feat: añadir campo de empresa al formulario de briefing
fix: corregir desbordamiento del header en móvil
chore: forzar tar >= 7.5.11 vía pnpm.overrides
docs: añadir sección de despliegue al README
```

---

## 2. Stack Tecnológico

Stack de referencia de los proyectos de la agencia. Cada proyecto puede tener variaciones justificadas.

### Frontend

| Herramienta | Versión mínima | Notas |
|-------------|---------------|-------|
| Vite | 6.x | Bundler y dev server |
| React | 18.x | UI framework |
| TailwindCSS | 3.x | Estilos utilitarios |
| TypeScript | 5.x | Preferido en proyectos nuevos |

### Backend

| Herramienta | Versión mínima | Notas |
|-------------|---------------|-------|
| Node.js | 20 LTS | Runtime |
| Express | 4.x | Servidor HTTP |
| Mongoose | 8.x | ODM para MongoDB |
| Zod | 3.x | Validación de esquemas |

### Fullstack alternativo

| Stack | Cuándo usarlo |
|-------|--------------|
| Next.js 14+ (App Router) | Cuando se necesita SSR/SSG o un único repo fullstack |

### Seguridad obligatoria en servidores Express

Todo servidor Express incluye por defecto:

- `helmet` — cabeceras HTTP seguras
- `express-rate-limit` — protección contra fuerza bruta
- `express-mongo-sanitize` — prevención de inyección NoSQL
- `cors` — configurado explícitamente; nunca `origin: '*'` en producción

---

## 3. Gestión de Paquetes — pnpm

### Regla

**El gestor de paquetes oficial de todos los proyectos es `pnpm`.** No usar `npm` ni `yarn`.

El archivo de lock es `pnpm-lock.yaml`. Este archivo **sí se versiona** en git.
Si existe un `package-lock.json` o `yarn.lock` residual, eliminarlo.

### Comandos habituales

```bash
pnpm install           # instalar dependencias
pnpm add <paquete>     # añadir dependencia
pnpm add -D <paquete>  # añadir devDependency
pnpm remove <paquete>  # eliminar dependencia
pnpm run dev           # ejecutar script dev
pnpm audit             # revisar vulnerabilidades
```

### Monorepo (proyectos con frontend + backend)

Cuando el proyecto tiene `frontend/` y `backend/` como workspaces, los comandos desde la raíz:

```bash
pnpm --dir frontend run dev    # arrancar frontend
pnpm --dir backend run dev     # arrancar backend
pnpm --dir frontend add react  # añadir dep solo al frontend
```

El script `dev` raíz usa `concurrently` para levantar ambos a la vez:

```json
"dev": "concurrently -n \"frontend,backend\" -c \"cyan,magenta\" \"pnpm --dir frontend run dev\" \"pnpm --dir backend run dev\""
```

### Subdependencias vulnerables (overrides)

En pnpm, los overrides van dentro de la clave `"pnpm"` del `package.json`:

```json
"pnpm": {
  "overrides": {
    "paquete-vulnerable": "^version-segura"
  }
}
```

> No usar la clave `"overrides"` de npm a nivel raíz: en pnpm no tiene efecto.

Documentar el motivo con un comentario en el PR correspondiente.

### Módulos nativos (binarios compilados)

Paquetes como `sharp` o `bcrypt` requieren compilación nativa. Declararlos en `onlyBuiltDependencies` para evitar advertencias:

```json
"pnpm": {
  "onlyBuiltDependencies": ["bcrypt", "sharp"]
}
```

### Upgrades de versión mayor

Nunca hacer un upgrade de versión mayor (`v5 → v8`) en una rama de feature o fix.
Abrir una rama `chore/upgrade-[paquete]-v[version]` dedicada con una checklist de pruebas antes de mergear.

---

## 4. Arquitectura — Separación Frontend / Backend

### Principio

El código de interfaz y el código de servidor **nunca comparten directorio raíz**.
Un desarrollador que abra el repositorio debe saber inmediatamente qué es frontend y qué es backend.

### Estructura para proyectos con backend propio (monorepo)

```
proyecto/
  frontend/           ← Vite + React (JSX/TSX) + Tailwind
    src/
      api/            ← Llamadas al backend (fetch/axios)
      assets/
      components/
      context/
      hooks/
      pages/
      utils/
    public/
    index.html
    vite.config.js
    package.json
    pnpm-lock.yaml

  backend/            ← Express + MongoDB/Mongoose (ESM)
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
      utils/
    public/           ← Assets servidos por el servidor (uploads, etc.)
    package.json
    pnpm-lock.yaml

  package.json        ← Raíz: scripts concurrentes + devDependencies compartidas
```

### Estructura para proyectos solo frontend

```
proyecto/
  src/
    assets/
    components/
    context/
    hooks/
    pages/
    utils/
  public/
  index.html
  vite.config.js (o .ts)
  package.json
  pnpm-lock.yaml
```

### Estructura para proyectos Next.js (fullstack en un solo repo)

```
proyecto/
  src/
    app/              ← App Router (layouts, pages, loading, error)
    components/
    context/
    lib/              ← Utilidades del servidor (DB, auth, etc.)
    models/           ← Modelos Mongoose
    types/
  public/
  middleware.ts
  next.config.mjs
  package.json
  pnpm-lock.yaml
```

### Qué va en cada capa

| Frontend | Backend |
|----------|---------|
| Componentes React | Rutas Express / API Routes Next.js |
| Estilos CSS/Tailwind | Controladores y servicios |
| Assets, imágenes | Conexión a base de datos |
| Llamadas a APIs (fetch) | Lógica de negocio sensible |
| Validación de UX | Validación canónica con Zod |

> Las llamadas a APIs de terceros que solo necesitan claves públicas (Stripe public key, HubSpot portal ID) pueden hacerse desde el frontend. Las que usan claves secretas van siempre en el backend.

---

## 5. Gestión de Entornos — Variables de Entorno

### Reglas

1. **Nunca subir valores reales al repositorio.** El archivo `.env` siempre está en `.gitignore`.
2. **`.env.example` es el contrato del equipo.** Contiene las claves necesarias igualadas a vacío o con un comentario descriptivo. Este archivo **sí está en git**.
3. **Nunca poner secretos como constantes hardcodeadas** en el código fuente.

### Formato de `.env.example`

```bash
# Base de datos
MONGODB_URI=              # ej. mongodb+srv://user:pass@cluster/db

# Autenticación
JWT_SECRET=               # secreto para firmar tokens — mínimo 32 caracteres

# Servicio de pagos
STRIPE_SECRET_KEY=        # clave secreta — solo backend
STRIPE_PUBLIC_KEY=        # clave pública — puede ir en frontend

# Terceros
HUBSPOT_PORTAL_ID=        # ID público del portal HubSpot
HUBSPOT_FORM_ID=          # UUID del formulario HubSpot
```

### Prefijo VITE_ en el frontend

Variables de entorno expuestas al bundle de Vite **deben** llevar el prefijo `VITE_`:

```bash
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Distinción clave / secreto

| Tipo | Ejemplo | ¿Puede ir en frontend? |
|------|---------|------------------------|
| Clave pública | `VITE_STRIPE_PUBLIC_KEY` | Sí |
| Clave secreta | `STRIPE_SECRET_KEY` | **Nunca** |
| ID de integración | `HUBSPOT_PORTAL_ID` | Sí (no es un secreto) |
| URI de base de datos | `MONGODB_URI` | **Nunca** |

---

## 6. Seguridad de Código

### Expresiones Regulares (ReDoS)

Antes de añadir una regex, evaluar:

- ¿Puede una cadena maliciosa provocar backtracking exponencial?
- Patrón de riesgo: cuantificadores anidados como `(a+)+`, `(a|aa)+`.
- Patrón seguro: clases de caracteres `[abc]`, anchors `^...$`, cuantificadores simples.

```js
// INSEGURO — backtracking exponencial posible
/^(a+)+$/

// SEGURO — character class simple, O(n)
/^[a-zA-Z0-9 ]{1,100}$/
```

Para inputs de usuario, validar siempre con anchor de inicio y fin (`^`, `$`) y un límite máximo de longitud.

### Inputs de formulario

- Sanitizar en el frontend para UX (feedback inmediato).
- Validar canónicamente siempre en el backend con Zod u otro validador de esquemas.
- Nunca confiar únicamente en la validación del cliente.

---

## 7. Herramientas de IA y Cachés

Los siguientes directorios **nunca** se suben al repositorio (ya están en `.gitignore`):

```
.claude/settings.local.json   ← configuración local de Claude Code
.claude/memory/               ← memoria de sesión de Claude
.cursor/                      ← Cursor AI
.aider/                       ← Aider
.copilot/                     ← GitHub Copilot
.continue/                    ← Continue.dev
.codeium/                     ← Codeium
.windsurf/                    ← Windsurf
```

Lo que **sí** se versiona de `.claude/`:
- `.claude/settings.json` — configuración compartida del proyecto
- `.claude/agents/` — definiciones de agentes del proyecto

---

*Este documento es un artefacto vivo. Cualquier excepción a estas reglas debe documentarse con una justificación en el PR que la introduce.*
