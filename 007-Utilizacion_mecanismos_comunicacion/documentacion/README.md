# Documentacion con JSDoc

Esta carpeta contiene un ejemplo de documentacion automatica para JavaScript usando **JSDoc**.

## Pasos desde cero

1. Entrar en la carpeta del proyecto:

```bash
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\documentacion
```

2. Inicializar el proyecto si no existe `package.json`:

```bash
npm.cmd init -y
```

3. Instalar JSDoc como dependencia de desarrollo:

```bash
npm.cmd install --save-dev jsdoc
```

4. Crear o revisar el archivo `jsdoc.json`:

```json
{
  "opts": {
    "destination": "./docs/api",
    "recurse": true,
    "encoding": "utf8"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": true
  }
}
```

5. Anadir el script en `package.json`:

```json
"scripts": {
  "generar-docs": "jsdoc js/precios.js js/app.js -c jsdoc.json"
}
```

6. Generar la documentacion:

```bash
npm.cmd run generar-docs
```

7. Abrir la documentacion generada:

```txt
docs/api/index.html
```

## Estructura recomendada

```txt
documentacion/
  calculadoraPrecios.html
  jsdoc.json
  package.json
  js/
    app.js
    precios.js
  docs/
    api/
      index.html
```

## Chuleta de comentarios JSDoc

### Documentar un archivo

```js
/**
 * Funciones de calculo de precios.
 *
 * @file precios.js
 * @author Nombre Apellidos
 */
```

### Documentar una funcion

```js
/**
 * Calcula el subtotal de una compra.
 *
 * @param {number} precioUnitario Precio de una unidad.
 * @param {number} cantidad Numero de unidades.
 * @returns {number} Subtotal calculado.
 */
function calcularSubtotal(precioUnitario, cantidad) {
  return precioUnitario * cantidad;
}
```

### Anadir ejemplos

```js
/**
 * Calcula el IVA de un importe.
 *
 * @param {number} importeBase Cantidad sobre la que se aplica el IVA.
 * @param {number} porcentajeIVA Porcentaje de IVA.
 * @returns {number} Importe del IVA.
 *
 * @example
 * calcularIVA(100, 21);
 * // Devuelve 21
 */
function calcularIVA(importeBase, porcentajeIVA) {
  return importeBase * porcentajeIVA / 100;
}
```

### Funcion que no devuelve nada

```js
/**
 * Muestra un mensaje de error en la interfaz.
 *
 * @param {string} mensaje Texto que se desea mostrar.
 * @returns {void}
 */
function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
}
```

### Parametros de distintos tipos

```js
/**
 * Convierte el valor de un input a numero.
 *
 * @param {HTMLInputElement} input Campo del formulario.
 * @returns {number} Valor convertido a numero.
 */
function obtenerNumero(input) {
  return Number(input.value);
}
```

### Valores booleanos

```js
/**
 * Comprueba si los datos del formulario son validos.
 *
 * @param {number} precio Precio unitario.
 * @param {number} cantidad Cantidad de unidades.
 * @returns {boolean} true si los datos son validos, false si no lo son.
 */
function validarDatos(precio, cantidad) {
  return precio >= 0 && cantidad > 0;
}
```

## Etiquetas mas usadas

| Etiqueta | Para que sirve |
| --- | --- |
| `@file` | Describe un archivo completo. |
| `@author` | Indica el autor. |
| `@param {tipo} nombre descripcion` | Documenta un parametro. |
| `@returns {tipo} descripcion` | Documenta lo que devuelve una funcion. |
| `@example` | Anade un ejemplo de uso. |
| `@type {tipo}` | Documenta el tipo de una variable. |
| `@constant` | Indica que una variable es constante. |
| `@throws {Error}` | Indica que una funcion puede lanzar un error. |

## Tipos habituales

```js
{string}
{number}
{boolean}
{Array}
{Object}
{HTMLElement}
{HTMLInputElement}
{SubmitEvent}
{void}
```

## Consejos rapidos

- Escribe los comentarios JSDoc justo encima de la funcion o archivo que documentan.
- Usa `@param` para cada parametro de una funcion.
- Usa `@returns` aunque la funcion no devuelva nada: en ese caso pon `{void}`.
- Incluye `@example` cuando quieras que la documentacion sea mas clara.
- Si JSDoc dice `There are no input files to process`, revisa que el script apunte a archivos reales.
- En este proyecto el comando correcto es:

```bash
npm.cmd run generar-docs
```
