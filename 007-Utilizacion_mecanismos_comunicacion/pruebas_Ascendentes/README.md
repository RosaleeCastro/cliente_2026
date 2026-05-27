# Pruebas ascendentes con Jest

Esta carpeta contiene ejemplos de **pruebas ascendentes** o **bottom-up**.

La idea principal es probar primero las funciones pequeñas y despues comprobar que esas funciones se integran bien con la interfaz HTML y el DOM.

## Estructura

```txt
pruebas_Ascendentes/
  calculadoraUP/
    calculadora.js
    script.js
    calculadora.html
    calculadora.test.js
    calculadora.bottomup.test.js
    package.json

  formularioUp/
    formularioRegistro.js
    script.js
    formulario.html
    formularioRegistro.test.js
    formularioRegistro.bottomup.test.js
    package.json
```

## Instalacion desde cero

Entra en la carpeta del proyecto que quieras probar.

Calculadora:

```bash
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\pruebas_Ascendentes\calculadoraUP
```

Formulario:

```bash
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\pruebas_Ascendentes\formularioUp
```

Si no existe `package.json`, inicializa npm:

```bash
npm.cmd init -y
```

Instala Jest:

```bash
npm.cmd install --save-dev jest
```

Instala el entorno DOM para pruebas con HTML:

```bash
npm.cmd install --save-dev jest-environment-jsdom
```

Importante: el paquete correcto es `jest-environment-jsdom`.

No es correcto:

```bash
jest-enviroment-jsdom
```

## Configuracion del package.json

Configuracion minima:

```json
{
  "scripts": {
    "test": "jest"
  },
  "type": "commonjs",
  "devDependencies": {
    "jest": "^30.4.2",
    "jest-environment-jsdom": "^30.4.1"
  }
}
```

## Comandos utiles

Ejecutar todos los tests de la carpeta actual:

```bash
npm.cmd test
```

Ejecutar un archivo concreto:

```bash
npm.cmd test -- calculadora.test.js
```

```bash
npm.cmd test -- calculadora.bottomup.test.js --runInBand
```

```bash
npm.cmd test -- formularioRegistro.test.js
```

```bash
npm.cmd test -- formularioRegistro.bottomup.test.js --runInBand
```

`--runInBand` hace que Jest ejecute los tests en un solo proceso. En Windows puede evitar errores de tipo `spawn EPERM`.

## Tipos de pruebas

### Pruebas unitarias

Prueban funciones puras o pequenas sin depender del DOM.

Ejemplo:

```js
test("sumar devuelve la suma correcta", () => {
  expect(Calculadora.sumar(2, 3)).toBe(5);
});
```

Se usan para funciones como:

```txt
sumar
restar
multiplicar
dividir
calcular
validarNombre
validarEmail
validarEdad
validarRegistro
```

### Pruebas ascendentes o bottom-up

Comprueban que las funciones pequenas se integran correctamente con el HTML y el script de interfaz.

Ejemplo:

```js
document.getElementById("numero1").value = "2";
document.getElementById("numero2").value = "3";
document.getElementById("operacion").value = "sumar";

enviarFormulario();

expect(document.getElementById("resultado").textContent).toBe("Resultado: 5");
```

## Cabecera para tests con DOM

Cuando un test necesita `document`, `window`, inputs, botones o eventos, anade esta cabecera:

```js
/**
 * @jest-environment jsdom
 */
```

Sin `jsdom`, Jest no tiene DOM y fallaran llamadas como:

```js
document.getElementById("id")
```

## Funciones reutilizables para tests DOM

### cargarDOM

Carga el HTML real dentro del DOM de Jest.

```js
function cargarDOM() {
  const rutaHtml = path.join(__dirname, "formulario.html");
  const html = fs.readFileSync(rutaHtml, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  document.body.innerHTML = bodyMatch ? bodyMatch[1] : html;
}
```

Uso:

```js
beforeEach(() => {
  cargarDOM();
});
```

### cargarAplicacion

Prepara cada test desde cero: limpia modulos, carga HTML, expone la logica global y carga el script de interfaz.

```js
function cargarAplicacion() {
  jest.resetModules();
  cargarDOM();
  globalThis.FormularioRegistro = require("./formularioRegistro");
  require("./script");
}
```

En calculadora:

