/**
 * Contenido institucional de VISENTRAC SAC.
 *
 * Fuente: docs/visentrac-info.md (extraído del brochure institucional).
 * Los textos marcados con `pendienteValidacion` aún no fueron aprobados por el
 * cliente; ver docs/scope.md, sección 5.
 */

export const empresa = {
  nombre: "VISENTRAC SAC",
  nombreCorto: "VISENTRAC",
  desde: 2014,
  rubro: "Construcción, minería y agroindustria",
  descripcionBreve:
    "Desde 2014 proveemos equipos, servicios, herramientas y materiales de alta calidad para los sectores de minería, construcción y agroindustria.",
} as const;

export const contacto = {
  direccion: {
    calle: "Pasaje Rosas Pata N.º 102",
    ciudad: "Espinar",
    region: "Cusco",
    pais: "Perú",
    completa: "Pasaje Rosas Pata N.º 102, Espinar – Cusco",
    // TODO(cliente): reemplazar por el embed exacto del local en Google Maps.
    mapaEmbedUrl: "",
  },
  telefonos: ["984886660", "901789330", "968967089"],
  correos: ["administracion@visentrac.com", "visentrac@hotmail.com"],
  /** Número del botón flotante de WhatsApp (formato internacional, sin +). */
  whatsapp: "51984886660",
  mensajeWhatsapp: "Hola VISENTRAC, quisiera información sobre sus servicios.",
  // TODO(cliente): confirmar horario de atención y redes sociales.
  horario: null as string | null,
  redes: [] as { nombre: string; url: string }[],
} as const;

export const propuestaValor = {
  /*
   * El mensaje de los primeros cinco segundos responde la búsqueda literal del
   * visitante (qué vende y dónde) antes que el diferenciador, que llega en el
   * subtitular. Pendiente de validación del cliente.
   */
  titular: "Concreto premezclado, maquinaria y agregados en Espinar",
  subtitular:
    "Planta y flota propias. Desde 2014 atendemos obras de construcción, minería y agroindustria en la región Cusco.",
  pendienteValidacion: true,
} as const;

export const mision = {
  /** Versión web, resumida. Pendiente de validación del cliente. */
  resumen:
    "Somos una empresa líder del sector construcción, comprometida con la innovación, la tecnología y la excelencia en el servicio. Acompañamos a nuestros clientes en todo el proceso constructivo con equipos, servicios y materiales de alta calidad, generando confianza a través de la mejora continua y la capacitación de nuestro equipo, y asumiendo la responsabilidad de mitigar los impactos ambientales de nuestras operaciones.",
  /** Texto literal del brochure, para referencia. */
  original:
    "VISENTRAC es una Empresa líder en el Sector de la Construcción, comprometida con la Innovación, la Tecnología y la Excelencia en el Servicio. Ofrecemos Equipos, Servicios, Herramientas y Materiales de Alta Calidad, apoyando eficientemente a nuestros clientes en todo el proceso constructivo. Buscamos generar un clima de confianza que garantice la plena satisfacción de nuestros clientes, a través de la mejora continua y la capacitación constante de nuestro equipo. Asimismo, asumimos la responsabilidad de mitigar y controlar los impactos ambientales de nuestras operaciones, contribuyendo a un desarrollo sostenible en la industria de la construcción.",
  pendienteValidacion: true,
} as const;

export const vision = {
  resumen:
    "Ser una empresa líder reconocida por la eficiencia y la calidad de su servicio, con innovación continua en productos y servicios y un equipo capacitado, proyectándonos hacia nuevos horizontes de la demanda local y nacional.",
  original:
    "VISENTRAC se proyecta a ser una Empresa líder construyendo un mejor futuro y ser reconocidos del servicio brindado en la eficiencia y la calidad del servicio, basada en innovación continua de productos y servicios con un equipo capacitado comprometidos a brindar el mejor servicio hacia sus clientes, apuntándose a ver nuevos horizontes de la demanda local y nacional del mercado.",
  pendienteValidacion: true,
} as const;

