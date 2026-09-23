import type { Ranura } from "./imagenes";

/**
 * Obras ejecutadas por VISENTRAC.
 *
 * Es la única prueba de trabajo real que el sitio puede mostrar: no hay
 * certificaciones, ni testimonios, ni clientes citables. Por eso la fotografía
 * aquí no decora, demuestra.
 *
 * Cómo agregar un proyecto:
 *   1. Colocar la foto en una carpeta y pasarla por
 *      `node scripts/optimizar-imagenes.mjs <carpeta>`, con el nombre
 *      `PROYECTO-XX`.
 *   2. Añadir la entrada aquí con `archivo: "/images/PROYECTO-XX.webp"`.
 *
 * Sobre nombrar obras y clientes: el nombre propio de un proyecto privado o el
 * de la empresa contratante solo se publica con su autorización, igual que un
 * logotipo. `nombre` puede quedar en null y la tarjeta funciona igual con el
 * tipo de obra y la ubicación, que son hechos de la propia empresa.
 */
export type Proyecto = {
  /** Identificador de muestra: "PR-01". */
  id: string;
  /** Nombre propio de la obra. Null mientras no haya autorización para citarla. */
  nombre: string | null;
  /** Tipo de obra. Siempre presente: es lo que sostiene la tarjeta sin nombre. */
  tipo: string;
  ubicacion: string;
  /** Año de ejecución, si se conoce. */
  anio: string | null;
  /** Qué aportó VISENTRAC. Es el dato que convierte una foto en evidencia. */
  aporte: readonly string[];
  imagen: Ranura;
};

export const proyectos = [
  {
    id: "PR-01",
    nombre: null,
    tipo: "Edificación institucional",
    ubicacion: "Espinar, Cusco",
    anio: "2024",
    aporte: ["Concreto premezclado", "Bombeo"],
    imagen: {
      id: "PRY-01",
      archivo: null,
      alt: "Vaciado de concreto con bomba hormigonera en una edificación institucional de dos niveles",
      rotulo: "Edificación institucional. Espinar",
      proporcion: "ancha",
    },
  },
  {
    id: "PR-02",
    nombre: null,
    tipo: "Obra de infraestructura",
    ubicacion: "Región Cusco",
    anio: null,
    aporte: ["Concreto premezclado", "Bombeo"],
    imagen: {
      id: "PRY-02",
      archivo: null,
      alt: "Camión mixer y bomba abasteciendo el encofrado de una estructura de infraestructura",
      rotulo: "Obra de infraestructura. Región Cusco",
      proporcion: "cuadrada",
    },
  },
  {
    id: "PR-03",
    nombre: null,
    tipo: "Operación minera",
    ubicacion: "Provincia de Espinar",
    anio: null,
    aporte: ["Planta de concreto en obra", "Agregados"],
    imagen: {
      id: "PRY-03",
      archivo: null,
      alt: "Planta de concreto de VISENTRAC instalada en el interior de una operación minera",
      rotulo: "Operación minera. Espinar",
      proporcion: "cuadrada",
    },
  },
  {
    id: "PR-04",
    nombre: null,
    tipo: "Movimiento de tierra",
    ubicacion: "Región Cusco",
    anio: null,
    aporte: ["Maquinaria pesada", "Agregados"],
    imagen: {
      id: "PRY-04",
      archivo: null,
      alt: "Cargador frontal y volquete trabajando en movimiento de tierra",
      rotulo: "Movimiento de tierra. Región Cusco",
      proporcion: "cuadrada",
    },
  },
  {
    id: "PR-05",
    nombre: null,
    tipo: "Edificación privada",
    ubicacion: "Espinar, Cusco",
    anio: null,
    aporte: ["Concreto premezclado"],
    imagen: {
      id: "PRY-05",
      archivo: null,
      alt: "Vaciado de losa en una edificación privada en construcción",
      rotulo: "Edificación privada. Espinar",
      proporcion: "cuadrada",
    },
  },
] as const satisfies readonly Proyecto[];

/** Cuántas fichas esperan todavía su fotografía. */
export const proyectosPendientes = proyectos.filter(
  (p) => p.imagen.archivo === null,
).length;
