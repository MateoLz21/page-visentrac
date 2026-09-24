"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  valor?: string;
  oscuro: boolean;
  destacada: boolean;
};

/**
 * Cabecera animada de una muestra: el filete se traza de izquierda a derecha al
 * entrar en viewport y el valor medido se revela justo después.
 *
 * Es el único momento de movimiento autorizado del sitio, y existe por una
 * razón que se dice en una frase: reproduce el gesto de rotular la muestra, que
 * es la idea que sostiene todo el sistema. Ocurre una sola vez, con
 * desaceleración exponencial, y desaparece por completo bajo
 * `prefers-reduced-motion`.
 */
export function TrazoMuestra({ valor, oscuro, destacada }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-15% 0px" });
  const sinMovimiento = useReducedMotion();

  const filete = destacada
    ? "bg-senal-500"
    : oscuro
      ? "bg-marca-400"
      : "bg-concreto-300";

  const animado = enVista && !sinMovimiento;
  const visible = enVista || sinMovimiento;

  return (
    <div ref={ref}>
      <motion.span
        aria-hidden
        className={`block h-0.5 w-full origin-left ${filete}`}
        initial={sinMovimiento ? false : { scaleX: 0 }}
        animate={{ scaleX: animado || sinMovimiento ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="mt-3 flex items-baseline justify-end gap-4">
        {valor ? (
          <motion.span
            data-medida
            className={`font-medida text-sm font-semibold ${
              oscuro ? "text-senal-400" : "text-senal-700"
            }`}
            initial={sinMovimiento ? false : { opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {valor}
          </motion.span>
        ) : null}
      </div>
    </div>
  );
}
