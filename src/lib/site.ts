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
 * Se usa Web3Forms y no un script PHP propio por una razón de infraestructura:
 * el dominio está en GoDaddy con el correo en Microsoft 365, y sus registros MX
 * apuntan allí. Crear un buzón en el cPanel del hosting haría que el servidor
 * entregara localmente el correo interno del dominio en lugar de enviarlo a
 * Microsoft, y los mensajes se perderían sin dar error. Web3Forms no toca el
 * DNS ni necesita buzón.
 */
export const formEndpoint = "https://api.web3forms.com/submit";

/**
 * Clave de acceso de Web3Forms.
 *
 * Es pública por diseño: viaja al navegador. La protección no está en ocultarla
 * sino en restringir los dominios permitidos desde el panel de Web3Forms, para
 * que nadie pueda usar el formulario desde otro sitio.
 */
export const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/** Sin clave configurada el formulario no puede enviar y debe decirlo. */
export const formularioConfigurado = web3formsKey.length > 0;

/** Enlace de WhatsApp con el mensaje inicial ya preparado. */
export function whatsappUrl(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
