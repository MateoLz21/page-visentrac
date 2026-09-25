/**
 * Política de Privacidad y Protección de Datos Personales.
 *
 * Redactada conforme a la Ley 29733 de Protección de Datos Personales del Perú
 * y su reglamento (DS 003-2013-JUS).
 *
 * Describe lo que el sitio hace de verdad, no una plantilla genérica: cada
 * apartado se corresponde con una parte real del código. Si el sitio cambia
 * (se añade analítica, un chat, un píxel de publicidad), este texto tiene que
 * cambiar con él o deja de ser cierto.
 *
 * ATENCIÓN: esto no sustituye una revisión legal. Conviene que el cliente lo
 * valide con su asesoría, en especial el RUC, el plazo de conservación y si
 * corresponde inscribir el banco de datos ante la Autoridad Nacional de
 * Protección de Datos Personales.
 */

export const privacidad = {
  /** Última revisión del texto. Se muestra al visitante. */
  actualizado: "24 de septiembre de 2026",

  /* TODO(cliente): completar el RUC de la empresa. */
  ruc: null as string | null,

  secciones: [
    {
      titulo: "Quién trata sus datos",
      parrafos: [
        "VISENTRAC SAC, con domicilio en Pasaje Rosas Pata N.º 102, Espinar, Cusco, es responsable del tratamiento de los datos personales que usted proporcione a través de este sitio web.",
        "Para cualquier consulta sobre esta política o sobre sus datos, puede escribir a administracion@visentrac.com.",
      ],
    },
    {
      titulo: "Qué datos recogemos",
      parrafos: [
        "Solo tratamos los datos que usted nos entrega voluntariamente al completar un formulario. Este sitio no crea perfiles, no utiliza cookies publicitarias ni herramientas de analítica, y no rastrea su navegación.",
      ],
      listas: [
        {
          titulo: "Formulario de contacto",
          elementos: [
            "Nombre",
            "Correo electrónico",
            "Teléfono",
            "El contenido del mensaje que usted escriba",
          ],
        },
        {
          titulo: "Libro de Reclamaciones",
          elementos: [
            "Nombre completo",
            "Tipo y número de documento de identidad",
            "Domicilio",
            "Correo electrónico y teléfono",
            "Nombre del padre, madre o apoderado, si es menor de edad",
            "Los datos del producto o servicio y el detalle de su reclamación",
          ],
        },
      ],
    },
    {
      titulo: "Para qué los usamos",
      parrafos: [
        "Los datos del formulario de contacto se usan únicamente para responder a su consulta y, si corresponde, elaborar una cotización. No se emplean para enviarle publicidad ni se incorporan a ninguna lista de correo.",
        "Los datos del Libro de Reclamaciones se usan para atender y responder su reclamo o queja, y para cumplir con las obligaciones que impone el Código de Protección y Defensa del Consumidor.",
        "No vendemos, alquilamos ni cedemos sus datos a terceros con fines comerciales.",
      ],
    },
    {
      titulo: "Quién más puede verlos",
      parrafos: [
        "Para funcionar, el sitio se apoya en servicios de terceros que pueden tratar datos por cuenta nuestra o recoger información propia:",
      ],
      listas: [
        {
          titulo: null,
          elementos: [
            "Google LLC, a través del servicio de correo que utilizamos para recibir y responder los mensajes enviados desde los formularios.",
            "Google Maps, incrustado en la página de Contacto. Al cargarse, Google puede recoger datos de su navegación conforme a sus propias políticas.",
            "El proveedor de alojamiento del sitio, que opera los servidores donde se ejecuta.",
          ],
        },
      ],
    },
    {
      titulo: "Datos técnicos del servidor",
      parrafos: [
        "Para evitar el envío automatizado de mensajes, el servidor guarda de forma temporal una versión cifrada de su dirección IP cuando usted envía un formulario. No se conserva la dirección IP en claro, no se asocia a su nombre ni a ningún otro dato, y se descarta automáticamente pasada una hora.",
      ],
    },
    {
      titulo: "Cuánto tiempo los conservamos",
      parrafos: [
        "Las consultas de contacto se conservan mientras dure la relación comercial y el tiempo necesario para atender obligaciones posteriores.",
        "Las reclamaciones se conservan durante el plazo que exige la normativa de protección al consumidor, contado desde su presentación.",
      ],
    },
    {
      titulo: "Sus derechos",
      parrafos: [
        "La Ley 29733 le reconoce los derechos de acceso, rectificación, cancelación y oposición sobre sus datos personales. Puede ejercerlos escribiendo a administracion@visentrac.com, indicando cuál de ellos desea ejercer y adjuntando copia de su documento de identidad para que podamos verificar quién solicita.",
        "Si considera que su solicitud no ha sido atendida adecuadamente, puede acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
      ],
    },
    {
      titulo: "Seguridad",
      parrafos: [
        "El sitio se sirve mediante conexión cifrada, de modo que los datos que envía por los formularios viajan protegidos. Aplicamos las medidas técnicas y organizativas razonables para evitar accesos no autorizados, aunque ningún sistema conectado a internet puede garantizar seguridad absoluta.",
      ],
    },
    {
      titulo: "Cambios en esta política",
      parrafos: [
        "Si modificamos la forma en que tratamos los datos, actualizaremos este texto y la fecha de revisión que aparece al inicio. Le recomendamos consultarlo cuando vaya a enviarnos información.",
      ],
    },
  ],
} as const;
