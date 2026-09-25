import type { Metadata } from "next";
import { BookOpen } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/contenedor";
import { Seccion } from "@/components/ui/seccion";
import { FormularioReclamacion } from "@/components/formulario-reclamacion";
import { reclamaciones } from "@/content/reclamaciones";
import { empresa, contacto } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones virtual de VISENTRAC SAC, conforme al Código de Protección y Defensa del Consumidor.",
  /* Es una obligación legal, no contenido que deba competir en búsquedas. */
  robots: { index: false, follow: true },
};

/**
 * Libro de Reclamaciones virtual.
 *
 * Obligatorio en Perú para establecimientos abiertos al público. Modo Operate:
 * quien llega aquí tiene un problema y viene a registrarlo, así que la página
 * no vende nada ni distrae con otra cosa.
 */
export default function LibroDeReclamaciones() {
  return (
    <main id="contenido" className="flex-1">
      <section className="bg-marca-900 pt-36 pb-16 text-white sm:pt-40 sm:pb-20">
        <Contenedor medida="ancho">
          <div className="flex items-start gap-5">
            <BookOpen size={44} weight="light" aria-hidden className="mt-1 shrink-0 text-senal-400" />
            <div>
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">
                Libro de Reclamaciones
              </h1>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-marca-100">
                {reclamaciones.aviso}
              </p>
            </div>
          </div>
        </Contenedor>
      </section>

      <Seccion medida="normal">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:gap-16">
          <FormularioReclamacion />

          <aside className="text-base leading-relaxed text-concreto-700">
            <h2 className="text-lg font-semibold tracking-tight text-concreto-950">
              Datos del proveedor
            </h2>
            <dl className="mt-4 flex flex-col gap-3 border-t border-concreto-300 pt-4">
              <div>
                <dt className="text-sm text-concreto-600">Razón social</dt>
                <dd className="font-medium text-concreto-950">{empresa.nombre}</dd>
              </div>
              <div>
                <dt className="text-sm text-concreto-600">Domicilio</dt>
                <dd>{contacto.direccion.completa}</dd>
              </div>
              <div>
                <dt className="text-sm text-concreto-600">Correo</dt>
                <dd className="break-all">{contacto.correos[0]}</dd>
              </div>
            </dl>

            <h2 className="mt-10 text-lg font-semibold tracking-tight text-concreto-950">
              Plazo de respuesta
            </h2>
            <p className="mt-4 border-t border-concreto-300 pt-4">
              Responderemos en un plazo máximo de{" "}
              <strong>{reclamaciones.plazoRespuestaDias} días hábiles</strong>,
              al correo electrónico que indique en el formulario.
            </p>
            <p className="mt-4">
              Al registrar su reclamación recibirá un número de constancia.
              Consérvelo: es el comprobante de que la presentó.
            </p>
          </aside>
        </div>
      </Seccion>
    </main>
  );
}
