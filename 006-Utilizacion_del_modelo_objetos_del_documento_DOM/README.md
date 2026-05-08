# Utilizacion del modelo de objetos del documento DOM

Este README sirve como mapa rapido para encontrar las funciones principales de la unidad. Si necesitas teoria general, empieza por `GUIA_ESTUDIO_DOM.md`; si necesitas ejemplos completos, abre los HTML indicados en cada apartado.

## Ruta rapida por temas

| Tema | Carpeta o archivo | Para encontrar |
| --- | --- | --- |
| Modelo DOM y tipos de nodo | `001-El_modelo_de_objetos_del_documentoo/` | `nodeType`, `nodeName`, `nodeValue`, `childNodes`, `children` |
| Propiedades, atributos y contenido | `002-Objetos_del_modelo_Propiedades/` | `textContent`, `classList`, `getAttribute`, `setAttribute`, `dataset` |
| Crear, eliminar, reemplazar y recorrer | `003-Acceso_documento_desde_codigo/` | `createElement`, `appendChild`, `removeChild`, `replaceChild`, relaciones padre/hijo |
| Propagacion y delegacion de eventos | `004-Propagacion_de_eventos/` | `addEventListener`, `event.target`, `event.currentTarget`, `closest`, `stopPropagation` |
| Ejercicio integrador de tienda | `EXAMEN_DOM_TiendaDelegacion.html` | tienda, carrito, inspector DOM, delegacion de eventos |

## Archivos principales

- `GUIA_ESTUDIO_DOM.md`: resumen teorico de toda la unidad, con patrones de seleccion, creacion de nodos, eventos y carrito.
- `EXAMEN_DOM_TiendaDelegacion.html`: ejercicio integrador con productos, carrito, totales, seleccion visual, inspector de nodos y delegacion.
- `001-El_modelo_de_objetos_del_documentoo/README.md`: explicacion detallada del inspector de nodos.
- `002-Objetos_del_modelo_Propiedades/README.md`: guia de propiedades, atributos, clases y formularios.
- `003-Acceso_documento_desde_codigo/README.md`: guia de creacion, borrado, reemplazo y ordenacion de elementos.
- `004-Propagacion_de_eventos/README.md`: guia de fases de eventos, `target`, `currentTarget`, delegacion y `stopPropagation`.

## Funciones principales por carpeta

### 001 - Modelo de objetos del documento

Archivo clave: `001-El_modelo_de_objetos_del_documentoo/inspectorNodos.html`

- `obtenerElemento(id)`: atajo para localizar elementos con `document.getElementById`.
- `limpiarResaltado()`: quita la clase visual de nodos resaltados.
- `tipoNodoTexto(nodeType)`: convierte un `nodeType` en texto legible.
- `describirNodo(nodo)`: resume un nodo con nombre, tipo y valor.
- `listarChildNodes(nodo)`: muestra todos los nodos hijos, incluidos textos y comentarios.
- `listarChildren(nodo)`: muestra solo los hijos que son elementos HTML.
- `inspeccionar(nodo, nombre)`: coordina la inspeccion y pinta la informacion en pantalla.

### 002 - Objetos del modelo y propiedades

Archivos clave: `cambiarContenido.html`, `childNodesYChildren.html`, `ejercicioContenido.html`

- `actualizarPanelInfo()`: actualiza el panel con atributos, clases y propiedades actuales.
- `restaurarTarjeta()`: devuelve una tarjeta a su estado inicial.
- `ponerDestacado()` y `ponerPremium()`: cambian clases, textos, atributos e imagenes.
- `eliminarTitle()`: elimina un atributo con `removeAttribute`.
- `alternarEstadoBotonInterno()`: activa o desactiva un boton modificando la propiedad `disabled`.
- `analizarContenedor()`: compara `childNodes` y `children`.
- `resaltarSoloChildren()`: resalta solo elementos HTML, no nodos de texto.
- `leerFormulario()`: recoge datos introducidos por el usuario.
- `aplicarDatos(datos)`: vuelca los datos leidos sobre la interfaz.
- `listarAtributos(nodo)`: recorre los atributos de un nodo seleccionado.

### 003 - Acceso al documento desde codigo

Archivos clave: `creacionDeElementos.html`, `ejercicioCreacion.html`, `eliminacionYRemplazoDeElementos.htm`, `recorridoRelaciones.html`

