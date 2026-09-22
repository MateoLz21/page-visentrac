# Plan de desarrollo web - VISENTRAC SAC

Documento de trabajo interno. Define el stack, el proceso de diseño y las fases
de construcción del sitio institucional definido en [scope.md](scope.md).

- **Fecha:** 21 de septiembre de 2026
- **Alcance de referencia:** `docs/scope.md`
- **Contenido de referencia:** `docs/visentrac-info.md`
- **Verdad de producto:** `PRODUCT.md` (raíz), escrito por `/impeccable init`

---

## 0. Hallazgo que reordena el proyecto

`/impeccable init` dejó al descubierto el problema central, y no es técnico.

**La única evidencia disponible es el brochure y sus fotos.** No hay
certificaciones, homologaciones de proveedor minero, ensayos de resistencia,
clientes nombrables, obras citables ni testimonios. Consecuencias que afectan
directamente al diseño:

1. **Las tres palancas habituales de una landing B2B no existen.** Nada de muro
   de logos, nada de casos de estudio, nada de prueba social. Cualquier sección
   que las suponga hay que reemplazarla, no rellenarla.
2. **El indicador "85% nuevos clientes" no está verificado.** Aparece en el
   brochure sin fuente, sin periodo y sin definición de qué mide. Sale del plan
   como bloque destacado. O el cliente lo sustenta, o no se publica. Presentar
   una cifra inventada a un comprador minero destruye exactamente la confianza
   que el sitio existe para construir.
3. **La fotografía deja de ser decoración y pasa a ser el argumento.** Planta
   propia, flota propia y obra en ejecución son la única prueba en mano de la
   afirmación diferencial de la empresa. Esto eleva de "importante" a
   "bloqueante" el pedido de fotos en alta resolución al cliente.

**Qué sí se puede afirmar:** VISENTRAC produce su propio concreto y opera su
propia flota, en lugar de revender o subcontratar. Es la única afirmación
diferencial confirmada y es sobre la que se construye la página.

---

## 1. Stack acordado

| Capa | Decisión | Motivo |
|---|---|---|
| Framework | Next.js 16.3.5 (App Router, React 19.2) | Decisión del cliente interno. Deja abierta la fase 2 con CMS. |
| Lenguaje | TypeScript | Contenido tipado en `src/content/empresa.ts`. |
| Estilos | Tailwind v4 (`@tailwindcss/postcss`) | Default de taste-skill seccion 3.A para builds pequeños. |
| Salida | `output: "export"` (HTML estático en `out/`) | El hosting es cPanel compartido: no hay runtime Node. |
| Motion | `motion/react` (Motion, ex Framer Motion) | Exigido por taste-skill 3.A. Solo en islas `'use client'`. |
| Iconos | `@phosphor-icons/react` | taste-skill 3.C. Prohibido dibujar SVG de iconos a mano. |
| Fuentes | `next/font` con self-host | Nunca `<link>` a Google Fonts en produccion. |
| Formulario | Endpoint PHP propio en el mismo hosting | No hay API routes en export estático. |
| Deploy | Build local, subida de `out/` por FTP o Git a `public_html` | Sin CI en cPanel compartido. |

### Implicancias del hosting estático que hay que tener presentes

1. **No existen API routes ni Server Actions.** El formulario habla con un
   `contacto.php` colocado en `public/` (se copia tal cual al export).
2. **`next/image` no optimiza.** Las fotos deben llegar ya comprimidas y en
   WebP/AVIF, con dimensiones exactas. Esto es trabajo manual de preproceso.
3. **`trailingSlash: true`** para que Apache sirva `/servicios/` como
   `/servicios/index.html` sin 404 al recargar.
4. Hace falta un `.htaccess` con cacheo de estáticos, compresión y redirección
   a HTTPS.

---

## 2. Cómo se combinan los dos skills

Los dos skills se solapan. Para que no compitan, se reparten así:

| Skill | Rol en este proyecto | Cuándo se invoca |
|---|---|---|
| **impeccable** | Dueño del proceso: captura el contexto de producto, planifica cada superficie, audita y cierra. | `init`, `shape`, `critique`, `audit`, `polish` |
| **design-taste-frontend** (taste-skill) | Dueño del lenguaje visual y de las reglas anti-slop en el código que se escribe. | Dials, mapa de sistema de diseño, pre-flight de 40 puntos antes de dar por terminada cada sección |

