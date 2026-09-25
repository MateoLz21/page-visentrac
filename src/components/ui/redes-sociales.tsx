import { FacebookLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { contacto, empresa } from "@/content/empresa";

const iconos: Record<string, Icon> = {
  facebook: FacebookLogo,
  tiktok: TiktokLogo,
};

type Props = {
  /** `claro` sobre fondo oscuro; `oscuro` sobre fondo claro. */
  tono?: "claro" | "oscuro";
  /** `compacto` para la cabecera, donde el espacio compite con la navegación. */
  tamano?: "normal" | "compacto";
  className?: string;
};

const estilos = {
  claro:
    "border-concreto-800 text-concreto-300 hover:border-concreto-600 hover:text-white",
  oscuro:
    "border-concreto-300 text-concreto-700 hover:border-marca-900 hover:text-marca-900",
} as const;

/**
 * Enlaces a las redes de la empresa.
 *
 * Se añaden solas: basta con sumar una entrada en `contacto.redes` y su
 * logotipo al mapa de arriba. No hay que tocar la cabecera ni el pie.
 *
 * Los iconos van sin etiqueta visible porque los logotipos de Facebook y TikTok
 * se reconocen sin texto, pero cada enlace lleva su nombre accesible y el aviso
 * de que abre una pestaña nueva.
 */
/* El tipo se ensancha a propósito: `contacto.redes` es `as const`, así que su
   longitud es un literal y TypeScript daría por imposible comprobar si está
   vacío. La comprobación debe sobrevivir a que alguien quite todas las redes. */
type Red = { nombre: string; icono: string; url: string };

export function RedesSociales({
  tono = "oscuro",
  tamano = "normal",
  className = "",
}: Props) {
  const redes: readonly Red[] = contacto.redes;
  if (redes.length === 0) return null;

  const lado = tamano === "compacto" ? "h-11 w-11" : "h-12 w-12";
  const icono = tamano === "compacto" ? 18 : 20;

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {redes.map((red) => {
        const Logo = iconos[red.icono];
        if (!Logo) return null;

        return (
          <li key={red.nombre}>
            <a
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex ${lado} items-center justify-center rounded-[--radius-muestra] border transition-colors ${estilos[tono]}`}
            >
              <Logo size={icono} weight="fill" aria-hidden />
              <span className="sr-only">
                {red.nombre} de {empresa.nombreCorto} (se abre en una pestaña nueva)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
