# ✅ Validación y envío de formularios — Guía de referencia
validación cliente · `submit` · `preventDefault()` · timeout · `AbortController` · resumen final

Carpeta centrada en dos ideas muy típicas de examen: validar formularios antes de enviarlos y controlar peticiones que pueden fallar o tardar demasiado.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `validacion.html` | Formulario completo con validación en cliente y resumen final | Cuando te pidan validar muchos tipos de campos |
| `peticionFallida.html` | Ejemplo de petición con timeout en cliente | Cuando quieras controlar errores y esperas largas |
| `servidorFalso.php` | Servidor de prueba para simular respuesta lenta | Cuando quieras probar timeout real con `fetch()` |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Validar campos antes de enviar
|   `-- submit + preventDefault() + comprobaciones
|
|-- Marcar visualmente los errores
|   `-- class error + mensajes debajo del campo
|
|-- Llevar el foco al primer error
|   `-- primerError.focus()
|
|-- Limpiar errores cuando el usuario corrige
|   `-- input / change -> limpiarError...
|
|-- Simular un envío correcto
|   `-- construir resumen final
|
`-- Controlar una petición lenta al servidor
    `-- fetch() + AbortController + setTimeout()
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Validar en el evento `submit`
📄 Ver: `validacion.html`

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();
  limpiarErrores();

  let valido = true;
  let primerError = null;

  if (nombre.value.trim() === "") {
    ponerError(nombre, "El nombre es obligatorio.");
    if (!primerError) primerError = nombre;
    valido = false;
  }
});
```

✅ Úsalo para: impedir el envío si hay errores y revisar el formulario completo de una vez.

### 2️⃣ Mostrar errores por campo o por bloque
📄 Ver: `validacion.html`

```js
function ponerError(elemento, mensaje) {
  elemento.classList.add("error");
  const p = document.createElement("p");
  p.className = "msg-error";
  p.textContent = mensaje;
  elemento.insertAdjacentElement("afterend", p);
}
```

```js
function ponerErrorBloque(bloque, mensaje) {
  bloque.classList.add("error");
  const p = document.createElement("p");
  p.className = "msg-error";
  p.textContent = mensaje;
  bloque.appendChild(p);
}
```

✅ Úsalo para: `input`, `textarea`, `select`, radios y checkboxes.

### 3️⃣ Limpiar errores mientras el usuario corrige
📄 Ver: `validacion.html`

```js
nombre.addEventListener("input", function () {
  limpiarErrorDeCampo(nombre);
});

provincia.addEventListener("change", function () {
  limpiarErrorDeCampo(provincia);
});
```

✅ Úsalo para: hacer la validación más amable y dinámica.

### 4️⃣ Validar opciones múltiples
📄 Ver: `validacion.html`

Idea del ejemplo:

- radios: debe haber uno marcado
- checkboxes: al menos uno
- `select` simple: una opción obligatoria
- `select multiple`: al menos una opción seleccionada
- `range`: mínimo permitido

✅ Úsalo para: formularios completos donde no todo son inputs de texto.

### 5️⃣ Foco automático al primer error
📄 Ver: `validacion.html`

```js
if (!valido && primerError) {
  primerError.focus();
}
```

✅ Úsalo para: mejorar experiencia de usuario y dejar claro dónde está el problema.

### 6️⃣ Timeout con `AbortController`
📄 Ver: `peticionFallida.html`

```js
const controller = new AbortController();
const temporizador = setTimeout(() => {
  controller.abort();
}, 3000);

const respuesta = await fetch("servidorFalso.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "accion=peticion_lenta",
  signal: controller.signal
});
```

✅ Úsalo para: evitar que una petición quede esperando indefinidamente.

## 🔁 Flujo de validación de formulario

```text
1. El usuario rellena el formulario
2. Pulsa Enviar
3. JavaScript intercepta submit
4. Se limpian errores anteriores
5. Se valida cada campo o bloque
6. Si hay error, se marca y se enfoca el primero
7. Si todo es correcto, se construye un resumen final
```

## 🔁 Flujo de petición con timeout

```text
1. El usuario pulsa el botón
2. JS lanza fetch()
3. Se arranca un temporizador
4. Si el servidor responde a tiempo, se limpia el timeout
5. Si tarda demasiado, AbortController cancela la petición
6. Se muestra mensaje de timeout o de error
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| Usa `preventDefault()` en `submit` si vas a validar tú | Evita envío automático |
| Limpia errores antes de volver a validar | Evita mensajes duplicados |
| Guarda el primer error para hacer `focus()` | Ayuda mucho al usuario |
| Radios y checkboxes se validan como grupo | No como un input aislado |
| Con timeout en `fetch()`, usa `AbortController` | Es el patrón moderno y reutilizable |

## 🔁 Función reutilizable — validar campo obligatorio

```js
function validarObligatorio(campo, mensaje) {
  if (campo.value.trim() === "") {
    ponerError(campo, mensaje);
    return false;
  }
  return true;
}
```

## 🔁 Función reutilizable — fetch con timeout

```js
async function fetchConTimeout(url, opciones = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const temporizador = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const respuesta = await fetch(url, {
      ...opciones,
      signal: controller.signal,
    });
    clearTimeout(temporizador);
    return respuesta;
  } catch (error) {
    clearTimeout(temporizador);
    throw error;
  }
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabajan dos cosas: validar formularios antes del envío y controlar peticiones que pueden fallar o tardar demasiado.
Lo importante es dominar `submit`, `preventDefault()`, mensajes de error, `focus()` al primer error y `AbortController` para timeout.
`validacion.html` es la plantilla completa de formulario y `peticionFallida.html` es la plantilla de control de errores en cliente.
