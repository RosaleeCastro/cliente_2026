# 004 - Propagacion de eventos

Esta carpeta estudia como viajan los eventos por el DOM y como aprovecharlo para gestionar muchos elementos con pocos listeners.

## Archivos de la carpeta

`propagacion.html`

Ejemplo de fases del evento: captura, target y burbujeo. Usa cajas anidadas y muestra el orden en que se ejecutan los listeners.

`targetVsCurrenTarget.html`

Ejemplo de diferencia entre `event.target` y `event.currentTarget`. El listener esta en una tarjeta, pero el click puede originarse en un hijo.

`stopPropagation.html`

Ejemplo de `event.stopPropagation()`. Muestra como un boton interior puede impedir que el click llegue a la tarjeta padre.

`tareas.html`

Ejemplo de delegacion de eventos en una lista. Un unico listener en el `<ul>` gestiona botones de completar y eliminar de todas las tareas.

`tabla.txt`

Enunciado de tabla de videojuegos con filas seleccionables, botones de editar/eliminar y listener en la tabla.

`tabla.html`

Solucion del ejercicio de tabla. Usa listener unico en `<table>`, `closest()`, `event.target`, `event.currentTarget`, botones con `data-accion` y resaltado de una sola fila.

`tienda.txt`

Enunciado de tienda/promociones con captura, burbujeo, enlace interior y ampliacion de carrito.

`usoCompletoDOM.txt`

Enunciado de tienda online completa: productos, carrito, seleccion, cantidades, total, listeners en contenedores grandes y botones identificados por propiedad especifica.

## Conceptos clave

Cuando ocurre un evento, por ejemplo un click, el navegador no ejecuta solo el elemento exacto pulsado. El evento recorre el arbol del DOM.

Fases principales:

- Captura: el evento baja desde `document` hacia el elemento pulsado.
- Target: el evento llega al elemento real donde empezo.
- Burbujeo: el evento sube desde el elemento pulsado hacia sus padres.

Por defecto, `addEventListener("click", funcion)` escucha en burbujeo.

Para escuchar en captura:

```js
elemento.addEventListener("click", funcion, true);
```

## target vs currentTarget

`event.target`

Es el elemento real donde empezo el evento.

`event.currentTarget`

Es el elemento que tiene el listener que se esta ejecutando en ese momento.

Ejemplo:

```html
<article id="tarjeta">
  <button id="boton">Editar</button>
</article>
```

```js
tarjeta.addEventListener("click", function (event) {
  console.log(event.target); // puede ser button#boton
  console.log(event.currentTarget); // siempre article#tarjeta
});
```

## Delegacion de eventos

Delegar eventos significa poner un listener en un contenedor grande y detectar que hijo se ha pulsado.

Ventajas:

- No necesitas un listener por cada boton.
- Funciona con elementos creados dinamicamente.
- El codigo suele ser mas limpio.

Patron basico:

```js
lista.addEventListener("click", function (event) {
  const boton = event.target.closest("button[data-accion]");

  if (!boton) {
    return;
  }

  const accion = boton.getAttribute("data-accion");
  const tarea = boton.closest(".tarea");

  if (accion === "eliminar") {
    tarea.remove();
  }
});
```

## stopPropagation

`event.stopPropagation()` detiene la propagacion del evento hacia otros elementos.

Ejemplo:

```js
boton.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Solo se ejecuta el boton, no la tarjeta padre");
});
```

Uso tipico:

- Una tarjeta es clicable.
- Dentro hay un boton.
- El boton debe hacer su accion sin activar tambien la tarjeta.

## Funciones principales reutilizables

### Obtener nombre de fase del evento

```js
function nombreFase(event) {
  switch (event.eventPhase) {
    case Event.CAPTURING_PHASE:
      return "CAPTURA";
    case Event.AT_TARGET:
      return "TARGET";
    case Event.BUBBLING_PHASE:
      return "BURBUJEO";
    default:
      return "DESCONOCIDA";
  }
}
```

### Escribir registro de acciones

```js
let numeroLinea = 0;

function escribirLog(texto) {
  if (numeroLinea === 0) {
    salida.textContent = "";
  }

  numeroLinea++;
  salida.textContent += numeroLinea + ". " + texto + "\n";
  salida.scrollTop = salida.scrollHeight;
}
```

### Describir elemento pulsado

```js
function describirElemento(elemento) {
  if (!elemento) {
    return "null";
  }

  let descripcion = elemento.tagName.toLowerCase();

  if (elemento.id) {
    descripcion += "#" + elemento.id;
  }

  return descripcion;
}
```

### Listener generico para estudiar fases

