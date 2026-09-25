"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { List, X, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { navegacion, empresa, contacto } from "@/content/empresa";
import { whatsappUrl } from "@/lib/site";
import { Contenedor } from "@/components/ui/contenedor";
import { Logotipo } from "@/components/ui/logotipo";
import { RedesSociales } from "@/components/ui/redes-sociales";

/**
 * Cabecera superpuesta al hero.
 *
 * Arranca sin fondo sobre la imagen a pantalla completa y gana fondo sólido y
 * filete al pasar el primer viewport. El umbral se lee con `useMotionValueEvent`
 * y no con estado por cada píxel: solo se re-renderiza cuando cruza el límite.
 *
 * TODO(cliente): sustituir el logotipo compuesto por el SVG real cuando llegue
 * el vectorial. Ver docs/plan-desarrollo.md, sección 3.
 */
export function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const [solida, setSolida] = useState(false);
  const rutaActual = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const deberia = y > 80;
    setSolida((actual) => (actual === deberia ? actual : deberia));
  });

  const esActiva = (href: string) =>
    href === "/" ? rutaActual === "/" : rutaActual.startsWith(href);

  /* Sobre el hero el contenido va en blanco; una vez sólida, en tinta. */
  const sobreFoto = !solida && !abierto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        sobreFoto
          ? "border-b border-transparent bg-transparent"
          : "border-b border-concreto-200 bg-concreto-50"
      }`}
    >
      <Contenedor medida="ancho">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label={`${empresa.nombre}, ir al inicio`}
          >
            <Logotipo version={sobreFoto ? "blanco" : "color"} alto={56} prioridad />
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
                        sobreFoto
                          ? activa
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                          : activa
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
            {/* Las redes ceden el sitio a la navegación en anchos intermedios:
                WhatsApp es la acción primaria y nunca se esconde. */}
            <RedesSociales
              tono={sobreFoto ? "claro" : "oscuro"}
              tamano="compacto"
              className="hidden xl:flex"
            />

            <a
              href={whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden min-h-12 items-center gap-2 rounded-[--radius-muestra] px-5 font-semibold transition-colors sm:inline-flex ${
                sobreFoto
                  ? "bg-white text-marca-950 hover:bg-concreto-100"
                  : "bg-marca-900 text-white hover:bg-marca-950"
              }`}
            >
              <WhatsappLogo size={20} weight="fill" />
              WhatsApp
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              className={`inline-flex h-12 w-12 items-center justify-center rounded-[--radius-muestra] border transition-colors lg:hidden ${
                sobreFoto
                  ? "border-white/50 text-white hover:bg-white/10"
                  : "border-concreto-300 text-concreto-900 hover:bg-concreto-100"
              }`}
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
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>

              <RedesSociales tono="oscuro" className="mt-4 mb-2" />
            </nav>
          </Contenedor>
        </div>
      ) : null}
    </header>
  );
}
