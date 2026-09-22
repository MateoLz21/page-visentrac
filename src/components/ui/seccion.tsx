import type { ReactNode } from "react";
import { Contenedor } from "./contenedor";

type Props = {
  children: ReactNode;
  id?: string;
  /** `azul` carga la región entera con el color de marca, no como acento. */
  fondo?: "claro" | "azul" | "tinta";
  /** El ritmo vertical se elige por peso de la sección, no a ojo. */
  ritmo?: "normal" | "amplio" | "compacto";
  medida?: "normal" | "ancho" | "lectura";
  className?: string;
};

const fondos = {
  claro: "bg-concreto-50 text-concreto-950",
  azul: "bg-marca-900 text-white",
  tinta: "bg-concreto-950 text-white",
} as const;

const ritmos = {
  compacto: "py-12 sm:py-16",
  normal: "py-16 sm:py-24",
  amplio: "py-24 sm:py-32",
} as const;

/** Banda horizontal de la página. Toda separación vertical sale de aquí. */
export function Seccion({
  children,
  id,
  fondo = "claro",
  ritmo = "normal",
  medida = "normal",
  className = "",
}: Props) {
  return (
    <section id={id} className={`${fondos[fondo]} ${ritmos[ritmo]} ${className}`}>
      <Contenedor medida={medida}>{children}</Contenedor>
    </section>
  );
}

type TituloProps = {
  children: ReactNode;
  /** Texto que acompaña al título. Va debajo, nunca a la derecha en columna aparte. */
  bajada?: ReactNode;
  tono?: "claro" | "oscuro";
  className?: string;
};

/**
 * Encabezado de sección.
 *
 * Sin micro etiqueta en mayúsculas encima: el título carga su propio peso. La
 * bajada va debajo en pila, nunca como párrafo a la derecha del título, que es
 * el patrón de encabezado partido que el sistema descarta.
 */
export function TituloSeccion({
  children,
  bajada,
  tono = "claro",
  className = "",
}: TituloProps) {
  const oscuro = tono === "oscuro";

  return (
    <header className={`max-w-[46ch] ${className}`}>
      <h2
        className={`text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          oscuro ? "text-white" : "text-concreto-950"
        }`}
      >
        {children}
      </h2>
      {bajada ? (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            oscuro ? "text-marca-100" : "text-concreto-700"
          }`}
        >
          {bajada}
        </p>
      ) : null}
    </header>
  );
}
