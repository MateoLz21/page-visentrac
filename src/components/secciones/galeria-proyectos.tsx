import Image from "next/image";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import { Seccion, TituloSeccion } from "@/components/ui/seccion";
import { proyectos, type Proyecto } from "@/content/proyectos";

/**
 * Galería de obras ejecutadas.
 *
 * Mosaico de celdas desiguales, no rejilla de tarjetas iguales: la primera obra
 * ocupa el doble y marca el ritmo. Es deliberado que esta sección no se parezca
 * a las otras listas de la página, y que la fotografía mande sobre el texto.
 *
 * Cada ficha lleva su identificador, el tipo de obra, dónde y qué aportó
 * VISENTRAC. El nombre propio solo aparece cuando existe autorización para
 * citarlo.
 */
function Ficha({ proyecto, destacado = false }: { proyecto: Proyecto; destacado?: boolean }) {
  const { imagen, nombre, tipo, ubicacion, anio, aporte, id } = proyecto;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden bg-concreto-100 ${
        destacado ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className={`relative w-full ${destacado ? "aspect-[4/3]" : "aspect-square"}`}>
        {imagen.archivo ? (
          <Image
            src={imagen.archivo}
            alt={imagen.alt}
            fill
            sizes={destacado ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-concreto-400 p-5 text-center">
            <Camera size={24} weight="light" className="text-concreto-500" />
            <p data-medida className="font-medida text-[0.65rem] text-concreto-600">
              {imagen.id} · PENDIENTE
            </p>
            <p className="max-w-[26ch] text-xs leading-snug text-concreto-700">{imagen.alt}</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-concreto-300 bg-concreto-50 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span data-medida className="font-medida text-[0.65rem] uppercase text-concreto-500">
            {id}
          </span>
          {anio ? (
            <span data-medida className="font-medida text-[0.65rem] text-senal-700">
              {anio}
            </span>
          ) : null}
        </div>

        <h3
          className={`mt-2 font-semibold tracking-tight text-balance text-concreto-950 ${
            destacado ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {nombre ?? tipo}
        </h3>

        <p className="mt-1 text-sm text-concreto-600">
          {nombre ? `${tipo} · ${ubicacion}` : ubicacion}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {aporte.map((servicio) => (
            <li key={servicio} data-medida className="font-medida text-[0.65rem] text-concreto-700">
              {servicio}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function GaleriaProyectos() {
  const [primero, ...resto] = proyectos;

  return (
    <Seccion medida="ancho" id="proyectos">
      <TituloSeccion bajada="Obras donde entregamos concreto, maquinaria o agregados. La fotografía es de nuestras propias operaciones.">
        Proyectos
      </TituloSeccion>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        <Ficha proyecto={primero} destacado />
        {resto.map((proyecto) => (
          <Ficha key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
    </Seccion>
  );
}
