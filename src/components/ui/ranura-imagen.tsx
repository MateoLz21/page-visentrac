import Image from "next/image";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import type { Ranura } from "@/content/imagenes";

type Props = {
  ranura: Ranura;
  /** La foto del primer viewport se carga con prioridad. */
  prioridad?: boolean;
  className?: string;
};

const proporciones = {
  ancha: "aspect-[16/10]",
  cuadrada: "aspect-square",
  alta: "aspect-[4/5]",
} as const;

/**
 * Fotografía con su rótulo cosido al pie.
 *
 * Ninguna imagen del sitio flota sin identificar: todas declaran qué son y
 * dónde. Cuando la foto real todavía no existe, dibuja un marco que nombra
 * exactamente la toma que falta, en lugar de disimular con una imagen de banco.
 */
export function RanuraImagen({ ranura, prioridad = false, className = "" }: Props) {
  const { archivo, alt, rotulo, proporcion } = ranura;

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-concreto-100 ${proporciones[proporcion]}`}
      >
        {archivo ? (
          <Image
            src={archivo}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={prioridad}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-concreto-400 p-6 text-center">
            <Camera size={28} weight="light" className="text-concreto-600" />
            <p data-medida className="font-medida text-xs text-concreto-600">
              FOTO PENDIENTE
            </p>
            <p className="max-w-[32ch] text-sm leading-snug text-concreto-700">
              {alt}
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-3 border-t border-concreto-300 pt-2 text-sm text-concreto-700">
        {rotulo}
      </figcaption>
    </figure>
  );
}
