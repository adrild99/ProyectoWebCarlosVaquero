# XylosHome

[Ver web en vivo](https://xyloshome.com)

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
npm run dev      
npm run build     # Compila TypeScript y genera /dist
npm run preview   # Preview del build en local
```

---

## Despliegue

El proyecto se sirve desde el servidor **Hetzner** (Nuremberg).
El build de producción se genera con `npm run build` y el contenido de `/dist` se publica en el servidor.

- Dominio principal: [xyloshome.com](https://xyloshome.com)
- Dominio alternativo: [xyloshome.es](https://xyloshome.es)

```
main      ← producción (Hetzner → xyloshome.com / xyloshome.es)
  └── develop ← integración
        └── feature/* / fix/* / chore/*
```

---

*Desarrollado por Katan para Xylos. Inicio: Marzo 2026.*
