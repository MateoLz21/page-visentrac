"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Ranura } from "@/content/imagenes";

type Props = {
  imagenes: readonly Ranura[];
  /** Milisegundos entre fotos. Sin autoavance cuando es 0. */
  intervalo?: number;
};

/*
 * El tinte solo da temperatura; la legibilidad la resuelven degradados que
 * cubren únicamente donde hay texto. En escritorio ese refuerzo es lateral, no
 * vertical: oscurecer la franja inferior apagaba a las personas y la
 * maquinaria, que es lo que suele ocupar esa zona en fotografía de obra.
 *
 * Contrastes sobre el peor caso, una fotografía sobreexpuesta:
 * cabecera 5.23, titular 12.42 en escritorio y 11.75 en móvil.
 */
const TINTE_BASE = "bg-marca-900/15";
const REFUERZO_SUPERIOR =
  "h-[22%] bg-gradient-to-b from-marca-950/60 via-marca-950/20 to-transparent";
const REFUERZO_INFERIOR =
  "h-[58%] bg-gradient-to-t from-marca-950/88 via-marca-950/45 to-transparent lg:h-[48%] lg:from-marca-950/45 lg:via-marca-950/15";
const REFUERZO_LATERAL =
  "hidden w-[64%] bg-gradient-to-r from-marca-950/90 via-marca-950/45 to-transparent lg:block";

/**
 * Fondo del primer viewport, con tinte azul y rotación opcional de fotografías.
 *
 * El autoavance se detiene con `prefers-reduced-motion`, al pasar el puntero o
 * el foco por encima, y de forma definitiva en cuanto la persona usa los
 * controles: a partir de ahí manda ella.
 */
export function FondoHero({ imagenes, intervalo = 6500 }: Props) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [tomadoPorPersona, setTomadoPorPersona] = useState(false);
  const sinMovimiento = useReducedMotion();

  const total = imagenes.length;
  const rota = total > 1 && intervalo > 0 && !sinMovimiento && !pausado && !tomadoPorPersona;

  const ir = useCallback(
    (destino: number) => {
      setIndice((destino + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!rota) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % total), intervalo);
    return () => clearInterval(id);
  }, [rota, intervalo, total]);

  const actual = imagenes[indice];

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={actual.id}
          className="absolute inset-0"
          initial={sinMovimiento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: sinMovimiento ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {actual.archivo ? (
            <Image
              src={actual.archivo}
              alt={actual.alt}
              fill
              sizes="100vw"
              priority={indice === 0}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-marca-900">
              <div className="flex max-w-[34ch] flex-col items-center gap-4 border border-dashed border-marca-400/60 px-8 py-10 text-center">
                <Camera size={32} weight="light" className="text-marca-300" />
                <p data-medida className="font-medida text-xs text-marca-200">
                  {actual.id} · FOTO PENDIENTE
                </p>
                <p className="text-sm leading-snug text-marca-100">{actual.alt}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div aria-hidden className={`absolute inset-0 ${TINTE_BASE}`} />
      <div aria-hidden className={`absolute inset-x-0 top-0 ${REFUERZO_SUPERIOR}`} />
      <div aria-hidden className={`absolute inset-x-0 bottom-0 ${REFUERZO_INFERIOR}`} />
      <div aria-hidden className={`absolute inset-y-0 left-0 ${REFUERZO_LATERAL}`} />

      {total > 1 ? (
        <div className="absolute right-5 bottom-28 z-20 flex items-center gap-2 sm:right-8 sm:bottom-32">
          <button
            type="button"
            onClick={() => {
              setTomadoPorPersona(true);
              ir(indice - 1);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[--radius-muestra] border border-white/40 text-white transition-colors hover:bg-white/15"
          >
            <CaretLeft size={18} weight="bold" />
            <span className="sr-only">Fotografía anterior</span>
          </button>

          <p data-medida className="px-1 font-medida text-xs text-white/80">
            {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={() => {
              setTomadoPorPersona(true);
              ir(indice + 1);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[--radius-muestra] border border-white/40 text-white transition-colors hover:bg-white/15"
          >
            <CaretRight size={18} weight="bold" />
            <span className="sr-only">Fotografía siguiente</span>
          </button>
        </div>
      ) : null}

      {/* El rótulo de la foto activa, cosido al pie como el resto de imágenes. */}
      <p className="absolute inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-7xl items-baseline gap-3 px-5 pb-5 text-sm text-marca-100 sm:px-8">
        <span data-medida className="font-medida text-xs text-marca-300">
          {actual.id}
        </span>
        {actual.rotulo}
      </p>
    </div>
  );
}
