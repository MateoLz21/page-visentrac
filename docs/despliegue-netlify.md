# Despliegue en Netlify (previsualización para el cliente)

Netlify es el destino **provisional**, para que el cliente revise el sitio antes
de publicarlo. El destino definitivo previsto sigue siendo el hosting cPanel
descrito en [plan-desarrollo.md](plan-desarrollo.md), fase 8.

Ambos pueden convivir: `netlify.toml` y `public/.htaccess` no se estorban, cada
plataforma lee el suyo e ignora el otro.

---

## 1. Conectar el repositorio

En Netlify: **Add new site → Import an existing project → GitHub →
`MateoLz21/page-visentrac`**.

No hay que rellenar el comando de build ni la carpeta de publicación: los lee de
`netlify.toml`. Si Netlify propone otros valores, se dejan como están en el
archivo:

| Ajuste | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |
| Node version | 24 |

## 2. Variables de entorno

**Este paso es obligatorio.** Sin él el formulario aparece desactivado, porque la
clave vive en `.env.local`, que git no versiona.

En **Site configuration → Environment variables**, añadir:

| Variable | Valor para la previsualización |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | La misma clave que hay en `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | La URL que asigne Netlify, sin barra final |
| `NEXT_PUBLIC_INDEXABLE` | `false` |

## 3. Autorizar el dominio en Web3Forms

Si en el panel de Web3Forms se restringieron los dominios permitidos, hay que
**añadir el dominio de Netlify**. Si no, el formulario se enviará y el servicio
lo rechazará sin que el visitante entienda por qué.

## 4. Comprobar tras el primer despliegue

- [ ] Las cuatro páginas cargan y la navegación funciona
- [ ] El slider de portada rota y las fotos se ven
- [ ] El formulario **envía de verdad** y llega el correo
- [ ] El brochure se descarga
- [ ] `https://<sitio>.netlify.app/robots.txt` dice `Disallow: /`
- [ ] En móvil real, no solo en el simulador del navegador

---

## Sobre la indexación

Por defecto **esta publicación no se indexa**: `robots.txt` bloquea todo y las
páginas llevan `noindex`. Es deliberado. Una previsualización indexada compite
en Google contra el sitio definitivo por las mismas búsquedas y con el mismo
contenido, y el buscador puede quedarse con la equivocada.

El build avisa por consola cada vez que compila en este modo.

**El día que se publique en el dominio real**, en esa publicación hay que poner:

```
NEXT_PUBLIC_INDEXABLE=true
NEXT_PUBLIC_SITE_URL=https://<dominio real>
```

Si se olvida, el sitio queda invisible en Google y nadie se entera hasta semanas
después.

---

## Qué falta antes de considerar esto publicable

No son bloqueos para la previsualización, pero sí para el sitio definitivo:

1. **El formulario entrega a `asistentevisentrac@gmail.com`**, no al correo
   corporativo. Al cambiarlo hay que **volver a probar contra Microsoft 365**:
   Outlook filtra mucho más que Gmail y que llegue a uno no garantiza el otro.
2. **El mapa de Google Maps** está pendiente de confirmar la dirección.
3. **Buena parte de las fotografías son generadas por IA**, anotadas como tales
   en `src/content/imagenes.ts` y `galeria.ts`. Conviene que el cliente lo sepa
   antes de aprobarlas, porque el sitio las presenta como operaciones propias.
4. **Fase 7 sin hacer**: Lighthouse móvil y pruebas en 360, 768, 1280 y 1920 px.