Regla de desempate: si impeccable y taste-skill dan instrucciones distintas sobre
una misma decisión visual, gana la que esté escrita en `DESIGN.md` del proyecto,
que se redacta una vez en la Fase 0 y se respeta después.

### Choques detectados entre los dos skills

Al leer `craft-floor.md` de impeccable aparecieron dos contradicciones con
taste-skill. Se resuelven aquí y se fijan en `DESIGN.md`:

| Punto | impeccable | taste-skill | Resolución |
|---|---|---|---|
| Micro etiqueta en mayúsculas sobre el título (eyebrow) | Prohibida sin excepción: el título carga su propio peso | Permitida hasta `ceil(secciones/3)` | **Se prohíbe.** La regla más estricta gana y el sitio no pierde nada por no tenerlas. |
| Numeración de sección (01, 02, 03) | Solo si la secuencia aporta información al lector | Sin regla explícita | **Caso por caso.** Los cuatro hitos del brochure son cronológicos, así que ahí la numeración sí informa. En cualquier otro bloque, se elimina. |
| Cards iguales de icono, título y texto | "El contenedor perezoso"; prohibidas como estructura de página | Advierte contra tres cards iguales | **Se prohíben como estructura.** Afecta a tres bloques del brochure: servicios, ventajas y razones para elegir. Los tres son tríadas y los tres necesitan una familia de layout distinta. |

### Design read preliminar (taste-skill seccion 0.B)

> Reading this as: **landing institucional B2B de una empresa de construcción y
> minería regional, para jefes de obra, áreas de logística y compradores de
> minera**, con un lenguaje **industrial, sobrio y de alta confianza**, leaning
> toward **Tailwind v4 + tipografía condensada de obra + fotografía documental
> real, sin efectos decorativos**.

Este read es preliminar. Se confirma o se corrige en la Fase 0 con la salida de
`/impeccable init`.

### Dials propuestos (taste-skill seccion 1)

| Dial | Baseline del skill | Propuesta para VISENTRAC | Razón |
|---|---|---|---|
| `DESIGN_VARIANCE` | 8 | **6** | El comprador es procurement, no un jurado de Awwwards. Se quiere legibilidad y prueba, no experimentación. Pero 6 y no 3: el sitio igual debe verse mejor que el de la competencia local. |
| `MOTION_INTENSITY` | 6 | **4** | Movimiento solo para jerarquía y entrada de secciones. Muchos visitantes entran desde obra con conexión móvil pobre. |
| `VISUAL_DENSITY` | 4 | **4** | Landing informativa, no ficha técnica. Se mantiene el baseline. |

Nota: la tabla 1.A del skill empuja "trust-first / regulated" a VARIANCE 3-4.
Se sube a 6 deliberadamente porque no es sector público, es venta B2B donde la
diferenciación visual sí compite. Queda registrado como override consciente.

### Tema de página

taste-skill 6.C pide dark mode obligatorio para páginas de consumo. Se propone
**page theme lock en claro**, sin dark mode, por tres razones: la marca del
brochure es sobre blanco, el material fotográfico es de obra a plena luz, y el
soporte posterior lo hará gente que no va a mantener dos paletas. Queda como
override explícito, no como olvido.

---

## 3. Bloqueantes del cliente

Estas piezas no las puede resolver el equipo de desarrollo. Sin ellas el sitio
no se puede terminar, solo maquetar.

