# XylosHome

[Ver web en vivo](https://xyloshome.pages.dev)

Web corporativa de **Xylos** — vitrina estática con identidad de marca,
servicios y páginas legales. Migrada de HTML/CSS/JS a React 19 + Vite 8.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 19 |
| Bundler | Vite 8 (Rolldown) |
| Routing | React Router 7 |
| Lenguaje | TypeScript 5.7 |
| Despliegue | Cloudflare Pages |

---

## Estructura

```
src/
  components/         ← Componentes reutilizables (Header, Footer, etc.)
  pages/
    Home.tsx          ← Página principal
    AvisoLegal.tsx
    PoliticaPrivacidad.tsx
    PoliticaCookies.tsx
  styles/             ← Estilos globales y variables CSS
public/               ← Assets estáticos (imágenes, logos)
```

---

## Variables de entorno

Este proyecto no utiliza variables de entorno — no hay llamadas a APIs externas
ni servicios de terceros que requieran claves.

---

## Instalación y desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Compila TypeScript y genera /dist
npm run preview   # Preview del build en local
```

---

## Despliegue

El proyecto se despliega automáticamente en **Cloudflare Pages** desde `main`.
La rama `develop` es de integración — no se despliega automáticamente.

```
main      ← producción (Cloudflare Pages → xyloshome.pages.dev)
  └── develop ← integración
        └── feature/* / fix/* / chore/*
```

---

## Pendiente

- [ ] Configurar dominio definitivo (.com / .es)

---

*Desarrollado por Katan Studio para Xylos. Inicio: Marzo 2026.*
