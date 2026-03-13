# 🎯 Eventos JavaScript — Guía de referencia

> Tipos de asociación · Ratón · Teclado · Formulario · Navegador · Portapapeles · Objeto event · removeEventListener

---

## 📁 Archivos de esta carpeta

| Archivo                          | Qué contiene                                                           | Cuándo consultarlo                                                                |
| -------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `tiposDeAsociacionEventos1.html` | Las 3 formas de asociar eventos                                        | Antes de empezar cualquier proyecto con eventos                                   |
| `event.html`                     | El objeto `event` y `preventDefault()`                                 | Cuando necesites info del evento o cancelar comportamiento por defecto            |
| `eventosRaton.html`              | click, dblclick, mouseenter, mouseleave, mousemove, mousedown, mouseup | Cualquier interacción con el ratón                                                |
| `eventoTeclado.html`             | keydown, keyup, detección de tecla concreta                            | Inputs, atajos de teclado, Enter para enviar                                      |
| `eventoFormulario.html`          | submit, input, change, focus, blur                                     | Validación y feedback en formularios                                              |
| `eventosNavegador.html`          | load, resize, beforeunload                                             | Acciones al cargar la página, redimensionar, evitar salir con cambios sin guardar |
| `eventosPortapapeles.html`       | copy, cut, paste                                                       | Controlar copiar/cortar/pegar en textareas o inputs                               |
| `removeAdeventLisener2.html`     | addEventListener y removeEventListener dinámicos                       | Activar/desactivar eventos en tiempo de ejecución                                 |

---

## 🔰 1. Las 3 formas de asociar eventos

> 📄 Ver: `tiposDeAsociacionEventos1.html`

```js
// ❌ FORMA 1 — Atributo HTML (no recomendada)
// <button onclick="miFuncion()">Click</button>

// ⚠️  FORMA 2 — Propiedad JS (solo admite un handler)
elemento.onclick = function () { ... };

// ✅ FORMA 3 — addEventListener (recomendada siempre)
elemento.addEventListener("click", function () { ... });
```

**¿Por qué usar `addEventListener`?**

- Permite añadir **múltiples handlers** al mismo evento
- Permite **eliminarlos** con `removeEventListener`
- Separa el HTML del JavaScript

---

## 🖱️ 2. Eventos de ratón

> 📄 Ver: `eventosRaton.html`

```js
const el = document.getElementById("miElemento");

el.addEventListener("click", () => {
  /* click izquierdo */
});
el.addEventListener("dblclick", () => {
  /* doble click */
});
el.addEventListener("contextmenu", (e) => {
  e.preventDefault(); /* click derecho */
});
el.addEventListener("mouseenter", () => {
  /* ratón entra — no burbujea */
});
el.addEventListener("mouseleave", () => {
  /* ratón sale  — no burbujea */
});
el.addEventListener("mousemove", (e) => {
  console.log(e.offsetX, e.offsetY);
});
el.addEventListener("mousedown", () => {
  /* botón presionado */
});
el.addEventListener("mouseup", () => {
  /* botón soltado */
});
```

### 🔁 Función reutilizable — Toggle de estado con ratón

```js
function toggleEventosRaton(elemento, handler) {
  if (elemento._eventosActivos) {
    elemento.removeEventListener("click", handler);
    elemento.removeEventListener("mousemove", handler);
    elemento._eventosActivos = false;
  } else {
    elemento.addEventListener("click", handler);
    elemento.addEventListener("mousemove", handler);
    elemento._eventosActivos = true;
  }
}
```

### 🔁 Función reutilizable — Arrastrar elemento (drag con mousedown/mouseup)

```js
function hacerArrastrable(elemento) {
  let arrastrando = false;
  let offsetX, offsetY;

  elemento.addEventListener("mousedown", (e) => {
    arrastrando = true;
    offsetX = e.clientX - elemento.getBoundingClientRect().left;
    offsetY = e.clientY - elemento.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!arrastrando) return;
    elemento.style.position = "absolute";
    elemento.style.left = e.clientX - offsetX + "px";
    elemento.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    arrastrando = false;
  });
}

// Uso:
// hacerArrastrable(document.getElementById("miCaja"));
```

