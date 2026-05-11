# KATAN STUDIO — Estándares de Desarrollo

Documento de política oficial. Aplica a todos los proyectos de la agencia:
**KatanWeb · Viananails · KikoteApp · JennyRecords · XylosHome**

Última revisión: 2026-05-11

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

- **Ramas por nombre de persona** (`rama-pepe`, `adrild-cambios`, `trabajo-maria`) — estas ramas son inrastreables, crean conflictos de merge y no describen qué contienen.
- Push directo a `main` o `Develop` sin PR.
- Ramas con nombres genéricos (`test`, `prueba`, `temporal`, `wip`).

### Mensaje de commit

Formato: `tipo: descripción en imperativo`

```
feat: añadir campo de empresa al formulario de briefing
fix: corregir desbordamiento del header en móvil
chore: forzar esbuild >= 0.25.0 vía override
docs: añadir sección de despliegue al README
```

---

## 2. Arquitectura — Separación Frontend / Backend

### Principio

El código de interfaz y el código de servidor **nunca comparten directorio raíz**.
Un desarrollador que abra el repositorio debe saber inmediatamente qué es frontend y qué es backend.

### Estructura obligatoria para proyectos con backend

```
proyecto/
  src/              ← Frontend (React / HTML / CSS / JS)
    components/
    pages/
    styles/
  server/           ← Backend (Node/Express, rutas, controladores)
    routes/
    controllers/
    middleware/
    db/             ← Modelos, migraciones, queries
  public/           ← Assets estáticos servidos directamente
  package.json      ← Raíz del monorepo o workspace
```

> Si el proyecto es solo frontend (sin servidor propio), `server/` no existe.
> Las llamadas a APIs de terceros (HubSpot, Stripe, etc.) desde el browser son frontend — no crean la necesidad de un directorio `server/`.

### Qué va en cada lado

| Frontend (`src/`) | Backend (`server/`) |
|-------------------|---------------------|
| Componentes React | Rutas Express/Fastify |
| Estilos CSS/SCSS | Controladores |
| Assets, imágenes | Conexión a base de datos |
| Llamadas a APIs públicas de terceros | Lógica de negocio sensible |
| Validación de UI | Validación de datos (canónica) |

---

## 3. Gestión de Entornos — Variables de Entorno

### Reglas

1. **Nunca subir valores reales al repositorio.** El archivo `.env` siempre está en `.gitignore`.
2. **`.env.example` es el contrato del equipo.** Contiene las claves necesarias igualadas a vacío o con un comentario descriptivo. Este archivo SÍ está en git.
3. **Nunca poner secretos como constantes hardcodeadas** en el código fuente cuando existe una alternativa via env var.

### Formato de `.env.example`

```bash
# Servicio de pagos
STRIPE_SECRET_KEY=        # Clave secreta — solo backend
STRIPE_PUBLIC_KEY=        # Clave pública — puede ir en frontend

# Base de datos
DATABASE_URL=             # ej. postgresql://user:pass@host:5432/db

# Terceros
HUBSPOT_PORTAL_ID=        # ID público del portal HubSpot
HUBSPOT_FORM_ID=          # UUID del formulario HubSpot
```

### Distinción clave / secreto

| Tipo | Ejemplo | ¿Puede ir en frontend? |
|------|---------|------------------------|
| Clave pública | `VITE_STRIPE_PUBLIC_KEY` | Sí (prefijo `VITE_` en Vite) |
| Clave secreta | `STRIPE_SECRET_KEY` | **Nunca** |
| ID de integración | `HUBSPOT_PORTAL_ID` | Sí (no es un secreto) |

---

## 4. Seguridad de Código

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

Para inputs de usuario (formularios), validar siempre con un anchor de inicio y fin (`^`, `$`) y un límite máximo de longitud.

### Inputs de formulario

- Sanitizar en el frontend para UX (feedback inmediato).
- Validar canónicamente siempre en el backend o en el servicio receptor.
- Nunca confiar únicamente en la validación del cliente.

---

## 5. Dependencias y Vulnerabilidades

### Revisión periódica

Ejecutar `npm audit` (o `yarn audit`) en cada proyecto antes de cada release.

### Gestión de subdependencias vulnerables

Cuando una vulnerabilidad está en una dependencia transitiva (no directa), usar `overrides` (npm) o `resolutions` (yarn) para forzar la versión segura sin romper el árbol de dependencias:

**npm (`package.json`):**
```json
"overrides": {
  "paquete-vulnerable": "^version-segura"
}
```

**yarn (`package.json`):**
```json
"resolutions": {
  "paquete-vulnerable": "^version-segura"
}
```

Documentar el motivo con un comentario en el PR correspondiente.

### Upgrades de versión mayor (breaking changes)

Nunca hacer un upgrade de versión mayor (`v5 → v8`) en una rama de feature o fix.
Abrir una rama `chore/upgrade-[paquete]-v[version]` dedicada, con una checklist de pruebas antes de mergear.

---

## 6. Herramientas de IA y Cachés

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

Lo que SÍ se versiona de `.claude/`:
- `.claude/settings.json` — configuración compartida del proyecto
- `.claude/agents/` — definiciones de agentes del proyecto

---

*Este documento es un artefacto vivo. Cualquier excepción a estas reglas debe documentarse con una justificación en el PR que la introduce.*
