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
 * Si los buscadores pueden indexar esta publicación.
 *
 * Por defecto **no**. Una previsualización indexada compite en Google contra el
 * sitio definitivo por las mismas búsquedas, y con el mismo contenido: el
 * buscador elige una y puede quedarse con la equivocada.
 *
 * Se activa poniendo `NEXT_PUBLIC_INDEXABLE=true` únicamente en el despliegue
 * del dominio real. El build avisa por consola cuando está desactivado, para que
 * no pase inadvertido el día que se publique de verdad.
 */
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

/**
 * Endpoint que recibe el formulario de contacto.
 *
 * Es un script PHP propio servido por el mismo hosting. Envía por SMTP
 * autenticado de Gmail y no por el servidor de correo del hosting: el dominio
 * tiene los MX en Microsoft 365, y cualquier buzón creado en cPanel haría que
 * el servidor entregara localmente el correo interno del dominio en lugar de
 * mandarlo a Microsoft. Saliendo por Gmail, nada de lo que se configure en el
 * hosting puede romper la entrega real.
 *
 * Se descartó Web3Forms porque exige confirmar el correo destino desde su
 * propio buzón, y no hay acceso al corporativo.
 */
export const formEndpoint = "/contacto.php";

/** Enlace de WhatsApp con el mensaje inicial ya preparado. */
export function whatsappUrl(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
