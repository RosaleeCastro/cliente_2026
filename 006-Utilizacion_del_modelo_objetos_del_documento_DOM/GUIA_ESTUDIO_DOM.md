# Guia de estudio: Utilizacion del modelo de objetos del documento DOM

Esta guia resume lo que aparece en las carpetas `001`, `002`, `003` y `004` de esta unidad. Esta pensada para estudiar antes de resolver ejercicios como `usoCompletoDOM.html`.

## 1. Que es el DOM

El DOM es la representacion del documento HTML como un arbol de nodos. JavaScript puede leer, modificar, crear y eliminar esos nodos.

Ideas clave:

- `document` representa el documento completo.
- Un elemento HTML como `article`, `p`, `button` o `ul` es un nodo.
- Tambien existen nodos de texto, comentarios y el propio documento.
- Los espacios y saltos de linea pueden aparecer como nodos de texto.

Propiedades importantes:

```js
nodo.nodeType;
nodo.nodeName;
nodo.nodeValue;
nodo.parentNode;
nodo.firstChild;
nodo.lastChild;
nodo.previousSibling;
nodo.nextSibling;
nodo.childNodes;
nodo.children;
```

`childNodes` incluye elementos, textos, comentarios y saltos de linea. `children` incluye solo elementos HTML.

## 2. Seleccionar elementos

Patrones principales:

```js
const titulo = document.getElementById("titulo");
const tarjeta = document.querySelector(".tarjeta");
const productos = document.querySelectorAll(".producto");
```

Uso recomendado:

- `getElementById`: cuando buscas un id concreto.
- `querySelector`: cuando quieres el primer elemento que cumple un selector.
- `querySelectorAll`: cuando quieres una lista de elementos.
- `elemento.querySelector`: cuando quieres buscar dentro de un componente concreto.

Ejemplo importante:

```js
const nombre = producto.querySelector(".nombre-producto").textContent;
const precio = Number(producto.querySelector(".precio").getAttribute("data-precio"));
```

Aqui no se busca en todo el documento, sino dentro del producto afectado.

## 3. Leer y escribir contenido

Cambiar texto:

```js
titulo.textContent = "Nuevo titulo";
```

Leer valores de formulario:

```js
const texto = input.value.trim();
```

Modificar HTML interno:

```js
caja.innerHTML = "<strong>Texto</strong>";
```

Para ejercicios normales, usa `textContent` cuando puedas. Es mas seguro y no interpreta etiquetas.

## 4. Atributos y propiedades data

Los atributos se leen y escriben con:

```js
elemento.setAttribute("data-estado", "pendiente");
const estado = elemento.getAttribute("data-estado");
elemento.removeAttribute("title");
```

Los ejercicios de esta unidad usan mucho `data-*`:

```html
<button data-accion="eliminar">Eliminar</button>
<article data-id="teclado"></article>
<span data-precio="59.90"></span>
```

Patron de examen:

```js
const boton = event.target.closest("button[data-accion]");
const accion = boton.getAttribute("data-accion");
```

## 5. Clases CSS desde JavaScript

```js
tarjeta.classList.add("seleccionado");
tarjeta.classList.remove("seleccionado");
tarjeta.classList.toggle("completada");
tarjeta.classList.contains("completada");
```

Para dejar solo un elemento seleccionado:

```js
function limpiarSeleccion(contenedor, clase) {
  const elementos = contenedor.querySelectorAll("." + clase);

  elementos.forEach(function (elemento) {
    elemento.classList.remove(clase);
  });
}
```

## 6. Crear elementos desde cero

Patron base:

```js
const li = document.createElement("li");
li.classList.add("tarea");

const texto = document.createElement("span");
texto.textContent = "Comprar pan";

const boton = document.createElement("button");
boton.setAttribute("data-accion", "eliminar");
boton.textContent = "Eliminar";

li.appendChild(texto);
li.appendChild(boton);
lista.appendChild(li);
```

Pasos que suelen pedir:

1. Crear el nodo principal.
2. Crear sus hijos.
3. Poner clases, texto y atributos.
4. Montar la estructura con `appendChild`.
5. Insertar el nodo final en el contenedor.

## 7. Eliminar, reemplazar y reordenar

Eliminar:

```js
contenedor.removeChild(elemento);
```

Alternativa:

```js
elemento.remove();
```

Reemplazar:

```js
padre.replaceChild(nuevoNodo, nodoAntiguo);
```

Reordenar:

