import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import { empresa, contacto } from "@/content/empresa";
import { siteUrl, indexable } from "@/lib/site";
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
  /*
   * Google ignora esta etiqueta desde 2009 y no posiciona por ella. Se mantiene
   * porque otros buscadores y algunos agregadores sí la leen, y porque sirve de
   * registro de los términos por los que este sitio quiere ser encontrado.
   *
   * Lo que de verdad posiciona son estos mismos términos dentro de los títulos,
   * los encabezados y el texto de las páginas, que es donde están.
   */
  keywords: [
    "concreto premezclado Espinar",
    "concreto premezclado Cusco",
    "planta de concreto Espinar",
    "alquiler de maquinaria Espinar",
    "alquiler de camión mixer",
    "alquiler de bomba hormigonera",
    "alquiler de volquete Espinar",
    "telehandler Cusco",
    "cargador frontal alquiler",
    "agregados de construcción Espinar",
    "piedra chancada Espinar",
    "arena gruesa Cusco",
    "arena fina Espinar",
    "over para afirmado",
    "cascajo ripio Espinar",
    "movimiento de tierra Espinar",
    "proveedor minero Espinar",
    "VISENTRAC SAC",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: empresa.nombre,
    title: `${empresa.nombre}: soluciones para construcción y minería`,
    description: empresa.descripcionBreve,
  },
  robots: { index: indexable, follow: indexable },
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
  /* Las coordenadas son lo que permite aparecer en las búsquedas de "cerca de
     mí" y en el mapa de resultados locales, no la dirección escrita. */
  geo: {
    "@type": "GeoCoordinates",
    latitude: contacto.direccion.latitud,
    longitude: contacto.direccion.longitud,
  },
  hasMap: contacto.direccion.fichaGoogleUrl,
  /* `sameAs` le dice a Google que este sitio y esos perfiles son la misma
     empresa. Sin ello, la ficha del negocio y la web viven separadas y no se
     refuerzan en los resultados locales. */
  sameAs: [
    contacto.direccion.fichaGoogleUrl,
    ...contacto.redes.map((red) => red.url),
  ],
};

/**
 * Identidad del sitio como tal, distinta de la del negocio.
 *
 * Ayuda a que Google asocie el dominio con el nombre de la empresa y muestre
 * "VISENTRAC SAC" en lugar de la URL cruda en los resultados.
 */
const jsonLdSitio = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: empresa.nombre,
  alternateName: empresa.nombreCorto,
  url: siteUrl,
  inLanguage: "es-PE",
  publisher: { "@type": "Organization", name: empresa.nombre },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSitio) }}
        />
      </body>
    </html>
  );
}
