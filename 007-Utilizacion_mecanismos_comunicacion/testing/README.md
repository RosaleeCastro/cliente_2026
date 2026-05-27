# Testing con Jest

Esta carpeta contiene ejemplos de **pruebas unitarias** con Jest para dos proyectos:

```txt
testing/
  calculadoraConTesting/
    calculadora.js
    calculadora.test.js
    package.json

  FormularioConTesting/
    formularioRegistro.js
    formularioRegistro.test.js
    package.json
```

## Objetivo

La carpeta `testing` sirve para practicar pruebas sobre funciones JavaScript.

Aqui se prueban principalmente funciones puras, es decir, funciones que reciben datos y devuelven un resultado sin depender directamente del DOM.

Ejemplos:

```js
sumar(2, 3); // 5
emailValido("ana@example.com"); // true
validarNombre(""); // "El nombre es obligatorio."
```

## Instalacion desde cero

Entra en la carpeta del proyecto que quieras probar.

Calculadora:

```bash
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\testing\calculadoraConTesting
```

Formulario:

```bash
cd C:\xampp\htdocs\Cliente_2026_PJ\cliente_2026\007-Utilizacion_mecanismos_comunicacion\testing\FormularioConTesting
```

Inicializa npm si todavia no existe `package.json`:

```bash
npm.cmd init -y
```

Instala Jest:

```bash
npm.cmd install --save-dev jest
```

## Configuracion del package.json

Debe existir un script de test:

```json
{
  "scripts": {
    "test": "jest"
  },
  "type": "commonjs",
  "devDependencies": {
    "jest": "^30.4.2"
  }
}
```

## Comandos utiles

Ejecutar todos los tests de la carpeta actual:

```bash
npm.cmd test
```

Ejecutar solo calculadora:

```bash
npm.cmd test -- calculadora.test.js
```

Ejecutar solo formulario:

```bash
npm.cmd test -- formularioRegistro.test.js
```

Si en Windows aparece un error de procesos como `spawn EPERM`, usa:

```bash
npm.cmd test -- formularioRegistro.test.js --runInBand
```

`--runInBand` ejecuta Jest en un solo proceso.

## Plantilla basica de un test

```js
const Modulo = require("./archivo");

describe("Nombre del grupo", () => {
  test("descripcion del caso", () => {
    expect(Modulo.funcion()).toBe(resultadoEsperado);
  });
});
```

Ejemplo:

```js
const Calculadora = require("./calculadora");

describe("Funciones basicas de la calculadora", () => {
  test("sumar devuelve la suma correcta", () => {
    expect(Calculadora.sumar(2, 3)).toBe(5);
  });
});
```

## Chuleta de expect

### Igualdad exacta

```js
expect(resultado).toBe(5);
expect(texto).toBe("Correcto");
expect(valor).toBe(true);
```

### Comparar objetos

```js
expect(resultado).toEqual({
  esValido: true,
  errores: {},
});
```

### Comprobar errores

```js
expect(() => {
  Calculadora.dividir(4, 0);
}).toThrow("No se puede dividir entre cero.");
```

### Comprobar textos vacios

```js
expect(FormularioRegistro.validarNombre("Ana")).toBe("");
```

### Comprobar que algo no es un valor

```js
expect(error).not.toBe("");
```

## Proceso recomendado para crear tests

1. Importa el modulo con `require`.
2. Agrupa casos relacionados con `describe`.
3. Escribe un `test` por comportamiento.
4. Prepara los datos de entrada.
5. Ejecuta la funcion.
6. Comprueba el resultado con `expect`.
7. Ejecuta `npm.cmd test`.

## Calculadora: funciones a probar

Archivo principal:

```txt
calculadoraConTesting/calculadora.js
```

Funciones habituales:

```txt
estaVacio(valor)
esNumeroValido(valor)
convertirANumero(valor)
sumar(a, b)
restar(a, b)
multiplicar(a, b)
dividir(a, b)
obtenerSimbolo(operacion)
formatearResultado(valor)
calcular(valor1, valor2, operacion)
```

Ejemplos de casos:

```js
test("sumar devuelve la suma correcta", () => {
  expect(Calculadora.sumar(2, 3)).toBe(5);
});

test("dividir entre cero lanza un error", () => {
  expect(() => Calculadora.dividir(10, 0)).toThrow();
});

test("estaVacio detecta cadena con espacios", () => {
  expect(Calculadora.estaVacio("   ")).toBe(true);
});
```

## Formulario: funciones a probar

Archivo principal:

```txt
FormularioConTesting/formularioRegistro.js
```

Funciones auxiliares:

```txt
limpiarTexto(texto)
estaVacio(texto)
tieneLongitudMinima(texto, minimo)
emailValido(email)
edadValida(edadTexto)
passwordValida(password)
passwordsCoinciden(password, repetirPassword)
terminosAceptados(valor)
```

Validaciones por campo:

```txt
validarNombre(nombre)
validarEmail(email)
validarEdad(edad)
validarPassword(password)
validarRepetirPassword(password, repetirPassword)
validarTerminos(terminos)
```

Validacion global:

```txt
validarRegistro(datos)
```

## Ejemplo reutilizable para validarRegistro

Datos validos base:

```js
const datosValidos = {
  nombre: "Juan Perez",
  email: "juan@example.com",
  edad: "30",
  password: "123456",
  repetirPassword: "123456",
  terminos: true,
};
```

Uso:

```js
test("devuelve esValido true si todos los datos son correctos", () => {
  expect(FormularioRegistro.validarRegistro(datosValidos).esValido).toBe(true);
});
```

Modificar solo un campo:

```js
test("devuelve error si el email esta vacio", () => {
  const resultado = FormularioRegistro.validarRegistro({
    ...datosValidos,
    email: "",
  });

  expect(resultado.errores.email).toBe(
    FormularioRegistro.validarEmail(""),
  );
});
```

## Patron recomendado para muchos casos parecidos

Cuando varios tests usan datos parecidos, crea un objeto base y cambia solo lo necesario:

```js
const datosValidos = {
  nombre: "Ana",
  email: "ana@example.com",
  edad: "25",
  password: "123456",
  repetirPassword: "123456",
  terminos: true,
};

test("nombre obligatorio", () => {
  const resultado = FormularioRegistro.validarRegistro({
    ...datosValidos,
    nombre: "",
  });

  expect(resultado.errores.nombre).toBe(
    FormularioRegistro.validarNombre(""),
  );
});
```

## Errores frecuentes

### Missing script: "test"

Falta el script en `package.json`.

Solucion:

```json
"scripts": {
  "test": "jest"
}
```

### npm.ps1 no se puede cargar

En PowerShell puede aparecer un error de politica de ejecucion con `npm`.

Usa:

```bash
npm.cmd test
```

en lugar de:

```bash
npm test
```

### spawn EPERM

Ejecuta el test en modo serial:

```bash
npm.cmd test -- archivo.test.js --runInBand
```

### Expected / Received no coinciden por acentos

Si hay problemas de codificacion, una opcion estable es comparar contra la funcion que genera el mensaje:

```js
expect(resultado.errores.email).toBe(
  FormularioRegistro.validarEmail(""),
);
```

Asi el test comprueba el contrato sin duplicar cadenas con acentos.

## Diferencia con pruebas ascendentes

En `testing` se prueban sobre todo funciones.

En `pruebas_Ascendentes` se prueba tambien la integracion con HTML, eventos, botones y DOM usando `jsdom`.
