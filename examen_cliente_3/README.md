# README - Examen Cliente 3

## Descripción

Esta carpeta contiene una pequeña aplicación web en un único archivo, [examenCafeteria.html](/mnt/c/xampp/htdocs/Cliente_2026_PJ/cliente_2026/examen_cliente_3/examenCafeteria.html), para gestionar pedidos de una cafetería usando JavaScript, clases, eventos y manipulación del DOM.

El objetivo principal del ejercicio es practicar:

- Lectura y escritura de datos en el DOM.
- Creación dinámica de elementos HTML.
- Uso de `data-*` para guardar estado visual.
- Delegación de eventos.
- Actualización de interfaz sin recargar la página.

## Estructura general

El archivo está dividido en estas partes:

1. Clase `Pedido`
2. Referencias al DOM
3. Estado global de la aplicación
4. Funciones auxiliares
5. Creación y actualización de tarjetas
6. Resumen de pedidos
7. Acciones sobre pedidos
8. Gestión del formulario
9. Delegación de eventos
10. Limpieza de pedidos finalizados

## Referencias al DOM

Estas variables recogen elementos importantes del HTML para reutilizarlos en todo el script:

- `formPedido`: formulario principal.
- `inpCliente`: campo de texto del cliente.
- `selProducto`: selector del producto.
- `inpCantidad`: cantidad pedida.
- `selPrioridad`: prioridad del pedido.
- `txtObservaciones`: observaciones del pedido.
- `listaPedidos`: contenedor donde se insertan las tarjetas.
- `mensajeVacio`: mensaje mostrado cuando no hay pedidos.
- `totalPedidos`: contador total.
- `totalPreparados`: contador de preparados.
- `totalPendientes`: contador de pendientes o preparando.
- `importeTotal`: suma del importe activo.
- `btnLimpiarPreparados`: botón para eliminar pedidos preparados o cancelados.

Patrón reutilizable:

```js
const elemento = document.getElementById("miId");
const lista = document.querySelector(".mi-clase");
```

## Estado de la aplicación

La variable:

```js
let siguienteId = 1;
```

sirve para asignar un identificador único a cada pedido nuevo.

Patrón reutilizable:

- Guardar un contador global.
- Incrementarlo cada vez que se crea un nuevo objeto.
- Usarlo también como `data-id` en el DOM.

## Clase `Pedido`

La clase `Pedido` encapsula los datos del pedido:

- `id`
- `cliente`
- `producto`
- `precioUnitario`
- `cantidad`
- `prioridad`
- `observaciones`
- `estado`

También incluye:

- Métodos `get...()` para leer datos.
- Métodos `set...()` para validar o normalizar.
- `getImporte()` para calcular `precio * cantidad`.

Idea reutilizable:

- Si tienes entidades como tareas, alumnos, productos o reservas, puedes copiar este patrón de clase para centralizar datos y validaciones.

## Funciones auxiliares reutilizables

### `formatearEuros(numero)`

Convierte un número al formato de euros con dos decimales.

```js
formatearEuros(2.5); // "2.50 €"
```

Se puede reutilizar en cualquier ejercicio donde haya importes.

### `obtenerPrecioSeleccionado()`

Lee la opción seleccionada en el `select` de productos y obtiene su atributo `data-precio`.

Patrón reutilizable:

```js
const opcion = select.options[select.selectedIndex];
const valorExtra = opcion.dataset.precio;
```

Esto es útil cuando una opción del `select` tiene información adicional aparte del `value`.

### `nombreEstado(estado)`

Convierte el valor interno del estado en un texto legible para la interfaz.

Ejemplo:

- `pendiente` -> `Pendiente`
- `preparando` -> `Preparando`

### `siguienteEstado(estadoActual)`

Define la transición entre estados:

- `pendiente` -> `preparando`
- `preparando` -> `preparado`
- `preparado` -> `pendiente`

Patrón reutilizable:

- Centralizar cambios de estado en una sola función en vez de repetir lógica.

## Creación dinámica del DOM

### `crearTarjetaPedido(pedido)`

Esta función construye toda la tarjeta HTML de un pedido usando `document.createElement(...)`.

Elementos que crea:

- `article` principal
- `h3` con el cliente y el número
- línea de producto
- etiquetas de estado y prioridad
- importe
- observaciones
- botones de acción

Además guarda información en atributos `data-*`:

- `data-id`
- `data-cliente`
- `data-producto`
- `data-precio`
- `data-cantidad`
- `data-prioridad`
- `data-estado`
- `data-observaciones`

Patrón reutilizable:

```js
const card = document.createElement("article");
card.dataset.id = objeto.id;
card.dataset.estado = objeto.estado;
```

Esto permite que el DOM tenga su propio estado asociado sin depender de variables externas.

## Actualización visual de tarjetas

### `aplicarClaseEstado(tarjeta)`

Quita primero las clases visuales anteriores y luego añade la adecuada según el estado:

- `pedido-preparando`
- `pedido-preparado`
- `pedido-cancelado`

Patrón reutilizable:

- Limpiar clases anteriores antes de aplicar una nueva clase de estado.

### `actualizarTarjetaTrasCambio(tarjeta)`

Vuelve a pintar una tarjeta después de modificar sus atributos `data-*`.

Actualiza:

- etiqueta de estado
- texto del producto
- importe
- observaciones
- clase visual del estado

Patrón reutilizable:

1. Guardar datos en `dataset`.
2. Cambiar esos datos.
3. Volver a sincronizar la interfaz con una función única de repintado.

## Resumen de datos

### `actualizarResumen()`

Recorre todas las tarjetas `.pedido` y calcula:

- total de pedidos
- total preparados
- total pendientes o preparando
- importe total no cancelado

