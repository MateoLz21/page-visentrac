import type { Metadata } from "next";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { Contenedor } from "@/components/ui/contenedor";
import { Muestra } from "@/components/ui/muestra";
import { RanuraImagen } from "@/components/ui/ranura-imagen";
import { BotonEnlace } from "@/components/ui/boton";
import { whatsappUrl } from "@/lib/site";
import { imagenes } from "@/content/imagenes";
import {
  propuestaValor,
  servicios,
  sectoresAtendidos,
  porQueElegirnos,
  contacto,
  cta,
} from "@/content/empresa";

export const metadata: Metadata = {
  description:
    "Venta de concreto premezclado, alquiler de maquinaria pesada y agregados de construcción en Espinar, Cusco. Planta y flota propias desde 2014.",
};

export default function Inicio() {
  const enlaceWhatsapp = whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp);

  return (
    <main id="contenido" className="flex-1">
      {/* Primer viewport: el bloque azul carga la región y la fotografía de
          planta aporta la única prueba real que tenemos. */}
      <section className="bg-marca-900 text-white">
        <Contenedor medida="ancho">
          <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h1 className="max-w-[16ch] text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
                {propuestaValor.titular}
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-marca-100 text-pretty sm:text-xl">
                {propuestaValor.subtitular}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BotonEnlace href={enlaceWhatsapp} externo variante="clara" tamano="grande">
                  <WhatsappLogo size={22} weight="fill" />
                  Pedir cotización
                </BotonEnlace>
                <BotonEnlace
                  href="/servicios"
                  variante="primaria"
                  tamano="grande"
                  className="border-marca-400 bg-transparent hover:bg-marca-950"
                >
                  Ver servicios
                  <ArrowRight size={18} weight="bold" />
                </BotonEnlace>
              </div>
            </div>

            <RanuraImagen ranura={imagenes.plantaPrincipal} prioridad />
          </div>
        </Contenedor>
      </section>

      {/* Sectores atendidos: franja horizontal, nunca dentro del primer
          viewport y nunca como muro de logos ajenos. */}
      <section className="border-b border-concreto-200 bg-white">
        <Contenedor medida="ancho">
          <div className="grid divide-y divide-concreto-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {sectoresAtendidos.map((sector) => (
              <div key={sector.slug} className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <h2 className="text-lg font-semibold tracking-tight text-marca-900">
                  {sector.nombre}
                </h2>
                <p className="mt-2 max-w-[38ch] text-base leading-relaxed text-concreto-700">
                  {sector.descripcion}
                </p>
              </div>
            ))}
          </div>
        </Contenedor>
      </section>

      <Seccion medida="ancho">
        <TituloSeccion bajada="Tres líneas de servicio que cubren la obra completa: el material, la máquina que lo mueve y el agregado que lo compone.">
          Qué entregamos
        </TituloSeccion>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
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

        <div className="mt-12">
          <BotonEnlace href="/servicios" variante="contorno">
            Ver el detalle de cada servicio
            <ArrowRight size={18} weight="bold" />
          </BotonEnlace>
        </div>
      </Seccion>

      {/* Tercera tríada seguida: cambia de familia de layout a filas anchas
          apiladas, para no encadenar tres rejillas de tres columnas. */}
      <Seccion fondo="azul" medida="ancho">
        <TituloSeccion
          tono="oscuro"
          bajada="Producimos nuestro concreto y operamos nuestra propia maquinaria. No revendemos ni subcontratamos."
        >
          Por qué trabajar con nosotros
        </TituloSeccion>

        <ul className="mt-12 flex flex-col">
          {porQueElegirnos.map((razon) => (
            <li
              key={razon.titulo}
              className="grid gap-3 border-t border-marca-700 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-balance text-white">
                {razon.titulo}
              </h3>
              <p className="max-w-[54ch] text-lg leading-relaxed text-marca-100">
                {razon.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion medida="ancho" ritmo="amplio">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <TituloSeccion bajada={cta.texto}>{cta.titulo}</TituloSeccion>
            <div className="mt-10 flex flex-wrap gap-4">
              <BotonEnlace href={enlaceWhatsapp} externo tamano="grande">
                <WhatsappLogo size={22} weight="fill" />
                Escríbenos por WhatsApp
              </BotonEnlace>
              <BotonEnlace href="/contacto" variante="contorno" tamano="grande">
                Dejar un mensaje
              </BotonEnlace>
            </div>
          </div>

          <RanuraImagen ranura={imagenes.flotaMixer} />
        </div>
      </Seccion>
    </main>
  );
}
