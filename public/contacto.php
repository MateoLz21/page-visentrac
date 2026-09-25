<?php
/**
 * Endpoint del formulario de contacto de VISENTRAC SAC.
 *
 * Envia por SMTP autenticado de Gmail. La cuenta que autentica es
 * `asistentevisentrac@gmail.com`; el destinatario es el correo corporativo, que
 * esta en Microsoft 365.
 *
 * Por que asi y no con mail() ni con un buzon del hosting: el dominio tiene los
 * MX apuntando a Microsoft, y crear un buzon en cPanel haria que el servidor
 * entregara localmente el correo interno del dominio en lugar de enviarlo a
 * Microsoft. Saliendo por Gmail, el correo no toca el servidor de correo del
 * hosting y nada de lo que se configure aqui puede romper la entrega real.
 *
 * Requiere:
 *   - config.contacto.php con las credenciales (ver el .example)
 *   - lib/phpmailer/ junto a este archivo
 *   - PHP 7.4 o superior con las extensiones openssl y mbstring
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

/* Nunca mostrar errores de PHP al visitante: un aviso de ruta o de conexion
   revela la estructura del servidor. Se registran, no se imprimen. */
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

/** Responde en JSON y termina. */
function responder(int $codigo, bool $ok, string $mensaje, array $extra = []): never
{
    http_response_code($codigo);
    echo json_encode(
        array_merge(['success' => $ok, 'message' => $mensaje], $extra),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/**
 * Numero correlativo del Libro de Reclamaciones.
 *
 * Indecopi exige numeracion correlativa. Sin base de datos se lleva en un
 * archivo con bloqueo exclusivo: sin el bloqueo, dos reclamaciones simultaneas
 * recibirian el mismo numero y el registro dejaria de ser correlativo.
 */
function siguienteCorrelativo(): string
{
    $ruta = dirname(__DIR__) . '/reclamaciones-correlativo.txt';
    if (!is_writable(dirname($ruta))) {
        $ruta = sys_get_temp_dir() . '/visentrac_reclamaciones.txt';
    }

    $numero = 1;
    $fp = @fopen($ruta, 'c+');

    if ($fp && flock($fp, LOCK_EX)) {
        $actual = (int) trim((string) stream_get_contents($fp));
        $numero = $actual + 1;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, (string) $numero);
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    } elseif ($fp) {
        fclose($fp);
    }

    return sprintf('LR-%s-%04d', date('Y'), $numero);
}

/* ---------------------------------------------------------------------------
 * 1. Metodo
 * ------------------------------------------------------------------------ */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, false, 'Metodo no permitido.');
}

/* ---------------------------------------------------------------------------
 * 2. Configuracion
 * ------------------------------------------------------------------------ */
$rutasConfig = [
    // Fuera de public_html: preferida, inaccesible por web.
    dirname(__DIR__) . '/config.contacto.php',
    // Junto a este archivo: la protege el .htaccess.
    __DIR__ . '/config.contacto.php',
];

$config = null;
foreach ($rutasConfig as $ruta) {
    if (is_readable($ruta)) {
        $config = require $ruta;
        break;
    }
}

if (!is_array($config) || empty($config['smtp_usuario']) || empty($config['smtp_clave'])) {
    error_log('contacto.php: falta config.contacto.php o esta incompleto');
    responder(500, false, 'El formulario no esta configurado. Escribanos por WhatsApp.');
}

/* ---------------------------------------------------------------------------
 * 3. Origen de la peticion
 * ------------------------------------------------------------------------ */
/* Impide que el formulario se copie en otro sitio y use este script de
   pasarela. No es infalible (una peticion directa no manda Origin), pero corta
   el abuso desde navegador, que es el que ocurre en la practica. */
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
$permitidos = $config['origenes_permitidos'] ?? [];

if ($origen !== '' && $permitidos && !in_array($origen, $permitidos, true)) {
    responder(403, false, 'Origen no autorizado.');
}

/* ---------------------------------------------------------------------------
 * 4. Limite por IP
 * ------------------------------------------------------------------------ */
/* Cinco envios por hora desde la misma IP. Una persona real no necesita mas, y
   frena el envio automatizado sin pedirle nada al visitante. */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconocida';
$archivoLimite = sys_get_temp_dir() . '/visentrac_' . md5($ip) . '.txt';
$ventana = 3600;
$maximo = 5;

