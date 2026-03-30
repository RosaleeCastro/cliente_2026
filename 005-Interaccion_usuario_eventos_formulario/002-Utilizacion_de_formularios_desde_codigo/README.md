# 📝 Formularios desde código — Guía de referencia
`document.forms` · `elements` · `name` · `id` · `querySelector()` · `input/change`

Carpeta centrada en manejar formularios desde JavaScript sin enviar nada al servidor: acceder a campos, reaccionar a eventos, mostrar u ocultar partes del formulario y automatizar datos.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `formulario.html` | Ejemplo base de acceso a formularios desde código | Cuando necesites recordar todas las formas de acceder a inputs |
| `banda.html` | Ejercicio completo con 4 formularios, desbloqueo progresivo y campos dependientes | Cuando quieras un ejemplo real y reutilizable |
| `banda.txt` | Enunciado o apoyo del ejercicio | Cuando quieras repasar qué se pedía exactamente |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Acceder a un formulario o a sus campos
|   |-- document.forms[0]
|   |-- document.nombreFormulario
|   |-- getElementById()
|   `-- querySelector()
|
|-- Reaccionar mientras el usuario escribe
|   `-- evento input
|
|-- Reaccionar cuando cambia un select
|   `-- evento change
|
|-- Mostrar u ocultar campos según una opción
|   `-- style.display + disabled
|
`-- Comprobar si un formulario está completo
    `-- función reutilizable de validación simple
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Acceder a formularios de varias formas
📄 Ver: `formulario.html` · `banda.html`

```js
const formulario = document.forms[0];
const nombreInput = document.registro.nombre;
const usuarioInput = document.getElementById("usuario");
const emailInput = document.querySelector("#email");
```

✅ Úsalo para: ejercicios donde te pidan demostrar distintas formas de acceso al DOM de formularios.

### 2️⃣ Autocompletar un campo a partir de otro
📄 Ver: `formulario.html`

```js
nombreInput.addEventListener("input", function () {
  usuarioInput.value = this.value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
});
```

✅ Úsalo para: alias, usuario, slug, nombre corto, códigos automáticos.

### 3️⃣ Mostrar u ocultar campos según un `select`
📄 Ver: `formulario.html` · `banda.html`

```js
tipoCuenta.addEventListener("change", function () {
  if (this.value === "empresa") {
    campoEmpresa.style.display = "block";
  } else {
    campoEmpresa.style.display = "none";
  }
});
```

✅ Úsalo para: formularios dinámicos, opciones condicionales y campos dependientes.

### 4️⃣ Desbloquear formularios por pasos
📄 Ver: `banda.html`

Idea del ejercicio:

- el usuario rellena un formulario
- si está completo, se activa el siguiente
- se controla si debe aparecer el campo instrumento
- se genera automáticamente el nombre de la banda
- se muestra la estructura de todos los formularios

✅ Úsalo para: asistentes paso a paso, procesos guiados y validación progresiva.

### 5️⃣ Comprobar si un formulario está completo
📄 Ver: `banda.html`

```js
function formularioCompleto(nombre, apellido, edad, posicion, instrumento) {
  if (
    nombre.value.trim() === "" ||
    apellido.value.trim() === "" ||
    edad.value.trim() === "" ||
    posicion.value === ""
  ) {
    return false;
  }

  if (posicion.value === "musico" && instrumento.value === "") {
    return false;
  }

  return true;
}
```

✅ Úsalo para: validación previa sin expresiones regulares ni envío al servidor.

## 🔁 Flujo típico de trabajo con formularios

```text
1. Se carga la página
2. JavaScript captura formularios y campos
3. Se añaden listeners input/change/click
4. El usuario escribe o selecciona opciones
5. JS actualiza otros campos o muestra/oculta bloques
6. JS comprueba si el formulario está completo
7. La interfaz se actualiza sin recargar la página
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| `input` se usa mientras el usuario escribe | Reacciona en tiempo real |
| `change` va muy bien para `select` y cambios cerrados | Se dispara al cambiar el valor |
| `formulario.elements` da acceso rápido a todos los controles | Muy útil para recorrer formularios |
| Si ocultas un campo dependiente, conviene limpiar su valor | Evita datos incoherentes |
| `disabled` evita que un campo pueda usarse | Muy útil en formularios por pasos |

## 🔁 Función reutilizable — activar un formulario

```js
function activarFormulario(formulario) {
  for (let i = 0; i < formulario.elements.length; i++) {
    formulario.elements[i].disabled = false;
  }
}
```

## 🔁 Función reutilizable — mostrar u ocultar un bloque

```js
function mostrarSegunValor(valor, esperado, elemento) {
  elemento.style.display = valor === esperado ? "block" : "none";
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabaja cómo manejar formularios desde JavaScript: acceder a campos, escuchar eventos y modificar la interfaz sin recargar la página.
Lo más importante es saber usar `document.forms`, `elements`, `name`, `id` y `querySelector()`, además de `input` y `change`.
`banda.html` es el ejemplo más completo porque combina acceso al formulario, validación progresiva y campos dinámicos.