```js
const elementos = Array.from(lista.children);
elementos.sort(function (a, b) {
  return Number(a.getAttribute("data-precio")) - Number(b.getAttribute("data-precio"));
});
lista.replaceChildren(...elementos);
```

## 8. Navegar por el DOM

Subir al padre:

```js
const tarjeta = boton.parentElement.parentElement;
```

Buscar el ancestro mas cercano:

```js
const tarjeta = event.target.closest(".tarjeta");
```

Buscar hijos dentro de una tarjeta:

```js
const titulo = tarjeta.querySelector(".titulo");
const cantidad = tarjeta.querySelector(".cantidad");
```

Clave de examen: si haces click en un boton dentro de una tarjeta, no modifiques todas las tarjetas. Primero localiza la tarjeta afectada y luego navega dentro de ella.

## 9. Eventos

Listener basico:

```js
boton.addEventListener("click", function (event) {
  console.log("Click");
});
```

`event.target`:

Elemento real donde empezo el click.

`event.currentTarget`:

Elemento que tiene el listener que se esta ejecutando.

Ejemplo:

```js
tarjeta.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

Si haces click en un boton dentro de la tarjeta, `target` puede ser el boton, pero `currentTarget` sera la tarjeta.

## 10. Propagacion de eventos

Fases:

- Captura: el evento baja desde fuera hacia dentro.
- Target: llega al elemento real pulsado.
- Burbujeo: sube desde dentro hacia fuera.

Por defecto:

```js
elemento.addEventListener("click", funcion);
```

Escucha en burbujeo.

Para captura:

```js
elemento.addEventListener("click", funcion, true);
```

Detener propagacion:

```js
event.stopPropagation();
```

## 11. Delegacion de eventos

Delegar eventos significa poner un listener en un contenedor grande y detectar que hijo concreto se ha pulsado.

Patron principal:

```js
contenedor.addEventListener("click", function (event) {
  const boton = event.target.closest("button[data-accion]");

  if (boton === null) {
    return;
  }

  const accion = boton.getAttribute("data-accion");
  const item = boton.closest(".item");

  if (accion === "eliminar") {
    item.remove();
  }
});
```

Ventajas:

- No hay un listener por cada boton.
- Funciona con elementos creados dinamicamente.
- El codigo se centraliza.

## 12. Patron tienda/carrito

Funciones que debes dominar:

```js
function leerDatosProducto(producto) {
  return {
    id: producto.getAttribute("data-id"),
    nombre: producto.querySelector(".nombre-producto").textContent,
    precio: Number(producto.querySelector(".precio").getAttribute("data-precio")),
  };
}
```

```js
function actualizarTotalCarrito() {
  const items = contenedorCarrito.querySelectorAll(".item-carrito");
  let total = 0;

  items.forEach(function (item) {
    const precio = Number(item.querySelector(".precio-item").getAttribute("data-precio"));
    const cantidad = Number(item.querySelector(".cantidad-item").textContent);
    total += precio * cantidad;
  });

  totalCarrito.textContent = total.toFixed(2) + " EUR";
}
```

```js
function actualizarSubtotalItem(item) {
  const precio = Number(item.querySelector(".precio-item").getAttribute("data-precio"));
  const cantidad = Number(item.querySelector(".cantidad-item").textContent);
  item.querySelector(".subtotal-item").textContent = (precio * cantidad).toFixed(2) + " EUR";
}
```

## 13. Checklist antes de entregar un ejercicio

- Hay un contenedor grande con listener si el ejercicio pide delegacion.
- Los botones tienen `data-accion`.
- Los datos se leen navegando dentro del componente afectado.
- Los elementos dinamicos se crean con `createElement`.
- Se usan `appendChild`, `removeChild` o `replaceChildren` cuando corresponde.
- El total, contador o estado visual se recalcula despues de cada cambio.
- Al seleccionar un elemento, se limpia la seleccion anterior.
- El codigo no depende de posiciones fragiles si puede usar clases o `data-*`.

## 14. Errores comunes

- Usar `document.querySelector(".cantidad")` cuando hay muchos items. Eso modifica solo el primero.
- Poner un listener en cada boton dinamico cuando el ejercicio pide delegacion.
- Olvidar convertir textos a numero con `Number(...)`.
- Leer `childNodes.length` cuando realmente querias contar solo elementos.
- No comprobar si `closest(...)` devuelve `null`.
- Actualizar la cantidad pero olvidar recalcular subtotal y total.
- Crear el HTML del carrito con strings cuando el ejercicio pide crear objetos desde cero.

