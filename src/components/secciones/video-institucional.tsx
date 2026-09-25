"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, SpeakerSimpleHigh, SpeakerSimpleSlash } from "@phosphor-icons/react/dist/ssr";
import { heroNosotros } from "@/content/imagenes";

/** Ruta del vídeo bajo `public/`. */
const VIDEO = "/visentrac.mp4";

/**
 * Vídeo institucional a pantalla completa.
 *
 * Pesa 28 MB, así que la carga es deliberada y no automática:
 *
 * - El archivo **no se descarga al abrir la página**. Solo empieza cuando la
 *   sección entra en pantalla. Quien busca un teléfono y no baja hasta aquí no
 *   paga esos 28 MB, y ese es el visitante que describe PRODUCT.md: móvil, en
 *   obra, con datos contados.
 * - Mientras tanto se ve el póster, así que no hay hueco negro ni salto.
 * - No arranca solo con `prefers-reduced-motion` ni cuando el navegador informa
 *   de ahorro de datos: ahí se queda el póster con su botón de reproducir.
 *
 * Sobre el sonido: arranca silenciado porque ningún navegador permite otra cosa
 * en reproducción automática, pero el vídeo lleva locución y perderla sería
 * tirar su contenido. Por eso el control de sonido está siempre visible, no
 * escondido en los controles nativos.
 */
export function VideoInstitucional() {
  const contenedor = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [cargar, setCargar] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [conSonido, setConSonido] = useState(false);

  /* Carga diferida: hasta que la sección no se acerca, no se pide el archivo. */
  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo || cargar) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const movimientoReducido = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        /* `saveData` lo activa quien pidió al navegador ahorrar datos. No se le
           impone una descarga de 28 MB: se le deja el botón. */
        const conexion = (
          navigator as Navigator & { connection?: { saveData?: boolean } }
        ).connection;
        const ahorroDeDatos = conexion?.saveData === true;

        setCargar(true);
        if (!movimientoReducido && !ahorroDeDatos) {
          setReproduciendo(true);
        }
      },
      { rootMargin: "200px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, [cargar]);

  /* La reproducción automática puede ser rechazada por el navegador; si ocurre,
     se vuelve al póster en lugar de dejar un vídeo congelado. */
  useEffect(() => {
    const nodo = video.current;
    if (!nodo || !reproduciendo) return;
    nodo.play().catch(() => setReproduciendo(false));
  }, [reproduciendo]);

  function alternarSonido() {
    const nodo = video.current;
    if (!nodo) return;
    const nuevo = !conSonido;
    nodo.muted = !nuevo;
    setConSonido(nuevo);
    if (nuevo) nodo.play().catch(() => undefined);
  }

  function reproducirManual() {
    setCargar(true);
    setReproduciendo(true);
  }

  return (
    <section
      ref={contenedor}
      aria-label="Vídeo institucional de VISENTRAC"
      className="relative w-full overflow-hidden bg-marca-950"
    >
      <div className="relative aspect-video w-full">
        {/* El póster se mantiene bajo el vídeo: cubre la carga y reaparece si la
            reproducción automática es rechazada. */}
        <Image
          src={heroNosotros.archivo}
          alt={heroNosotros.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {cargar ? (
          <video
            ref={video}
            src={VIDEO}
            loop
            muted={!conSonido}
            playsInline
            preload="none"
            controls={conSonido}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              reproduciendo ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}

        {/* Botón de reproducir: única salida cuando el navegador no autorreproduce,
            cuando se pidió movimiento reducido o cuando hay ahorro de datos. */}
        {!reproduciendo ? (
          <button
            type="button"
            onClick={reproducirManual}
            className="absolute inset-0 z-10 flex items-center justify-center bg-marca-950/40 transition-colors hover:bg-marca-950/25"
          >
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-marca-950 shadow-[var(--shadow-flotante)] transition-transform hover:scale-105">
              <Play size={32} weight="fill" className="ml-1" />
            </span>
            <span className="sr-only">Reproducir el vídeo institucional</span>
          </button>
        ) : null}

        {/* El control de sonido va aparte y siempre visible: el vídeo lleva
            locución y el silencio del arranque no puede ser el estado final. */}
        {reproduciendo && !conSonido ? (
          <button
            type="button"
            onClick={alternarSonido}
            className="absolute right-4 bottom-4 z-10 inline-flex min-h-12 items-center gap-2.5 rounded-[--radius-muestra] bg-marca-950/85 px-5 font-semibold text-white transition-colors hover:bg-marca-950 sm:right-6 sm:bottom-6"
          >
            <SpeakerSimpleSlash size={20} weight="fill" aria-hidden />
            Activar sonido
          </button>
        ) : null}

        {reproduciendo && conSonido ? (
          <button
            type="button"
            onClick={alternarSonido}
            className="absolute right-4 bottom-20 z-10 inline-flex h-12 w-12 items-center justify-center rounded-[--radius-muestra] bg-marca-950/85 text-white transition-colors hover:bg-marca-950 sm:right-6"
          >
            <SpeakerSimpleHigh size={20} weight="fill" aria-hidden />
            <span className="sr-only">Silenciar el vídeo</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
