import type { ReactNode } from "react";
import { TrazoMuestra } from "./trazo-muestra";

type Props = {
  /** Identificador corto de la muestra: "S-01", "MQ-03". Se compone en mono. */
  id: string;
  titulo: string;
  children?: ReactNode;
  /** Valor medido, alineado al margen derecho. Ejemplo: "6 tipos", "28 días". */
  valor?: string;
  /** El filete superior en naranja marca la muestra destacada de su grupo. */
  destacada?: boolean;
  /** Sobre fondo azul el texto invierte. */
  tono?: "claro" | "oscuro";
  className?: string;
};

/**
 * La primitiva central del sistema: un bloque presentado como muestra
 * identificada.
 *
 * Deliberadamente no es una tarjeta. No tiene caja cerrada, ni fondo propio, ni
 * sombra, ni icono sobre el título. Lo que la define es el filete superior, el
 * identificador en mono y el valor alineado al margen derecho, que es lo que
 * hace legible una serie leída de un solo barrido.
 */
export function Muestra({
  id,
  titulo,
  children,
  valor,
  destacada = false,
  tono = "claro",
  className = "",
}: Props) {
  const oscuro = tono === "oscuro";

  return (
    <article className={`flex flex-col ${className}`}>
      <TrazoMuestra id={id} valor={valor} oscuro={oscuro} destacada={destacada} />

      <h3
        className={`mt-4 text-xl font-semibold tracking-tight text-balance sm:text-2xl ${
          oscuro ? "text-white" : "text-concreto-950"
        }`}
      >
        {titulo}
      </h3>

      {children ? (
        <div
          className={`mt-3 text-base leading-relaxed ${
            oscuro ? "text-marca-100" : "text-concreto-700"
          }`}
        >
          {children}
        </div>
      ) : null}
    </article>
  );
}