$envios = [];
if (is_readable($archivoLimite)) {
    $envios = array_filter(
        (array) json_decode((string) file_get_contents($archivoLimite), true),
        fn($t) => is_int($t) && $t > time() - $ventana
    );
}

if (count($envios) >= $maximo) {
    responder(429, false, 'Ha enviado varios mensajes seguidos. Intentelo mas tarde o escribanos por WhatsApp.');
}

/* ---------------------------------------------------------------------------
 * 5. Trampa antispam
 * ------------------------------------------------------------------------ */
/* El campo esta oculto a la vista y a los lectores de pantalla: solo lo rellena
   un robot. Se responde exito para no darle pistas de que fue detectado. */
if (trim((string) ($_POST['botcheck'] ?? '')) !== '') {
    responder(200, true, 'Mensaje recibido.');
}

/* ---------------------------------------------------------------------------
 * 6. Validacion
 * ------------------------------------------------------------------------ */
/* Se repite en servidor toda la validacion del navegador: la del cliente mejora
   la experiencia, nunca protege nada. */

/* El mismo endpoint atiende la consulta de contacto y el Libro de
   Reclamaciones. Comparten configuracion, credenciales y todas las defensas de
   arriba; solo cambian los campos, el asunto y el correlativo. */
$esReclamacion = ($_POST['formulario'] ?? '') === 'reclamacion';

$nombre   = trim((string) ($_POST['nombre'] ?? ''));
$correo   = trim((string) ($_POST['correo'] ?? ''));
$telefono = trim((string) ($_POST['telefono'] ?? ''));
$mensaje  = trim((string) ($_POST['mensaje'] ?? ''));

$errores = [];

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 100) {
    $errores[] = 'nombre';
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL) || mb_strlen($correo) > 150) {
    $errores[] = 'correo';
}
$digitos = preg_replace('/\D/', '', $telefono);
if (strlen((string) $digitos) < 6 || strlen((string) $digitos) > 15) {
    $errores[] = 'telefono';
}
if (!$esReclamacion && (mb_strlen($mensaje) < 10 || mb_strlen($mensaje) > 3000)) {
    $errores[] = 'mensaje';
}

if ($esReclamacion) {
    foreach (['documento', 'domicilio', 'descripcion', 'detalle', 'pedido'] as $campo) {
        if (mb_strlen(trim((string) ($_POST[$campo] ?? ''))) < 3) {
            $errores[] = $campo;
        }
    }
}

if ($errores) {
    responder(422, false, 'Revise los datos del formulario.');
}

/* Inyeccion de cabeceras: un salto de linea en nombre o correo permitiria
   anadir destinatarios y convertir el formulario en un enviador de spam ajeno.
   Estos campos viajan dentro de cabeceras del mensaje, asi que se limpian. */
$nombre = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $nombre);
$correo = str_replace(["\r", "\n", "%0a", "%0d"], '', $correo);

/* ---------------------------------------------------------------------------
 * 7. Envio
 * ------------------------------------------------------------------------ */
require __DIR__ . '/lib/phpmailer/Exception.php';
require __DIR__ . '/lib/phpmailer/PHPMailer.php';
require __DIR__ . '/lib/phpmailer/SMTP.php';

