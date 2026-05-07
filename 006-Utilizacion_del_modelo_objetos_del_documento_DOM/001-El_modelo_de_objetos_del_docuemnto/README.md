# El modelo de objetos del documento DOM

Esta carpeta contiene el ejemplo `inspectorNodos.html`, una práctica para entender cómo el navegador representa una página HTML como un árbol de nodos.

El objetivo principal del archivo es inspeccionar distintos nodos del DOM y mostrar sus propiedades más importantes: tipo de nodo, nombre, valor, nodo padre, hijos y hermanos.

---

## Archivo principal

| Archivo | Qué hace |
| --- | --- |
| `inspectorNodos.html` | Muestra una zona HTML de ejemplo y permite inspeccionar nodos concretos pulsando botones. |

---

## Qué se aprende con este ejemplo

- Qué es `document` dentro del DOM.
- Qué diferencia hay entre un elemento HTML y un nodo de texto.
- Cómo leer propiedades como `nodeType`, `nodeName` y `nodeValue`.
- Cómo moverse por el árbol con `parentNode`, `firstChild`, `lastChild`, `previousSibling` y `nextSibling`.
- Cómo diferenciar `childNodes` de `children`.
- Cómo modificar visualmente un elemento usando `classList`.
- Cómo asociar eventos con `addEventListener`.

---

## Estructura general del HTML

El documento tiene dos paneles principales:

| Zona | Función |
| --- | --- |
| Panel izquierdo | Contiene el título, los botones, la zona de demostración y un árbol simplificado. |
| Panel derecho | Contiene el bloque `<pre id="salida">`, donde se imprime el resultado de la inspección. |

La zona que se inspecciona es esta:

```html
<main id="zonaPrincipal">
  <h2 id="titulo">Mi tienda</h2>
  <p id="parrafo">
    Bienvenido a la
    <strong id="palabraImportante">zona premium</strong> del sitio.
  </p>
  <ul id="lista">
    <li>Producto A</li>
    <li>Producto B</li>
  </ul>
</main>
```

Esta estructura permite ver varios tipos de nodos:

| Nodo | Tipo |
| --- | --- |
| `document` | Nodo documento |
| `<main>` | Nodo elemento |
| `<h2>` | Nodo elemento |
| `<p>` | Nodo elemento |
| `<strong>` | Nodo elemento |
| Texto dentro del párrafo | Nodo de texto |

---

## Propiedades DOM usadas

### `nodeType`

Devuelve un número que indica el tipo de nodo.

| Valor | Constante | Significado |
| --- | --- | --- |
| `1` | `Node.ELEMENT_NODE` | Elemento HTML, como `p`, `main`, `strong` |
| `3` | `Node.TEXT_NODE` | Texto dentro de un elemento |
| `8` | `Node.COMMENT_NODE` | Comentario HTML |
| `9` | `Node.DOCUMENT_NODE` | Documento completo |
| `10` | `Node.DOCUMENT_TYPE_NODE` | Declaración `doctype` |

### `nodeName`

Devuelve el nombre del nodo.

Ejemplos:

```js
titulo.nodeName; // "H2"
parrafo.nodeName; // "P"
document.nodeName; // "#document"
```

### `nodeValue`

Devuelve el valor del nodo.

En elementos HTML normalmente vale `null`. En nodos de texto contiene el texto.

```js
parrafo.nodeValue; // null
nodoTextoParrafo.nodeValue; // texto del nodo
```

### `parentNode`

Devuelve el nodo padre.

```js
titulo.parentNode; // main#zonaPrincipal
```

### `firstChild` y `lastChild`

Devuelven el primer y último nodo hijo. Pueden devolver nodos de texto generados por espacios, saltos de línea o indentación del HTML.

### `previousSibling` y `nextSibling`

Permiten moverse al nodo hermano anterior o siguiente. Igual que `firstChild`, también pueden devolver nodos de texto.

### `childNodes`

Devuelve todos los nodos hijos: elementos, textos, comentarios, saltos de línea, etc.

```js
parrafo.childNodes;
```

### `children`

Devuelve solo los hijos que son elementos HTML.

```js
parrafo.children;
```

Esta es una de las diferencias más importantes del ejemplo:

