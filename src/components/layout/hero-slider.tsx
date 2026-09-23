"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/contenedor";
import type { Ranura } from "@/content/imagenes";

export type Diapositiva = {
  /** Identificador de muestra: "S-01". */
  id: string;
  titulo: string;
  descripcion: string;
  imagen: Ranura;
};

type Props = {
  /** Mensaje estable de la página. No rota: es el que leen los buscadores. */
  titularAccesible: string;
  diapositivas: readonly Diapositiva[];
  /** Acciones fijas, idénticas en todas las diapositivas. */
  children?: ReactNode;
  intervalo?: number;
};

/*
 * El tinte solo da temperatura; la legibilidad la resuelven degradados que
 * cubren únicamente donde hay texto.
 *
 * En escritorio el texto vive en la columna izquierda, así que el refuerzo es
 * LATERAL, no vertical: oscurecer toda la franja inferior apagaba a las
 * personas y la maquinaria, que en fotografía de obra es justo lo que ocupa esa
 * zona, y dejaba el protagonismo al cielo. En móvil el texto sí ocupa todo el
 * ancho y ahí el refuerzo vuelve a ser inferior.
 *
 * Contrastes sobre el peor caso, una fotografía sobreexpuesta:
 * cabecera 5.23, titular 12.42 en escritorio y 11.75 en móvil. El centro y la
 * derecha quedan con el tinte al 15%, casi limpios.
 */
const TINTE_BASE = "bg-marca-900/15";
const REFUERZO_SUPERIOR =
  "h-[22%] bg-gradient-to-b from-marca-950/60 via-marca-950/20 to-transparent";
const REFUERZO_INFERIOR =
  "h-[58%] bg-gradient-to-t from-marca-950/88 via-marca-950/45 to-transparent lg:h-[48%] lg:from-marca-950/45 lg:via-marca-950/15";
const REFUERZO_LATERAL =
  "hidden w-[64%] bg-gradient-to-r from-marca-950/90 via-marca-950/45 to-transparent lg:block";

const transicion = { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as const;

/**
 * Portada de Inicio: cada diapositiva es una muestra del catálogo, con su
 * fotografía, su identificador y su servicio.
 *
 * El `h1` queda fuera de la rotación y solo para lectores y buscadores: un
 * titular que cambia cada seis segundos deja a la página sin mensaje estable.
 * Las acciones tampoco rotan, para que pedir cotización nunca dependa de qué
 * diapositiva esté visible.
 *
 * El avance automático se detiene con `prefers-reduced-motion`, al pasar el
 * puntero o el foco, y de forma definitiva en cuanto alguien usa los controles.
 */
export function HeroSlider({
  titularAccesible,
  diapositivas,
  children,
  intervalo = 7000,
}: Props) {
  const [indice, setIndice] = useState(0);
  const [tecladoDentro, setTecladoDentro] = useState(false);
  const sinMovimiento = useReducedMotion();

  const total = diapositivas.length;

  /*
   * La rotación no se detiene al pasar el puntero: esta portada ocupa el
   * viewport entero, así que el cursor está encima casi todo el tiempo y
   * pausar ahí equivale a no rotar nunca. Sí se detiene mientras alguien
   * navega con el teclado dentro del bloque, para no moverle el contenido bajo
   * el foco, y con `prefers-reduced-motion` no arranca en absoluto.
   */
  const rota = total > 1 && intervalo > 0 && !sinMovimiento && !tecladoDentro;

  const ir = useCallback(
    (destino: number) => setIndice((destino + total) % total),
    [total],
  );

  useEffect(() => {
    if (!rota) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % total), intervalo);
    return () => clearInterval(id);
  }, [rota, intervalo, total, indice]);

  const actual = diapositivas[indice];

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-marca-950"
      aria-roledescription="carrusel"
      aria-label="Servicios de VISENTRAC"
      onFocusCapture={() => setTecladoDentro(true)}
      onBlurCapture={() => setTecladoDentro(false)}
    >
      <h1 className="sr-only">{titularAccesible}</h1>

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`fondo-${actual.id}`}
          className="absolute inset-0"
          initial={sinMovimiento ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: sinMovimiento ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {actual.imagen.archivo ? (
            /* Acercamiento lento mientras la fotografía está en pantalla: da
               movimiento continuo sin desplazar nada que haya que leer. */
            <motion.div
              className="absolute inset-0"
              initial={sinMovimiento ? false : { scale: 1 }}
              animate={{ scale: sinMovimiento ? 1 : 1.07 }}
              transition={{ duration: (intervalo + 1500) / 1000, ease: "linear" }}
            >
              <Image
                src={actual.imagen.archivo}
                alt={actual.imagen.alt}
                fill
                sizes="100vw"
                priority={indice === 0}
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-marca-900">
              <div className="flex max-w-[34ch] flex-col items-center gap-4 border border-dashed border-marca-400/60 px-8 py-10 text-center">
                <Camera size={32} weight="light" className="text-marca-300" />
                <p data-medida className="font-medida text-xs text-marca-200">
                  {actual.imagen.id} · FOTO PENDIENTE
                </p>
                <p className="text-sm leading-snug text-marca-100">{actual.imagen.alt}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div aria-hidden className={`absolute inset-0 ${TINTE_BASE}`} />
      <div aria-hidden className={`absolute inset-x-0 top-0 ${REFUERZO_SUPERIOR}`} />
      <div aria-hidden className={`absolute inset-x-0 bottom-0 ${REFUERZO_INFERIOR}`} />
      <div aria-hidden className={`absolute inset-y-0 left-0 ${REFUERZO_LATERAL}`} />

      <Contenedor medida="ancho" className="relative z-10 pt-32 pb-12 sm:pb-16">
        <div
          aria-live="polite"
          aria-atomic
          className="grid min-h-[17rem] max-w-[46ch] content-end sm:min-h-[19rem]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={actual.id}
              initial={sinMovimiento ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={sinMovimiento ? undefined : { opacity: 0, y: -12 }}
              transition={transicion}
            >
              <span aria-hidden className="block h-0.5 w-24 bg-senal-500" />
              <p data-medida className="mt-4 font-medida text-xs uppercase text-senal-400">
                {actual.id}
              </p>
              <p className="mt-5 text-4xl font-bold tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-6xl">
                {actual.titulo}
              </p>
              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-pretty text-marca-100 sm:text-xl">
                {actual.descripcion}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {children ? <div className="mt-10 flex flex-wrap gap-4">{children}</div> : null}

        <div className="mt-12 flex items-end justify-between gap-6 border-t border-white/20 pt-4">
          <p className="flex items-baseline gap-3 text-sm text-marca-100">
            <span data-medida className="font-medida text-xs text-marca-300">
              {actual.imagen.id}
            </span>
            {actual.imagen.rotulo}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                ir(indice - 1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[--radius-muestra] border border-white/40 text-white transition-colors hover:bg-white/15"
            >
              <CaretLeft size={18} weight="bold" />
              <span className="sr-only">Servicio anterior</span>
            </button>

            <p data-medida className="px-1 font-medida text-xs text-white/80">
              {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>

            <button
              type="button"
              onClick={() => {
                ir(indice + 1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[--radius-muestra] border border-white/40 text-white transition-colors hover:bg-white/15"
            >
              <CaretRight size={18} weight="bold" />
              <span className="sr-only">Servicio siguiente</span>
            </button>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