$correoHtml   = htmlspecialchars($correo, ENT_QUOTES, 'UTF-8');
$nombreHtml   = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$telefonoHtml = htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8');
$mensajeHtml  = nl2br(htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'));

/* Cuerpo del correo segun el formulario. */
if ($esReclamacion) {
    $correlativo = siguienteCorrelativo();

    $campos = [
        'Numero de registro' => $correlativo,
        'Tipo'               => ($_POST['tipo'] ?? '') === 'queja' ? 'QUEJA' : 'RECLAMO',
        'Fecha'              => date('d/m/Y H:i'),
        'Nombre'             => $nombre,
        'Documento'          => strtoupper((string) ($_POST['tipoDocumento'] ?? '')) . ' ' . ($_POST['documento'] ?? ''),
        'Domicilio'          => (string) ($_POST['domicilio'] ?? ''),
        'Correo'             => $correo,
        'Telefono'           => $telefono,
        'Menor de edad'      => isset($_POST['esMenor']) ? 'Si. Apoderado: ' . ($_POST['apoderado'] ?? '') : 'No',
        'Bien contratado'    => ucfirst((string) ($_POST['bien'] ?? '')),
        'Monto reclamado'    => ($_POST['monto'] ?? '') !== '' ? 'S/ ' . $_POST['monto'] : 'No indicado',
        'Descripcion'        => (string) ($_POST['descripcion'] ?? ''),
        'Detalle'            => (string) ($_POST['detalle'] ?? ''),
        'Pedido'             => (string) ($_POST['pedido'] ?? ''),
    ];

    $filas = '';
    $texto = "LIBRO DE RECLAMACIONES

";
    foreach ($campos as $etiqueta => $valor) {
        $v = htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
        $filas .= '<tr><td style="padding:6px 14px 6px 0;vertical-align:top;color:#565f66;white-space:nowrap">'
            . $etiqueta . '</td><td style="padding:6px 0;vertical-align:top">' . nl2br($v) . '</td></tr>';
        $texto .= $etiqueta . ': ' . $valor . "
";
    }

    $asunto = '[' . $correlativo . '] ' . (($_POST['tipo'] ?? '') === 'queja' ? 'Queja' : 'Reclamo') . ' de ' . $nombre;
    $cuerpoHtml = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#14181b;line-height:1.6">'
        . '<p style="margin:0 0 20px;border-left:3px solid #ff6b00;padding-left:12px"><strong>Libro de Reclamaciones</strong></p>'
        . '<table style="border-collapse:collapse">' . $filas . '</table>'
        . '<p style="margin:24px 0 0;font-size:13px;color:#565f66">Plazo legal de respuesta: 15 dias habiles. '
        . 'Responda a este correo y le llegara directamente a ' . $correoHtml . '.</p></div>';
    $cuerpoTexto = $texto;
} else {
    $correlativo = null;
    $asunto = 'Consulta web de ' . $nombre;
    $cuerpoHtml = <<<HTML
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#14181b;line-height:1.6">
          <p style="margin:0 0 20px;border-left:3px solid #ff6b00;padding-left:12px">
            <strong>Nueva consulta desde la web</strong>
          </p>
          <p style="margin:0 0 8px"><strong>Nombre:</strong> {$nombreHtml}</p>
          <p style="margin:0 0 8px"><strong>Correo:</strong> {$correoHtml}</p>
          <p style="margin:0 0 20px"><strong>Telefono:</strong> {$telefonoHtml}</p>
          <p style="margin:0 0 8px"><strong>Mensaje:</strong></p>
          <p style="margin:0;padding:14px;background:#f2f4f5">{$mensajeHtml}</p>
          <p style="margin:24px 0 0;font-size:13px;color:#565f66">
            Responda a este correo y le llegara directamente a {$correoHtml}.
          </p>
        </div>
        HTML;
    $cuerpoTexto = "Nueva consulta desde la web

"
        . "Nombre: {$nombre}
"
        . "Correo: {$correo}
"
        . "Telefono: {$telefono}

"
        . "Mensaje:
{$mensaje}
";
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_usuario'];
    // Google muestra la clave de cuatro en cuatro; los espacios no forman parte.
    $mail->Password   = str_replace(' ', '', (string) $config['smtp_clave']);
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->Timeout    = 20;

    /* Gmail exige que el remitente sea la cuenta autenticada: no se puede
       falsear el dominio sin verificarlo. Lo importante es el Reply-To. */
    $mail->setFrom($config['smtp_usuario'], 'Web VISENTRAC');
    $mail->addAddress($config['destinatario']);
    $mail->addReplyTo($correo, $nombre);

    $mail->Subject = $asunto;
    $mail->isHTML(true);
    $mail->Body = $cuerpoHtml;
    $mail->AltBody = $cuerpoTexto;

    $mail->send();
} catch (PHPMailerException $e) {
    /* El detalle va al log del servidor, no al visitante. */
    error_log('contacto.php: fallo el envio: ' . $mail->ErrorInfo);
    responder(502, false, 'No pudimos enviar su mensaje. Escribanos por WhatsApp o llamenos.');
}

/* ---------------------------------------------------------------------------
 * 8. Registrar el envio para el limite por IP
 * ------------------------------------------------------------------------ */
$envios[] = time();
@file_put_contents($archivoLimite, json_encode(array_values($envios)));

responder(200, true, 'Mensaje recibido.', $correlativo ? ['codigo' => $correlativo] : []);
