import { siteUrl } from "@/lib/site";

type Props = {
  /** Nombre de la página actual, tal como aparece en la navegación. */
  pagina: string;
  /** Ruta de la página, con barra inicial y final. Ejemplo: "/servicios/". */
  ruta: string;
};

/**
 * Migas de pan en datos estructurados, sin representación visual.
 *
 * No dibuja nada: el sitio tiene cuatro niveles planos y una barra de migas
 * visible no le diría al visitante nada que la navegación no diga ya.
 *
 * Existe para los buscadores. Declarar la jerarquía es una de las señales que
 * Google usa para entender qué páginas cuelgan de la principal, y es lo que
 * puede acabar mostrándose como lista de enlaces bajo el resultado. No se puede
 * pedir ese formato, pero sí darle la información para que lo componga.
 */
export function Migas({ pagina, ruta }: Props) {
  const datos = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pagina,
        item: `${siteUrl}${ruta}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
