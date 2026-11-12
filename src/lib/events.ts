/**
 * Eventos personalizados globales de la app.
 * Centralizados aquí para que navbar, paleta de comandos, overlay de pausa
 * y reproductor de meditaciones se comuniquen sin importaciones circulares.
 */

/** Abre el overlay de la pausa de 3 minutos */
export const PAUSE_OPEN_EVENT = 'presencia:pause-open'

/** Abre la paleta de comandos (desde el botón de búsqueda del navbar) */
export const PALETTE_OPEN_EVENT = 'presencia:palette-open'

/** Reproduce una melodía de meditación · detail: MeditationId */
export const PLAY_MEDITATION_EVENT = 'presencia:play-meditation'
