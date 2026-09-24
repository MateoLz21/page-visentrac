import type { ReactNode } from "react";
import { Contenedor } from "@/components/ui/contenedor";
import { FondoHero } from "./fondo-hero";
import type { Ranura } from "@/content/imagenes";

type Props = {
  titulo: string;
  bajada: string;
  /** Una fotografía, o varias para que el fondo rote como slider. */
  imagenes: readonly Ranura[];
  children?: ReactNode;
  /** El `h1` solo en la página que lo requiere; el resto usa encabezado normal. */
  comoH1?: boolean;
};

/**
 * Primer viewport a pantalla completa.
 *
 * La fotografía ocupa el alto útil del dispositivo bajo un tinte azul de marca,
 * y el contenido se apoya en la mitad inferior. El contraste no se resuelve con
 * el velo negro uniforme que usa toda la categoría, sino con el propio color
 * del sistema.
 *
 * `min-h-[100dvh]` y no `h-screen`: en iOS Safari la barra de direcciones
 * cambia el alto del viewport y provocaría un salto de maquetación.
 *
 * El contenido se renderiza en el servidor; solo el fondo es isla de cliente.
 */
export function HeroCompleto({
  titulo,
  bajada,
  imagenes,
  children,
  comoH1 = false,
}: Props) {
  const Titulo = comoH1 ? "h1" : "h2";

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-marca-950">
      <FondoHero imagenes={imagenes} />

      <Contenedor medida="ancho" className="relative z-10 pt-32 pb-24 sm:pb-28">
        <div className="max-w-[46ch]">
          <span aria-hidden className="block h-0.5 w-24 bg-senal-500" />

          <Titulo className="mt-5 text-4xl font-bold tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-6xl">
            {titulo}
          </Titulo>

          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-pretty text-marca-100 sm:text-xl">
            {bajada}
          </p>

          {children ? <div className="mt-10 flex flex-wrap gap-4">{children}</div> : null}
        </div>
      </Contenedor>
    </section>
  );
}
