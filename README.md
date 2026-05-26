# Portfolio — Gian Barrionuevo

Portfolio profesional de Gian Barrionuevo, Desarrollador Full Stack especializado en React.js y .NET.

## Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v3, Framer Motion
- **Forms:** React Hook Form
- **Email:** EmailJS
- **Icons:** Lucide React, React Icons
- **Build:** Vite 8
- **Deploy:** Vercel

## Instalación

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ID del servicio EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | ID del template EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Clave pública de EmailJS |

## Deploy

Desplegado en [Vercel](https://vercel.com). El archivo `vercel.json` configura rewrites para SPA y headers de seguridad/caché.