| Pieza | Estado | Impacto si no llega |
|---|---|---|
| Logo vectorial (SVG) o PNG con fondo transparente | Pendiente | Header y footer quedan con el logo recortado del PDF, de baja calidad. Bloquea la paleta definitiva. |
| **Fotos en alta resolución** (planta, flota, obra, equipo) | Pendiente | **Bloqueante, no deseable.** Ver seccion 0: sin certificados ni clientes citables, estas fotos son la única prueba que respalda la afirmación de planta y flota propias. Sin ellas el sitio afirma sin demostrar. |
| Sustento del indicador "85% nuevos clientes" | Pendiente | Sin fuente ni periodo, la cifra no se publica. |
| Horario de atención | Pendiente | Falta un dato que el comprador busca. |
| Redes sociales | Pendiente | Se omiten los iconos del footer. |
| Correo destino real del formulario | Pendiente | El formulario no se puede probar de punta a punta. |
| Datos de acceso al hosting (FTP/cPanel) y dominio | Pendiente | No hay publicación. |
| Validación de Misión, Visión y textos | Pendiente | Todo el copy queda marcado `pendienteValidacion`. |

**Estrategia interina:** se construye con fotografía de stock industrial marcada
como placeholder en un único archivo, de modo que el reemplazo por las fotos
reales sea una sustitución de rutas y no un rediseño.

---

## 4. Fases

### Fase 0 - Contexto de diseño (bloquea todo lo visual)

1. ~~Ejecutar `/impeccable init`.~~ **Hecho.** `PRODUCT.md` está en la raíz con
   las cuatro audiencias, el posicionamiento y el inventario de evidencia.
2. Confirmar el design read y fijar los dials de la seccion 2 de este documento.
   **Confirmados: 6 / 4 / 4, tema claro.**
3. Ejecutar `/impeccable shape landing` para fijar el brief de la superficie y
   el mundo visual. **Pendiente, es el siguiente paso del proyecto.**
4. Escribir `DESIGN.md`: paleta definitiva, escala tipográfica, sistema de
   radios, sombras, grid, breakpoints y reglas de motion. Incluye la tabla de
   choques entre skills de la seccion 2.

**Entregable:** `PRODUCT.md` (listo) y `DESIGN.md` (pendiente).

**Deuda visual acumulada, a resolver cuando `DESIGN.md` exista:** la fuente
Inter, la paleta azul y ámbar provisional de `globals.css` y el andamiaje de
`src/app/page.tsx` fueron escritos antes de tener contexto de producto. Los tres
se reemplazan, no se ajustan. El em-dash del `<title>` ya fue corregido.

---

### Fase 1 - Fundaciones técnicas

**Build verde.** `npm run build` genera `out/index.html` y `npm run lint` pasa
sin advertencias.

Hecho:

1. `src/lib/site.ts` con URL canónica, endpoint del formulario y constructor de
   enlaces de WhatsApp.
2. `.env.example` con `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_FORM_ENDPOINT`.
3. `src/app/page.tsx` reemplazado por andamiaje mínimo; boilerplate de Next
   eliminado junto con sus cinco SVG de `public/`.
4. ESLint dejó de analizar `.claude/` y `.agents/`, que traían 94 advertencias
   de los scripts de los skills instalados.
5. `.gitignore`: `.env.example` exceptuado del patrón `.env*` para que se pueda
   versionar.

Pendiente en esta fase:

6. Instalar `motion` y `@phosphor-icons/react`. Se posterga a la Fase 2: hasta
   que `DESIGN.md` no fije el sistema de iconos y el nivel de motion, instalarlas
   es adivinar.
7. `git init` y commit inicial.
8. Scripts de npm: `build:static` y un `check` que corra `tsc --noEmit` y ESLint.
9. Prettier con `prettier-plugin-tailwindcss`.
10. `public/.htaccess`, `public/robots.txt` y `sitemap.xml` generado en build.

---

### Fase 2 - Sistema de diseño en código

1. Tokens de `DESIGN.md` traducidos a `@theme` en `globals.css`.
2. Par tipográfico definitivo cargado con `next/font`. Requisito: no Inter, no
   la combinación por defecto de LLM. Candidatos para el rol display: familias
   condensadas de ingeniería. Se decide contra el logo real.
3. Primitivas en `src/components/ui/`: `Boton`, `Seccion`, `Contenedor`,
   `Eyebrow`, `Tarjeta`. Un solo sistema de radios, un solo acento.
4. Set de iconos Phosphor con `strokeWidth` global fijo.

**Criterio de cierre:** una página de muestra interna que exhiba todos los
tokens y primitivas, revisada con `/impeccable critique`.

---

### Fase 3 - Assets

