import type { Metadata } from "next";
import { Seccion } from "@/components/ui/seccion";
import { Contenedor } from "@/components/ui/contenedor";
import { Migas } from "@/components/migas";
import { VisorPoliticas } from "@/components/secciones/visor-politicas";
import { resolverPoliticas } from "@/lib/politicas";

export const metadata: Metadata = {
  title: "Políticas de gestión ambiental, seguridad y salud ocupacional",
  description:
    "Políticas de gestión ambiental y responsabilidad social, y de seguridad y salud ocupacional de VISENTRAC SAC, en documentos firmados por la gerencia.",
};

/**
 * Políticas corporativas.
 *
 * Esta página trabaja para el comprador minero y para la entidad pública: son
 * quienes piden documentación firmada antes de homologar a un proveedor, y
 * hasta ahora el sitio no tenía nada que enseñarles. `PRODUCT.md` describe ese
 * perfil como el de ciclo largo que filtra por requisitos antes que por precio.
 */
export default function Politicas() {
  const politicas = resolverPoliticas();

  return (
    <main id="contenido" className="flex-1">
      <Migas pagina="Políticas" ruta="/politicas/" />
      <section className="bg-marca-900 pt-36 pb-16 text-white sm:pt-40 sm:pb-20">
        <Contenedor medida="ancho">
          <h1 className="max-w-[20ch] text-4xl font-bold tracking-[-0.03em] text-balance sm:text-5xl">
            Políticas de la empresa
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-marca-100 text-pretty">
            Los compromisos que asumimos en materia ambiental, de seguridad y de
            calidad, en los documentos firmados por nuestra gerencia.
          </p>
        </Contenedor>
      </section>

      <Seccion medida="normal">
        <VisorPoliticas politicas={politicas} />
      </Seccion>
    </main>
  );
}
