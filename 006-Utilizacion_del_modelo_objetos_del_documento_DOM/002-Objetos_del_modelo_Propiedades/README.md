# DOM: objetos, propiedades y metodos

Apuntes de repaso para los ejercicios de esta carpeta:

- `cambiarContenido.html`: cambiar textos, atributos, clases e imagenes.
- `childNodesYChildren.html`: diferencia entre nodos y elementos.
- `ejercicioContenido.html`: tarjeta de juego editable con inspector de nodos.

## Ideas clave para examen

El DOM es la representacion en forma de arbol de un documento HTML. Cada etiqueta, texto, comentario o documento completo es un nodo.

Un elemento HTML como `<article>` o `<button>` tambien es un nodo, pero no todos los nodos son elementos. Por ejemplo, un salto de linea entre etiquetas puede aparecer como nodo de texto.

Propiedades importantes:

- `nodeType`: numero que indica el tipo de nodo.
- `nodeName`: nombre del nodo, por ejemplo `ARTICLE`, `H2`, `#text`.
- `nodeValue`: valor del nodo. En elementos normalmente es `null`; en textos contiene el texto.
- `parentNode`: nodo padre.
- `firstChild`: primer nodo hijo, puede ser texto.
- `lastChild`: ultimo nodo hijo, puede ser texto.
- `previousSibling`: nodo hermano anterior.
- `nextSibling`: nodo hermano siguiente.
- `childNodes`: lista de todos los nodos hijos.
- `children`: lista de hijos que son elementos HTML.

## childNodes vs children

`childNodes` incluye todo:

- elementos HTML,
- nodos de texto,
- espacios,
- saltos de linea,
- comentarios.

`children` incluye solo elementos HTML.

Ejemplo:

```html
<div id="caja">
  <h2>Titulo</h2>
  <p>Texto</p>
</div>
```

En este caso, `caja.children.length` normalmente vale `2`, porque solo cuenta `h2` y `p`.

`caja.childNodes.length` puede valer mas, porque tambien cuenta los saltos de linea y espacios entre etiquetas.

## Tipos de nodo frecuentes

```js
Node.ELEMENT_NODE; // 1, etiqueta HTML
Node.TEXT_NODE; // 3, texto dentro o entre etiquetas
Node.COMMENT_NODE; // 8, comentario HTML
Node.DOCUMENT_NODE; // 9, document
Node.DOCUMENT_TYPE_NODE; // 10, <!doctype html>
```

## Seleccionar elementos

```js
const titulo = document.getElementById("titulo");
const tarjetas = document.querySelectorAll(".tarjeta");
const primerBoton = document.querySelector("button");
```

Uso recomendado:

- `getElementById`: cuando tienes un `id` concreto.
- `querySelector`: cuando quieres el primer elemento que coincida con un selector CSS.
- `querySelectorAll`: cuando quieres todos los elementos que coincidan.

## Cambiar contenido

```js
titulo.textContent = "Nuevo titulo";
contenedor.innerHTML = "<strong>Texto con HTML</strong>";
```

Ayuda memoria:

- `textContent`: cambia texto plano. Es mas seguro para contenido normal.
- `innerHTML`: interpreta etiquetas HTML. Usalo solo si necesitas insertar HTML.

## Cambiar atributos

```js
imagen.setAttribute("src", "foto.png");
imagen.setAttribute("alt", "Descripcion de la imagen");
enlace.setAttribute("href", "https://es.wikipedia.org");
tarjeta.setAttribute("data-nivel", "premium");
```

Tambien se pueden usar propiedades:

```js
imagen.src = "foto.png";
imagen.alt = "Descripcion de la imagen";
enlace.href = "https://es.wikipedia.org";
boton.disabled = true;
```

Para leer atributos:

```js
const titulo = tarjeta.getAttribute("title");
const nivel = tarjeta.getAttribute("data-nivel");
```

Para eliminar atributos:

```js
tarjeta.removeAttribute("title");
```

## Clases CSS desde JavaScript

```js
tarjeta.classList.add("destacada");
tarjeta.classList.remove("normal");
tarjeta.classList.toggle("favorito");
tarjeta.classList.contains("favorito");
```

Ayuda memoria:

- `add`: anade una clase.
- `remove`: quita una clase.
- `toggle`: alterna una clase.
- `contains`: comprueba si existe una clase y devuelve `true` o `false`.

## Eventos

```js
boton.addEventListener("click", function () {
  console.log("Boton pulsado");
});
```

Patron muy usado:

```js
document.getElementById("btnAplicar").addEventListener("click", function () {
  aplicarDatos(leerFormulario());
});
```

## Formularios

Para inputs y selects se usa `.value`:

```js
const nombre = campoNombre.value;
campoNombre.value = "Valor inicial";
```

Ejemplo reutilizable:

```js
function leerFormulario() {
  return {
    titulo: campoTitulo.value,
    genero: campoGenero.value,
    estado: campoEstado.value,
  };
}
```

