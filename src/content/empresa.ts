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

    /* Coordenadas de la ficha de Google Business: 14°47'54.7"S 71°24'31.4"W. */
    latitud: -14.7985218,
    longitud: -71.408741,

    /*
     * Identificador de la ficha en Google (CID), extraído del enlace del
     * negocio. Permite enlazar a la ficha real y no a unas coordenadas sueltas:
     * el visitante ve el nombre, las fotos y las reseñas de la empresa.
     */
    googleCid: "8569624757521102019",

    /*
     * Mapa incrustado sin clave de API.
     *
     * La Embed API oficial de Google exige clave, facturación asociada y
     * restricción por dominio. Buscando por nombre y localidad, el mapa muestra
     * la ficha del negocio con su rótulo, sin ninguna de esas tres dependencias
     * y sin que se rompa el día que caduque una clave que nadie recuerda haber
     * creado.
     */
    mapaEmbedUrl:
      "https://maps.google.com/maps?q=VISENTRAC+SAC,+Espinar,+Cusco&ll=-14.7985218,-71.408741&z=17&hl=es&output=embed",

    /* Abre la app de mapas del dispositivo con la ruta ya trazada hasta la
       ficha del negocio, no hasta un punto sin nombre. */
    comoLlegarUrl:
      "https://www.google.com/maps/dir/?api=1&destination=VISENTRAC+SAC,+Espinar,+Cusco",

    /* Ficha pública del negocio en Google Maps. */
    fichaGoogleUrl: "https://maps.google.com/?cid=8569624757521102019",
  },
  telefonos: ["984886660", "901789330", "968967089"],
  correos: ["administracion@visentrac.com", "visentrac@hotmail.com"],
  /** Número del botón flotante de WhatsApp (formato internacional, sin +). */
  whatsapp: "51984886660",
  mensajeWhatsapp: "Hola VISENTRAC, quisiera información sobre sus servicios.",
  /*
   * El horario de atención se retiró por decisión del cliente interno: publicar
   * un horario que no siempre se cumple es peor que no publicarlo, y el canal
   * real de contacto es WhatsApp.
   */
  /* `icono` empareja cada red con su logotipo en el componente RedesSociales. */
  redes: [
    {
      nombre: "Facebook",
      icono: "facebook",
      url: "https://www.facebook.com/profile.php?id=100006982695918",
    },
    {
      nombre: "TikTok",
      icono: "tiktok",
      url: "https://www.tiktok.com/@visentrac.sac",
    },
  ] as const,
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

/*
 * Misión y Visión en su redacción aprobada.
 *
 * Reemplazan a los resúmenes que se habían redactado para web: ahora se publica
 * el texto institucional completo. Se corrigieron erratas de transcripción
 * (garatice, nuestra operaciones, constribuyendo, innvovacion continuia) sin
 * alterar el contenido.
 */
export const mision = {
  texto:
    "VISENTRAC es una empresa líder en el sector de la construcción, comprometida con la innovación, la tecnología y la excelencia en el servicio. Ofrecemos equipos, servicios, herramientas y materiales de alta calidad, apoyando eficientemente a nuestros clientes en todo el proceso constructivo. Buscamos generar un clima de confianza que garantice la plena satisfacción de nuestros clientes, a través de la mejora continua y la capacitación constante de nuestro equipo. Asimismo, asumimos la responsabilidad de mitigar y controlar los impactos ambientales de nuestras operaciones, contribuyendo a un desarrollo sostenible en la industria de la construcción.",
  pendienteValidacion: false,
} as const;

export const vision = {
  texto:
    "VISENTRAC se proyecta a ser una empresa líder construyendo un mejor futuro y ser reconocidos en la eficiencia y la calidad del servicio brindado, basada en innovación continua de productos y servicios, con un equipo capacitado y comprometido a brindar el mejor servicio hacia sus clientes, apuntándose a ver nuevos horizontes de la demanda local y nacional del mercado.",
  pendienteValidacion: false,
} as const;

/**
 * Los cuatro puntos del bloque "Nosotros", en su redacción aprobada.
 *
 * Se corrigieron erratas de transcripción (liviano, Hormihonera, contreto) sin
 * alterar el contenido.
 */
export const hitos = [
  {
    numero: "01",
    texto:
      "Desde el 2014 nos dedicamos a proveer servicios para los sectores de minería, construcción y agroindustriales.",
  },
  {
    numero: "02",
    texto:
      "Realizamos alquiler de maquinaria pesada y liviana como camiones mixer, bomba hormigonera, volquete, telehandler, cargador frontal, camioneta, entre otros.",
  },
  {
    numero: "03",
    texto:
      "Realizamos servicios como venta de concreto premezclado, movimiento de tierra y venta de agregados similares.",
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
    /*
     * Catálogo con granulometría, no categorías genéricas.
     *
     * Sustituye a la lista anterior ("Arena", "Grava", "Piedra chancada"): los
     * nuevos nombres son esos mismos materiales con su especificación, y
     * mantener ambos habría duplicado cada uno. Quien compra agregados pide
     * medidas concretas, no familias.
     */
    detalle: [
      'Piedra chancada 1/2", 3/4" y 1"',
      "Arena gruesa",
      "Arena fina",
      "Piedra base / Over para afirmado",
      "Cascajo / ripio",
    ] as readonly string[],
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

/**
 * Por qué trabajar con nosotros.
 *
 * Cada razón lleva un dato que la sostiene. Es deliberado: las tres razones del
 * brochure original (experiencia, seguridad, servicio al cliente) las afirma
 * igual cualquier competidor de la zona y ninguna se puede verificar, así que
 * no distinguían nada.
 *
 * Los tres datos de aquí sí son comprobables: la capacidad se lee en el letrero
 * de la planta en la fotografía, los tipos de maquinaria salen de la lista de
 * flota, y el año de inicio está declarado en el brochure.
 */
export const porQueElegirnos = [
  {
    titulo: "Producimos nuestro propio concreto",
    descripcion:
      "La planta es nuestra, así que respondemos por la dosificación y por la hora de entrega sin depender de un tercero que nos abastezca.",
    dato: "120 m³/h",
    etiquetaDato: "Capacidad de planta",
    icono: "planta",
  },
  {
    titulo: "Operamos nuestra propia maquinaria",
    descripcion:
      "No subcontratamos equipos. Si su obra necesita mixer, bomba o volquete, coordinamos con nuestra flota y con nuestros operadores.",
    dato: "6 tipos",
    etiquetaDato: "Unidades en flota",
    icono: "flota",
  },
  {
    titulo: "Estamos en Espinar, no de paso",
    descripcion:
      "Operamos desde aquí, con el terreno y los accesos conocidos. Eso acorta los tiempos de respuesta frente a un proveedor que viene desde la ciudad.",
    dato: "2014",
    etiquetaDato: "Operando desde",
    icono: "local",
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
  { href: "/politicas", label: "Políticas" },
  { href: "/contacto", label: "Contáctenos" },
] as const;
