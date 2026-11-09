# Presencia AQUÍ y AHORA

Espacio web para compartir y cultivar la espiritualidad: meditaciones guiadas con audio, respiración consciente y un santuario de prácticas contemplativas. Construida con Next.js 16, TypeScript, Tailwind CSS 4 y shadcn/ui.

## Funcionalidades

- **7 meditaciones guiadas** con voz TTS y campanas tibetanas sintetizadas (presencia, escaneo corporal, dormir, pausa, caminando, yoga nidra, retiro extendido).
- **Respiración consciente** con 7 técnicas y círculo guía animado.
- **Santuario de práctica** (mini-apps interactivas):
  - Temporizador de meditación con campanas intermedias (hasta 30 min gratis, 90 min en Presencia+).
  - Mezclador de sonidos ambientales sintetizados con Web Audio (lluvia, río, bosque, cuencos, viento).
  - Meditación caminando (guía de audio o modo solo campanas).
  - Yoga nidra guiada.
  - Mala digital de 108 cuentas con drone de Om y vibración.
  - Diario de gratitud con pregunta diaria (privado, localStorage).
  - Oráculo contemplativo de 18 cartas con carta del día.
  - Analítica de práctica: minutos, sesiones, racha y gráfica de 14 días.
  - Recordatorio de presencia con notificaciones locales.
- **Pausa de 3 minutos**: overlay global (respirar → silencio → volver) accesible desde la barra y atajos de la PWA.
- **Prácticas por tradición**: budismo, cristianismo contemplativo, sufismo, vedanta, taoísmo y sin afiliación.
- **Multi-idioma ES / EN / PT** con selector en la barra de navegación.
- **Frase del día** descargable como imagen generada en canvas.
- **PWA instalable** con service worker (audios y estáticos offline).
- **Presencia+ (Stripe)**: suscripción mensual con checkout, verificación y webhook; modo demo cuando Stripe no está configurado.
- **Comunidad**: muro de reflexiones (Prisma + SQLite) y newsletter.

## Variables de entorno

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `DATABASE_URL` | sí | Ruta de SQLite (p. ej. `file:./db/app.db`) |
| `STRIPE_SECRET_KEY` | no | Clave secreta de Stripe. Sin ella, el botón de pago ofrece el modo demo. |
| `STRIPE_WEBHOOK_SECRET` | no | Secreto del webhook para `/api/stripe/webhook`. |
| `STRIPE_PRICE_ID` | no | ID de precio de la suscripción Presencia+. Si no se define, se crea un precio inline de 4,99 US$/mes. |
| `NEXT_PUBLIC_SITE_URL` | no | URL pública (para `success_url` de Stripe). En Vercel se deduce de `VERCEL_URL`. |

## Desarrollo local

```bash
bun install
bun run db:push     # esquema de Prisma
bun run dev         # http://localhost:3000
bun run lint
```

### Regenerar audios

Los guiones y el pipeline de síntesis viven en `scripts/audio-build/`:

```bash
python3 scripts/audio-build/make-bell.py          # campanas base
node scripts/audio-build/generate-meditations.js  # TTS + ensamblado (con reanudación)
node scripts/audio-build/generate-meditations.js caminando yoga-nidra  # solo algunos ids
```

## Despliegue (Vercel)

1. Importa el repositorio en Vercel (framework Next.js detectado automáticamente).
2. Añade `DATABASE_URL` y, cuando actives pagos, las variables de Stripe.
3. El service worker y el manifest se sirven desde `public/`; la PWA funciona tras el primer despliegue en HTTPS.

## Notas

- El estado premium se guarda en la cookie `presencia_premium` (1 año) tras un pago verificado o la activación del modo demo.
- El registro de práctica, el diario de gratitud y la preferencia de idioma viven en `localStorage` del navegador.
- Los recordatorios suenan mientras la página o la PWA instalada están abiertas; las notificaciones en segundo plano requerirán push real (próximamente).
