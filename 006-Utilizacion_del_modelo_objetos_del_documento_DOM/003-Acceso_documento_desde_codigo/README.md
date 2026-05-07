# 003 - Acceso al documento desde codigo

Esta carpeta trabaja como crear, recorrer, modificar, eliminar y reemplazar nodos del DOM desde JavaScript.

## Archivos de la carpeta

`creacionDeElementos.html`

Ejemplo base de creacion dinamica. Crea tareas con `document.createElement()`, monta su estructura con `appendChild()` y las inserta en un `<ul>`. Tambien muestra como eliminar una tarea con `removeChild()`.

`recorridoRelaciones.html`

Ejemplo de navegacion por relaciones del DOM. Desde un boton pulsado se sube al padre con `parentElement` y se buscan hijos concretos con `querySelector()`. Es clave para entender como modificar solo la tarjeta afectada.

`eliminacionYRemplazoDeElementos.htm`

Ejemplo de eliminacion y reemplazo de nodos. Usa `removeChild()`, `replaceChild()` y creacion de tarjetas nuevas para sustituir elementos en pantalla.

`ejericicioCreacion.txt`

Enunciado del ejercicio de tareas: crear tareas dinamicas, estado pendiente/completada, edicion, imagen, enlace, prioridad, reorganizacion y listeners independientes.

`ejercicioCreacion.html`

Solucion ampliada y comentada. Crea tareas desde cero, usa `data-estado`, `data-prioridad`, `data-link`, cambia CSS e imagen segun estado, edita texto, elimina, cambia prioridad y reordena sustituyendo nodos con `replaceChildren()`.

## Conceptos clave

El DOM permite representar el HTML como objetos que JavaScript puede leer y modificar.

Operaciones principales:

- Crear nodos: `document.createElement()`.
- Insertar nodos: `appendChild()`.
- Eliminar nodos: `removeChild()`.
- Reemplazar nodos: `replaceChild()` o `replaceChildren()`.
- Modificar texto: `textContent`.
- Modificar atributos: `setAttribute()`, `getAttribute()`, `removeAttribute()`.
- Modificar clases: `classList.add()`, `classList.remove()`, `classList.toggle()`.
- Navegar por jerarquia: `parentElement`, `children`, `firstElementChild`, `lastElementChild`.
- Buscar dentro de un componente: `elemento.querySelector()`.

## Funciones principales reutilizables

### Mostrar un proceso en pantalla

```js
function mostrarProceso(texto) {
  salidaProceso.textContent = texto;
}
```

Sirve para escribir en un `<pre>` o panel de salida. Usa `textContent` porque normalmente quieres mostrar texto plano.

### Actualizar contador de lista

```js
function actualizarEstadoLista() {
  totalTareas.textContent = listaTareas.children.length;

  if (listaTareas.children.length === 0) {
    mensajeListaVacia.style.display = "block";
  } else {
    mensajeListaVacia.style.display = "none";
  }
}
```

`children.length` cuenta solo elementos HTML hijos, perfecto para contar `<li>`.

### Crear una tarea basica

```js
function crearTarea(textoTarea) {
  const li = document.createElement("li");
  li.classList.add("tarea");

  const titulo = document.createElement("strong");
  titulo.textContent = textoTarea;

  const boton = document.createElement("button");
  boton.textContent = "Eliminar";

  li.appendChild(titulo);
  li.appendChild(boton);
  listaTareas.appendChild(li);
}
```

Patron de examen:

1. Crear elementos.
2. Asignar texto, clases y atributos.
3. Montar hijos con `appendChild()`.
4. Insertar el nodo final en el DOM.

### Obtener tarjeta desde un boton

```js
function obtenerTareaDesdeBoton(boton) {
  return boton.parentElement.parentElement.parentElement;
}
```

Sirve cuando el ejercicio pide navegar por jerarquia DOM. Alternativa mas flexible:

```js
const tarea = boton.closest(".tarea");
```

### Actualizar visual segun atributos data

