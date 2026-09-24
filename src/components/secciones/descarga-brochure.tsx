import { FilePdf, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Seccion } from "@/components/ui/seccion";
import { empresa } from "@/content/empresa";
import { obtenerBrochure } from "@/lib/brochure";

/**
 * Descarga del brochure institucional.
 *
 * La sección solo existe si el PDF está en `public/`: se comprueba al compilar,
 * así nunca se publica un enlace a un archivo que no está.
 *
 * Sirve a un caso concreto del sector: el comprador de una minera o de una
 * entidad pública necesita adjuntar el documento a un expediente o reenviarlo a
 * quien decide, y para eso el sitio web no le vale.
 */
export function DescargaBrochure() {
  const brochure = obtenerBrochure();

  if (!brochure) return null;

  return (
    <Seccion fondo="tinta" medida="ancho" ritmo="compacto">
      <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
        <FilePdf
          size={56}
          weight="light"
          aria-hidden
          className="shrink-0 text-senal-400"
        />

        <div>
          <span aria-hidden className="mb-4 block h-0.5 w-20 bg-senal-500" />
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
            Brochure institucional
          </h2>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-concreto-300">
            Todos nuestros servicios, maquinaria y datos de contacto en un solo
            documento, listo para compartir con su equipo o adjuntar a un
            expediente.
          </p>
        </div>

        <a
          href={brochure.url}
          download
          className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-[--radius-muestra] bg-white px-7 text-lg font-semibold text-marca-950 transition-colors hover:bg-concreto-100 active:bg-concreto-200"
        >
          <DownloadSimple size={22} weight="bold" aria-hidden />
          Descargar
          {/* El formato y el peso van en el propio enlace: quien lo lee con
              lector de pantalla recibe el mismo aviso que quien lo ve. */}
          <span data-medida className="font-medida text-xs font-normal text-concreto-600">
            PDF · {brochure.peso}
          </span>
        </a>
      </div>

      <p className="sr-only">
        El archivo se descarga a su dispositivo. Documento institucional de{" "}
        {empresa.nombre}, formato PDF, {brochure.peso}.
      </p>
    </Seccion>
  );
}
