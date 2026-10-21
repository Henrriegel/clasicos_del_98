# Clásicos del 98 — sitio web + valoración NFC

Sitio estático construido con:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static Export
- Cloudflare Pages

## Qué incluye

- Landing responsive con identidad visual basada en fotografías reales del negocio.
- Servicios.
- Sección de historia / identidad.
- Galería real.
- Opiniones sin testimonios inventados.
- Contacto, WhatsApp, Facebook y ubicación.
- Ruta `/valorar/` para usar desde una tarjeta NFC.
- 5 niveles de valoración.
- 1–4 abren WhatsApp con un mensaje de retroalimentación.
- 5 abre, por ahora, la página de Facebook.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre:

```text
http://localhost:3000
```

La valoración está en:

```text
http://localhost:3000/valorar/
```

## Configurar enlaces

Edita:

```text
src/config/site.ts
```

Ahí están:

- WhatsApp
- Facebook
- ubicación
- enlace para opiniones privadas
- enlace público de la valoración 5

Cuando tengas la URL final de Google Reviews, cambia `publicReviewUrl`.

## Cloudflare Pages

Conecta el repositorio de GitHub a Cloudflare Pages. Usa `npm run build` como comando de build y `out/` como directorio de salida. El sitio se sirve desde `/`.

## NFC

Para pruebas, la tarjeta debe apuntar directamente a:

```text
https://TU-DOMINIO/valorar/
```

## Imágenes

Las fotos incluidas se prepararon a partir de los archivos reales compartidos para el proyecto. Los recursos de marca fueron recortados y mejorados por reescalado/enfoque, sin rediseñar tipografía, colores ni composición.

No se usan las imágenes generadas anteriormente como sustituto de las fotografías reales.
