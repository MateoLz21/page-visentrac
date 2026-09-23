import type { Metadata } from "next";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { Muestra } from "@/components/ui/muestra";
import { Boton, BotonEnlace } from "@/components/ui/boton";
import { servicios, valores } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

const paleta = [
  { nombre: "concreto-50", uso: "Fondo de trabajo", clase: "bg-concreto-50 border border-concreto-200" },
  { nombre: "concreto-950", uso: "Tinta", clase: "bg-concreto-950" },
  { nombre: "concreto-600", uso: "Texto secundario", clase: "bg-concreto-600" },
  { nombre: "marca-900", uso: "Principal: carga regiones enteras", clase: "bg-marca-900" },
  { nombre: "marca-950", uso: "Estado activo", clase: "bg-marca-950" },
  { nombre: "senal-500", uso: "Valor medido, rol único. Tinta encima, nunca blanco", clase: "bg-senal-500" },
  { nombre: "senal-700", uso: "El naranja cuando es texto sobre fondo claro", clase: "bg-senal-700" },
];

/**
 * Página interna de revisión del sistema de diseño. No se indexa y se elimina
 * antes de publicar. Existe para auditar tokens y primitivas juntos.
 */
export default function Sistema() {
  return (
    <main className="flex-1 pt-20">
      <Seccion ritmo="compacto">
        <TituloSeccion bajada="Revisión interna de tokens y primitivas. Esta ruta no se indexa y no forma parte del sitio publicado.">
          El Rotulado de Ensayo
        </TituloSeccion>
      </Seccion>

      <Seccion ritmo="compacto">
        <TituloSeccion>Color</TituloSeccion>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paleta.map((color) => (
            <li key={color.nombre} className="flex items-center gap-4">
              <span aria-hidden className={`h-14 w-14 shrink-0 ${color.clase}`} />
              <span className="flex flex-col">
                <span data-medida className="font-medida text-xs text-concreto-600">
                  {color.nombre}
                </span>
                <span className="mt-1 text-base text-concreto-950">{color.uso}</span>
              </span>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion ritmo="compacto">
        <TituloSeccion>Tipografía</TituloSeccion>
        <div className="mt-8 flex flex-col gap-6">
          <p className="text-5xl font-semibold tracking-tight">
            Concreto premezclado en Espinar
          </p>
          <p className="max-w-[68ch] text-base leading-relaxed text-concreto-700">
            Archivo cubre titulares y cuerpo. Es una grotesca de rotulación:
            legible a tamaño pequeño y con carácter en display, sin necesidad de
            una segunda familia para los titulares.
          </p>
          <p data-medida className="font-medida text-sm text-concreto-600">
            MQ-01 · 28 días · 210 kg/cm2 · 984886660
          </p>
        </div>
      </Seccion>

      <Seccion ritmo="compacto">
        <TituloSeccion bajada="Objetivo táctil mínimo de 48px en todos los tamaños.">
          Acciones
        </TituloSeccion>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BotonEnlace href="https://wa.me/51984886660" externo tamano="grande">
            <WhatsappLogo size={22} weight="fill" />
            Escríbenos por WhatsApp
          </BotonEnlace>
          <BotonEnlace href="/servicios" variante="contorno">
            Ver servicios
            <ArrowRight size={18} weight="bold" />
          </BotonEnlace>
          <Boton variante="contorno" disabled>
            Deshabilitado
          </Boton>
        </div>
      </Seccion>

      <Seccion ritmo="compacto">
        <TituloSeccion bajada="La serie se lee de un solo barrido: filete, identificador, valor al margen derecho.">
          Muestras sobre fondo claro
        </TituloSeccion>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {servicios.map((servicio, i) => (
            <Muestra
              key={servicio.slug}
              id={`S-0${i + 1}`}
              titulo={servicio.nombre}
              valor={servicio.detalle.length > 0 ? `${servicio.detalle.length} tipos` : undefined}
              destacada={i === 0}
            >
              {servicio.descripcion}
            </Muestra>
          ))}
        </div>
      </Seccion>

      <Seccion ritmo="compacto">
        <TituloSeccion bajada="El naranja de chaleco tiene reglas de uso verificadas por contraste, no por gusto.">
          Naranja de alta visibilidad
        </TituloSeccion>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="bg-senal-500 p-5 text-concreto-950">
            <p data-medida className="font-medida text-xs">
              CORRECTO · 6.25
            </p>
            <p className="mt-2 text-lg font-semibold">Tinta sobre naranja</p>
          </div>
          <div className="border border-concreto-300 bg-concreto-50 p-5">
            <p data-medida className="font-medida text-xs text-senal-700">
              CORRECTO · 4.92
            </p>
            <p className="mt-2 text-lg font-semibold text-senal-700">
              senal-700 como texto
            </p>
          </div>
          <div className="bg-marca-900 p-5">
            <p data-medida className="font-medida text-xs text-senal-400">
              CORRECTO · 5.66
            </p>
            <p className="mt-2 text-lg font-semibold text-senal-400">
              Naranja sobre azul
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="azul" ritmo="compacto">
        <TituloSeccion
          tono="oscuro"
          bajada="El azul carga la región completa, no aparece como acento suelto."
        >
          Muestras sobre región cargada
        </TituloSeccion>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {valores.slice(0, 3).map((valor, i) => (
            <Muestra
              key={valor.slug}
              id={`V-0${i + 1}`}
              titulo={valor.nombre}
              tono="oscuro"
              destacada={i === 2}
            >
              {valor.descripcion}
            </Muestra>
          ))}
        </div>
      </Seccion>
    </main>
  );
}