/** Los 4 hitos del bloque "Nosotros" del brochure. */
export const hitos = [
  {
    numero: "01",
    texto:
      "Desde el 2014 nos dedicamos a proveer servicios para los sectores de minería, construcción y agroindustria.",
  },
  {
    numero: "02",
    texto:
      "Realizamos el alquiler de maquinaria pesada y liviana: camiones mixer, bomba hormigonera, volquete, telehandler, cargador frontal, camioneta, entre otros.",
  },
  {
    numero: "03",
    texto:
      "Brindamos servicios de venta de concreto premezclado, movimiento de tierra y venta de agregados.",
  },
  {
    numero: "04",
    texto:
      "A lo largo de estos años nos hemos destacado por dar lo mejor de nosotros.",
  },
] as const;

export const servicios = [
  {
    slug: "concreto-premezclado",
    nombre: "Concreto Premezclado",
    descripcion:
      "Nuestros expertos en concreto ofrecen soluciones personalizadas para sus necesidades de construcción.",
    icono: "concreto",
    imagen: "/images/servicios/concreto-premezclado.jpg",
    detalle: [] as readonly string[],
  },
  {
    slug: "alquiler-maquinarias",
    nombre: "Alquiler de Maquinarias",
    descripcion:
      "Amplia variedad de maquinaria pesada y liviana en alquiler para proyectos de construcción y minería.",
    icono: "maquinaria",
    imagen: "/images/servicios/alquiler-maquinarias.jpg",
    detalle: [
      "Camiones Mixer",
      "Bomba Hormigonera",
      "Volquete",
      "Telehandler",
      "Cargador Frontal",
      "Camioneta",
    ] as readonly string[],
  },
  {
    slug: "agregados-construccion",
    nombre: "Agregados de Construcción",
    descripcion:
      "Suministramos materiales de alta calidad como arena, grava y piedra chancada para sus proyectos.",
    icono: "agregados",
    imagen: "/images/servicios/agregados-construccion.jpg",
    detalle: ["Arena", "Grava", "Piedra chancada"] as readonly string[],
  },
] as const;

/**
 * Flota disponible para alquiler.
 *
 * La clasificación pesada/liviana sale de la propia descripción del brochure
 * ("maquinaria pesada y liviana"). No se declara cantidad de unidades ni
 * disponibilidad: son datos que la empresa no ha confirmado.
 */
export const flota = [
  { id: "MQ-01", nombre: "Camión mixer", clase: "Pesada" },
  { id: "MQ-02", nombre: "Bomba hormigonera", clase: "Pesada" },
  { id: "MQ-03", nombre: "Volquete", clase: "Pesada" },
  { id: "MQ-04", nombre: "Telehandler", clase: "Pesada" },
  { id: "MQ-05", nombre: "Cargador frontal", clase: "Pesada" },
  { id: "MQ-06", nombre: "Camioneta", clase: "Liviana" },
] as const;

export const ventajas = [
  {
    titulo: "Flexibilidad y personalización",
    descripcion:
      "Adaptamos nuestros servicios a las necesidades específicas de cada proyecto.",
    icono: "flexibilidad",
  },
  {
    titulo: "Calidad y confiabilidad",
    descripcion:
      "Cumplimos las normas técnicas y especificaciones vigentes, verificando los materiales en ejecución.",
    icono: "calidad",
  },
  {
    titulo: "Eficiencia y productividad",
    descripcion:
      "Nuestros servicios están diseñados para ahorrar tiempo y recursos en obra.",
    icono: "eficiencia",
  },
] as const;

export const porQueElegirnos = [
  {
    titulo: "Experiencia y conocimiento",
    descripcion:
      "Nuestro equipo cuenta con años de experiencia en construcción y minería.",
    icono: "experiencia",
  },
  {
    titulo: "Compromiso con la seguridad",
    descripcion:
      "Priorizamos la seguridad de nuestros colaboradores, clientes y del proyecto.",
    icono: "seguridad",
  },
  {
    titulo: "Servicio al cliente",
    descripcion:
      "Nuestro equipo está disponible para responder sus preguntas y necesidades.",
    icono: "servicio",
  },
] as const;

