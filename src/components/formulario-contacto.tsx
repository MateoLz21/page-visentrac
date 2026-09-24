"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneTilt, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Boton, BotonEnlace } from "@/components/ui/boton";
import { formEndpoint, web3formsKey, formularioConfigurado, whatsappUrl } from "@/lib/site";
import { contacto } from "@/content/empresa";

type Estado = "reposo" | "enviando" | "enviado" | "error";
type Campo = "nombre" | "correo" | "telefono" | "mensaje";
type Errores = Partial<Record<Campo, string>>;

const etiquetas: Record<Campo, string> = {
  nombre: "Nombre",
  correo: "Correo electrónico",
  telefono: "Teléfono",
  mensaje: "¿Qué necesita para su obra?",
};

/** Validación en el navegador. El servidor repite la suya, nunca confía en esta. */
function validar(datos: Record<Campo, string>): Errores {
  const errores: Errores = {};

  if (datos.nombre.trim().length < 2) {
    errores.nombre = "Escriba su nombre para saber con quién hablamos.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
    errores.correo = "Revise el correo: falta un dato para poder responderle.";
  }
  const soloDigitos = datos.telefono.replace(/\D/g, "");
  if (soloDigitos.length < 6 || soloDigitos.length > 15) {
    errores.telefono = "Ingrese un teléfono de contacto válido.";
  }
  if (datos.mensaje.trim().length < 10) {
    errores.mensaje = "Cuéntenos brevemente qué necesita, para responderle con precisión.";
  }

  return errores;
}

