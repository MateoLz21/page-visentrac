import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

type Variante = "primaria" | "contorno" | "clara";
type Tamano = "normal" | "grande";

/**
 * Sobre el color del botón de WhatsApp: se queda en el azul del sistema, no en
 * el verde de la marca WhatsApp. El sistema asigna un rol a cada color y el
 * verde no tiene ninguno; el logotipo del icono ya identifica el canal sin
 * introducir un cuarto color sin función.
 */
const variantes: Record<Variante, string> = {
  primaria:
    "bg-marca-900 text-white hover:bg-marca-950 active:bg-marca-950 border border-marca-900 hover:border-marca-950",
  contorno:
    "bg-transparent text-marca-900 border border-marca-900 hover:bg-marca-50 active:bg-marca-100",
  clara:
    "bg-white text-marca-950 border border-white hover:bg-concreto-100 hover:border-concreto-100 active:bg-concreto-200",
};

const tamanos: Record<Tamano, string> = {
  normal: "min-h-12 px-5 text-base",
  grande: "min-h-14 px-7 text-lg",
};

/*
 * min-h-12 y min-h-14: el caso base es una mano, al sol, a veces con guante.
 * El objetivo táctil nunca baja de 48px.
 */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[--radius-muestra] font-semibold tracking-tight transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

type BotonProps = {
  children: ReactNode;
  variante?: Variante;
  tamano?: Tamano;
  className?: string;
};

type EnlaceProps = BotonProps & {
  href: string;
  externo?: boolean;
};

/** Acción que navega. Usa `next/link` salvo que apunte fuera del sitio. */
export function BotonEnlace({
  children,
  href,
  externo = false,
  variante = "primaria",
  tamano = "normal",
  className = "",
}: EnlaceProps) {
  const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clases}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

/** Acción que ejecuta. Para envíos de formulario y controles. */
export function Boton({
  children,
  variante = "primaria",
  tamano = "normal",
  className = "",
  ...props
}: BotonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
