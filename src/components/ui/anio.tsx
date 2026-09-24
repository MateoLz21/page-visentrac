"use client";

import { useSyncExternalStore } from "react";

type Props = {
  /** Año de referencia para restar. Sin él, muestra el año actual. */
  desde?: number;
};

/** Año congelado en el momento de compilar. Sirve de valor para el servidor. */
const anioDeCompilacion = new Date().getFullYear();

/* El año no cambia durante una visita: no hay nada a lo que suscribirse. */
const noSuscribir = () => () => {};
const anioDelNavegador = () => new Date().getFullYear();
const anioDelServidor = () => anioDeCompilacion;

/**
 * Año resuelto en el navegador, no en el build.
 *
 * El sitio se exporta como HTML estático y se sube por FTP: puede pasar mucho
 * tiempo sin reconstruirse. Un `new Date()` evaluado al compilar dejaría el
 * aviso de derechos y los años de operación congelados en la fecha de la última
 * compilación, y un sitio que declara un año equivocado envejece a la vista.
 *
 * `useSyncExternalStore` da el valor del build al renderizar en el servidor y el
 * del reloj real en el cliente, sin aviso de hidratación y sin escribir estado
 * dentro de un efecto.
 */
export function Anio({ desde }: Props) {
  const anio = useSyncExternalStore(noSuscribir, anioDelNavegador, anioDelServidor);

  return <>{desde ? anio - desde : anio}</>;
}