const claseCampo =
  "min-h-12 w-full rounded-[--radius-muestra] border bg-white px-4 py-3 text-base text-concreto-950 placeholder:text-concreto-600 focus:outline-none";

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("reposo");
  const [errores, setErrores] = useState<Errores>({});
  const [mensajeError, setMensajeError] = useState("");

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const datosFormulario = new FormData(formulario);

    /* Trampa antispam: los robots rellenan todo, las personas no ven el campo.
       Se llama `botcheck` porque es el nombre que Web3Forms reconoce y filtra
       también por su lado. Aquí se corta antes de gastar una petición. */
    if ((datosFormulario.get("botcheck") as string)?.length > 0) {
      setEstado("enviado");
      return;
    }

    const datos = {
      nombre: (datosFormulario.get("nombre") as string) ?? "",
      correo: (datosFormulario.get("correo") as string) ?? "",
      telefono: (datosFormulario.get("telefono") as string) ?? "",
      mensaje: (datosFormulario.get("mensaje") as string) ?? "",
    };

    const encontrados = validar(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) {
      const primero = Object.keys(encontrados)[0];
      formulario.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    setEstado("enviando");
    setMensajeError("");

    try {
      const respuesta = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          /* `replyto` es lo que permite responder al cliente con un solo clic
             desde la bandeja de VISENTRAC. */
          replyto: datos.correo,
          from_name: `${datos.nombre} · Web VISENTRAC`,
          subject: `Consulta web de ${datos.nombre}`,
          Nombre: datos.nombre,
          Correo: datos.correo,
          Teléfono: datos.telefono,
          Mensaje: datos.mensaje,
          botcheck: "",
        }),
      });

      const resultado: { success?: boolean; message?: string } = await respuesta
        .json()
        .catch(() => ({}));

      if (!respuesta.ok || resultado.success === false) {
        throw new Error(resultado.message ?? `El servidor respondió ${respuesta.status}`);
      }

      setEstado("enviado");
      formulario.reset();
    } catch {
      setEstado("error");
      setMensajeError(
        "No pudimos enviar su mensaje. Escríbanos por WhatsApp o llámenos directamente.",
      );
    }
  }

  /*
   * Sin clave de Web3Forms el envío no puede funcionar. Antes que mostrar un
   * formulario que falla al pulsar enviar, se dice lo que pasa y se ofrece el
   * canal que sí está operativo.
   */
  if (!formularioConfigurado) {
    return (
      <div className="flex flex-col items-start gap-4 border-t-2 border-senal-500 bg-white p-6 sm:p-8">
        <WarningCircle size={28} weight="light" className="text-senal-700" />
        <h3 className="text-xl font-semibold tracking-tight text-concreto-950">
          Formulario en configuración
        </h3>
        <p className="max-w-[48ch] text-base leading-relaxed text-concreto-700">
          Estamos terminando de habilitar el envío de mensajes. Mientras tanto,
          escríbanos por WhatsApp o llámenos: respondemos igual de rápido.
        </p>
        <BotonEnlace
          href={whatsappUrl(contacto.whatsapp, contacto.mensajeWhatsapp)}
          externo
        >
          Escríbenos por WhatsApp
        </BotonEnlace>
      </div>
    );
  }

  if (estado === "enviado") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 border-t-2 border-senal-500 bg-white p-8"
      >
        <CheckCircle size={32} weight="light" className="text-marca-900" />
        <h3 className="text-2xl font-semibold tracking-tight text-concreto-950">
          Mensaje recibido
        </h3>
        <p className="max-w-[48ch] text-base leading-relaxed text-concreto-700">
          Gracias por escribirnos. Le responderemos al correo o al teléfono que
          nos dejó. Si su obra no puede esperar, escríbanos por WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setEstado("reposo")}
          className="min-h-12 text-base font-semibold text-marca-900 underline underline-offset-4"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={manejarEnvio}
      noValidate
      /* pb extra en móvil: el botón flotante de WhatsApp vive sobre esa esquina
         y sin este colchón tapa el botón de envío. */
      className="flex flex-col gap-6 border-t-2 border-concreto-300 bg-white p-6 pb-24 sm:p-8 sm:pb-8"
    >
      <p className="text-sm text-concreto-700">
        Todos los campos son obligatorios.
      </p>

      {(["nombre", "correo", "telefono"] as const).map((campo) => (
        <div key={campo} className="flex flex-col gap-2">
          <label htmlFor={campo} className="text-sm font-semibold text-concreto-900">
            {etiquetas[campo]}
          </label>
          <input
            id={campo}
            name={campo}
            required
            aria-required
            type={campo === "correo" ? "email" : campo === "telefono" ? "tel" : "text"}
            autoComplete={
              campo === "correo" ? "email" : campo === "telefono" ? "tel" : "name"
            }
            aria-invalid={errores[campo] ? true : undefined}
            aria-describedby={errores[campo] ? `${campo}-error` : undefined}
            className={`${claseCampo} ${
              errores[campo] ? "border-senal-700" : "border-concreto-400"
            }`}
          />
          {errores[campo] ? (
            <p id={`${campo}-error`} className="text-sm font-medium text-senal-700">
              {errores[campo]}
            </p>
          ) : null}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className="text-sm font-semibold text-concreto-900">
          {etiquetas.mensaje}
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          aria-required
          placeholder="Volumen de concreto, tipo de maquinaria, fecha y lugar de la obra."
          aria-invalid={errores.mensaje ? true : undefined}
          aria-describedby={errores.mensaje ? "mensaje-error" : undefined}
          className={`${claseCampo} resize-y ${
            errores.mensaje ? "border-senal-700" : "border-concreto-400"
          }`}
        />
        {errores.mensaje ? (
          <p id="mensaje-error" className="text-sm font-medium text-senal-700">
            {errores.mensaje}
          </p>
        ) : null}
      </div>

      {/* Campo trampa: oculto a la vista y a los lectores de pantalla. */}
      <div aria-hidden className="hidden">
        <label htmlFor="botcheck">No complete este campo</label>
        <input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      {estado === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-3 border-t-2 border-senal-500 bg-senal-50 p-4 text-base text-concreto-900"
        >
          <WarningCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-senal-700" />
          {mensajeError}
        </p>
      ) : null}

      <Boton type="submit" tamano="grande" disabled={estado === "enviando"}>
        <PaperPlaneTilt size={20} weight="fill" />
        {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
      </Boton>
    </form>
  );
}