## Funcion reutilizable: limpiar clases de estado

```js
function limpiarClases(elemento, clases) {
  for (let i = 0; i < clases.length; i++) {
    elemento.classList.remove(clases[i]);
  }
}

limpiarClases(tarjeta, ["normal", "destacada", "premium"]);
tarjeta.classList.add("destacada");
```

## Funcion reutilizable: tipo de nodo

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

## Funcion reutilizable: describir un nodo

```js
function describirNodo(nodo) {
  if (!nodo) return "null";

  if (nodo.nodeType === Node.TEXT_NODE) {
    return nodo.nodeName + ' -> "' + nodo.nodeValue.trim() + '"';
  }

  return nodo.nodeName + " -> " + tipoNodoTexto(nodo.nodeType);
}
```

## Funcion reutilizable: listar atributos

```js
function listarAtributos(nodo) {
  if (!nodo.attributes || nodo.attributes.length === 0) {
    return "No tiene atributos";
  }

  let texto = "";
  for (let i = 0; i < nodo.attributes.length; i++) {
    texto += nodo.attributes[i].name + '="' + nodo.attributes[i].value + '"\n';
  }
  return texto;
}
```

## Funcion reutilizable: listar childNodes

```js
function listarChildNodes(nodo) {
  let texto = "";

  for (let i = 0; i < nodo.childNodes.length; i++) {
    texto += "[" + i + "] " + describirNodo(nodo.childNodes[i]) + "\n";
  }

  return texto || "No tiene childNodes";
}
```

## Funcion reutilizable: listar children

```js
function listarChildren(nodo) {
  if (!("children" in nodo)) {
    return "Este nodo no tiene propiedad children";
  }

  let texto = "";

  for (let i = 0; i < nodo.children.length; i++) {
    texto += "[" + i + "] " + nodo.children[i].nodeName.toLowerCase() + "\n";
  }

  return texto || "No tiene children";
}
```

## Patron completo de inspector

```js
function inspeccionar(nodo, nombre) {
  let resultado = "";

  resultado += "NODO INSPECCIONADO: " + nombre + "\n";
  resultado += "nodeType: " + tipoNodoTexto(nodo.nodeType) + "\n";
  resultado += "nodeName: " + nodo.nodeName + "\n";
  resultado += "nodeValue: " + (nodo.nodeValue === null ? "null" : nodo.nodeValue) + "\n";
  resultado += "parentNode: " + describirNodo(nodo.parentNode) + "\n";
  resultado += "firstChild: " + describirNodo(nodo.firstChild) + "\n";
  resultado += "lastChild: " + describirNodo(nodo.lastChild) + "\n";
  resultado += "previousSibling: " + describirNodo(nodo.previousSibling) + "\n";
  resultado += "nextSibling: " + describirNodo(nodo.nextSibling) + "\n";
  resultado += "childNodes.length: " + nodo.childNodes.length + "\n";

  if ("children" in nodo) {
    resultado += "children.length: " + nodo.children.length + "\n";
  }

  salida.textContent = resultado;
}
```

## Preguntas tipicas de examen

**Que diferencia hay entre `textContent` e `innerHTML`?**

`textContent` modifica texto plano. `innerHTML` interpreta HTML.

**Que diferencia hay entre atributo y propiedad?**

Un atributo esta escrito en HTML, por ejemplo `href="..."`. Una propiedad pertenece al objeto DOM, por ejemplo `enlace.href`. Muchas veces estan relacionadas, pero no siempre son exactamente lo mismo.

**Por que `nodeValue` de un elemento da `null`?**

Porque el texto esta dentro de un nodo hijo de tipo texto. El elemento no guarda el texto directamente en `nodeValue`.

**Por que `childNodes.length` cuenta mas que `children.length`?**

Porque `childNodes` tambien cuenta textos, espacios y saltos de linea.

**Como deshabilito un boton?**

```js
boton.disabled = true;
```

**Como cambio una imagen?**

```js
imagen.src = "nueva.png";
imagen.alt = "Descripcion nueva";
```

**Como cambio un enlace?**

```js
enlace.href = "https://ejemplo.com";
enlace.textContent = "Abrir enlace";
```

## Mini chuleta final

```js
document.getElementById("id");
elemento.textContent = "texto";
elemento.innerHTML = "<strong>html</strong>";
elemento.setAttribute("atributo", "valor");
elemento.getAttribute("atributo");
elemento.removeAttribute("atributo");
elemento.classList.add("clase");
elemento.classList.remove("clase");
elemento.classList.toggle("clase");
elemento.classList.contains("clase");
boton.disabled = true;
input.value;
elemento.addEventListener("click", funcion);
elemento.parentNode;
elemento.childNodes;
elemento.children;
elemento.firstChild;
elemento.lastChild;
elemento.previousSibling;
elemento.nextSibling;
```
