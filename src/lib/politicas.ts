import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { politicas, type Politica } from "@/content/politicas";

export type PoliticaResuelta = Politica & {
  /** URL pública del PDF, o null si el archivo todavía no está. */
  url: string | null;
  /** Peso legible, por ejemplo "1.2 MB". */
  peso: string | null;
};

/**
 * Resuelve cada política contra el disco al compilar.
 *
 * Se comprueba la existencia del archivo en lugar de darla por hecha: una
 * política sin su PDF se muestra como pendiente, y no como un enlace que
 * devuelve 404 al pulsarlo.
 */
export function resolverPoliticas(): PoliticaResuelta[] {
  return politicas.map((politica) => {
    const ruta = join(process.cwd(), "public", "politicas", politica.archivo);

    if (!existsSync(ruta)) {
      return { ...politica, url: null, peso: null };
    }

    const bytes = statSync(ruta).size;
    const mb = bytes / (1024 * 1024);

    return {
      ...politica,
      url: `/politicas/${politica.archivo}`,
      peso: mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`,
    };
  });
}
