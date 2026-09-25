import type { Metadata } from "next";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/contenedor";
import { Seccion } from "@/components/ui/seccion";
import { privacidad } from "@/content/privacidad";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo VISENTRAC SAC trata los datos personales que usted proporciona a través de este sitio, conforme a la Ley 29733.",
  robots: { index: false, follow: true },
};

/**
 * Política de Privacidad.
 *
 * Modo Read: quien llega aquí viene a entender algo, no a decidir ni a actuar.
 * La composición se ordena para comprensión: una columna de medida legible,
 * encabezados que permiten saltar al apartado que interesa, y ningún llamado a
 * la acción que distraiga.
 */
export default function PoliticaDePrivacidad() {
  return (
    <main id="contenido" className="flex-1">
      <section className="bg-marca-900 pt-36 pb-16 text-white sm:pt-40 sm:pb-20">
        <Contenedor medida="ancho">
          <div className="flex items-start gap-5">
            <ShieldCheck
              size={44}
              weight="light"
              aria-hidden
              className="mt-1 shrink-0 text-senal-400"
            />
            <div>
              <h1 className="text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">
                Política de Privacidad
              </h1>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-marca-100">
                Cómo tratamos los datos personales que usted nos proporciona a
                través de este sitio, conforme a la Ley 29733 de Protección de
                Datos Personales.
              </p>
              <p
                data-medida
                className="mt-6 font-medida text-xs uppercase text-marca-200"
              >
                Última actualización: {privacidad.actualizado}
              </p>
            </div>
          </div>
        </Contenedor>
      </section>

      <Seccion medida="lectura">
        <div className="flex flex-col gap-12">
          {privacidad.secciones.map((seccion) => (
            <section key={seccion.titulo}>
              <span aria-hidden className="block h-0.5 w-16 bg-senal-500" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-balance text-concreto-950">
                {seccion.titulo}
              </h2>

              {seccion.parrafos.map((parrafo) => (
                <p
                  key={parrafo.slice(0, 40)}
                  className="mt-4 text-lg leading-relaxed text-concreto-800"
                >
                  {parrafo}
                </p>
              ))}

              {"listas" in seccion
                ? seccion.listas.map((lista) => (
                    <div key={lista.titulo ?? lista.elementos[0]} className="mt-6">
                      {lista.titulo ? (
                        <h3 className="text-base font-semibold text-concreto-950">
                          {lista.titulo}
                        </h3>
                      ) : null}
                      <ul className="mt-3 border-t border-concreto-300">
                        {lista.elementos.map((elemento) => (
                          <li
                            key={elemento}
                            className="border-b border-concreto-200 py-3 text-base leading-relaxed text-concreto-800"
                          >
                            {elemento}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                : null}
            </section>
          ))}
        </div>
      </Seccion>
    </main>
  );
}
