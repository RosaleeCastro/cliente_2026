# Plantilla de pruebas y documentacion con Jest y JSDoc

Esta guia sirve para esta carpeta y tambien como plantilla para repetir el mismo proceso en otras carpetas con archivos JavaScript.

## 1. Preparar el proyecto

Primero entra en la carpeta donde esta tu archivo JavaScript:

```powershell
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\Repaso
```

Inicializa npm:

```powershell
npm.cmd init -y
```

Esto crea el archivo:

```text
package.json
```

El `package.json` guarda la configuracion del proyecto, los comandos disponibles y las librerias instaladas.

## 2. Instalar Jest para pruebas

Instala Jest:

```powershell
npm.cmd install --save-dev jest
```

Si vas a probar codigo que usa el DOM, por ejemplo `document`, `window`, formularios, botones o eventos, instala tambien:

```powershell
npm.cmd install --save-dev jest-environment-jsdom
```

Despues configura el `package.json` asi:

```json
{
  "scripts": {
    "test": "jest"
  },
  "type": "commonjs",
  "devDependencies": {
    "jest": "^30.4.2",
    "jest-environment-jsdom": "^30.4.1"
  },
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

Si ya tienes otros scripts, no los borres. Solo anade o corrige el script `"test": "jest"`.

## 3. Crear el archivo de pruebas

Jest busca automaticamente archivos con nombres como:

```text
app.test.js
archivo.test.js
archivo.spec.js
```

Para este proyecto usamos:

```text
app.test.js
```

Al inicio del test carga el archivo que quieres probar:

```js
require("./app.js");
```

En este proyecto las funciones se exportan para pruebas usando:

```js
globalThis.MiniEncuesta = {
  crearEstadoInicial,
  calcularTotalVotos,
  calcularPorcentaje,
  buscarOpcionPorId,
  registrarVoto,
  obtenerResultados,
  reiniciarEncuesta
};
```

Por eso en los tests se llaman asi:

```js
globalThis.MiniEncuesta.calcularTotalVotos(encuesta);
```

## 4. Formato para escribir un test

Usa siempre esta idea:

```text
Espero que [funcion] cuando recibe [datos] devuelva o haga [resultado esperado].
```

Formato en Jest:

```js
test("descripcion de lo que quiero comprobar", () => {
  // 1. Preparar datos

  // 2. Ejecutar la funcion

  // 3. Comprobar el resultado
});
```

Ejemplo:

```js
test("calcula el total de votos", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 2 },
      { id: "javascript", texto: "JavaScript", votos: 3 }
    ]
  };

  const total = globalThis.MiniEncuesta.calcularTotalVotos(encuesta);

  expect(total).toBe(5);
});
```

## 5. Ejemplos de tests utiles

### Probar una suma

```js
test("calcula el total de votos", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 2 },
      { id: "javascript", texto: "JavaScript", votos: 3 }
    ]
  };

  const total = globalThis.MiniEncuesta.calcularTotalVotos(encuesta);

  expect(total).toBe(5);
});
```

### Probar un porcentaje

```js
test("calcula el porcentaje correctamente", () => {
  const porcentaje = globalThis.MiniEncuesta.calcularPorcentaje(2, 4);

  expect(porcentaje).toBe(50);
});
```

### Probar un caso especial

```js
test("si el total de votos es 0, el porcentaje es 0", () => {
  const porcentaje = globalThis.MiniEncuesta.calcularPorcentaje(0, 0);

  expect(porcentaje).toBe(0);
});
```

### Probar una busqueda

```js
test("busca una opcion por id", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 0 },
      { id: "javascript", texto: "JavaScript", votos: 0 }
    ]
  };

  const opcion = globalThis.MiniEncuesta.buscarOpcionPorId(encuesta, "html");

  expect(opcion.id).toBe("html");
  expect(opcion.texto).toBe("HTML y CSS");
});
```

### Probar que una funcion modifica datos

```js
test("registra un voto correctamente", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 0 }
    ]
  };

  const resultado = globalThis.MiniEncuesta.registrarVoto(encuesta, "html");

  expect(resultado.correcto).toBe(true);
  expect(encuesta.opciones[0].votos).toBe(1);
});
```

### Probar un error esperado

```js
test("da error si no se selecciona ninguna opcion", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 0 }
    ]
  };

  const resultado = globalThis.MiniEncuesta.registrarVoto(encuesta, null);

  expect(resultado.correcto).toBe(false);
  expect(resultado.mensaje).toBe("Debes seleccionar una opcion antes de votar.");
});
```

## 6. Ejecutar los tests

Ejecuta:

```powershell
npm.cmd test
```

Si Jest da un error de permisos con procesos secundarios, prueba:

```powershell
npm.cmd test -- --runInBand
```

`--runInBand` hace que Jest ejecute los tests en un solo proceso.

## 7. Como leer la salida de los tests

Una salida correcta se ve parecida a esta:

```text
PASS ./app.test.js
Tests: 6 passed, 6 total
```

Eso significa que todos los tests pasaron.

Una salida con error se ve parecida a esta:

```text
FAIL ./app.test.js
Expected: 5
Received: 4
```

Significa:

```text
Expected = lo que tu test esperaba
Received = lo que la funcion devolvio realmente
```

Tambien indica la linea exacta:

```text
app.test.js:15:17
```

Eso significa:

```text
archivo:linea:columna
```

Busca esa linea en `app.test.js` y revisa el `expect`.

Errores comunes:

```js
expect(total).tobe(5);
```

Incorrecto, porque debe ser `toBe` con B mayuscula:

```js
expect(total).toBe(5);
```

Otro error comun:

```js
expect(resultado.correcto).toBe("true");
```

Incorrecto, porque `"true"` es texto. Si la funcion devuelve un booleano, usa:

```js
expect(resultado.correcto).toBe(true);
```

Otro error comun:

```js
expect(opcion.texto).toBe("HTML Y CSS");
```

Si el texto real es `"HTML y CSS"`, debe coincidir exactamente:

```js
expect(opcion.texto).toBe("HTML y CSS");
```

Jest compara mayusculas, minusculas, espacios y acentos.

## 8. Instalar JSDoc para documentacion

Instala JSDoc:

```powershell
npm.cmd install --save-dev jsdoc
```

Configura el script en `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "generar-docs": "jsdoc app.js -d ./docs/api"
  }
}
```

Este comando significa:

```text
jsdoc app.js       documenta el archivo app.js
-d ./docs/api     guarda la documentacion en docs/api
```

Si en otra carpeta tu archivo se llama distinto, cambia `app.js`:

```json
"generar-docs": "jsdoc miArchivo.js -d ./docs/api"
```

Si tienes varios archivos dentro de una carpeta `js`, puedes usar:

```json
"generar-docs": "jsdoc ./js -d ./docs/api"
```

## 9. Como comentar funciones para JSDoc

Antes de cada funcion escribe un bloque con este formato:

```js
/**
 * Descripcion corta de lo que hace la funcion.
 *
 * @param {tipo} nombreParametro - Explicacion del parametro.
 * @returns {tipo} Explicacion de lo que devuelve.
 */
