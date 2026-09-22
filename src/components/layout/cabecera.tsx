"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { navegacion, empresa, contacto } from "@/content/empresa";
import { whatsappUrl } from "@/lib/site";
import { Contenedor } from "@/components/ui/contenedor";

/**
 * Cabecera fija del sitio.
 *
 * Una sola línea en escritorio y 80px de alto, con la ruta activa marcada por
 * filete inferior en naranja. El menú móvil es un panel desplegable, no un
 * modal: no hay nada que proteger detrás de él.
 *
 * TODO(cliente): sustituir el logotipo compuesto por el SVG real cuando llegue
 * el vectorial. Ver docs/plan-desarrollo.md, sección 3.
 */
export function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const rutaActual = usePathname();

  const esActiva = (href: string) =>
    href === "/" ? rutaActual === "/" : rutaActual.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-concreto-200 bg-concreto-50">
      <Contenedor medida="ancho">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex shrink-0 flex-col leading-none"
            aria-label={`${empresa.nombre}, ir al inicio`}
          >
            <span className="text-2xl font-bold tracking-tight text-marca-900">
              {empresa.nombreCorto}
            </span>
            <span
              data-medida
              className="mt-0.5 font-medida text-[0.6rem] uppercase text-concreto-500"
            >
              Espinar · Cusco
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navegacion.map((item) => {
                const activa = esActiva(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activa ? "page" : undefined}
                      className={`relative flex h-20 items-center text-base font-medium transition-colors ${
                        activa
                          ? "text-marca-900"
                          : "text-concreto-700 hover:text-marca-900"
                      }`}
                    >
                      {item.label}
                      {activa ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-senal-500"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-12 items-center gap-2 rounded-[--radius-muestra] bg-marca-900 px-5 font-semibold text-white transition-colors hover:bg-marca-950 sm:inline-flex"
            >
              <WhatsappLogo size={20} weight="fill" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[--radius-muestra] border border-concreto-300 text-concreto-900 transition-colors hover:bg-concreto-100 lg:hidden"
            >
              {abierto ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
              <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
            </button>
          </div>
        </div>
      </Contenedor>

      {abierto ? (
        <div id="menu-movil" className="border-t border-concreto-200 bg-concreto-50 lg:hidden">
          <Contenedor medida="ancho">
            <nav aria-label="Principal, móvil" className="py-3">
              <ul className="flex flex-col">
                {navegacion.map((item) => {
                  const activa = esActiva(item.href);
                  return (
                    <li key={item.href} className="border-b border-concreto-200 last:border-0">
                      <Link
                        href={item.href}
                        onClick={() => setAbierto(false)}
                        aria-current={activa ? "page" : undefined}
                        className={`flex min-h-14 items-center gap-3 text-lg font-medium ${
                          activa ? "text-marca-900" : "text-concreto-800"
                        }`}
                      >
                        {activa ? (
                          <span aria-hidden className="h-6 w-1 shrink-0 bg-senal-500" />
                        ) : (
                          <span aria-hidden className="h-6 w-1 shrink-0" />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <a
                href={whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAbierto(false)}
                className="mt-4 mb-2 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[--radius-muestra] bg-marca-900 px-5 text-lg font-semibold text-white sm:hidden"
              >
                <WhatsappLogo size={22} weight="fill" />
                Escríbenos por WhatsApp
              </a>
            </nav>
          </Contenedor>
        </div>
      ) : null}
    </header>
  );
}
