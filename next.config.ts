import type { NextConfig } from "next";

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
