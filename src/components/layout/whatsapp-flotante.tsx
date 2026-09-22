import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { contacto } from "@/content/empresa";
import { whatsappUrl } from "@/lib/site";

/**
 * Acceso permanente al canal primario.
 *
 * En móvil se ancla arriba del borde inferior con espacio suficiente para no
 * solaparse con el botón de envío del formulario de contacto, que es el único
 * control que compite con él por esa zona.
 */
export function WhatsappFlotante() {
  return (
    <a
      href={whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2.5 rounded-[--radius-muestra] bg-marca-900 px-5 font-semibold text-white shadow-[var(--shadow-flotante)] transition-colors hover:bg-marca-950 sm:right-6 sm:bottom-6"
    >
      <WhatsappLogo size={24} weight="fill" />
      <span className="hidden sm:inline">Escríbenos</span>
      <span className="sr-only sm:hidden">Escríbenos por WhatsApp</span>
    </a>
  );
}
