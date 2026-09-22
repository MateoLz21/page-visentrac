# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Cuatro audiencias confirmadas. Ninguna fue descartada por el cliente interno.

1. **Constructoras locales.** Residente de obra o maestro de obra en Espinar y
   provincias del Cusco. Busca disponibilidad y precio, compara dos o tres
   proveedores y decide en días. Suele consultar con la obra ya iniciada.
2. **Compras y logística de operaciones mineras** de la zona y sus contratistas.
   Exige formalidad documental, estándares de seguridad y facturación. Ciclo de
   decisión largo, ticket alto, filtro por requisitos antes que por precio.
3. **Entidades públicas.** Municipalidad de Espinar, gobierno regional y
   contratistas de obra pública. Compran por proceso formal y necesitan respaldo
   documental del proveedor.
4. **Agroindustria y privados de mayor escala.** Decisión más directa, volumen
   menor.

**Decisión abierta:** la prioridad relativa entre las cuatro no está confirmada.
Hasta que el cliente la fije, ninguna sección puede optimizarse para una sola
audiencia a costa de dejar a las otras sin respuesta.

**Situación de uso:** el visitante busca un proveedor local de concreto,
maquinaria o agregados cuando ya tiene una obra en marcha o por iniciar. La
consulta ocurre con frecuencia desde el móvil, en zona altoandina con
conectividad variable, a veces desde la obra misma.

## Product Purpose

Presentar a VISENTRAC SAC como proveedor formal y localmente disponible de
concreto premezclado, alquiler de maquinaria y agregados, y convertir esa
presentación en una consulta directa por WhatsApp, teléfono o formulario.

El sitio no transacciona: no cotiza, no vende, no reserva. Su éxito se mide en
consultas calificadas que llegan por los canales de contacto.

## Positioning

**Producción y flota propias.** VISENTRAC produce su concreto premezclado y
opera su propia maquinaria en lugar de intermediar o subcontratar. Un competidor
que revende concreto o alquila equipo de terceros no puede sostener la misma
afirmación sobre disponibilidad ni sobre tiempo de respuesta.

Esta es la única afirmación diferencial confirmada. Está respaldada por las
fotos de silos y maquinaria del brochure, no por documentación formal.

## Operating Context

- Base en Pasaje Rosas Pata 102, Espinar, Cusco. Contexto altoandino: accesos
  difíciles, clima severo, logística cara.
- Opera desde 2014 en construcción, minería y agroindustria.
- Servicios declarados: venta de concreto premezclado, alquiler de maquinaria
  pesada y liviana, venta de agregados, movimiento de tierra.
- Flota declarada: camiones mixer, bomba hormigonera, volquete, telehandler,
  cargador frontal, camioneta.
- Agregados: arena, grava, piedra chancada.
- Canales de contacto actuales: tres teléfonos (984886660, 901789330,
  968967089), dos correos (administracion@visentrac.com, visentrac@hotmail.com).
  WhatsApp es canal de uso habitual en el rubro y en la zona.
- Áreas internas: Gerencia, Administración, Seguridad, Ingeniería. El brochure
  las muestra como grupos, sin nombres individuales.

## Capabilities and Constraints

- Sitio informativo de una sola landing con cuatro secciones: Inicio, Nosotros,
  Servicios, Contáctenos. Definido en `docs/scope.md`.
- **Publicación en hosting compartido cPanel.** No hay runtime de servidor: la
  salida es HTML estático (`output: "export"` en Next.js).
- El formulario de contacto necesita un endpoint PHP alojado en el mismo
  hosting. No hay API routes ni Server Actions disponibles.
- Sin CMS en esta versión. Todo cambio de texto exige un redeploy. El contenido
  vive centralizado en `src/content/empresa.ts` para que ese cambio sea barato.
- Idioma único: español de Perú.
- Fuera de alcance confirmado: blog, panel administrativo, tienda en línea,
  cotizador automático, multiidioma, integración con ERP o facturación.
