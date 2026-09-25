/**
 * Libro de Reclamaciones Virtual.
 *
 * Obligatorio en Perú para establecimientos comerciales abiertos al público,
 * según el Código de Protección y Defensa del Consumidor (Ley 29571) y su
 * reglamento. Estos son los campos que Indecopi exige en el formato oficial.
 *
 * ATENCIÓN: esto reproduce el formato estándar, no sustituye a una revisión
 * legal. Conviene que el cliente lo valide con su asesoría antes de publicar,
 * sobre todo el plazo de respuesta y el texto del aviso.
 */

export const reclamaciones = {
  /** Plazo legal de respuesta, en días hábiles. */
  plazoRespuestaDias: 15,

  /**
   * Diferencia entre reclamo y queja. El consumidor debe elegir, y casi nadie
   * conoce la distinción, así que se explica junto a la opción.
   */
  tipos: [
    {
      valor: "reclamo",
      nombre: "Reclamo",
      ayuda: "Disconformidad con el producto o el servicio recibido.",
    },
    {
      valor: "queja",
      nombre: "Queja",
      ayuda: "Malestar con la atención recibida, no con el producto en sí.",
    },
  ],

  /** Qué se contrató. Indecopi distingue ambos. */
  bienes: [
    { valor: "producto", nombre: "Producto" },
    { valor: "servicio", nombre: "Servicio" },
  ],

  documentos: [
    { valor: "dni", nombre: "DNI" },
    { valor: "ce", nombre: "Carné de extranjería" },
    { valor: "pasaporte", nombre: "Pasaporte" },
    { valor: "ruc", nombre: "RUC" },
  ],

  /** Aviso legal que acompaña al formulario. */
  aviso:
    "Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un Libro de Reclamaciones a su disposición. La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para denunciar ante el Indecopi.",
} as const;