```js
function cargarAplicacion() {
  jest.resetModules();
  cargarDOM();
  globalThis.Calculadora = require("./calculadora");
  require("./script");
}
```

### enviarFormulario

Simula el envio real de un formulario.

```js
function enviarFormulario() {
  const formulario = document.getElementById("formRegistro");
  formulario.dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true }),
  );
}
```

Para la calculadora cambia el id:

```js
const formulario = document.getElementById("formCalculadora");
```

### rellenarFormulario

Rellena inputs rapidamente con datos de prueba.

```js
function rellenarFormulario(datos = {}) {
  document.getElementById("nombre").value = datos.nombre ?? "";
  document.getElementById("email").value = datos.email ?? "";
  document.getElementById("edad").value = datos.edad ?? "";
  document.getElementById("password").value = datos.password ?? "";
  document.getElementById("repetirPassword").value =
    datos.repetirPassword ?? "";
  document.getElementById("terminos").checked = datos.terminos ?? false;
}
```

### datosValidos

Centraliza un formulario correcto para no repetir datos en todos los tests.

```js
function datosValidos() {
  return {
    nombre: "Ana Lopez",
    email: "ana@example.com",
    edad: "25",
    password: "123456",
    repetirPassword: "123456",
    terminos: true,
  };
}
```

Uso:

```js
rellenarFormulario(datosValidos());
enviarFormulario();
```

### rellenarFormularioInvalido

Prepara varios errores simultaneos.

```js
function rellenarFormularioInvalido() {
  rellenarFormulario({
    nombre: "",
    email: "correo-invalido",
    edad: "17",
    password: "123",
    repetirPassword: "",
    terminos: false,
  });
}
```

### textoDe

Lee el texto de un elemento.

```js
function textoDe(id) {
  return document.getElementById(id).textContent;
}
```

Uso:

```js
expect(textoDe("mensajeGeneral")).toBe("Formulario enviado correctamente.");
```

### tieneClase

Comprueba clases CSS.

```js
function tieneClase(id, clase) {
  return document.getElementById(id).classList.contains(clase);
}
```

Uso:

```js
expect(tieneClase("nombre", "input-error")).toBe(true);
```

### resumenVisible

Comprueba si el resumen tiene la clase `visible`.

```js
function resumenVisible() {
  return document.getElementById("resumen").classList.contains("visible");
}
```

### clickLimpiar

Simula el click del boton limpiar.

```js
function clickLimpiar() {
  document.getElementById("btnLimpiar").click();
}
```

## Plantilla de test bottom-up

```js
/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

function cargarDOM() {
  const rutaHtml = path.join(__dirname, "archivo.html");
  const html = fs.readFileSync(rutaHtml, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  document.body.innerHTML = bodyMatch ? bodyMatch[1] : html;
}

function cargarAplicacion() {
  jest.resetModules();
  cargarDOM();
  globalThis.Modulo = require("./modulo");
  require("./script");
}

describe("Integracion bottom-up", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  test("caso integrado", () => {
    // Preparar DOM
    // Ejecutar evento
    // Comprobar resultado
  });
});
```

## Proceso recomendado

1. Probar funciones puras en un archivo `.test.js`.
2. Crear helpers reutilizables para cargar DOM y simular eventos.
3. Probar estado inicial de la interfaz.
4. Probar un caso valido completo.
5. Probar errores de validacion.
6. Probar botones secundarios como limpiar o vaciar historial.
7. Ejecutar los tests con `--runInBand` si Jest da errores de procesos en Windows.

## Errores frecuentes

### Missing script

Error:

```txt
npm error Missing script: "test:integracion"
```

Significa que ese script no existe en `package.json`.

Solucion rapida:

```bash
npm.cmd test -- formularioRegistro.bottomup.test.js --runInBand
```

o:

```bash
npm.cmd test -- calculadora.bottomup.test.js --runInBand
```

### Paquete jsdom mal escrito

Incorrecto:

```bash
npm.cmd install --save-dev jest-enviroment-jsdom
```

Correcto:

```bash
npm.cmd install --save-dev jest-environment-jsdom
```

### document is not defined

Falta esta cabecera en el test:

```js
/**
 * @jest-environment jsdom
 */
```

### spawn EPERM en Windows

Ejecuta Jest en modo serial:

```bash
npm.cmd test -- archivo.test.js --runInBand
```
