import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/* Obligatorio con output: export. Sin esto Next trata la ruta como dinamica y
   el build falla al no poder resolverla en tiempo de compilacion. */
export const dynamic = "force-static";

/**
 * Mapa del sitio.
 *
 * Solo las cuatro rutas públicas. `/sistema` es interna y queda fuera a
 * propósito, igual que queda fuera del índice por su propia metadata.
 *
 * Las prioridades reflejan para qué existe el sitio: Inicio y Servicios son
 * donde llega la búsqueda de un proveedor, y Contacto es donde se convierte.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/servicios/`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/nosotros/`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contacto/`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