1. Solicitud formal al cliente de la lista de la seccion 3.
2. Pipeline de imágenes: recorte a dimensiones exactas, conversión a WebP,
   `sharp` en un script de preproceso, no en build de Next.
3. Un único módulo `src/content/imagenes.ts` que mapee cada slot a su archivo,
   marcando cuáles son placeholder.
4. Favicon, apple-touch-icon y imagen Open Graph derivados del logo real.

---

### Fase 4 - Construcción de las cuatro páginas

**Cambio de alcance respecto al scope original:** no es una landing con anclas,
son cuatro páginas con ruta propia. El detalle vive en
[brief-superficies.md](brief-superficies.md); aquí solo el orden de trabajo.

Ventaja: cuatro URL indexables con su propio título y descripción, en vez de
una. Costo: el material del brochure se reparte entre cuatro páginas en lugar de
concentrarse, así que cada una necesita sustancia propia.

| Orden | Entregable | Modo | Contenido clave | Riesgo |
|---|---|---|---|---|
| 1 | Cabecera, navegación y pie | - | Logo, 4 rutas con estado activo, WhatsApp. Una línea en escritorio, máximo 80px | Menú móvil accesible por teclado |
| 2 | `/` Inicio | Persuade | Propuesta, descripción breve, sectores atendidos, 3 servicios como muestras rotuladas, por qué elegirnos, llamado a contacto | Depende de la foto principal. **Sin el indicador 85%** |
| 3 | `/servicios` | Persuade | Los 3 servicios en detalle, la flota completa como serie, agregados, las 3 ventajas | 6 máquinas: se leen como serie de unidades idénticas, no como `<ul>` pelado ni como tarjetas |
| 4 | `/nosotros` | Persuade | Historia desde 2014, Misión, Visión, 4 hitos, **5 valores**. Las áreas del equipo se retiraron | Era la página más delgada; los 5 valores la resuelven |
| 5 | `/contacto` | **Operate** | Formulario, dirección con mapa, teléfonos, correos | Único modo Operate: la expresión no puede estorbar a la tarea. Ver Fase 5 |
| 6 | Botón flotante de WhatsApp | - | Presente en las cuatro páginas | No tapar el envío del formulario en móvil |

Reglas transversales que aplican a las cuatro páginas:

- No puede haber tres secciones consecutivas con el mismo patrón imagen y texto.
- Cero micro etiquetas en mayúsculas sobre los títulos (ver la tabla de choques
  en la seccion 2).
- Servicios, ventajas, razones para elegir y valores son cuatro listas cortas
  seguidas. Ninguna puede resolverse con la misma fila de tarjetas iguales.
- Ninguna página puede prometer prueba que no existe: nada de logos de clientes,
  contadores de obras ni sellos de certificación.
- **Logos de clientes: no se publican** mientras no exista autorización escrita
  de uso de marca. En su lugar va el bloque de sectores atendidos, y en minería
  se redacta como servicio a empresas contratistas, que es la relación real.

---

### Fase 5 - Formulario de contacto

1. Componente cliente con validación en el navegador, honeypot antispam y
   estados de carga, éxito y error visibles.
2. `public/contacto.php`: validación en servidor, escape de cabeceras para
   evitar inyección de headers en el correo, límite de tamaño, rechazo de
   peticiones de otro origen y limitación por IP.
3. Envío con la función `mail()` de PHP o SMTP autenticado del propio dominio.
   **A definir con el hosting:** muchos cPanel bloquean `mail()` sin
   autenticación SMTP y el correo termina en spam.
4. Mapa de Google Maps embebido con carga diferida.
5. Enlaces `tel:` y `mailto:` en los tres teléfonos y dos correos.

**Criterio de cierre:** prueba de punta a punta con el correo real del cliente,
incluyendo revisión de la carpeta de spam.

---

### Fase 6 - Motion

Con `MOTION_INTENSITY 4`: entradas por scroll con stagger corto, transiciones de
estado en botones y enlaces, nada de bucles infinitos ni scroll hijacking.
Obligatorio: `prefers-reduced-motion` respetado y animaciones aceleradas por
hardware (`transform` y `opacity`, nunca `top` o `left`).

