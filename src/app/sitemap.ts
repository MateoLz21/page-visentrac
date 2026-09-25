import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { navegacion } from "@/content/empresa";

/* Obligatorio con output: export. Sin esto Next trata la ruta como dinamica y
   el build falla al no poder resolverla en tiempo de compilacion. */
export const dynamic = "force-static";

/**
 * Prioridad por ruta, según para qué existe el sitio.
 *
 * Inicio y Servicios son donde aterriza quien busca proveedor; Contacto es
 * donde convierte; Políticas y Nosotros sostienen la decisión de quien ya está
 * evaluando.
 */
const prioridades: Record<string, number> = {
  "/": 1,
  "/servicios": 0.9,
  "/contacto": 0.8,
  "/politicas": 0.7,
  "/nosotros": 0.7,
};

/**
 * Mapa del sitio.
 *
 * Se genera a partir de la navegación en lugar de listar rutas a mano: así una
 * página nueva entra sola en el sitemap el día que se añade al menú, y no se
 * queda fuera por olvido.
 *
 * Quedan fuera las páginas con `noindex` propio (Libro de Reclamaciones y
 * Política de Privacidad): son obligaciones legales, no contenido que deba
 * competir en búsquedas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return navegacion.map((item) => {
    /* `trailingSlash` está activo: las URLs canónicas llevan barra final. */
    const ruta = item.href === "/" ? "/" : `${item.href}/`;

    return {
      url: `${siteUrl}${ruta}`,
      lastModified: ahora,
      changeFrequency: item.href === "/" || item.href === "/servicios" ? "monthly" : "yearly",
      priority: prioridades[item.href] ?? 0.5,
    };
  });
}