| Propiedad | Incluye nodos de texto | Incluye solo elementos |
| --- | --- | --- |
| `childNodes` | Sí | No |
| `children` | No | Sí |

---

## Funciones principales del código

### `obtenerElemento(id)`

```js
function obtenerElemento(id) {
  return document.getElementById(id);
}
```

Centraliza el uso de `document.getElementById`. Es una función sencilla, pero ayuda a reutilizar el patrón y evita repetir la llamada muchas veces.

Se usa así:

```js
const salida = obtenerElemento("salida");
const parrafo = obtenerElemento("parrafo");
```

---

### `limpiarResaltado()`

```js
function limpiarResaltado() {
  document.querySelectorAll(".resaltado").forEach((elemento) => {
    elemento.classList.remove("resaltado");
  });
}
```

Elimina la clase `.resaltado` de todos los elementos que la tengan.

Sirve para que solo quede marcado visualmente el nodo que se está inspeccionando en ese momento.

Patrón reutilizable:

```js
function limpiarClase(clase) {
  document.querySelectorAll("." + clase).forEach((elemento) => {
    elemento.classList.remove(clase);
  });
}
```

---

### `tipoNodoTexto(nodeType)`

```js
function tipoNodoTexto(nodeType) {
  switch (nodeType) {
    case Node.ELEMENT_NODE:
      return "ELEMENT_NODE (1)";
    case Node.TEXT_NODE:
      return "TEXT_NODE (3)";
    case Node.COMMENT_NODE:
      return "COMMENT_NODE (8)";
    case Node.DOCUMENT_NODE:
      return "DOCUMENT_NODE (9)";
    case Node.DOCUMENT_TYPE_NODE:
      return "DOCUMENT_TYPE_NODE (10)";
    default:
      return "Otro tipo (" + nodeType + ")";
  }
}
```

Convierte el valor numérico de `nodeType` en un texto más fácil de leer.

Sin esta función, el resultado mostraría solo números como `1`, `3` o `9`. Con ella, el usuario puede entender qué representa cada número.

---

### `describirNodo(nodo)`

```js
function describirNodo(nodo) {
  if (!nodo) return "null";

  if (nodo.nodeType === Node.TEXT_NODE) {
    return `${nodo.nodeName} -> ${tipoNodoTexto(nodo.nodeType)} -> "${nodo.nodeValue}"`;
  }

  return `${nodo.nodeName} -> ${tipoNodoTexto(nodo.nodeType)}`;
}
```

Genera una descripción corta de un nodo.

Hace tres cosas importantes:

- Si el nodo no existe, devuelve `"null"`.
- Si el nodo es de texto, muestra también su `nodeValue`.
- Si es otro tipo de nodo, muestra su `nodeName` y su `nodeType`.

Ejemplos de salida:

```txt
P -> ELEMENT_NODE (1)
#text -> TEXT_NODE (3) -> "Bienvenido a la "
null
```

---

### `listarChildNodes(nodo)`

```js
function listarChildNodes(nodo) {
  let texto = "";
  for (let i = 0; i < nodo.childNodes.length; i++) {
    texto += "  [" + i + "] " + describirNodo(nodo.childNodes[i]) + "\n";
  }
  return texto || "  No tiene childNodes.\n";
}
```

Recorre todos los hijos de un nodo usando `childNodes`.

Es útil para comprobar que el DOM no solo está formado por etiquetas HTML. Los espacios y saltos de línea entre etiquetas también pueden aparecer como nodos de texto.

---

### `listarChildren(nodo)`

```js
function listarChildren(nodo) {
  if (!("children" in nodo)) {
    return "  Este nodo no tiene propiedad children.\n";
  }

  let texto = "";
  for (let i = 0; i < nodo.children.length; i++) {
    texto += "  [" + i + "] " + nodo.children[i].nodeName.toLowerCase() + "\n";
  }
  return texto || "  No tiene children.\n";
}
```

Recorre solamente los hijos que son elementos HTML.

También comprueba antes si el nodo tiene la propiedad `children`, porque no todos los nodos la tienen. Por ejemplo, un nodo de texto no tiene hijos HTML.

---

### `inspeccionar(nodo, nombre)`