Además muestra u oculta el mensaje de lista vacía.

Patrón reutilizable:

```js
const items = contenedor.querySelectorAll(".item");
items.forEach(function (item) {
  // leer dataset y acumular
});
```

Muy útil para paneles de estadísticas, carritos o listados.

## Selección de elementos

### `seleccionarPedido(tarjeta)`

Permite que solo una tarjeta tenga la clase `seleccionado`.

Patrón reutilizable:

1. Quitar la clase a todos los elementos similares.
2. Añadirla solo al elemento pulsado.

Esto se usa mucho en:

- listados seleccionables
- menús
- tarjetas activas
- tablas con fila seleccionada

## Acciones sobre pedidos

### `cambiarEstadoPedido(tarjeta)`

- Lee el estado actual.
- Si está cancelado, no cambia.
- Calcula el siguiente estado.
- Actualiza `data-estado`.
- Repinta la tarjeta.
- Recalcula el resumen.

### `editarObservacionesPedido(tarjeta)`

- Lee `data-observaciones`.
- Pide nuevo valor con `prompt()`.
- Si no se cancela, guarda el nuevo texto.
- Si está vacío, usa `Sin observaciones`.

### `cancelarPedido(tarjeta)`

- Cambia `data-estado` a `cancelado`.
- Actualiza la tarjeta.
- Actualiza el resumen.

### `eliminarPedido(tarjeta)`

- Elimina la tarjeta del contenedor padre.
- Recalcula el resumen.

Patrón reutilizable general:

- Modificar estado en el DOM.
- Llamar a una función de refresco visual.
- Llamar a una función de resumen.

## Formulario

El formulario usa el evento `submit`:

```js
formPedido.addEventListener("submit", function (event) {
  event.preventDefault();
});
```

Pasos que realiza:

1. Lee y normaliza valores del formulario.
2. Crea un nuevo objeto `Pedido`.
3. Genera su tarjeta HTML.
4. Inserta la tarjeta en `listaPedidos`.
5. Incrementa `siguienteId`.
6. Limpia el formulario.
7. Restaura valores por defecto.
8. Devuelve el foco al campo cliente.
9. Actualiza el resumen.

Patrones reutilizables:

- `trim()` para limpiar textos.
- `Number(...)` para convertir cantidades.
- `form.reset()` para reiniciar el formulario.
- `input.focus()` para mejorar usabilidad.

## Delegación de eventos

### Listener sobre `listaPedidos`

En lugar de poner un `addEventListener` a cada botón por separado, se usa delegación:

```js
listaPedidos.addEventListener("click", function (event) {
  const elementoPulsado = event.target;
  const tarjeta = elementoPulsado.closest(".pedido");
});
```

Después:

- Si se pulsa un botón con `data-accion`, se ejecuta la acción correspondiente.
- Si no se pulsa un botón, se selecciona la tarjeta.

Ventajas:

- Funciona también con elementos creados dinámicamente.
- Reduce código repetido.
- Hace el código más escalable.

Patrón reutilizable:

```js
const boton = event.target.closest("button[data-accion]");
if (boton) {
  const accion = boton.dataset.accion;
}
```

## Limpieza de pedidos finalizados

El botón `btnLimpiarPreparados` elimina todos los pedidos cuyo estado sea:

- `preparado`
- `cancelado`

Después recalcula el resumen.

Patrón reutilizable:

- Buscar elementos por clase.
- Revisar un `dataset`.
- Eliminar según una condición.

## Qué se puede reutilizar en otros ejercicios

Puedes reaprovechar directamente estas ideas:

- Clase con propiedades privadas y getters/setters.
- `dataset` para guardar estado en nodos HTML.
- Función para crear tarjetas dinámicas.
- Función para repintar una tarjeta tras cambios.
- Función resumen que recorre todos los elementos.
- Delegación de eventos con `closest(...)`.
- Reseteo de formularios y restauración de valores por defecto.

## Posibles mejoras futuras

Si quieres convertir este ejercicio en una base más completa, podrías añadir:

- Persistencia con `localStorage`.
- Edición completa del pedido, no solo observaciones.
- Filtros por estado o prioridad.
- Ordenación por cliente, prioridad o importe.
- Confirmación antes de eliminar.
- Sustituir `prompt()` por un modal visual.

## Resumen rápido de funciones

- `formatearEuros(numero)`: formatea importes.
- `obtenerPrecioSeleccionado()`: lee precio desde el `select`.
- `nombreEstado(estado)`: convierte estado interno a texto visible.
- `siguienteEstado(estadoActual)`: calcula el siguiente estado.
- `crearTarjetaPedido(pedido)`: genera la tarjeta HTML.
- `aplicarClaseEstado(tarjeta)`: aplica clase visual según estado.
- `actualizarTarjetaTrasCambio(tarjeta)`: repinta una tarjeta.
- `actualizarResumen()`: recalcula el panel resumen.
- `seleccionarPedido(tarjeta)`: gestiona selección visual.
- `cambiarEstadoPedido(tarjeta)`: avanza el estado del pedido.
- `editarObservacionesPedido(tarjeta)`: modifica observaciones.
- `cancelarPedido(tarjeta)`: cancela un pedido.
- `eliminarPedido(tarjeta)`: borra un pedido.

## Uso recomendado para estudiar

Si quieres reutilizar este ejercicio como plantilla, el orden más útil para entenderlo es:

1. Leer la clase `Pedido`.
2. Revisar las referencias al DOM.
3. Entender `crearTarjetaPedido()`.
4. Entender `actualizarTarjetaTrasCambio()`.
5. Revisar `actualizarResumen()`.
6. Estudiar la delegación de eventos.

Con eso ya tienes una base muy reutilizable para ejercicios de DOM con tarjetas, formularios y eventos.
