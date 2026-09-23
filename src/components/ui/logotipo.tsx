import Image from "next/image";
import { logo } from "@/content/imagenes";
import { empresa } from "@/content/empresa";

type Props = {
  /** `blanco` sobre azul o tinta; `color` sobre fondo claro. */
  version?: "color" | "blanco";
  /** Alto renderizado en píxeles. El ancho se deriva de la proporción real. */
  alto?: number;
  prioridad?: boolean;
  className?: string;
};

const proporcion = logo.ancho / logo.alto;

/**
 * Logotipo de VISENTRAC.
 *
 * Dos versiones del mismo archivo, elegidas por el fondo sobre el que se posa.
 * El alto manda y el ancho se calcula, para que nunca se deforme.
 *
 * TODO(cliente): sustituir por SVG cuando exista el vectorial. El PNG de origen
 * venía a 1536px y 1.2 MB; aquí se sirve en WebP de 520px y 40 KB.
 */
export function Logotipo({
  version = "color",
  alto = 44,
  prioridad = false,
  className = "",
}: Props) {
  return (
    <Image
      src={version === "blanco" ? logo.blanco : logo.color}
      alt={`${empresa.nombre}`}
      width={Math.round(alto * proporcion)}
      height={alto}
      priority={prioridad}
      className={`h-auto w-auto ${className}`}
      style={{ height: alto }}
    />
  );
}
