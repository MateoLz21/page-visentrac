import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `ancho` para bloques que llegan al borde útil; `lectura` limita la medida a 65-75ch. */
  medida?: "normal" | "ancho" | "lectura";
  className?: string;
};

const medidas = {
  normal: "max-w-6xl",
  ancho: "max-w-7xl",
  lectura: "max-w-[68ch]",
} as const;

/** Caja de contención horizontal. Todo el sitio respira por el mismo canal. */
export function Contenedor({ children, medida = "normal", className = "" }: Props) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${medidas[medida]} ${className}`}>
      {children}
    </div>
  );
}
