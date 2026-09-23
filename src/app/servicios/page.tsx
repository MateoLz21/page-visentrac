import type { Metadata } from "next";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { RanuraImagen } from "@/components/ui/ranura-imagen";
import { HeroCompleto } from "@/components/layout/hero-completo";
import { BotonEnlace } from "@/components/ui/boton";
import { whatsappUrl } from "@/lib/site";
import { imagenes, heroServicios } from "@/content/imagenes";
import { servicios, flota, ventajas, contacto } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Concreto premezclado, alquiler de maquinaria pesada y liviana, y venta de agregados de construcción en Espinar, Cusco.",
};

export default function Servicios() {
  const enlaceWhatsapp = whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp);
  const [concreto, maquinaria, agregados] = servicios;

  return (
    <main id="contenido" className="flex-1">
      <HeroCompleto
        id="P-02"
        comoH1
        titulo="Servicios"
        bajada="Soluciones integrales para su proyecto: el material, la máquina que lo mueve y el agregado que lo compone."
        imagenes={[heroServicios]}
      >
        <BotonEnlace href={enlaceWhatsapp} externo variante="clara" tamano="grande">
          <WhatsappLogo size={22} weight="fill" />
          Consultar disponibilidad
        </BotonEnlace>
      </HeroCompleto>

      {/* S-01: bloque con fotografía */}
      <Seccion medida="ancho">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <span aria-hidden className="block h-0.5 w-full bg-senal-500" />
            <p data-medida className="mt-3 font-medida text-xs uppercase text-concreto-500">
              S-01
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {concreto.nombre}
            </h2>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-concreto-700">
              {concreto.descripcion}
            </p>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-concreto-700">
              Lo producimos en planta propia, lo que nos permite responder por la
              dosificación y por el tiempo de entrega sin depender de terceros.
            </p>
          </div>
          <RanuraImagen ranura={imagenes.obraVaciado} />
        </div>
      </Seccion>

      {/* S-02: la flota como serie de unidades idénticas, leída de un barrido */}
      <Seccion fondo="azul" medida="ancho">
        <div className="max-w-[46ch]">
          <span aria-hidden className="block h-0.5 w-full bg-senal-500" />
          <p data-medida className="mt-3 font-medida text-xs uppercase text-marca-200">
            S-02
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            {maquinaria.nombre}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-marca-100">
            {maquinaria.descripcion}
          </p>
        </div>

        <div className="mt-12 border-t border-marca-700">
          <div
            aria-hidden
            className="hidden grid-cols-[6rem_1fr_8rem] gap-4 border-b border-marca-700 py-3 sm:grid"
          >
            <span data-medida className="font-medida text-xs uppercase text-marca-300">
              Código
            </span>
            <span data-medida className="font-medida text-xs uppercase text-marca-300">
              Unidad
            </span>
            <span data-medida className="font-medida text-xs uppercase text-marca-300">
              Clase
            </span>
          </div>

          <ul>
            {flota.map((unidad) => (
              <li
                key={unidad.id}
                className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 border-b border-marca-700 py-4 sm:grid-cols-[6rem_1fr_8rem]"
              >
                <span data-medida className="font-medida text-sm text-senal-400">
                  {unidad.id}
                </span>
                <span className="text-lg font-medium text-white">{unidad.nombre}</span>
                <span data-medida className="font-medida text-sm text-marca-200">
                  {unidad.clase}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-marca-200">
          Consúltenos por disponibilidad y condiciones de alquiler según el plazo
          y la ubicación de su obra.
        </p>
      </Seccion>

      {/* S-03: los tres agregados en línea, con fotografía cuadrada */}
      <Seccion medida="ancho">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <RanuraImagen ranura={imagenes.agregados} className="lg:order-2" />

          <div className="lg:order-1">
            <span aria-hidden className="block h-0.5 w-full bg-concreto-300" />
            <p data-medida className="mt-3 font-medida text-xs uppercase text-concreto-500">
              S-03
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {agregados.nombre}
            </h2>
            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-concreto-700">
              {agregados.descripcion}
            </p>

            <ul className="mt-8 border-t border-concreto-300">
              {agregados.detalle.map((material, i) => (
                <li
                  key={material}
                  className="flex items-baseline justify-between gap-6 border-b border-concreto-200 py-4"
                >
                  <span className="text-lg font-medium text-concreto-950">{material}</span>
                  <span data-medida className="font-medida text-sm text-concreto-500">
                    AG-0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Seccion>

      {/* Ventajas: fondo tinta y filas apiladas, distinto de todo lo anterior */}
      <Seccion fondo="tinta" medida="ancho">
        <TituloSeccion tono="oscuro">Cómo trabajamos</TituloSeccion>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {ventajas.map((ventaja) => (
            <div key={ventaja.titulo}>
              <h3 className="text-xl font-semibold tracking-tight text-balance text-white">
                {ventaja.titulo}
              </h3>
              <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-concreto-300">
                {ventaja.descripcion}
              </p>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion medida="ancho" ritmo="amplio">
        <TituloSeccion bajada="Cuéntenos qué necesita su obra y le respondemos con disponibilidad y condiciones.">
          ¿Qué necesita para su proyecto?
        </TituloSeccion>
        <div className="mt-10 flex flex-wrap gap-4">
          <BotonEnlace href={enlaceWhatsapp} externo tamano="grande">
            <WhatsappLogo size={22} weight="fill" />
            Escríbenos por WhatsApp
          </BotonEnlace>
          <BotonEnlace href="/contacto" variante="contorno" tamano="grande">
            Dejar un mensaje
          </BotonEnlace>
        </div>
      </Seccion>
    </main>
  );
}
