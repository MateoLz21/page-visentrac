"use client";

import { useState } from "react";
import {
  FilePdf,
  DownloadSimple,
  ArrowSquareOut,
  FileDashed,
} from "@phosphor-icons/react/dist/ssr";
import type { PoliticaResuelta } from "@/lib/politicas";

type Props = { politicas: PoliticaResuelta[] };

/**
 * Visor de políticas corporativas.
 *
 * El documento se muestra incrustado solo a partir de tablet. En móvil no: iOS
 * Safari no renderiza PDF dentro de un marco incrustado y deja un recuadro en
 * blanco sin explicación, así que ahí se ofrece abrirlo con el lector del
 * dispositivo, que es lo que el visitante espera.
 *
 * El botón de descarga está siempre, en los dos casos: quien necesita adjuntar
 * la política a un expediente no quiere leerla, quiere el archivo.
 */
export function VisorPoliticas({ politicas }: Props) {
  const [activa, setActiva] = useState(0);
  const politica = politicas[activa];

  return (
    <div>
      {/* Navegación entre políticas. Se comporta como pestañas, con el estado
          anunciado a lectores de pantalla mediante aria-selected. */}
      <div role="tablist" aria-label="Políticas de la empresa" className="flex flex-col gap-2">
        {politicas.map((p, i) => {
          const seleccionada = i === activa;
          return (
            <button
              key={p.slug}
              role="tab"
              type="button"
              aria-selected={seleccionada}
              aria-controls={`panel-${p.slug}`}
              id={`tab-${p.slug}`}
              onClick={() => setActiva(i)}
              className={`flex min-h-14 items-start gap-4 border-t-2 px-1 py-4 text-left transition-colors ${
                seleccionada
                  ? "border-senal-500 bg-white"
                  : "border-concreto-300 hover:bg-white"
              }`}
            >
              <FilePdf
                size={24}
                weight="light"
                aria-hidden
                className={`mt-0.5 shrink-0 ${
                  seleccionada ? "text-senal-700" : "text-concreto-600"
                }`}
              />
              <span>
                <span
                  className={`block font-semibold ${
                    seleccionada ? "text-marca-900" : "text-concreto-950"
                  }`}
                >
                  {p.nombre}
                </span>
                <span className="mt-1 block text-sm leading-snug text-concreto-700">
                  {p.resumen}
                </span>
                {p.url ? (
                  <span data-medida className="mt-2 block font-medida text-xs text-concreto-600">
                    PDF · {p.peso}
                  </span>
                ) : (
                  <span data-medida className="mt-2 block font-medida text-xs text-senal-700">
                    DOCUMENTO PENDIENTE
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${politica.slug}`}
        aria-labelledby={`tab-${politica.slug}`}
        className="mt-10"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-concreto-950">
          {politica.nombre}
        </h2>

        {politica.url ? (
          <>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={politica.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-[--radius-muestra] bg-marca-900 px-5 font-semibold text-white transition-colors hover:bg-marca-950"
              >
                <ArrowSquareOut size={20} weight="bold" aria-hidden />
                Abrir documento
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>

              <a
                href={politica.url}
                download
                className="inline-flex min-h-12 items-center gap-2.5 rounded-[--radius-muestra] border border-marca-900 px-5 font-semibold text-marca-900 transition-colors hover:bg-marca-50"
              >
                <DownloadSimple size={20} weight="bold" aria-hidden />
                Descargar
              </a>
            </div>

            {/* Incrustado solo desde tablet: en móvil no se renderiza y dejaría
                un recuadro vacío. */}
            <div className="mt-8 hidden md:block">
              <iframe
                src={`${politica.url}#view=FitH`}
                title={politica.nombre}
                className="h-[42rem] w-full border border-concreto-300 bg-white"
              />
            </div>
          </>
        ) : (
          <div className="mt-6 flex flex-col items-start gap-4 border border-dashed border-concreto-400 p-8">
            <FileDashed size={32} weight="light" aria-hidden className="text-concreto-600" />
            <p className="max-w-[52ch] text-base leading-relaxed text-concreto-700">
              Este documento todavía no está publicado. Estará disponible en esta
              misma página en cuanto la empresa lo emita.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
