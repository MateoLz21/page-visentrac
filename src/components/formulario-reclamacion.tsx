"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { PaperPlaneTilt, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Boton } from "@/components/ui/boton";
import { formEndpoint } from "@/lib/site";
import { reclamaciones } from "@/content/reclamaciones";

type Estado = "reposo" | "enviando" | "enviado" | "error";
type Errores = Record<string, string>;

const claseCampo =
  "min-h-12 w-full rounded-[--radius-muestra] border bg-white px-4 py-3 text-base text-concreto-950 placeholder:text-concreto-600 focus:outline-none";

/** Campo con su etiqueta, su error y su descripción opcional. */
function Campo({
  id,
  etiqueta,
  error,
  ayuda,
  children,
  ancho = "completo",
}: {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
  ancho?: "completo" | "medio";
}) {
  return (
    <div className={`flex flex-col gap-2 ${ancho === "medio" ? "sm:col-span-1" : "sm:col-span-2"}`}>
      <label htmlFor={id} className="text-sm font-semibold text-concreto-900">
        {etiqueta}
      </label>
      {ayuda ? <p className="-mt-1 text-sm text-concreto-700">{ayuda}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-senal-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Formulario del Libro de Reclamaciones.
 *
 * Reproduce los campos del formato oficial de Indecopi. El servidor asigna un
 * número correlativo y devuelve la constancia: el consumidor tiene derecho a
 * conservar copia de lo que presentó, y sin ese número no puede acreditar que
 * lo hizo.
 */
export function FormularioReclamacion() {
  const [estado, setEstado] = useState<Estado>("reposo");
  const [errores, setErrores] = useState<Errores>({});
  const [codigo, setCodigo] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [esMenor, setEsMenor] = useState(false);

  function validar(d: FormData): Errores {
    const e: Errores = {};
    const txt = (k: string) => String(d.get(k) ?? "").trim();

    if (txt("nombre").length < 2) e.nombre = "Indique su nombre completo.";
    if (txt("documento").length < 6) e.documento = "Indique su número de documento.";
    if (txt("domicilio").length < 5) e.domicilio = "Indique su domicilio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(txt("correo")))
      e.correo = "Revise el correo: ahí le llegará la respuesta.";
    if (txt("telefono").replace(/\D/g, "").length < 6)
      e.telefono = "Indique un teléfono de contacto.";
    if (esMenor && txt("apoderado").length < 2)
      e.apoderado = "Si es menor de edad, indique el nombre del padre o apoderado.";
    if (txt("descripcion").length < 10)
      e.descripcion = "Describa el producto o servicio contratado.";
    if (txt("detalle").length < 20)
      e.detalle = "Explique con detalle lo ocurrido, para poder atenderlo.";
    if (txt("pedido").length < 10) e.pedido = "Indique qué solución solicita.";

    return e;
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const datos = new FormData(formulario);

    if (String(datos.get("botcheck") ?? "") !== "") {
      setEstado("enviado");
      return;
    }

    const encontrados = validar(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) {
      const primero = Object.keys(encontrados)[0];
      formulario.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    /* Marca el envío para que el servidor lo trate como reclamación y no como
       consulta: cambia el asunto, el formato y el correlativo. */
    datos.set("formulario", "reclamacion");

    setEstado("enviando");
    setMensajeError("");

    try {
      const respuesta = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: datos,
      });
      const resultado: { success?: boolean; message?: string; codigo?: string } =
        await respuesta.json().catch(() => ({}));

      if (!respuesta.ok || resultado.success === false) {
        throw new Error(resultado.message ?? `El servidor respondió ${respuesta.status}`);
      }

      setCodigo(resultado.codigo ?? "");
      setEstado("enviado");
      formulario.reset();
    } catch {
      setEstado("error");
      setMensajeError(
        "No pudimos registrar su reclamación. Inténtelo de nuevo o comuníquese por teléfono.",
      );
    }
  }

  if (estado === "enviado") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 border-t-2 border-senal-500 bg-white p-8"
      >
        <CheckCircle size={32} weight="light" className="text-marca-900" />
        <h2 className="text-2xl font-semibold tracking-tight text-concreto-950">
          Reclamación registrada
        </h2>

        {codigo ? (
          <div className="border-t border-concreto-300 pt-4">
            <p className="text-sm text-concreto-700">Número de registro</p>
            <p data-medida className="mt-1 font-medida text-2xl font-semibold text-marca-900">
              {codigo}
            </p>
          </div>
        ) : null}

        <p className="max-w-[54ch] text-base leading-relaxed text-concreto-700">
          Guarde este número como constancia. Le responderemos al correo indicado
          en un plazo máximo de {reclamaciones.plazoRespuestaDias} días hábiles.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="grid gap-6 border-t-2 border-concreto-300 bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      <p className="text-sm text-concreto-700 sm:col-span-2">
        Todos los campos son obligatorios, salvo donde se indique.
      </p>

      <h2 className="text-lg font-semibold tracking-tight sm:col-span-2">
        1. Identificación del consumidor
      </h2>

      <Campo id="nombre" etiqueta="Nombre completo" error={errores.nombre}>
        <input id="nombre" name="nombre" required className={`${claseCampo} ${errores.nombre ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <Campo id="tipoDocumento" etiqueta="Tipo de documento" ancho="medio">
        <select id="tipoDocumento" name="tipoDocumento" className={`${claseCampo} border-concreto-400`}>
          {reclamaciones.documentos.map((d) => (
            <option key={d.valor} value={d.valor}>{d.nombre}</option>
          ))}
        </select>
      </Campo>

      <Campo id="documento" etiqueta="Número de documento" error={errores.documento} ancho="medio">
        <input id="documento" name="documento" required inputMode="numeric" className={`${claseCampo} ${errores.documento ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <Campo id="domicilio" etiqueta="Domicilio" error={errores.domicilio}>
        <input id="domicilio" name="domicilio" required autoComplete="street-address" className={`${claseCampo} ${errores.domicilio ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <Campo id="correo" etiqueta="Correo electrónico" error={errores.correo} ancho="medio">
        <input id="correo" name="correo" type="email" required autoComplete="email" className={`${claseCampo} ${errores.correo ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <Campo id="telefono" etiqueta="Teléfono" error={errores.telefono} ancho="medio">
        <input id="telefono" name="telefono" type="tel" required autoComplete="tel" className={`${claseCampo} ${errores.telefono ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <div className="sm:col-span-2">
        <label className="flex min-h-12 items-center gap-3 text-base text-concreto-900">
          <input
            type="checkbox"
            name="esMenor"
            checked={esMenor}
            onChange={(e) => setEsMenor(e.target.checked)}
            className="h-5 w-5"
          />
          Soy menor de edad
        </label>
      </div>

      {esMenor ? (
        <Campo id="apoderado" etiqueta="Nombre del padre, madre o apoderado" error={errores.apoderado}>
          <input id="apoderado" name="apoderado" className={`${claseCampo} ${errores.apoderado ? "border-senal-700" : "border-concreto-400"}`} />
        </Campo>
      ) : null}

      <h2 className="mt-4 text-lg font-semibold tracking-tight sm:col-span-2">
        2. Identificación del bien contratado
      </h2>

      <Campo id="bien" etiqueta="Tipo" ancho="medio">
        <select id="bien" name="bien" className={`${claseCampo} border-concreto-400`}>
          {reclamaciones.bienes.map((b) => (
            <option key={b.valor} value={b.valor}>{b.nombre}</option>
          ))}
        </select>
      </Campo>

      <Campo id="monto" etiqueta="Monto reclamado en soles (opcional)" ancho="medio">
        <input id="monto" name="monto" inputMode="decimal" placeholder="Ej. 1500.00" className={`${claseCampo} border-concreto-400`} />
      </Campo>

      <Campo id="descripcion" etiqueta="Descripción del producto o servicio" error={errores.descripcion}>
        <input id="descripcion" name="descripcion" required className={`${claseCampo} ${errores.descripcion ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <h2 className="mt-4 text-lg font-semibold tracking-tight sm:col-span-2">
        3. Detalle de la reclamación
      </h2>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <span className="text-sm font-semibold text-concreto-900">Tipo</span>
        {reclamaciones.tipos.map((t, i) => (
          <label key={t.valor} className="flex min-h-12 items-start gap-3 text-base text-concreto-900">
            <input type="radio" name="tipo" value={t.valor} defaultChecked={i === 0} className="mt-1 h-5 w-5" />
            <span>
              <span className="font-medium">{t.nombre}</span>
              <span className="block text-sm text-concreto-700">{t.ayuda}</span>
            </span>
          </label>
        ))}
      </div>

      <Campo id="detalle" etiqueta="Detalle de lo ocurrido" error={errores.detalle}>
        <textarea id="detalle" name="detalle" rows={5} required className={`${claseCampo} resize-y ${errores.detalle ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <Campo id="pedido" etiqueta="Qué solución solicita" error={errores.pedido}>
        <textarea id="pedido" name="pedido" rows={3} required className={`${claseCampo} resize-y ${errores.pedido ? "border-senal-700" : "border-concreto-400"}`} />
      </Campo>

      <div aria-hidden className="hidden">
        <label htmlFor="botcheck-r">No complete este campo</label>
        <input id="botcheck-r" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      {estado === "error" ? (
        <p role="alert" className="flex items-start gap-3 border-t-2 border-senal-500 bg-senal-50 p-4 text-base text-concreto-900 sm:col-span-2">
          <WarningCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-senal-700" />
          {mensajeError}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Boton type="submit" tamano="grande" disabled={estado === "enviando"}>
          <PaperPlaneTilt size={20} weight="fill" />
          {estado === "enviando" ? "Registrando…" : "Registrar reclamación"}
        </Boton>
      </div>
    </form>
  );
}
