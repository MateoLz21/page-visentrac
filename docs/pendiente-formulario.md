# Formulario de contacto: plan de implementación

Trabajo planificado para cerrar esta noche. Sustituye a Web3Forms.

---

## Por qué se cambia

Web3Forms exige **confirmar el correo destino** desde el propio buzón. El correo
corporativo es `administracion@visentrac.com` y no hay acceso a él ni lo va a
haber, así que ese camino está cerrado.

La solución elegida invierte el problema: en lugar de verificar al destinatario,
se autentica al **remitente**, que sí está bajo control.

## Restricciones que no se pueden romper

El dominio está en **GoDaddy** con los **MX apuntando a Microsoft 365**. Se va a
contratar un hosting **cPanel solo para la web**, apuntando los registros A sin
tocar los MX.

Por tanto:

- **No se toca ningún registro DNS.**
- **No se crea ningún buzón de correo en cPanel.**
- Nada de lo que se haga puede afectar a la entrega de correo por Microsoft.

## Solución: PHP con SMTP de Gmail

`public/contacto.php` se autentica contra `smtp.gmail.com` usando
`asistentevisentrac@gmail.com` y envía a `administracion@visentrac.com`.

El correo **no pasa por el servidor de correo del hosting**: sale directo por
Gmail. Eso deja el asunto del enrutamiento de correo de cPanel fuera de la
ecuación para el formulario.

Cabeceras del mensaje que recibirá VISENTRAC:

| Campo | Valor |
|---|---|
| `From` | `asistentevisentrac@gmail.com` |
| `Reply-To` | el correo del visitante |
| `To` | `administracion@visentrac.com` |
| Asunto | `Consulta web de <nombre>` |

Efecto lateral útil: cada consulta queda archivada en **Enviados** de esa cuenta
de Gmail, lo que da un histórico completo sin montar nada.

Limitación aceptada: el remitente se ve como una dirección de Gmail, no como
`@visentrac.com`. Cambiarlo exigiría verificar el dominio por DNS. Es un correo
interno que solo ve el equipo, no el cliente final.

---

## Requisito del usuario, antes de empezar

En la cuenta `asistentevisentrac@gmail.com`:

1. Activar la **verificación en dos pasos**
2. Generar una **contraseña de aplicación** de 16 caracteres

No es la contraseña de la cuenta: es un permiso específico para enviar, revocable
en cualquier momento.

## Trabajo a realizar

1. **`public/contacto.php`** con PHPMailer:
   - Validación en servidor, sin confiar en la del navegador
   - Bloqueo de inyección de cabeceras (saltos de línea en los campos, que
     convertirían el formulario en un enviador de spam ajeno)
   - Honeypot, que el formulario ya trae
   - Límite de envíos por IP
   - Verificación de origen de la petición
   - Sin exponer detalles de error al visitante
2. **Credenciales fuera del código**: en un archivo de configuración aparte,
   fuera de `public_html` si el hosting lo permite, y añadido a `.gitignore`.
   La contraseña de aplicación **nunca** entra en el repositorio.
3. **`src/lib/site.ts`**: el endpoint vuelve a `/contacto.php`; se retira lo de
   Web3Forms.
4. **`src/components/formulario-contacto.tsx`**: volver a envío por `FormData`
   en lugar del JSON de Web3Forms.
5. **Prueba de punta a punta** contra el correo corporativo, revisando también
   la carpeta de no deseados de Outlook la primera vez.

## Configuración en cPanel, cuando exista el hosting

Independiente del formulario, pero necesaria: poner el dominio como **Remote
Mail Exchanger** en *Email Routing*. Sin eso, cualquier correo que el servidor
intente enviar a una dirección `@visentrac.com` se entregaría a un buzón local
inexistente en lugar de a Microsoft, y desaparecería sin dar error.

---

## Decisión pendiente: Netlify

Netlify quedó **descartado** como alojamiento. Quedan en el repositorio
`netlify.toml` y `docs/despliegue-netlify.md`, que ya no aplican. Decidir si se
eliminan o se conservan por si se usa para una previsualización puntual.

Lo que sí se conserva del trabajo de esa sesión y sigue siendo útil: el bloqueo
de indexación por `NEXT_PUBLIC_INDEXABLE`, que evita que una publicación de
prueba compita en Google contra el sitio definitivo.

---

## Archivos que NO viajan en el repositorio

Al desplegar hay que subirlos a mano. Si se olvidan, el sitio no da error: se
degrada en silencio, que es peor.

| Archivo local | Destino en el hosting | Si falta |
|---|---|---|
| `public/visentrac.mp4` | `public_html/visentrac.mp4` | El vídeo muestra el póster y al pulsar no ocurre nada |
| `public/config.contacto.php` | Un nivel **por encima** de `public_html`, o dentro junto a `contacto.php` | El formulario responde "El formulario no está configurado" |

El primero queda fuera porque git conserva cada versión de los binarios para
siempre. El segundo, porque contiene una credencial.

## Estado de la prueba de correo

La autenticación contra `smtp.gmail.com` **está verificada y funciona**. Se envió
un correo de prueba real a `administracion@visentrac.com` el 24 de septiembre de
2026, aceptado por Gmail sin rechazos.

Falta confirmar del lado de Microsoft: si llegó, si entró en bandeja de entrada
o en no deseados, y si al responder el mensaje se dirige al visitante gracias al
`Reply-To`.