- **Decisiones abiertas:** horario de atención, existencia de redes sociales,
  correo destino real del formulario, dominio contratado, proveedor de hosting y
  versión de PHP disponible.

## Brand Commitments

- Nombre legal: VISENTRAC SAC. Isotipo de camión grúa.
- Existen Misión y Visión redactadas en el brochure. Ambas están pendientes de
  validación del cliente en su versión adaptada a web.
- El logo solo está disponible en la versión sobre fondo blanco del PDF. Falta
  la versión vectorial o PNG con fondo transparente.
- No existe guía de marca, ni paleta institucional, ni tipografía definida. La
  identidad visual del sitio es trabajo a crear, no a heredar.

## Evidence on Hand

**Confirmado y disponible:**

- **Servicio prestado en operaciones mineras de la provincia de Espinar**, con
  relación indirecta: el cliente contractual es la empresa contratista que opera
  en la unidad, no la minera titular. Este hecho se comunica como sector
  atendido, nunca como cartera de clientes, y sin nombrar marcas ajenas mientras
  no haya autorización escrita.

- Brochure institucional (`brochure_actualizado-26.pdf`), transcrito en
  `docs/visentrac-info.md`: Misión, Visión, cuatro hitos, tres servicios, tres
  ventajas, tres razones para elegir, cuatro áreas de equipo.
- Material fotográfico del brochure: silos y planta de concreto, cargador
  frontal, volquete, camión mixer, encofrados y colada de concreto, foto grupal
  del equipo, foto grupal con volquetes en cantera. Calidad media, comprimida.

**Ausencias que el sitio no puede fabricar:**

- Sin certificaciones, homologaciones de proveedor minero, SCTR ni auditorías
  mostrables.
- Sin ensayos de resistencia ni documentación técnica publicable.
- Sin clientes ni obras que se puedan nombrar **públicamente**. No habrá muro de
  logos, ni casos de estudio, ni portafolio de proyectos, mientras no exista
  autorización escrita de uso de marca de cada empresa nombrada.
- Sin testimonios.
- Sin cifras verificables de volumen despachado, tamaño de flota, metros cúbicos
  ni indicadores de seguridad.
- El indicador **"85% nuevos clientes"** aparece en el brochure sin fuente,
  periodo ni definición. No está verificado. No debe presentarse como dato duro
  mientras el cliente no lo sustente.

## Product Principles

1. **Contactar debe costar un toque.** El visitante llega con una necesidad
   inmediata y un teléfono en la mano. Cada sección debe dejarlo a un gesto de
   escribir o llamar, sin obligarlo a recorrer la página hasta el final.
2. **Nada que no se pueda sostener.** Sin certificados ni clientes citables, el
   sitio no puede apoyarse en prueba social ni en sellos. Inventar cualquiera de
   las dos destruye exactamente la confianza que el sitio existe para construir.
3. **La prueba disponible es visual.** La única evidencia real en mano son las
   fotos de planta propia, flota propia y obra en ejecución. La fotografía no es
   decoración en este proyecto: es el argumento.
4. **Una sola página sirve a cuatro compradores distintos.** Un residente de
   obra que necesita mixers mañana y un comprador minero que evalúa formalidad
   leen la misma página. La estructura debe permitir que cada uno encuentre lo
   suyo sin que el otro sienta que la página no le habla.
5. **El móvil en condiciones adversas es el caso base**, no el caso degradado.
   Conexión lenta, pantalla al sol, una sola mano libre.

## Accessibility & Inclusion

No se estableció un requisito normativo formal. El contexto de uso impone estos
mínimos: contraste alto suficiente para pantalla bajo luz solar directa,
tipografía legible a tamaño corporal sin zoom, objetivos táctiles amplios para
uso con guantes o una sola mano, y funcionamiento completo sin depender de
animación. WCAG AA es el piso, no la meta.