---

## ⌨️ 3. Eventos de teclado

> 📄 Ver: `eventoTeclado.html`

```js
input.addEventListener("keydown", (e) => {
  /* tecla pulsada  — e.key */
});
input.addEventListener("keyup", (e) => {
  /* tecla soltada  — e.key */
});
```

**Propiedades útiles del evento:**

| Propiedad    | Qué devuelve              | Ejemplo                       |
| ------------ | ------------------------- | ----------------------------- |
| `e.key`      | Nombre de la tecla        | `"Enter"`, `"a"`, `"ArrowUp"` |
| `e.code`     | Código físico de la tecla | `"KeyA"`, `"Space"`           |
| `e.ctrlKey`  | Si Ctrl está pulsado      | `true / false`                |
| `e.shiftKey` | Si Shift está pulsado     | `true / false`                |
| `e.altKey`   | Si Alt está pulsado       | `true / false`                |

### 🔁 Función reutilizable — Detectar combinación de teclas

```js
function alPulsarTecla(elemento, tecla, callback, modificadores = {}) {
  elemento.addEventListener("keydown", (e) => {
    const ctrl = modificadores.ctrl ? e.ctrlKey : true;
    const shift = modificadores.shift ? e.shiftKey : true;
    if (e.key === tecla && ctrl && shift) callback(e);
  });
}

// Uso — Enter para confirmar:
// alPulsarTecla(input, "Enter", () => enviarFormulario());

// Uso — Ctrl+S para guardar:
// alPulsarTecla(document, "s", guardar, { ctrl: true });
```

---

## 📝 4. Eventos de formulario

> 📄 Ver: `eventoFormulario.html`

```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); /* leer valores */
});
input.addEventListener("input", () => {
  /* se dispara en cada tecla */
});
select.addEventListener("change", () => {
  /* se dispara al confirmar cambio */
});
input.addEventListener("focus", () => {
  /* el campo recibe el foco */
});
input.addEventListener("blur", () => {
  /* el campo pierde el foco */
});
```

**`input` vs `change`:**

- `input` → reacciona en **tiempo real** (cada tecla)
- `change` → reacciona al **confirmar** el cambio (al salir del campo o seleccionar opción)

### 🔁 Función reutilizable — Validación visual con focus/blur

```js
function validarCampo(input, validar, mensajeError) {
  const error = document.createElement("span");
  error.style.color = "red";
  error.style.fontSize = "12px";
  input.after(error);

  input.addEventListener("blur", () => {
    if (!validar(input.value)) {
      error.textContent = mensajeError;
      input.style.borderColor = "red";
    } else {
      error.textContent = "";
      input.style.borderColor = "green";
    }
  });

  input.addEventListener("input", () => {
    error.textContent = "";
    input.style.borderColor = "";
  });
}

// Uso:
// validarCampo(emailInput, (v) => v.includes("@"), "Email no válido");
// validarCampo(nameInput,  (v) => v.length >= 2,   "Mínimo 2 caracteres");
```

### 🔁 Función reutilizable — Leer todos los valores de un formulario

```js
function leerFormulario(formulario) {
  const datos = {};
  const inputs = formulario.querySelectorAll("input, select, textarea");
  inputs.forEach((el) => {
    if (el.name) datos[el.name] = el.value;
  });
  return datos;
}

// Uso:
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const datos = leerFormulario(form);
//     console.log(datos); // { nombre: "Ana", email: "ana@..." }
// });
```

---

## 🌐 5. Eventos del navegador

> 📄 Ver: `eventosNavegador.html`

```js
window.addEventListener("load", () => {
  /* todo cargado (DOM + imágenes) */
});
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""; // muestra diálogo "¿seguro que quieres salir?"
});
```

### 🔁 Función reutilizable — Aviso al salir con cambios sin guardar

```js
function activarAvisoSalida() {
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "";
  });
}

// Uso — llamar cuando el usuario hace su primer cambio:
// input.addEventListener("input", activarAvisoSalida, { once: true });
```

---

## 📋 6. Eventos de portapapeles

> 📄 Ver: `eventosPortapapeles.html`

