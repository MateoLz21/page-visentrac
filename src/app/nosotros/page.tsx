import type { Metadata } from "next";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { Contenedor } from "@/components/ui/contenedor";
import { Muestra } from "@/components/ui/muestra";
import { RanuraImagen } from "@/components/ui/ranura-imagen";
import { BotonEnlace } from "@/components/ui/boton";
import { whatsappUrl } from "@/lib/site";
import { imagenes } from "@/content/imagenes";
import {
  empresa,
  hitos,
  mision,
  vision,
  valores,
  estadisticas,
  contacto,
} from "@/content/empresa";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "VISENTRAC SAC opera desde 2014 en Espinar, Cusco, con planta de concreto y flota propias, atendiendo construcción, minería y agroindustria.",
};

export default function Nosotros() {
  const enlaceWhatsapp = whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp);

  return (
    <main id="contenido" className="flex-1">
      <section className="bg-marca-900 py-16 text-white sm:py-20">
        <Contenedor medida="ancho">
          <h1 className="max-w-[20ch] text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">
            Operamos desde {empresa.desde} en Espinar
          </h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-marca-100 text-pretty">
            {empresa.descripcionBreve}
          </p>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-marca-700 pt-8">
            {estadisticas.map((dato) => (
              <div key={dato.etiqueta}>
                <dt className="sr-only">{dato.etiqueta}</dt>
                <dd>
                  <span
                    data-medida
                    className="block font-medida text-3xl font-semibold text-senal-400 sm:text-4xl"
                  >
                    {dato.valor}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-marca-100">
                    {dato.etiqueta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Contenedor>
      </section>

      <Seccion medida="ancho">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <TituloSeccion>Trayectoria</TituloSeccion>
            <div className="mt-8 flex flex-col gap-5">
              {hitos.map((hito) => (
                <p
                  key={hito.numero}
                  className="max-w-[60ch] border-l border-concreto-300 pl-5 text-lg leading-relaxed text-concreto-800"
                >
                  {hito.texto}
                </p>
              ))}
            </div>
          </div>

          <RanuraImagen ranura={imagenes.equipoObra} />
        </div>
      </Seccion>

      <Seccion fondo="azul" medida="ancho">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span aria-hidden className="block h-0.5 w-full bg-senal-500" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Misión
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-marca-100">
              {mision.resumen}
            </p>
          </div>

          <div>
            <span aria-hidden className="block h-0.5 w-full bg-marca-400" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Visión
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-marca-100">
              {vision.resumen}
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion medida="ancho">
        <TituloSeccion bajada="Cinco compromisos que ordenan cómo tomamos decisiones en obra.">
          Nuestros valores
        </TituloSeccion>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {valores.map((valor, i) => (
            <Muestra
              key={valor.slug}
              id={`V-0${i + 1}`}
              titulo={valor.nombre}
              destacada={valor.slug === "calidad-comprobada"}
            >
              {valor.descripcion}
            </Muestra>
          ))}
        </div>
      </Seccion>

      <Seccion fondo="tinta" medida="ancho" ritmo="amplio">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <TituloSeccion
            tono="oscuro"
            bajada="Estamos en Espinar y atendemos obras en toda la región. Cuéntenos qué necesita."
          >
            Trabajemos juntos
          </TituloSeccion>
          <BotonEnlace href={enlaceWhatsapp} externo variante="clara" tamano="grande">
            <WhatsappLogo size={22} weight="fill" />
            Escríbenos por WhatsApp
          </BotonEnlace>
        </div>
      </Seccion>
    </main>
  );
}
