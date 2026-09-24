"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { galeria, type FotoGaleria } from "@/content/galeria";

/*
 * Forma de cada celda.
 *
 * Manda la orientación real de la fotografía cuando está declarada: una toma
 * vertical en celda cuadrada pierde media escena por recorte, y ese es el tipo
 * de detalle que delata una galería montada sin mirar las imágenes.
 *
 * Sin `formato`, se aplica un patrón que cicla cada seis celdas para evitar la
 * rejilla uniforme: así se pueden añadir o quitar fotos del contenido y la
 * composición mantiene ritmo sin tocar este componente.
 */
function tamano(foto: FotoGaleria, indice: number): string {
  if (foto.formato === "alto") return "row-span-2";
  if (foto.formato === "ancho") return "col-span-2";

  const posicion = indice % 6;
  if (posicion === 0) return "col-span-2 row-span-2";
  if (posicion === 3) return "col-span-2";
  return "";
}

function Foto({ foto, indice }: { foto: FotoGaleria; indice: number }) {
  const ref = useRef<HTMLElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-10% 0px" });
  const sinMovimiento = useReducedMotion();

  return (
    <motion.figure
      ref={ref}
      className={`group relative overflow-hidden bg-concreto-100 ${tamano(foto, indice)}`}
      initial={sinMovimiento ? false : { opacity: 0, y: 24 }}
      animate={enVista || sinMovimiento ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.7,
        /* El escalonado se calcula dentro de la fila visible, no sobre el
           índice global: si no, las últimas fotos esperarían varios segundos. */
        delay: sinMovimiento ? 0 : (indice % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative h-full min-h-40 w-full">
        {foto.archivo ? (
          <Image
            src={foto.archivo}
            alt={foto.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-concreto-400 p-4 text-center">
            <Camera size={22} weight="light" className="text-concreto-600" />
            <p data-medida className="font-medida text-[0.6rem] text-concreto-600">
              PENDIENTE
            </p>
            <p className="max-w-[24ch] text-xs leading-snug text-concreto-700">{foto.rotulo}</p>
          </div>
        )}
      </div>

      {/* El rótulo se apoya sobre la fotografía con un degradado del azul de
          marca, igual que en las portadas: nunca un velo negro genérico. */}
      {foto.archivo ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-marca-950/90 via-marca-950/50 to-transparent p-4 pt-10">
          <p className="text-sm leading-snug font-medium text-white">{foto.rotulo}</p>
          {foto.lugar ? (
            <p className="mt-0.5 text-xs text-marca-100">{foto.lugar}</p>
          ) : null}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

/**
 * Galería de operaciones.
 *
 * Mosaico de celdas desiguales que se adapta al número de fotografías. Las
 * imágenes entran escalonadas al aparecer en pantalla, con la misma curva de
 * desaceleración que el trazo de las muestras: una sola vez, y anulada bajo
 * `prefers-reduced-motion`.
 */
export function GaleriaOperaciones() {
  return (
    <Seccion medida="ancho" id="galeria">
      <TituloSeccion bajada="Fotografías de nuestras propias operaciones: planta, flota y obra en ejecución.">
        Nuestro trabajo
      </TituloSeccion>

      <div className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4">
        {galeria.map((foto, i) => (
          <Foto key={foto.id} foto={foto} indice={i} />
        ))}
      </div>
    </Seccion>
  );
}
