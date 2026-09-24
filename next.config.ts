import type { NextConfig } from "next";

/*
 * Aviso al compilar: es la única señal de que este build no se va a indexar.
 * Sin ella, publicar el dominio real sin activar la variable pasa inadvertido y
 * el sitio queda invisible en Google durante semanas sin que nadie lo note.
 */
if (process.env.NEXT_PUBLIC_INDEXABLE !== "true") {
  console.log(
    "\n  AVISO  Este build NO se indexará en buscadores.\n" +
      "         robots.txt bloquea todo y las páginas llevan noindex.\n" +
      "         Correcto para una previsualización.\n" +
      "         Para el dominio definitivo: NEXT_PUBLIC_INDEXABLE=true\n",
  );
}

const nextConfig: NextConfig = {
  // El sitio se publica como HTML estático en un hosting compartido (cPanel).
  // `next build` genera la carpeta `out/`, cuyo contenido se sube a public_html.
  output: "export",

  // Apache sirve /ruta/ como /ruta/index.html. Evita 404 al recargar una URL.
  trailingSlash: true,

  images: {
    // No hay servidor Node en el hosting: el optimizador de next/image no existe.
    // Las imágenes se sirven tal cual, ya comprimidas, desde public/.
    unoptimized: true,
  },
};

export default nextConfig;
