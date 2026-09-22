import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import { empresa, contacto } from "@/content/empresa";
import { siteUrl } from "@/lib/site";
import { Cabecera } from "@/components/layout/cabecera";
import { Pie } from "@/components/layout/pie";
import { WhatsappFlotante } from "@/components/layout/whatsapp-flotante";

/**
 * Archivo: grotesca de rotulación. Cubre titulares y cuerpo, con eje de ancho
 * variable para condensar los titulares sin cambiar de familia.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** Martian Mono: identificadores de muestra y valores medidos, nada más. */
const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${empresa.nombre}: concreto premezclado, maquinaria y agregados en Espinar, Cusco`,
    template: `%s | ${empresa.nombreCorto}`,
  },
  description: empresa.descripcionBreve,
  keywords: [
    "concreto premezclado Espinar",
    "alquiler de maquinaria Cusco",
    "agregados de construcción",
    "camión mixer",
    "bomba hormigonera",
    "VISENTRAC",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: empresa.nombre,
    title: `${empresa.nombre}: soluciones para construcción y minería`,
    description: empresa.descripcionBreve,
  },
  robots: { index: true, follow: true },
};

/** Datos estructurados para búsqueda local (Google Business / rich results). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: empresa.nombre,
  description: empresa.descripcionBreve,
  url: siteUrl,
  telephone: contacto.telefonos.map((t) => `+51${t}`),
  email: contacto.correos[0],
  foundingDate: String(empresa.desde),
  address: {
    "@type": "PostalAddress",
    streetAddress: contacto.direccion.calle,
    addressLocality: contacto.direccion.ciudad,
    addressRegion: contacto.direccion.region,
    addressCountry: "PE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${archivo.variable} ${martianMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only rounded-[--radius-muestra] focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-marca-900 focus:px-4 focus:py-3 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Cabecera />
        {children}
        <Pie />
        <WhatsappFlotante />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
