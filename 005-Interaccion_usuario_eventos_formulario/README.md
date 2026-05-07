# 🧩 Interacción de usuario, eventos y formularios — Guía práctica

> Eventos · DOM · Formularios · Validación · Envío · Expresiones regulares

---

## 📁 Qué vas a encontrar en esta carpeta

Esta carpeta reúne ejemplos base para trabajar la interacción del usuario en JavaScript:

- Escuchar eventos del ratón, teclado, formulario y navegador
- Leer y modificar valores del DOM
- Validar formularios con mensajes visuales
- Preparar envíos al servidor
- Aplicar expresiones regulares en casos reales

---

## 🗂️ Mapa rápido de carpetas

| Carpeta | Qué contiene | Cuándo entrar aquí |
| --- | --- | --- |
| `001-Gestion_de_eventos` | Eventos base de JavaScript | Cuando necesites saber qué evento usar |
| `002-Utilizacion_de_formularios_desde_codigo` | Lectura y manipulación de formularios | Cuando quieras capturar o rellenar datos |
| `003-Modificación_aparicencia_comportamiento` | Cambios visuales y de estado | Cuando necesites feedback visual al usuario |
| `004-Validacion_Envio` | Validación manual y envío | Cuando estés montando formularios reales |
| `005-ExpresionesRegulares` | Validaciones con patrones | Cuando necesites validar email, teléfono, web, etc. |
| `formulario_video` | Ejemplo práctico completo | Cuando quieras ver una solución más guiada |

---

## 🚀 Ruta práctica para estudiar o repasar

Si quieres ir a lo importante sin perderte, este orden funciona muy bien:

1. Entra en `001-Gestion_de_eventos`
   Aprende `addEventListener`, `event`, `input`, `change`, `submit`, `click` y teclado.

2. Entra en `002-Utilizacion_de_formularios_desde_codigo`
   Repasa cómo leer campos, recorrer inputs y capturar datos del formulario.

3. Entra en `003-Modificación_aparicencia_comportamiento`
   Mira cómo marcar errores, cambiar clases y dar feedback visual.

4. Entra en `004-Validacion_Envio`
   Aquí está la parte más práctica: validación real, mensajes y simulación de envío.

5. Entra en `005-ExpresionesRegulares`
   Úsalo cuando ya controles el flujo del formulario y quieras afinar validaciones.

---

## 🔍 Dónde buscar cada cosa básica

| Si buscas esto | Revisa primero |
| --- | --- |
| Cómo asociar eventos | `001-Gestion_de_eventos/tiposDeAsociacionEventos1.html` |
| Cómo funciona `event` | `001-Gestion_de_eventos/event.html` |
| Eventos de teclado | `001-Gestion_de_eventos/eventoTeclado.html` |
| Eventos de formulario | `001-Gestion_de_eventos/eventoFormulario.html` |
| Leer valores de formularios | `002-Utilizacion_de_formularios_desde_codigo/formulario.html` |
| Cambiar clases o apariencia | `003-Modificación_aparicencia_comportamiento/comportamiento.html` |
| Obtener y usar valores | `003-Modificación_aparicencia_comportamiento/valores.html` |
| Validación completa manual | `004-Validacion_Envio/validacion.html` |
| Peticiones con timeout | `004-Validacion_Envio/peticionFallida.html` |
| Regex para email, teléfono o web | `005-ExpresionesRegulares/introduccionRegExp.html` |
| Ejemplo guiado más completo | `formulario_video/solucion001.html` |

---

## 🔁 Funciones y patrones reutilizables

Estas son las ideas más reutilizables de toda la carpeta.

### 1. Capturar elementos del DOM

```js
const form = document.getElementById("miFormulario");
const resultado = document.getElementById("resultado");
```

Se usa siempre al principio para guardar referencias a los elementos que vas a manipular.

---

### 2. Escuchar eventos con `addEventListener`

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
```

Es la base de casi todos los ejemplos. Te permite reaccionar a acciones del usuario sin mezclar JavaScript con HTML.

---

### 3. Limpiar errores antes de validar

```js
function limpiarErrores() {
  document.querySelectorAll(".error").forEach(function (el) {
    el.classList.remove("error");
  });

  document.querySelectorAll(".msg-error").forEach(function (el) {
    el.remove();
  });
}
```

Patrón muy útil para evitar mensajes duplicados cuando se vuelve a validar un formulario.

---

### 4. Mostrar error en un campo

```js
function ponerError(elemento, mensaje) {
  elemento.classList.add("error");

  const p = document.createElement("p");
  p.className = "msg-error";
  p.textContent = mensaje;

  elemento.insertAdjacentElement("afterend", p);
}
```

Muy reutilizable para inputs, `textarea`, `select` y otros controles.

---

### 5. Limpiar error cuando el usuario corrige

```js
function limpiarErrorDeCampo(elemento) {
  elemento.classList.remove("error");

  const siguiente = elemento.nextElementSibling;
  if (siguiente && siguiente.classList.contains("msg-error")) {
    siguiente.remove();
  }
}
```

Patrón muy común para usar con eventos `input` o `change`.

---

### 6. Detectar el primer error y hacer foco

```js
let primerError = null;

