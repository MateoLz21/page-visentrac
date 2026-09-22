# Brief de superficies - VISENTRAC SAC

Salida de `/impeccable shape`. Define qué se construye y cómo debe funcionar,
sin código. Pendiente de tu confirmación.

- **Verdad de producto:** `PRODUCT.md`
- **Dirección visual elegida:** El Rotulado de Ensayo (seed `7df25244`, carta
  asignada, build code-led)

---

## 1. Trabajo y audiencia

Cuatro páginas con ruta propia, no una landing con anclas:

| Ruta | Superficie | Modo | Quién llega y en qué estado |
|---|---|---|---|
| `/` | Inicio | Persuade | Alguien que ya necesita concreto, máquina o agregado y está averiguando quién se lo da. Llega por búsqueda o por referencia, con prisa |
| `/nosotros` | Nosotros | Persuade | El que ya vio precio y ahora evalúa si la empresa es seria. Comprador minero y entidad pública sobre todo |
| `/servicios` | Servicios | Persuade | El que quiere saber si tienen exactamente la máquina o el material que su obra necesita |
| `/contacto` | Contáctenos | Operate | El que ya decidió consultar. Aquí no se persuade: se ejecuta una tarea |

`/contacto` es la única superficie en modo Operate. Ahí la expresión nunca puede
estorbar a la tarea.

## 2. Resultado y prueba

**Acción primaria en las cuatro páginas: WhatsApp.** El formulario existe como
respaldo formal para quien necesita dejar constancia escrita, y nunca compite
visualmente con el botón de WhatsApp en la misma sección.

**Mensaje de los primeros cinco segundos:** qué vende y dónde. Concreto
premezclado, maquinaria y agregados en Espinar. La búsqueda literal del
visitante se responde antes que el diferenciador.

**Prueba disponible:** planta propia y flota propia, demostradas en fotografía,
más los sectores donde la empresa ya ha prestado servicio. No existen
certificados, testimonios ni obras nombrables, y ninguna página puede insinuar
que sí (`PRODUCT.md`).

**Bloque de respaldo, sin logos ajenos.** En lugar de un muro de logos va un
bloque de sectores atendidos: minería (a través de empresas contratistas que
operan en unidades de la provincia de Espinar), construcción privada y pública,
y agroindustria. Dos razones, ninguna estética:

1. **Exactitud.** En minería el cliente contractual es el contratista, no la
   minera titular. Escribir "nuestros clientes" sobre una relación indirecta es
   verificable con una llamada y cuesta exactamente la credibilidad que la
   página construye.
2. **Uso de marca.** Publicar el logo de una minera exige autorización escrita.
   Sin ella el riesgo recae sobre VISENTRAC.

El bloque se diseña de modo que sustituir texto por logos, cuando lleguen las
autorizaciones, no obligue a rehacer la sección.

## 3. Dirección elegida

**El Rotulado de Ensayo.** Origen: la probeta de concreto, rotulada a mano y
rota a los 28 días para saber si el concreto sirve.

**Tesis:** en esta industria nada vale hasta que lleva rótulo y número.
VISENTRAC no afirma calidad, la rotula. Rechaza el hero de maquinaria al
atardecer con velo azul y titular centrado, que es lo que entrega la categoría.

**Consecuencia de implementación:** cada afirmación del sitio se presenta como
una muestra identificada. Etiqueta, identificador y valor con su unidad. Los
números se tratan como veredicto, no como adorno.

Seis disciplinas donadas por las direcciones que compitieron y perdieron:

1. Rejilla de línea base visible y color racionado por rol. Ningún color aparece
   sin función asignada.
2. La flota se lee como serie de unidades idénticas de un solo barrido, nunca
   como tarjetas sueltas.
3. Cada ítem de lista lleva su medida alineada al margen derecho.
4. El movimiento obedece masa e inercia. Nada aparece solo por aparecer.
5. Un solo elemento por pantalla es el más luminoso, y ese es el foco.
6. Cada fotografía lleva cosido su rótulo de qué es y dónde. Ninguna imagen
   flota sin identificar.