```js
function inspeccionar(nodo, nombre) {
  limpiarResaltado();

  if (nodo.nodeType === Node.ELEMENT_NODE) {
    nodo.classList.add("resaltado");
  }

  let resultado = "";
  resultado += "NODO INSPECCIONADO: " + nombre + "\n";
  resultado += "nodeType: " + tipoNodoTexto(nodo.nodeType) + "\n";
  resultado += "nodeName: " + nodo.nodeName + "\n";
  salida.textContent = resultado;
}
```

Es la función central del ejemplo.

Su trabajo completo es:

- Limpiar el resaltado anterior.
- Resaltar el nodo actual si es un elemento HTML.
- Construir un texto con las propiedades principales del nodo.
- Añadir información del padre, hijos y hermanos.
- Listar `childNodes`.
- Listar `children` cuando esté disponible.
- Mostrar todo en el `<pre id="salida">`.

Esta función une casi todos los conceptos del archivo.

---

## Asociación de botones

El código usa una lista de configuración para evitar repetir muchos `addEventListener`.

```js
const nodosInspeccionables = [
  {
    botonId: "btnDocument",
    nodo: document,
    nombre: "document",
  },
  {
    botonId: "btnMain",
    nodo: zonaPrincipal,
    nombre: "<main id='zonaPrincipal'>",
  },
];
```

Después recorre esa lista:

```js
nodosInspeccionables.forEach(({ botonId, nodo, nombre }) => {
  obtenerElemento(botonId).addEventListener("click", function () {
    inspeccionar(nodo, nombre);
  });
});
```

Ventaja: si quieres añadir otro botón, solo necesitas añadir un objeto nuevo al array.

Ejemplo:

```js
{
  botonId: "btnLista",
  nodo: obtenerElemento("lista"),
  nombre: "<ul id='lista'>",
}
```

---

## Código más reutilizable del ejemplo

Estas funciones se pueden copiar a otros ejercicios DOM:

| Función | Para qué sirve |
| --- | --- |
| `obtenerElemento(id)` | Capturar elementos por id |
| `limpiarResaltado()` | Quitar una clase visual aplicada antes |
| `tipoNodoTexto(nodeType)` | Traducir tipos de nodo a texto legible |
| `describirNodo(nodo)` | Mostrar información resumida de un nodo |
| `listarChildNodes(nodo)` | Recorrer todos los nodos hijos |
| `listarChildren(nodo)` | Recorrer solo hijos que son elementos |
| `inspeccionar(nodo, nombre)` | Mostrar un informe completo de un nodo |

---

## Mejoras aplicadas

Se mejoró la parte reutilizable del JavaScript:

- Se añadió `obtenerElemento(id)` para no repetir `document.getElementById`.
- Se creó `nodosInspeccionables`, un array de configuración para los botones.
- Se sustituyeron varios bloques repetidos de `addEventListener` por un único `forEach`.
- La lógica queda más fácil de ampliar: añadir un nodo nuevo ya no exige copiar y pegar un bloque entero.

---

## Cómo ampliar el ejemplo

Para añadir la inspección de la lista `<ul id="lista">`:

1. Añade un botón en el HTML:

```html
<button id="btnLista">Inspeccionar &lt;ul&gt;</button>
```

2. Captura el nodo:

```js
const lista = obtenerElemento("lista");
```

3. Añádelo al array:

```js
{
  botonId: "btnLista",
  nodo: lista,
  nombre: "<ul id='lista'>",
}
```

---

## Ideas clave para recordar

- El DOM es un árbol de nodos.
- No todos los nodos son etiquetas HTML.
- Los textos también son nodos.
- `childNodes` muestra más información que `children`.
- `children` es más cómodo cuando solo quieres elementos HTML.
- `nodeValue` suele ser `null` en elementos, pero contiene texto en nodos de texto.
- Antes de usar propiedades como `children`, conviene comprobar si existen en ese tipo de nodo.

---

## Ruta rápida de estudio

1. Abre `inspectorNodos.html` en el navegador.
2. Pulsa primero `Inspeccionar document`.
3. Después pulsa `Inspeccionar <main>`.
4. Compara `childNodes.length` con `children.length`.
5. Pulsa `Inspeccionar nodo de texto`.
6. Observa cómo cambian `nodeName`, `nodeType` y `nodeValue`.

Si entiendes esas diferencias, ya tienes una base sólida para recorrer y manipular el DOM con JavaScript.