```js
function crearListener(nombreElemento, tipoListener) {
  return function (event) {
    escribirLog(
      nombreElemento +
        " | configurado en " +
        tipoListener +
        " | fase actual: " +
        nombreFase(event) +
        " | target: " +
        event.target.id +
        " | currentTarget: " +
        event.currentTarget.id,
    );
  };
}
```

### Delegacion en lista de tareas

```js
listaTareas.addEventListener("click", function (event) {
  const boton = event.target.closest("button[data-accion]");

  if (!boton) {
    return;
  }

  const accion = boton.getAttribute("data-accion");
  const tarea = boton.closest(".tarea");

  if (accion === "completar") {
    tarea.classList.toggle("completada");
  }

  if (accion === "eliminar") {
    tarea.remove();
  }
});
```

### Delegacion en tabla

```js
tabla.addEventListener("click", function (event) {
  const boton = event.target.closest("button[data-accion]");

  if (boton) {
    const accion = boton.getAttribute("data-accion");
    const fila = boton.closest("tr[data-id]");

    if (accion === "editar") {
      editarFila(fila);
    }

    if (accion === "eliminar") {
      fila.remove();
    }

    return;
  }

  const fila = event.target.closest("tr[data-id]");

  if (!fila) {
    return;
  }

  resaltarFila(fila);
});
```

Clave: los botones se gestionan antes y hacen `return`, por eso no resaltan la fila.

### Resaltar solo una fila

```js
function limpiarSeleccion() {
  document.querySelectorAll(".fila-seleccionada").forEach(function (fila) {
    fila.classList.remove("fila-seleccionada");
  });
}

function resaltarFila(fila) {
  limpiarSeleccion();
  fila.classList.add("fila-seleccionada");
}
```

### Crear boton identificable por accion

```js
const boton = document.createElement("button");
boton.textContent = "Eliminar";
boton.setAttribute("data-accion", "eliminar");
```

Luego en el listener:

```js
const accion = boton.getAttribute("data-accion");
```

## Chuleta de examen

Listener normal, fase de burbujeo:

```js
elemento.addEventListener("click", funcion);
```

Listener en captura:

```js
elemento.addEventListener("click", funcion, true);
```

Elemento real pulsado:

```js
event.target;
```

Elemento que tiene el listener:

```js
event.currentTarget;
```

Fase actual:

```js
event.eventPhase;
```

Detener propagacion:

```js
event.stopPropagation();
```

Buscar padre que coincida:

```js
event.target.closest(".tarjeta");
event.target.closest("tr[data-id]");
event.target.closest("button[data-accion]");
```

Comprobar si se hizo click en un boton:

```js
if (event.target.matches("button")) {
  // se pulso un boton
}
```

Delegacion con filtro:

```js
contenedor.addEventListener("click", function (event) {
  const boton = event.target.closest("button[data-accion]");

  if (!boton) {
    return;
  }

  const accion = boton.getAttribute("data-accion");
});
```

Evitar que boton active el padre:

```js
boton.addEventListener("click", function (event) {
  event.stopPropagation();
});
```

Seleccion unica:

```js
document.querySelectorAll(".seleccionada").forEach(function (elemento) {
  elemento.classList.remove("seleccionada");
});

elementoPulsado.classList.add("seleccionada");
```

## Preguntas tipicas

**Que es la propagacion de eventos?**

Es el recorrido que hace un evento por el DOM: captura, target y burbujeo.

**Que diferencia hay entre `target` y `currentTarget`?**

`target` es donde empezo el evento. `currentTarget` es donde esta el listener que se esta ejecutando.

**Para que sirve `stopPropagation()`?**

Para impedir que el evento siga propagandose hacia otros elementos.

**Que es delegacion de eventos?**

Poner un listener en un contenedor padre y detectar desde ahi que hijo concreto se ha pulsado.

**Por que se usa `closest()`?**

Porque permite subir desde el elemento pulsado hasta el contenedor que interesa, como una fila, tarjeta o boton con `data-accion`.

**Por que los botones de una tabla pueden no resaltar la fila?**

Porque primero se comprueba si el click fue en `button[data-accion]`. Si lo fue, se ejecuta la accion y se hace `return` antes de llamar a `resaltarFila()`.

## Errores tipicos

- Confundir `event.target` con `event.currentTarget`.
- Poner listeners en cada boton cuando basta un listener en el contenedor.
- No hacer `return` despues de editar/eliminar y acabar resaltando la fila.
- Usar `event.target` directamente sin `closest()`, fallando cuando se pulsa un icono o texto dentro del boton.
- Usar `stopPropagation()` cuando bastaba filtrar con `data-accion`.
- No comprobar si `closest()` devuelve `null`.

