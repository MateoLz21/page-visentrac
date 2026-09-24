"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { porQueElegirnos } from "@/content/empresa";

type Razon = (typeof porQueElegirnos)[number];

function Fila({ razon, indice }: { razon: Razon; indice: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-15% 0px" });
  const sinMovimiento = useReducedMotion();
  const visible = enVista || sinMovimiento;

  return (
    <div
      ref={ref}
      className="grid gap-6 py-10 lg:grid-cols-[13rem_1fr] lg:items-start lg:gap-16"
    >
      {/* La cifra manda sobre el texto: es lo que distingue esta afirmación de
          la del competidor, que dice lo mismo sin poder demostrarlo. */}
      <div>
        <motion.span
          aria-hidden
          className="block h-0.5 w-full origin-left bg-senal-500"
          initial={sinMovimiento ? false : { scaleX: 0 }}
          animate={{ scaleX: visible ? 1 : 0 }}
          transition={{ duration: 0.7, delay: indice * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          data-medida
          className="mt-4 font-medida text-4xl leading-none font-semibold text-senal-400 sm:text-5xl"
          initial={sinMovimiento ? false : { opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            delay: indice * 0.12 + 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {razon.dato}
        </motion.p>

        <p className="mt-3 text-sm leading-snug text-marca-200">{razon.etiquetaDato}</p>
      </div>

      <div className="lg:pt-1">
        <h3 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
          {razon.titulo}
        </h3>
        <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-marca-100">
          {razon.descripcion}
        </p>
      </div>
    </div>
  );
}

/**
 * Por qué trabajar con nosotros.
 *
 * Cada razón entra por su cifra, no por un icono decorativo: en una sección
 * cuyo trabajo es generar confianza, el dato verificable es lo único que separa
 * la afirmación propia de la del competidor.
 *
 * La composición es una serie de filas con la cifra a la izquierda y el
 * argumento a la derecha, leíble de un barrido. No son tres tarjetas iguales de
 * icono, título y texto, que es el arreglo por defecto de la categoría.
 */
export function PorQueElegirnos() {
  return (
    <Seccion fondo="azul" medida="ancho">
      <TituloSeccion
        tono="oscuro"
        bajada="Tres cosas que podemos demostrar, no solo afirmar."
      >
        Por qué trabajar con nosotros
      </TituloSeccion>

      <div className="mt-10 divide-y divide-marca-700 border-t border-marca-700">
        {porQueElegirnos.map((razon, i) => (
          <Fila key={razon.titulo} razon={razon} indice={i} />
        ))}
      </div>
    </Seccion>
  );
}
