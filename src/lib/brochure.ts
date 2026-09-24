import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

/** Ruta pública del brochure y su nombre de archivo en disco. */
const NOMBRE = "brochure_visentrac.pdf";

export type Brochure = {
  url: string;
  /** Peso legible, por ejemplo "2.4 MB". */
  peso: string;
};

/**
 * Datos del brochure, resueltos al compilar.
 *
 * Se comprueba el archivo en disco en lugar de dar por hecho que existe: así la
 * sección de descarga aparece sola cuando se coloca el PDF en `public/`, y no se
 * publica nunca un enlace roto si todavía no está.
 *
 * El peso se lee del archivo real. Anunciar el tamaño antes de la descarga no es
 * un adorno: quien navega desde la obra con datos móviles decide si descargar
 * ahora o esperar, y un PDF de varios MB sin avisar es una descarga que nadie
 * pidió.
 */
export function obtenerBrochure(): Brochure | null {
  const ruta = join(process.cwd(), "public", NOMBRE);

  if (!existsSync(ruta)) return null;

  const bytes = statSync(ruta).size;
  const mb = bytes / (1024 * 1024);
  const peso = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

  return { url: `/${NOMBRE}`, peso };
}