```js
elemento.addEventListener("copy", (e) => {
  /* texto copiado */
});
elemento.addEventListener("cut", (e) => {
  /* texto cortado */
});
elemento.addEventListener("paste", (e) => {
  const texto = e.clipboardData.getData("text");
  console.log("Pegado:", texto);
});
```

### 🔁 Función reutilizable — Interceptar y transformar texto pegado

```js
function transformarPegado(elemento, transformar) {
  elemento.addEventListener("paste", (e) => {
    e.preventDefault();
    const texto = e.clipboardData.getData("text");
    const transformado = transformar(texto);
    document.execCommand("insertText", false, transformado);
  });
}

// Uso — pegar siempre en mayúsculas:
// transformarPegado(input, (t) => t.toUpperCase());

// Uso — eliminar espacios extra al pegar:
// transformarPegado(input, (t) => t.trim());
```

---

## 🧩 7. El objeto `event`

> 📄 Ver: `event.html`

```js
elemento.addEventListener("click", (event) => {
  event.type; // "click", "keydown", "submit"...
  event.target; // elemento que lanzó el evento
  event.currentTarget; // elemento al que está asociado el listener
  event.clientX; // posición X del ratón en la ventana
  event.clientY; // posición Y del ratón en la ventana
  event.key; // tecla pulsada (eventos de teclado)
  event.preventDefault(); // cancela el comportamiento por defecto
  event.stopPropagation(); // detiene el burbujeo hacia elementos padre
});
```

**Casos comunes de `preventDefault()`:**

- Formulario → evita recargar la página al hacer submit
- Enlace → evita navegar a la URL del `href`
- Click derecho → evita mostrar el menú contextual del navegador

---

## 🔄 8. `removeEventListener`

> 📄 Ver: `removeAdeventLisener2.html`

```js
// ⚠️ Para eliminar un evento la función DEBE tener nombre (no puede ser anónima)

function manejarClick() {
  console.log("click");
}

elemento.addEventListener("click", manejarClick); // añadir
elemento.removeEventListener("click", manejarClick); // eliminar
```

> ❌ Esto **NO funciona** — son dos funciones distintas aunque parezcan iguales:
>
> ```js
> el.addEventListener("click", () => console.log("hola"));
> el.removeEventListener("click", () => console.log("hola")); // no hace nada
> ```

### 🔁 Función reutilizable — Evento que se ejecuta solo N veces

```js
function eventoNVeces(elemento, tipo, callback, n) {
  let contador = 0;
  function handler(e) {
    contador++;
    callback(e);
    if (contador >= n) elemento.removeEventListener(tipo, handler);
  }
  elemento.addEventListener(tipo, handler);
}

// Uso — click activo solo las primeras 3 veces:
// eventoNVeces(boton, "click", () => console.log("click"), 3);

// Nota: si solo necesitas 1 vez, usa la opción nativa:
// elemento.addEventListener("click", callback, { once: true });
```

---

## 🚀 Funciones reutilizables — Resumen rápido

| Función                              | Archivo origen               | Para qué sirve                                   |
| ------------------------------------ | ---------------------------- | ------------------------------------------------ |
| `toggleEventosRaton(el, handler)`    | `eventosRaton.html`          | Activar/desactivar eventos de ratón              |
| `hacerArrastrable(el)`               | `eventosRaton.html`          | Drag & drop básico con mousedown/mouseup         |
| `alPulsarTecla(el, tecla, cb, mods)` | `eventoTeclado.html`         | Detectar tecla o combinación (Ctrl+S, Enter...)  |
| `validarCampo(input, fn, msg)`       | `eventoFormulario.html`      | Validación visual con focus/blur                 |
| `leerFormulario(form)`               | `eventoFormulario.html`      | Obtener todos los valores de un form como objeto |
| `activarAvisoSalida()`               | `eventosNavegador.html`      | Advertir al usuario antes de cerrar con cambios  |
| `transformarPegado(el, fn)`          | `eventosPortapapeles.html`   | Interceptar y modificar texto al pegar           |
| `eventoNVeces(el, tipo, cb, n)`      | `removeAdeventLisener2.html` | Evento que se autoelimina tras N usos            |
