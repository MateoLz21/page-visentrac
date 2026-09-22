import type { Metadata } from "next";
import { WhatsappLogo, Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/contenedor";
import { Seccion } from "@/components/ui/seccion";
import { BotonEnlace } from "@/components/ui/boton";
import { FormularioContacto } from "@/components/formulario-contacto";
import { whatsappUrl } from "@/lib/site";
import { contacto } from "@/content/empresa";

export const metadata: Metadata = {
  title: "Contáctenos",
  description:
    "Escríbanos por WhatsApp, llámenos o déjenos un mensaje. Pasaje Rosas Pata 102, Espinar, Cusco.",
};

/**
 * Única superficie en modo Operate: el visitante ya decidió consultar y viene a
 * ejecutar una tarea. La expresión no puede estorbar al canal de contacto, así
 * que los datos accionables van antes que cualquier otra cosa.
 */
export default function Contacto() {
  const enlaceWhatsapp = whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp);

  return (
    <main id="contenido" className="flex-1">
      <section className="bg-marca-900 py-16 text-white sm:py-20">
        <Contenedor medida="ancho">
          <h1 className="max-w-[18ch] text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">
            Contáctenos
          </h1>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-marca-100 text-pretty">
            La vía más rápida es WhatsApp. Si prefiere dejar constancia escrita,
            use el formulario y le respondemos por correo.
          </p>
          <div className="mt-10">
            <BotonEnlace href={enlaceWhatsapp} externo variante="clara" tamano="grande">
              <WhatsappLogo size={22} weight="fill" />
              Escríbenos por WhatsApp
            </BotonEnlace>
          </div>
        </Contenedor>
      </section>

      <Seccion medida="ancho">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                <Phone size={22} weight="light" className="text-marca-900" />
                Teléfonos
              </h2>
              <ul className="mt-4 border-t border-concreto-300">
                {contacto.telefonos.map((tel) => (
                  <li key={tel} className="border-b border-concreto-200">
                    <a
                      href={`tel:+51${tel}`}
                      data-medida
                      className="flex min-h-14 items-center font-medida text-lg text-concreto-950 underline-offset-4 hover:text-marca-900 hover:underline"
                    >
                      {tel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                <EnvelopeSimple size={22} weight="light" className="text-marca-900" />
                Correos
              </h2>
              <ul className="mt-4 border-t border-concreto-300">
                {contacto.correos.map((correo) => (
                  <li key={correo} className="border-b border-concreto-200">
                    <a
                      href={`mailto:${correo}`}
                      className="flex min-h-14 items-center text-base break-all text-concreto-950 underline-offset-4 hover:text-marca-900 hover:underline"
                    >
                      {correo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                <MapPin size={22} weight="light" className="text-marca-900" />
                Dirección
              </h2>
              <p className="mt-4 border-t border-concreto-300 pt-4 text-lg leading-relaxed text-concreto-800">
                {contacto.direccion.completa}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Déjenos un mensaje</h2>
            <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-concreto-700">
              Responderemos al correo o al teléfono que nos indique.
            </p>
            <div className="mt-6">
              <FormularioContacto />
            </div>
          </div>
        </div>
      </Seccion>

      <section className="border-t border-concreto-200">
        {contacto.direccion.mapaEmbedUrl ? (
          <iframe
            src={contacto.direccion.mapaEmbedUrl}
            title={`Ubicación de VISENTRAC en ${contacto.direccion.completa}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full border-0 sm:h-[26rem]"
          />
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-3 bg-concreto-100 px-6 text-center">
            <MapPin size={28} weight="light" className="text-concreto-500" />
            <p data-medida className="font-medida text-xs text-concreto-600">
              MAPA PENDIENTE
            </p>
            <p className="max-w-[40ch] text-sm leading-snug text-concreto-700">
              Falta el enlace de Google Maps del local. Se configura en
              `src/content/empresa.ts`.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
