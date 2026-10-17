# Clásicos del 98 — sitio web + valoración NFC

Sitio estático construido con:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static Export
- GitHub Pages + GitHub Actions

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
- Workflow listo para desplegar en GitHub Pages.

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

## GitHub Pages

1. Crea un repositorio.
2. Sube este proyecto a la rama `main`.
3. En GitHub entra a `Settings > Pages`.
4. En `Build and deployment`, selecciona **GitHub Actions**.
5. Haz push a `main`.

El workflow `.github/workflows/deploy-pages.yml` genera `out/` y lo publica.

### Repositorio de proyecto

Si el sitio queda como:

```text
https://usuario.github.io/nombre-repo/
```

el `basePath` se detecta automáticamente durante GitHub Actions.

### Dominio propio

Si más adelante usas un dominio propio en la raíz, define en el workflow:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: ""
```

antes del build y configura el dominio en GitHub Pages.

## NFC

Para pruebas, la tarjeta debe apuntar directamente a:

```text
https://TU-DOMINIO/valorar/
```

o mientras uses la URL de GitHub:

```text
https://TU-USUARIO.github.io/TU-REPOSITORIO/valorar/
```

## Imágenes

Las fotos incluidas se prepararon a partir de los archivos reales compartidos para el proyecto. Los recursos de marca fueron recortados y mejorados por reescalado/enfoque, sin rediseñar tipografía, colores ni composición.

No se usan las imágenes generadas anteriormente como sustituto de las fotografías reales.