/**
 * Sectores y operaciones donde VISENTRAC ha prestado servicio.
 *
 * Sustituye a un muro de logos de clientes. En minería la relación es indirecta:
 * el servicio se presta a empresas contratistas que operan en las unidades, no a
 * la minera titular, y el texto debe reflejar eso con exactitud.
 *
 * TODO(cliente): nombrar operaciones o clientes concretos solo cuando exista
 * autorización escrita de uso de marca. Sin ella, este bloque se queda como
 * está.
 */
export const sectoresAtendidos = [
  {
    slug: "mineria",
    nombre: "Minería",
    descripcion:
      "Suministro a empresas contratistas que operan en unidades mineras de la provincia de Espinar.",
    icono: "mineria",
  },
  {
    slug: "construccion",
    nombre: "Construcción",
    descripcion:
      "Obra privada y pública en Espinar y en provincias de la región Cusco.",
    icono: "construccion",
  },
  {
    slug: "agroindustria",
    nombre: "Agroindustria",
    descripcion:
      "Proyectos agroindustriales que requieren concreto, movimiento de tierra y agregados.",
    icono: "agroindustria",
  },
] as const;

/**
 * Valores de la empresa.
 *
 * Redacción nueva, derivada de la Misión y la Visión del brochure: ninguno
 * introduce un hecho que la empresa no haya declarado ya. Pendientes de
 * validación del cliente.
 */
export const valores = [
  {
    slug: "seguridad",
    nombre: "Seguridad primero",
    descripcion:
      "La seguridad de nuestros colaboradores, de nuestros clientes y del proyecto está por encima del plazo y del costo.",
    icono: "seguridad",
  },
  {
    slug: "cumplimiento",
    nombre: "Cumplimiento",
    descripcion:
      "Lo que comprometemos se entrega en la fecha y en la especificación acordada. Si algo cambia, se avisa antes, no después.",
    icono: "cumplimiento",
  },
  {
    slug: "calidad-comprobada",
    nombre: "Calidad comprobada",
    descripcion:
      "Cumplimos las normas técnicas vigentes y verificamos los materiales durante la ejecución. La calidad se demuestra, no se declara.",
    icono: "calidad",
  },
  {
    slug: "mejora-continua",
    nombre: "Mejora continua",
    descripcion:
      "Capacitamos a nuestro equipo de forma constante y revisamos nuestros procesos para responder mejor en cada obra.",
    icono: "mejora",
  },
  {
    slug: "responsabilidad-ambiental",
    nombre: "Responsabilidad ambiental",
    descripcion:
      "Asumimos el control de los impactos ambientales de nuestras operaciones como parte del trabajo, no como un añadido.",
    icono: "ambiental",
  },
] as const;

/**
 * Cifras verificables.
 *
 * El indicador "85% nuevos clientes" del brochure NO está aquí a propósito: no
 * tiene fuente, periodo ni definición, y no se publica sin sustento del cliente
 * (ver docs/plan-desarrollo.md, sección 0).
 */
export const estadisticas = [
  /*
   * `desde` marca la cifra que se recalcula en el navegador. Si se evaluara en
   * el build, el sitio seguiría diciendo los mismos años de operación hasta la
   * siguiente compilación, que en un hosting estático puede tardar años.
   */
  { desde: 2014, valor: null, etiqueta: "Años operando" },
  { desde: null, valor: "3", etiqueta: "Sectores atendidos" },
  { desde: null, valor: "6", etiqueta: "Tipos de maquinaria" },
] as const;

/**
 * Áreas del equipo. El brochure no expone nombres individuales.
 *
 * No se renderiza en ninguna página: se retiró de "Nosotros" por decisión del
 * cliente interno. Se conserva por si más adelante se necesita.
 */
export const areasEquipo = [
  { nombre: "Gerencia", icono: "gerencia" },
  { nombre: "Administración", icono: "administracion" },
  { nombre: "Seguridad", icono: "seguridad" },
  { nombre: "Ingeniería", icono: "ingenieria" },
] as const;

export const cta = {
  titulo: "¡Contáctenos!",
  texto:
    "No dude en ponerse en contacto con nosotros para obtener más información sobre nuestros servicios y cómo podemos ayudarlo a alcanzar sus objetivos.",
} as const;

/** Las cuatro rutas del sitio, usadas por la cabecera y el pie. */
export const navegacion = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contáctenos" },
] as const;