if (!primerError) {
  primerError = nombre;
}

if (primerError) {
  primerError.focus();
}
```

Mejora mucho la experiencia del usuario porque lo lleva directamente al campo que debe corregir.

---

### 7. Validar radios y checkbox recorriendo opciones

```js
const radios = Array.from(document.getElementsByName("genero"));
const checks = Array.from(document.getElementsByName("intereses"));
```

Este patrón aparece cuando no basta con leer un solo `input` y necesitas revisar grupos.

---

### 8. Leer opciones seleccionadas de un `select multiple`

```js
const seleccionadas = Array.from(select.selectedOptions);
```

Muy útil para formularios con varias elecciones.

---

### 9. Cancelar una petición con `AbortController`

```js
const controller = new AbortController();

fetch("servidor.php", {
  signal: controller.signal,
});

controller.abort();
```

Se usa para cortar peticiones lentas o que ya no hacen falta.

---

### 10. Validar con expresiones regulares

```js
const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!patronEmail.test(email.value.trim())) {
  ponerError(email, "El email no es válido.");
}
```

Patrón básico para comprobar formato antes de enviar.

---

## 🧠 Secciones importantes que conviene localizar rápido

Cuando abras un archivo de esta carpeta, busca primero estas zonas:

- `const ... = document.getElementById(...)`
  Aquí ves qué elementos controla el script.

- `addEventListener(...)`
  Aquí descubres qué acción del usuario activa la lógica.

- `function limpiarErrores()` o funciones similares
  Aquí suele estar la parte reutilizable más importante.

- `function ponerError(...)`
  Aquí se define cómo se muestra el feedback visual.

- `form.addEventListener("submit", ...)`
  Aquí suele estar el flujo principal del formulario.

- `fetch(...)`
  Aquí está la lógica de envío al servidor.

- `const patron... = /.../`
  Aquí se guardan las expresiones regulares.

---

## 🛠️ Guía práctica de búsqueda rápida

Si abres un archivo y quieres encontrar lo importante en segundos, busca estas palabras:

| Busca esto | Para encontrar |
| --- | --- |
| `addEventListener` | Eventos principales del ejemplo |
| `preventDefault` | Envíos interceptados o validación previa |
| `classList.add` | Cambios visuales y marcado de error |
| `querySelectorAll` | Recorridos y limpieza masiva |
| `getElementsByName` | Radios y checkbox |
| `selectedOptions` | Select múltiple |
| `fetch` | Envío al servidor |
| `AbortController` | Cancelación de petición |
| `test(` | Uso de expresiones regulares |
| `focus()` | Salto al primer error o foco inicial |

---

## ✅ Qué conviene dominar de esta carpeta

Si controlas bien estos puntos, ya tienes una base muy útil para proyectos reales:

- Asociar eventos con `addEventListener`
- Leer y modificar valores del DOM
- Validar campos obligatorios
- Validar grupos de radios y checkbox
- Mostrar y limpiar errores visuales
- Evitar el envío con `preventDefault()`
- Preparar peticiones con `fetch()`
- Aplicar regex sencillas en formularios

---

## 📌 Recomendación práctica

Si vas a reutilizar código de esta carpeta, tus mejores plantillas base son:

- `004-Validacion_Envio/validacion.html`
  Para formularios completos con errores visuales.

- `004-Validacion_Envio/peticionFallida.html`
  Para peticiones con control de tiempo de espera.

- `005-ExpresionesRegulares/introduccionRegExp.html`
  Para validaciones de formato con patrones.

---

## ⏭️ Siguiente uso recomendado

Cuando vuelvas a esta carpeta, puedes seguir esta regla rápida:

- Si el problema es del usuario al interactuar, empieza por `001`
- Si el problema es leer o recorrer campos, empieza por `002`
- Si el problema es visual, empieza por `003`
- Si el problema es validar o enviar, empieza por `004`
- Si el problema es de formato, empieza por `005`
