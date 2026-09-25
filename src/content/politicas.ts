/**
 * Políticas corporativas publicadas como documento.
 *
 * Cada una es un PDF firmado por la gerencia, no texto editable en el sitio:
 * lo que vale para un comprador minero o una entidad pública es el documento
 * con su firma, no una transcripción.
 *
 * Cómo añadir o sustituir una política:
 *   1. Colocar el PDF en `public/politicas/`.
 *   2. Poner su nombre de archivo en `archivo`.
 *
 * El visor comprueba al compilar si el archivo existe: una política sin su PDF
 * se muestra como pendiente en lugar de dar un enlace roto.
 */

export type Politica = {
  /** Identificador para la URL y la navegación. */
  slug: string;
  nombre: string;
  /** Qué cubre. Se lee antes de abrir el documento. */
  resumen: string;
  /** Nombre del archivo dentro de `public/politicas/`. */
  archivo: string;
};

export const politicas = [
  {
    slug: "gestion-ambiental",
    nombre: "Política de Gestión Ambiental y Responsabilidad Social",
    resumen:
      "Cómo controlamos y mitigamos el impacto ambiental de nuestras operaciones, y nuestro compromiso con las comunidades donde trabajamos.",
    archivo: "politica-gestion-ambiental.pdf",
  },
  {
    slug: "seguridad-salud-trabajo",
    nombre: "Política de Seguridad y Salud Ocupacional en el Trabajo",
    resumen:
      "Nuestros compromisos en materia de seguridad y salud laboral aplicados al centro de trabajo y a las obras que ejecutamos.",
    archivo: "politica-seguridad-salud-trabajo.pdf",
  },
  {
    /* Documento distinto del anterior, pese a lo parecido del título: el
       cliente confirmó que son dos políticas independientes. */
    slug: "seguridad-salud-ocupacional",
    nombre: "Política de Seguridad y Salud Ocupacional",
    resumen:
      "Los principios generales que rigen la protección de la salud y la integridad de nuestros colaboradores.",
    archivo: "politica-seguridad-salud-ocupacional.pdf",
  },
] as const satisfies readonly Politica[];
