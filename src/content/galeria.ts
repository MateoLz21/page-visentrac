/**
 * Galería de operaciones.
 *
 * Fotografías sueltas de trabajos reales, no fichas de proyecto: la empresa
 * tiene muchas imágenes de obra y pocas obras con nombre propio, así que la
 * galería se organiza por fotografía y no por proyecto.
 *
 * Es la única prueba de trabajo que el sitio puede mostrar, porque no hay
 * certificaciones, ni testimonios, ni clientes citables. Aquí la fotografía no
 * decora: demuestra.
 *
 * Cómo añadir fotos:
 *   1. Nombrar los archivos `GALERIA-01`, `GALERIA-02`, etc.
 *   2. Pasarlos por `node scripts/optimizar-imagenes.mjs <carpeta>`.
 *   3. Añadir una entrada aquí por cada una.
 *
 * La rejilla se adapta sola al número de entradas: no hay que tocar el
 * componente para añadir o quitar fotos.
 */

export type FotoGaleria = {
  /** Identificador de muestra: "G-01". */
  id: string;
  /** Ruta bajo `public/`, o null mientras no exista la foto. */
  archivo: string | null;
  /** Texto alternativo: describe la escena, no el archivo. */
  alt: string;
  /** Rótulo visible: qué se ve. */
  rotulo: string;
  /** Dónde se tomó. Opcional. */
  lugar?: string;
  /**
   * Fuerza la forma de la celda cuando la fotografía lo pide.
   *
   * Sin esto, una toma vertical metida en una celda cuadrada pierde la mitad de
   * la escena por recorte. `alto` le da doble altura; `ancho`, doble anchura.
   */
  formato?: "alto" | "ancho";
};

export const galeria = [
  {
    id: "G-01",
    archivo: "/images/HERO-SERVICIOS.webp",
    alt: "Camión mixer y bomba pluma vaciando concreto en una obra con columnas y encofrado armado",
    rotulo: "Vaciado de estructura con bomba pluma",
    lugar: "Espinar, Cusco",
  },
  {
    id: "G-02",
    archivo: "/images/HERO-NOSOTROS.webp",
    alt: "Equipo de VISENTRAC con casco y chaleco reflectivo frente a la bomba pluma y el camión mixer",
    rotulo: "Equipo en operación",
    lugar: "Operación minera, Espinar",
  },
  {
    id: "G-03",
    archivo: "/images/HERO-02.webp",
    alt: "Bomba hormigonera con la pluma desplegada sobre una edificación de dos niveles en construcción",
    rotulo: "Bombeo en edificación",
    lugar: "Espinar, Cusco",
  },
  {
    id: "G-04",
    archivo: "/images/HERO-03.webp",
    alt: "Camión mixer junto a la bomba hormigonera abasteciendo el encofrado de un puente",
    rotulo: "Despacho en obra de infraestructura",
    lugar: "Región Cusco",
  },
  {
    /* Imagen generada por IA, no fotografía de operaciones reales. */
    id: "G-05",
    archivo: "/images/GALERIA-08.webp",
    alt: "Vista aérea de una bomba pluma vaciando la losa de una edificación urbana, con el camión mixer abasteciendo desde la calle",
    rotulo: "Vaciado de losa en zona urbana",
    lugar: "Espinar, Cusco",
  },
  {
    /* Imagen generada por IA. Comparte archivo con la ranura IMG-05 de la
       página de Servicios: es la misma toma en dos sitios del sitio. */
    id: "G-06",
    archivo: "/images/AGREGADOS-01.webp",
    alt: "Cargador frontal y volquete junto a rumas de grava y piedra clasificada en zona de acopio",
    rotulo: "Carga de agregados en cantera",
    lugar: "Provincia de Espinar",
  },
  {
    /* Imagen generada por IA, no fotografía de operaciones reales. */
    id: "G-07",
    archivo: "/images/GALERIA-09.webp",
    alt: "Cuadrilla encofrando una cimentación junto a una planta industrial, con la bomba pluma desplegada",
    rotulo: "Cimentación en planta industrial",
    lugar: "Operación minera, Espinar",
    formato: "ancho",
  },
  {
    /* Imagen generada por IA, no fotografía de operaciones reales. */
    id: "G-08",
    archivo: "/images/GALERIA-10.webp",
    alt: "Reservorio elevado de concreto en construcción, con andamios y bomba pluma vaciando la cúpula",
    rotulo: "Reservorio elevado en construcción",
    lugar: "Región Cusco",
    formato: "alto",
  },
  {
    /* Imagen generada por IA, no fotografía de operaciones reales. */
    id: "G-09",
    archivo: "/images/GALERIA-12.webp",
    alt: "Técnico realizando un análisis granulométrico de agregados en laboratorio, con tamices y la muestra rotulada en la pizarra de control",
    rotulo: "Análisis granulométrico de agregados",
    lugar: "Laboratorio de control",
  },
  {
    /* Imagen generada por IA, no fotografía de operaciones reales. */
    id: "G-10",
    archivo: "/images/GALERIA-11.webp",
    alt: "Fila de volquetes de VISENTRAC numerados, estacionados en patio de operaciones",
    rotulo: "Flota de volquetes en patio",
    lugar: "Espinar, Cusco",
    formato: "ancho",
  },
] as const satisfies readonly FotoGaleria[];

/** Cuántas fotografías faltan todavía. */
export const galeriaPendiente = galeria.filter((f) => f.archivo === null).length;
