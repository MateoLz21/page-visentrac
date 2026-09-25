import type { Metadata } from "next";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { Contenedor } from "@/components/ui/contenedor";
import { Muestra } from "@/components/ui/muestra";
import { RanuraImagen } from "@/components/ui/ranura-imagen";
import { HeroSlider } from "@/components/layout/hero-slider";
import { GaleriaOperaciones } from "@/components/secciones/galeria-operaciones";
import { PorQueElegirnos } from "@/components/secciones/por-que-elegirnos";
import { VideoInstitucional } from "@/components/secciones/video-institucional";
import { DescargaBrochure } from "@/components/secciones/descarga-brochure";
import { BotonEnlace } from "@/components/ui/boton";
import { whatsappUrl } from "@/lib/site";
import { imagenes, heroInicio } from "@/content/imagenes";
import {
  propuestaValor,
  servicios,
  sectoresAtendidos,
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
      {/* Cada diapositiva es una de las tres muestras del catálogo: su
          fotografía, su identificador y su servicio. */}
      <HeroSlider
        titularAccesible={propuestaValor.titular}
        diapositivas={servicios.map((servicio, i) => ({
          id: `S-0${i + 1}`,
          titulo: servicio.nombre,
          descripcion: servicio.descripcion,
          imagen: heroInicio[i],
        }))}
      >
        <BotonEnlace href={enlaceWhatsapp} externo variante="clara" tamano="grande">
          <WhatsappLogo size={22} weight="fill" />
          Pedir cotización
        </BotonEnlace>
        <BotonEnlace
          href="/servicios"
          variante="contorno"
          tamano="grande"
          className="border-white/60 text-white hover:bg-white/10 active:bg-white/20"
        >
          Ver servicios
          <ArrowRight size={18} weight="bold" />
        </BotonEnlace>
      </HeroSlider>

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

      {/* La prueba va antes que el argumento: primero las obras, después el
          motivo para contratarlas. */}
      <GaleriaOperaciones />

      <VideoInstitucional />

      <PorQueElegirnos />

      <DescargaBrochure />

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
