/**
 * Registro único de imágenes del sitio.
 *
 * Mientras el cliente no entregue fotografía en alta resolución, cada ranura
 * tiene `archivo: null` y la página dibuja un marco rotulado que declara qué
 * foto falta. Es deliberado: la fotografía es la única prueba que respalda la
 * afirmación de planta y flota propias, así que rellenarla con banco de
 * imágenes genéricas mostraría una obra que no es la suya.
 *
 * Para publicar una foto real: colocar el archivo en `public/images/...` y
 * poner su ruta en `archivo`. Nada más cambia.
 */

export type Ranura = {
  /** Identificador de muestra, visible en el marco pendiente. */
  id: string;
  /** Ruta bajo `public/`, o null mientras no exista la foto real. */
  archivo: string | null;
  /** Texto alternativo. Obligatorio: describe la escena, no el archivo. */
  alt: string;
  /** Rótulo cosido al pie de la imagen: qué es y dónde. */
  rotulo: string;
  /** Proporción con la que se reserva el espacio, para no provocar saltos. */
  proporcion: "ancha" | "cuadrada" | "alta";
};

export const imagenes = {
  plantaPrincipal: {
    id: "IMG-01",
    archivo: null,
    alt: "Planta de concreto premezclado de VISENTRAC con sus silos en operación",
    rotulo: "Planta de concreto propia. Espinar, Cusco",
    proporcion: "alta",
  },
  flotaMixer: {
    id: "IMG-02",
    archivo: null,
    alt: "Camión mixer de VISENTRAC descargando concreto en obra",
    rotulo: "Camión mixer en descarga",
    proporcion: "ancha",
  },
  cargadorFrontal: {
    id: "IMG-03",
    archivo: null,
    alt: "Cargador frontal de VISENTRAC cargando agregado en cantera",
    rotulo: "Cargador frontal en cantera",
    proporcion: "cuadrada",
  },
  obraVaciado: {
    id: "IMG-04",
    archivo: null,
    alt: "Vaciado de concreto sobre encofrado en obra",
    rotulo: "Vaciado sobre encofrado",
    proporcion: "ancha",
  },
  agregados: {
    id: "IMG-05",
    archivo: null,
    alt: "Rumas de arena, grava y piedra chancada clasificadas",
    rotulo: "Agregados clasificados",
    proporcion: "cuadrada",
  },
  equipoObra: {
    id: "IMG-06",
    archivo: null,
    alt: "Equipo de VISENTRAC en operación junto a los volquetes",
    rotulo: "Equipo en operación",
    proporcion: "ancha",
  },
} as const satisfies Record<string, Ranura>;

/** Cuántas fotos reales faltan. Útil para avisar en revisión. */
export const ranurasPendientes = Object.values(imagenes).filter(
  (r) => r.archivo === null,
).length;