function nombreFuncion(nombreParametro) {
  return nombreParametro;
}
```

Tipos comunes:

```text
string          texto
number          numero
boolean         true o false
Object          objeto
Array           array
Array<Object>   array de objetos
null            valor nulo
void            no devuelve nada
```

Ejemplo real:

```js
/**
 * Calcula el numero total de votos registrados en una encuesta.
 *
 * @param {Encuesta} encuesta - Encuesta de la que se quieren contar los votos.
 * @returns {number} Total de votos de todas las opciones.
 */
function calcularTotalVotos(encuesta) {
  let total = 0;

  for (let i = 0; i < encuesta.opciones.length; i++) {
    total += encuesta.opciones[i].votos;
  }

  return total;
}
```

Ejemplo de funcion que no devuelve nada:

```js
/**
 * Actualiza toda la interfaz de la encuesta.
 *
 * @returns {void}
 */
function actualizarInterfaz() {
  pintarPregunta();
  pintarOpciones();
  pintarResultados();
}
```

## 10. Crear tipos personalizados con JSDoc

Si varias funciones usan el mismo tipo de objeto, puedes definirlo una vez:

```js
/**
 * Representa una opcion disponible dentro de la encuesta.
 *
 * @typedef {Object} OpcionEncuesta
 * @property {string} id - Identificador unico de la opcion.
 * @property {string} texto - Texto visible de la opcion.
 * @property {number} votos - Cantidad de votos recibidos.
 */
```

Luego puedes usarlo en tus funciones:

```js
/**
 * Busca una opcion dentro de una encuesta usando su identificador.
 *
 * @param {Encuesta} encuesta - Encuesta en la que se realiza la busqueda.
 * @param {string} idOpcion - Identificador de la opcion buscada.
 * @returns {OpcionEncuesta|null} Opcion encontrada o null si no existe.
 */
function buscarOpcionPorId(encuesta, idOpcion) {
  // codigo
}
```

## 11. Generar la documentacion

Ejecuta:

```powershell
npm.cmd run generar-docs
```

La salida se genera en:

```text
docs/api
```

El archivo principal para abrir en el navegador es:

```text
docs/api/index.html
```

Ruta completa en este proyecto:

```text
C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\Repaso\docs\api\index.html
```

Desde PowerShell puedes abrirlo con:

```powershell
start .\docs\api\index.html
```

## 12. Orden recomendado de trabajo

Para una carpeta nueva, sigue este orden:

1. Crear o revisar el archivo principal, por ejemplo `app.js`.
2. Ejecutar `npm.cmd init -y`.
3. Instalar Jest con `npm.cmd install --save-dev jest`.
4. Instalar jsdom si hay DOM con `npm.cmd install --save-dev jest-environment-jsdom`.
5. Configurar `"test": "jest"` en `package.json`.
6. Crear `app.test.js`.
7. Escribir tests pequenos, uno por funcion.
8. Ejecutar `npm.cmd test`.
9. Corregir errores mirando `Expected` y `Received`.
10. Instalar JSDoc con `npm.cmd install --save-dev jsdoc`.
11. Comentar las funciones con bloques `/** ... */`.
12. Configurar `"generar-docs": "jsdoc app.js -d ./docs/api"`.
13. Ejecutar `npm.cmd run generar-docs`.
14. Abrir `docs/api/index.html`.

## 13. Checklist para reutilizar en otras carpetas

Antes de empezar:

```text
[ ] Estoy dentro de la carpeta correcta.
[ ] Tengo un archivo JavaScript principal.
[ ] Tengo package.json.
[ ] Tengo instalado Jest.
[ ] Tengo instalado jest-environment-jsdom si uso DOM.
[ ] Tengo instalado JSDoc si quiero documentacion.
```

Para tests:

```text
[ ] Cree un archivo .test.js.
[ ] Cargue mi archivo con require("./archivo.js").
[ ] Exporte o deje accesibles las funciones que quiero probar.
[ ] Escribi tests con preparar, ejecutar y comprobar.
[ ] Ejecute npm.cmd test.
```

Para documentacion:

```text
[ ] Anadi comentarios JSDoc encima de las funciones.
[ ] Use @param para parametros.
[ ] Use @returns para el valor devuelto.
[ ] Configure generar-docs en package.json.
[ ] Ejecute npm.cmd run generar-docs.
[ ] Abri docs/api/index.html.
```

