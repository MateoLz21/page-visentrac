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
    /*
     * IMAGEN GENERADA POR IA, no una fotografía de instalaciones de VISENTRAC.
     *
     * Se usa por decisión del cliente interno. Queda anotado porque contradice
     * el principio que sostiene el resto del sitio: la fotografía es aquí la
     * única prueba de que la planta y la flota son propias (ver PRODUCT.md,
     * "Product Principles"). El rótulo evita afirmar que la planta es suya, y
     * la capacidad de 120 m³/h no se declara sobre esta imagen porque ese dato
     * procede del letrero de la planta real.
     *
     * Sustituir por fotografía real de la planta en cuanto esté disponible.
     */
    id: "HERO-01",
    archivo: "/images/HERO-01.webp",
    alt: "Planta de procesamiento de agregados operando en altiplano, con cargador frontal alimentando la chancadora",
    rotulo: "Producción de agregados en altiplano",
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
  /* Imagen generada por IA, no fotografía de operaciones reales. */
  trayectoria: {
    id: "IMG-07",
    archivo: "/images/TRAYECTORIA-01.webp",
    alt: "Dos bombas pluma y un camión mixer trabajando sobre un encofrado en pleno altiplano",
    rotulo: "Despliegue de equipos en altiplano",
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
  /* Imagen generada por IA, no fotografía de operaciones reales. Sustituir por
     material propio cuando esté disponible. */
  agregados: {
    id: "IMG-05",
    archivo: "/images/AGREGADOS-01.webp",
    alt: "Cargador frontal y volquete junto a rumas de grava y piedra clasificada en zona de acopio",
    rotulo: "Acopio de agregados clasificados",
    proporcion: "ancha",
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
