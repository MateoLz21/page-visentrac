/**
 * Preproceso de imágenes.
 *
 * El sitio se exporta como HTML estático, así que el optimizador de `next/image`
 * no existe en producción: lo que se sube es exactamente lo que hay en
 * `public/`. Este script deja cada archivo en su tamaño y formato definitivos.
 *
 * Uso:  node scripts/optimizar-imagenes.mjs <carpeta-origen>
 *
 * El original nunca se toca. La salida va a `public/images/`.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const origen = process.argv[2];
const destino = "public/images";

if (!origen) {
  console.error("Falta la carpeta de origen.");
  console.error("Uso: node scripts/optimizar-imagenes.mjs <carpeta-origen>");
  process.exit(1);
}

/** Ancho máximo por tipo de pieza. El hero se sirve a pantalla completa. */
const perfiles = {
  hero: { ancho: 2000, calidad: 78 },
  logo: { ancho: 520, calidad: 90 },
  foto: { ancho: 1400, calidad: 80 },
};

function perfilDe(nombre) {
  const n = nombre.toLowerCase();
  if (n.startsWith("hero")) return "hero";
  if (n.includes("logo")) return "logo";
  return "foto";
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

await mkdir(destino, { recursive: true });

const archivos = (await readdir(origen)).filter((f) =>
  /\.(png|jpe?g|webp)$/i.test(f),
);

if (archivos.length === 0) {
  console.error(`No hay imágenes en ${origen}`);
  process.exit(1);
}

let totalAntes = 0;
let totalDespues = 0;

for (const archivo of archivos) {
  const rutaOrigen = join(origen, archivo);
  const { name } = parse(archivo);
  const tipo = perfilDe(name);
  const { ancho, calidad } = perfiles[tipo];

  const entrada = sharp(rutaOrigen);
  const meta = await entrada.metadata();
  const pesoAntes = (await stat(rutaOrigen)).size;

  /* Los logos conservan el canal alfa; las fotografías no lo necesitan. */
  const salida = entrada
    .resize({ width: Math.min(ancho, meta.width ?? ancho), withoutEnlargement: true })
    .webp({ quality: calidad, alphaQuality: 100, effort: 6 });

  const rutaDestino = join(destino, `${name}.webp`);
  const info = await salida.toFile(rutaDestino);

  totalAntes += pesoAntes;
  totalDespues += info.size;

  const reduccion = Math.round((1 - info.size / pesoAntes) * 100);
  console.log(
    `${name.padEnd(24)} ${String(meta.width).padStart(5)}px -> ${String(info.width).padStart(5)}px   ` +
      `${kb(pesoAntes).padStart(9)} -> ${kb(info.size).padStart(8)}   (-${reduccion}%)`,
  );
}

console.log(
  `\nTotal: ${kb(totalAntes)} -> ${kb(totalDespues)} ` +
    `(-${Math.round((1 - totalDespues / totalAntes) * 100)}%)`,
);