```js
function actualizarVisualTarea(tarea) {
  const estado = tarea.getAttribute("data-estado");
  const textoEstado = tarea.querySelector(".estado");

  tarea.classList.remove("tarea-pendiente", "tarea-completada");

  if (estado === "completada") {
    tarea.classList.add("tarea-completada");
    textoEstado.textContent = "Completada";
  } else {
    tarea.classList.add("tarea-pendiente");
    textoEstado.textContent = "Pendiente";
  }
}
```

Idea importante: el atributo guarda el dato, la clase CSS muestra el aspecto.

### Cambiar estado con listener independiente

```js
function cambiarEstadoTarea(evento) {
  const boton = evento.currentTarget;
  const tarea = obtenerTareaDesdeBoton(boton);
  const estadoActual = tarea.getAttribute("data-estado");

  if (estadoActual === "pendiente") {
    tarea.setAttribute("data-estado", "completada");
  } else {
    tarea.setAttribute("data-estado", "pendiente");
  }

  actualizarVisualTarea(tarea);
}
```

Esto separa la funcion del listener de la funcion que crea los elementos.

### Eliminar el ultimo elemento

```js
function borrarUltimoElemento() {
  const ultimoElemento = lista.lastElementChild;

  if (!ultimoElemento) {
    return;
  }

  lista.removeChild(ultimoElemento);
}
```

`lastElementChild` evita coger nodos de texto.

### Reemplazar un nodo

```js
function reemplazarParrafoPorStrong() {
  const parrafoActual = cajaTexto.firstElementChild;
  const nuevoStrong = document.createElement("strong");

  nuevoStrong.textContent = "Texto importante";
  cajaTexto.replaceChild(nuevoStrong, parrafoActual);
}
```

Orden de `replaceChild()`:

```js
padre.replaceChild(nuevoNodo, nodoAntiguo);
```

### Reordenar nodos por prioridad

```js
function valorPrioridad(prioridad) {
  if (prioridad === "alta") return 1;
  if (prioridad === "media") return 2;
  return 3;
}

function ordenarPorPrioridad() {
  const tareas = Array.from(listaTareas.children);

  tareas.sort(function (a, b) {
    return (
      valorPrioridad(a.getAttribute("data-prioridad")) -
      valorPrioridad(b.getAttribute("data-prioridad"))
    );
  });

  listaTareas.replaceChildren(...tareas);
}
```

`replaceChildren()` sustituye todos los hijos del contenedor por los nodos indicados.

## Chuleta de examen

Crear:

```js
const div = document.createElement("div");
const boton = document.createElement("button");
```

Insertar:

```js
padre.appendChild(hijo);
```

Eliminar:

```js
padre.removeChild(hijo);
elemento.remove();
```

Reemplazar:

```js
padre.replaceChild(nuevo, antiguo);
padre.replaceChildren(nodo1, nodo2, nodo3);
```

Texto:

```js
elemento.textContent = "Nuevo texto";
```

Atributos:

```js
elemento.setAttribute("data-estado", "pendiente");
elemento.getAttribute("data-estado");
elemento.removeAttribute("title");
```

Clases:

```js
elemento.classList.add("activa");
elemento.classList.remove("oculta");
elemento.classList.toggle("seleccionada");
elemento.classList.contains("seleccionada");
```

Formulario:

```js
const texto = input.value.trim();
input.value = "";
input.focus();
```

Navegar:

```js
elemento.parentElement;
elemento.children;
elemento.firstElementChild;
elemento.lastElementChild;
```

Buscar dentro de un componente:

```js
tarjeta.querySelector(".titulo");
tarjeta.querySelectorAll("button");
```

Eventos:

```js
boton.addEventListener("click", funcion);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    funcion();
  }
});
```

## Errores tipicos

- Usar `innerHTML` cuando basta `textContent`.
- Olvidar insertar el nodo final con `appendChild()`.
- Intentar usar `removeChild()` desde un elemento que no es el padre.
- Confundir `children` con `childNodes`.
- Clonar nodos con `cloneNode(true)` y olvidar que los listeners no se clonan.
- Guardar datos solo en texto visible en vez de usar `data-*`.

