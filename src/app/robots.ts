import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/* Obligatorio con output: export. Sin esto Next trata la ruta como dinamica y
   el build falla al no poder resolverla en tiempo de compilacion. */
export const dynamic = "force-static";

/**
 * Instrucciones para los rastreadores.
 *
 * Se permite todo el sitio salvo la ruta interna de revisión del sistema de
 * diseño, que además ya se excluye por su propia metadata. Doble candado por si
 * la ruta sobrevive a un despliegue.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sistema/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