## 4. Alcance y límites

**Se construye:** las cuatro páginas completas, navegación, pie, botón flotante
de WhatsApp, formulario funcional y sus estados.

**No se toca:** el contenido de `src/content/empresa.ts`, salvo edición de estilo
que tú apruebes. Los textos de Misión y Visión siguen pendientes de validación
del cliente y se marcan como tales.

**Anti-objetivos explícitos:**

- Nada de muro de logos, contadores de obras, sellos de certificación ni
  testimonios. No existen.
- El indicador "85% nuevos clientes" no se publica mientras no tenga sustento.
- Cero micro etiquetas en mayúsculas sobre los títulos.
- Ninguna de las tres tríadas del brochure (servicios, ventajas, razones) puede
  resolverse con la misma fila de tarjetas iguales.

## 5. Contenido y estados

**Reparto del material entre las cuatro páginas:**

| Página | Qué lleva |
|---|---|
| Inicio | Propuesta de valor, descripción breve, sectores atendidos (justo debajo del primer viewport, nunca dentro de él), los tres servicios como muestras rotuladas, por qué elegirnos, llamado a contacto |
| Nosotros | Historia desde 2014, Misión, Visión, los cuatro hitos y los cinco valores. **Las áreas del equipo se retiran** por decisión del cliente interno |
| Servicios | Los tres servicios en detalle, la flota completa como serie, los agregados, las tres ventajas |
| Contacto | Formulario, dirección con mapa, tres teléfonos, dos correos, horario cuando llegue |

**Rangos reales:** 3 servicios, 6 tipos de maquinaria, 3 tipos de agregado,
4 hitos, 5 valores, 3 ventajas, 3 razones, 3 teléfonos, 2 correos.
Ninguna lista crece: el contenido es finito y conocido.

**Los cinco valores** son redacción nueva derivada de la Misión y la Visión, no
hechos nuevos: seguridad primero, cumplimiento, calidad comprobada, mejora
continua y responsabilidad ambiental. Viven en `src/content/empresa.ts` marcados
como pendientes de validación. "Calidad comprobada" es el valor que la dirección
visual elegida ilustra de forma literal.

**Estados que importan:** formulario en reposo, escribiendo, validación fallida
por campo, enviando, enviado, y error de red o de servidor. Imágenes ausentes
mientras el cliente no entregue fotos. Horario y redes sociales ausentes.

## 6. Interacción y disposición

- Navegación de cuatro entradas en una sola línea en escritorio, altura máxima
  80px, con la ruta activa señalada. Menú accesible por teclado en móvil.
- WhatsApp presente en el primer viewport de cada página y como botón flotante,
  sin tapar el envío del formulario en móvil.
- Jerarquía por luminancia: un foco por pantalla.
- Movimiento contenido, con `prefers-reduced-motion` respetado.
- Teléfonos y correos accionables con `tel:` y `mailto:`.
- Objetivos táctiles amplios: el caso base es una mano, al sol, con guantes.

## 7. Restricciones y decisiones abiertas

**Vinculantes:** exportación estática sobre cPanel compartido, sin runtime de
servidor. Formulario contra endpoint PHP propio. Español de Perú únicamente.
Tema claro sin modo oscuro. Dials 6 / 4 / 4. WCAG AA como piso.

**Decisiones que el constructor no debe inventar:**

1. Prioridad entre las cuatro audiencias.
2. Sustento del indicador 85%, o su retiro.
3. Logo vectorial y fotografía real.
4. Horario de atención, redes sociales, correo destino del formulario.
5. Dominio, hosting y versión de PHP.

**Riesgo de contenido que hay que decidir ahora:** `/nosotros` es la página más
delgada del conjunto. Con el material actual sostiene historia, misión, visión,
cuatro hitos y cuatro áreas, y poco más. O el cliente aporta material (fotos del
equipo en operación, cómo trabajan, qué controlan), o conviene fusionarla con
Inicio y quedarnos en tres páginas.
