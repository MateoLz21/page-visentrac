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

/**
 * Fotografías del slider de portada.
 *
 * Requisitos para el cliente: horizontales, mínimo 2000px de ancho, con el
 * motivo principal hacia el centro o la derecha. El texto se apoya abajo a la
 * izquierda, así que esa zona debe quedar despejada.
 */
export const heroInicio = [
  {
    id: "HERO-01",
    archivo: "/images/HERO-01.webp",
    alt: "Planta de concreto de VISENTRAC en operación minera, con sus silos rotulados, camión mixer y cargador frontal",
    rotulo: "Planta de concreto propia. Capacidad 120 m³/h",
    proporcion: "ancha",
  },
  {
    id: "HERO-02",
    archivo: "/images/HERO-02.webp",
    alt: "Bomba hormigonera de VISENTRAC con la pluma desplegada sobre una edificación de dos niveles en construcción",
    rotulo: "Bomba hormigonera en obra. Espinar, Cusco",
    proporcion: "ancha",
  },
  {
    id: "HERO-03",
    archivo: "/images/HERO-03.webp",
    alt: "Camión mixer de VISENTRAC junto a la bomba hormigonera abasteciendo el encofrado de un puente en construcción",
    rotulo: "Mixer y bomba en obra de infraestructura",
    proporcion: "ancha",
  },
] as const satisfies readonly Ranura[];

/** Portada de la página de Servicios. */
export const heroServicios = {
  id: "HERO-04",
  archivo: "/images/HERO-SERVICIOS.webp",
  alt: "Camión mixer y bomba pluma de VISENTRAC vaciando concreto en una obra con columnas y encofrado armado",
  rotulo: "Mixer y bomba pluma en vaciado de estructura",
  proporcion: "ancha",
} as const satisfies Ranura;

/** Portada de la página de Nosotros. */
export const heroNosotros = {
  id: "HERO-05",
  archivo: "/images/HERO-NOSOTROS.webp",
  alt: "Equipo de VISENTRAC con casco y chaleco reflectivo frente a la bomba pluma y el camión mixer en una operación minera",
  rotulo: "Nuestro equipo en operación",
  proporcion: "ancha",
} as const satisfies Ranura;

/** Logotipo, en sus dos versiones. */
export const logo = {
  color: "/images/logo-visentrac.webp",
  blanco: "/images/logo-visentrac-blanco.webp",
  ancho: 520,
  alto: 347,
} as const;

export const imagenes = {
  plantaPrincipal: {
    id: "IMG-01",
    archivo: "/images/HERO-01.webp",
    alt: "Planta de concreto de VISENTRAC en operación minera, con sus silos rotulados y camión mixer",
    rotulo: "Planta de concreto propia. Capacidad 120 m³/h",
    proporcion: "ancha",
  },
  flotaMixer: {
    id: "IMG-02",
    archivo: "/images/HERO-03.webp",
    alt: "Camión mixer de VISENTRAC junto a la bomba hormigonera en obra",
    rotulo: "Camión mixer y bomba en obra",
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
    archivo: "/images/HERO-02.webp",
    alt: "Bomba hormigonera de VISENTRAC desplegando su pluma sobre una estructura en construcción",
    rotulo: "Bomba hormigonera en obra",
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
