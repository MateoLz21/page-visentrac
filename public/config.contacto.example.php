<?php
/**
 * Configuracion del formulario de contacto.
 *
 * COPIAR ESTE ARCHIVO como `config.contacto.php` y rellenar los valores.
 * `config.contacto.php` esta en .gitignore y NUNCA debe subirse al repositorio:
 * contiene una credencial.
 *
 * Donde colocarlo en el hosting, por orden de preferencia:
 *
 *   1. Un nivel POR ENCIMA de public_html. Es lo mas seguro: queda fuera del
 *      alcance del servidor web y nadie puede pedirlo por URL.
 *        /home/usuario/config.contacto.php
 *
 *   2. Dentro de public_html, junto a contacto.php. Funciona, y el .htaccess
 *      del sitio bloquea el acceso directo, pero depende de que ese bloqueo
 *      siga en su sitio.
 *
 * contacto.php busca primero en la ubicacion 1 y despues en la 2.
 */

return [
    /**
     * Cuenta de Gmail que ENVIA el correo.
     *
     * No es el destinatario: es la cuenta que se autentica contra Gmail. El
     * correo saldra desde aqui y quedara archivado en su carpeta Enviados, lo
     * que da un historico de todas las consultas sin montar nada mas.
     */
    'smtp_usuario' => 'asistentevisentrac@gmail.com',

    /**
     * Contrasena de aplicacion de Google, 16 caracteres.
     *
     * NO es la contrasena de la cuenta. Se genera en la cuenta de Google, con
     * la verificacion en dos pasos activada, en Seguridad > Contrasenas de
     * aplicaciones. Se puede revocar en cualquier momento sin cambiar la
     * contrasena real.
     *
     * Se admite con o sin espacios: Google la muestra agrupada de cuatro en
     * cuatro y el codigo los elimina.
     */
    'smtp_clave' => 'xxxx xxxx xxxx xxxx',

    /** Buzon que RECIBE las consultas. */
    'destinatario' => 'administracion@visentrac.com',

    /**
     * Dominios desde los que se aceptan envios.
     *
     * Impide que alguien copie el formulario en otro sitio y use este script
     * para mandar correo. Incluir el dominio con y sin www.
     */
    'origenes_permitidos' => [
        'https://visentrac.com',
        'https://www.visentrac.com',
    ],
];
