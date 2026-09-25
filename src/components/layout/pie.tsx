import Link from "next/link";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  BookOpen,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { navegacion, empresa, contacto } from "@/content/empresa";
import { Contenedor } from "@/components/ui/contenedor";
import { Anio } from "@/components/ui/anio";
import { Logotipo } from "@/components/ui/logotipo";
import { RedesSociales } from "@/components/ui/redes-sociales";

/** Pie común a las cuatro páginas. */
export function Pie() {

  return (
    <footer className="bg-concreto-950 text-concreto-100">
      <Contenedor medida="ancho">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logotipo version="blanco" alto={52} />
            <p data-medida className="mt-4 font-medida text-[0.65rem] uppercase text-concreto-400">
              {empresa.nombre} · desde {empresa.desde}
            </p>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-concreto-300">
              {empresa.descripcionBreve}
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="text-sm font-semibold text-white">Secciones</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navegacion.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-concreto-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">Contacto</h2>
            <ul className="mt-4 flex flex-col gap-4">
              <li className="flex gap-3">
                <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-senal-400" />
                <span className="text-base leading-snug text-concreto-300">
                  {contacto.direccion.completa}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={20} weight="light" className="mt-0.5 shrink-0 text-senal-400" />
                <span className="flex flex-col gap-1">
                  {contacto.telefonos.map((tel) => (
                    <a
                      key={tel}
                      href={`tel:+51${tel}`}
                      data-medida
                      className="font-medida text-base text-concreto-200 underline-offset-4 hover:text-white hover:underline"
                    >
                      {tel}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <EnvelopeSimple size={20} weight="light" className="mt-0.5 shrink-0 text-senal-400" />
                <span className="flex flex-col gap-1">
                  {contacto.correos.map((correo) => (
                    <a
                      key={correo}
                      href={`mailto:${correo}`}
                      className="text-base break-all text-concreto-200 underline-offset-4 hover:text-white hover:underline"
                    >
                      {correo}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-concreto-800 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p data-medida className="font-medida text-xs text-concreto-400">
              © <Anio /> {empresa.nombre}. Todos los derechos reservados.
            </p>

            {/* Obligaciones legales: deben estar accesibles, no destacadas. El
                pie es donde el visitante las busca cuando las necesita, y donde
                no compiten con nada cuando no. */}
            <Link
              href="/libro-de-reclamaciones"
              className="inline-flex items-center gap-2 text-xs text-concreto-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <BookOpen size={16} weight="light" aria-hidden />
              Libro de Reclamaciones
            </Link>

            <Link
              href="/politica-de-privacidad"
              className="inline-flex items-center gap-2 text-xs text-concreto-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <ShieldCheck size={16} weight="light" aria-hidden />
              Política de Privacidad
            </Link>
          </div>

          <RedesSociales tono="claro" />
        </div>
      </Contenedor>
    </footer>
  );
}