- `crearTarea(...)`: crea elementos nuevos con `document.createElement` y los monta con `appendChild`.
- `agregarTarea()`: lee el formulario y anade una tarea al listado.
- `actualizarEstadoLista()`: actualiza contadores o mensajes segun el contenido de la lista.
- `mostrarProceso(texto)`: escribe un registro de las operaciones realizadas.
- `obtenerTareaDesdeBoton(boton)`: localiza la tarea relacionada con un boton.
- `actualizarVisualTarea(tarea)`: cambia clases y textos segun el estado de una tarea.
- `cambiarEstadoTarea(evento)`: marca o desmarca una tarea desde un evento.
- `editarTextoTarea(evento)`: modifica el texto de una tarea existente.
- `eliminarTarea(evento)`: elimina una tarea del DOM.
- `borrarUltimoElemento()`: elimina el ultimo elemento de una lista.
- `reemplazarParrafoPorStrong()`: sustituye un nodo por otro.
- `ordenarPorPrioridad()`: reordena tareas segun prioridad.
- `cambiarTarjeta(evento)`: recorre relaciones del DOM desde el elemento pulsado.

### 004 - Propagacion de eventos

Archivos clave: `propagacion.html`, `targetVsCurrenTarget.html`, `stopPropagation.html`, `tareas.html`, `tabla.html`, `usoCompletoDOM.html`

- `nombreFase(event)`: traduce la fase del evento a texto.
- `crearListener(nombreElemento, tipoListener)`: genera listeners para estudiar captura y burbujeo.
- `describirElemento(elemento)`: muestra etiqueta, id y clases del elemento.
- `escribirLog(texto)` o `escribirLinea(texto)`: registra acciones en pantalla.
- `limpiarResaltados()` y `limpiarSeleccion()`: eliminan clases de seleccion.
- `actualizarModoVisual()`: cambia el modo con o sin `stopPropagation`.
- `actualizarContadores()`: actualiza contadores de clicks.
- `actualizarResumen()`: recalcula resumenes de tareas o filas.
- `crearFilaJuego(id, nombre, estudio, pegi)`: crea una fila completa de tabla.
- `anadirJuego(...)`, `editarJuego(fila)` y `eliminarJuego(fila)`: gestionan filas usando delegacion.
- `resaltarFila(fila)`: marca una sola fila como seleccionada.

### Examen - Tienda con delegacion

Archivo clave: `EXAMEN_DOM_TiendaDelegacion.html`

- `formatearPrecio(numero)`: muestra precios con dos decimales y moneda.
- `escribirLog(texto)`: registra acciones del usuario.
- `tipoNodoTexto(nodeType)`: identifica tipos de nodo DOM.
- `describirNodo(nodo)`: genera una descripcion corta del nodo inspeccionado.
- `listarAtributos(nodo)`: lista atributos del nodo actual.
- `mostrarInspector(nodo)`: pinta la informacion del nodo en el inspector.
- `limpiarSeleccion(contenedor, claseSeleccion)`: borra una clase de seleccion dentro de un contenedor.
- `leerDatosProducto(producto)`: extrae id, nombre y precio de una tarjeta de producto.
- `buscarItemCarrito(idProducto)`: busca si un producto ya esta en el carrito.
- `crearItemCarrito(datosProducto)`: crea el elemento visual del carrito.
- `actualizarSubtotalItem(item)`: recalcula el subtotal de una linea.
- `actualizarTotalCarrito()`: recalcula el total general del carrito.
- `anadirAlCarrito(producto)`: anade un producto o aumenta su cantidad.

## Patrones que mas se repiten

- Seleccionar uno: `document.getElementById("id")` o `document.querySelector(".clase")`.
- Seleccionar varios: `document.querySelectorAll(".clase")`.
- Buscar desde un componente: `producto.querySelector(".precio")`.
- Crear nodos: `document.createElement("li")`.
- Montar nodos: `padre.appendChild(hijo)`.
- Eliminar nodos: `padre.removeChild(hijo)` o `elemento.remove()`.
- Reemplazar nodos: `padre.replaceChild(nuevo, antiguo)`.
- Delegar eventos: `contenedor.addEventListener("click", function (event) { ... })`.
- Localizar el hijo pulsado: `event.target.closest("button[data-accion]")`.
- Diferenciar origen y listener: `event.target` frente a `event.currentTarget`.