---

### Fase 7 - Calidad

1. `/impeccable audit` en toda la página: accesibilidad, rendimiento, responsive.
2. `/impeccable critique`: jerarquía, claridad, resonancia.
3. Pre-flight completo de taste-skill seccion 14, los 40 puntos.
4. Lighthouse móvil. Objetivo: rendimiento 90+, accesibilidad 95+, SEO 100.
5. Pruebas reales en 360px, 768px, 1280px y 1920px.
6. Revisión de copy: cero em-dashes, cero texto de relleno, cero afirmaciones
   que el cliente no haya validado.
7. `/impeccable polish` como paso final.

---

### Fase 8 - Publicación en cPanel

1. `npm run build` y verificación local de `out/`.
2. Subida de `out/` a `public_html` (FTP o el gestor de archivos de cPanel).
3. `.htaccess` en su sitio: HTTPS forzado, compresión, cacheo de estáticos.
4. SSL de Let's Encrypt desde cPanel.
5. Cuenta de correo del formulario creada en el mismo dominio.
6. Prueba del formulario en producción.
7. Google Search Console y envío del sitemap.

---

### Fase 9 - Entrega

1. Revisión conjunta con el cliente de los textos marcados `pendienteValidacion`.
2. Documento breve de cómo pedir cambios y qué cuesta cada tipo.
3. Definición de qué entra en la fase 2 (CMS, blog, cotizador) y qué no.

---

## 5. Riesgos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| **Las fotos del cliente nunca llegan o llegan en mala calidad** | Alta | **Riesgo principal del proyecto.** Es la única prueba disponible (seccion 0). Presupuestar una sesión fotográfica breve en planta y obra: sale más barato que publicar un sitio que afirma sin demostrar |
| El cliente insiste en publicar el 85% sin sustento | Media | Explicar el costo: ante un comprador minero, una cifra sin fuente resta credibilidad en lugar de sumarla. Alternativa: convertirla en un hecho verificable que sí posean |
| La página promete formalidad que no se puede documentar | Media | El sitio se apoya en planta y flota propias, que sí se ven en foto, no en certificaciones inexistentes |
| `mail()` bloqueado o el correo cae en spam | Media | Preparar desde el inicio la alternativa SMTP autenticado y configurar SPF y DKIM |
| El cliente pide cambios de copy después de publicar | Alta | Todo el texto vive en un único archivo, `src/content/empresa.ts`; un cambio es una línea y un redeploy |
| El hosting compartido no soporta PHP o lo tiene desactualizado | Baja | Verificar la versión de PHP antes de la Fase 5. Plan B: servicio externo de formularios |
| Next.js 16 introduce cambios respecto a lo conocido | Media | La documentación viaja dentro de `node_modules/next/dist/docs/`, se consulta ahí antes de escribir |

---

## 6. Decisiones

### Resueltas

| Decisión | Resultado |
|---|---|
| Ejecutar `/impeccable init` | Hecho. `PRODUCT.md` en la raíz |
| Dials y tema | `VARIANCE 6 / MOTION 4 / DENSITY 4`, tema claro sin dark mode |
| Assets del cliente | Se pide ya el paquete completo; mientras tanto se avanza con placeholders marcados en un solo archivo |
| Hosting y dominio | Datos aún no disponibles. Fase 8 no se ejecuta; Fase 5 se construye con la capa de envío abstraída |
| Flujo de construcción | Code-first. No hay herramienta de generación de imágenes en este entorno, así que no había elección que registrar |

### Abiertas, pendientes del cliente

1. Prioridad relativa entre las cuatro audiencias. Sin ella, ninguna sección
   puede optimizarse para una sola.
2. Sustento del indicador "85% nuevos clientes", o su retiro definitivo.
3. Logo vectorial y fotografía en alta resolución.
4. Horario de atención, redes sociales y correo destino del formulario.
5. Dominio, proveedor de hosting y versión de PHP.

### Siguiente paso

`/impeccable shape landing`: fija el brief de la superficie y el mundo visual,
con `PRODUCT.md` ya como base. De ahí sale `DESIGN.md` y recién entonces se
construyen secciones.
