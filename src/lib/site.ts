/**
 * Configuración de despliegue del sitio.
 *
 * El sitio se exporta como HTML estático y se publica en un hosting compartido,
 * por lo que estos valores se resuelven en tiempo de build, no en runtime.
 */

/**
 * URL canónica del sitio, sin barra final.
 *
 * Alimenta `metadataBase`, los datos estructurados y el sitemap. Mientras no
 * exista dominio contratado se usa el valor de reserva; cambiarlo exige un
 * nuevo build.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://visentrac.com"
).replace(/\/$/, "");

/**
 * Endpoint que recibe el formulario de contacto.
 *
 * En export estático no existen API routes: el destino es un script PHP servido
 * por el mismo hosting, colocado en `public/` para que el build lo copie tal
 * cual a la raíz publicada.
 */
export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "/contacto.php";

/** Enlace de WhatsApp con el mensaje inicial ya preparado. */
export function whatsappUrl(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
