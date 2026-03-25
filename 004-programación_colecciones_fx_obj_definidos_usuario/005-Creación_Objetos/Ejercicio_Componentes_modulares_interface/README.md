# README · Ejercicio Componentes Modulares Interface

> Una guía visual, rápida y reutilizable para aprovechar este ejercicio en otros proyectos.

## Indice

- [Vista general](#vista-general)
- [Estructura útil del ejercicio](#estructura-util-del-ejercicio)
- [Piezas más reutilizables](#piezas-mas-reutilizables)
- [1. Tabs](#1-tabs)
- [2. Counter](#2-counter)
- [3. Modal](#3-modal)
- [4. Validación de edad](#4-validacion-de-edad)
- [Plantillas rápidas para otros ejercicios](#plantillas-rapidas-para-otros-ejercicios)
- [Ideas de reutilización](#ideas-de-reutilizacion)
- [Mejoras recomendadas](#mejoras-recomendadas)

## Vista general

Este ejercicio construye una pequeña interfaz en **JavaScript orientado a objetos**, separando la lógica en componentes claros.

Las partes que más te conviene reutilizar en otros ejercicios son estas:

- `Tabs`: para dividir contenido en pestañas.
- `Counter`: para controlar cantidades, edades, puntos, intentos o stock.
- `Modal`: para mostrar mensajes importantes sin usar `alert()`.
- `getValue()`: para conectar un componente con otro.
- La lógica de validación por rangos: muy útil para permisos, niveles, notas o clasificaciones.

## Estructura útil del ejercicio

Archivo principal:

- `permiso_fiesta.html`

Dentro del archivo encontramos 3 bloques importantes:

- **HTML**: define las secciones y el `template` del modal.
- **CSS**: da estilo a pestañas, contador y modal.
- **JavaScript**: crea componentes reutilizables mediante clases.

## Piezas mas reutilizables

### Reutilizables directas

- `class Tabs`
- `class Counter`
- `class Modal`
- `render(container)`
- `getValue()`
- `showTab(index)`
- `updateDisplay()`

### Reutilizables como idea

- Validar por tramos con `if / else if`
- Separar creación, eventos y renderizado
- Usar `template` en HTML para clonar interfaces

---

## 1. Tabs

### Que hace

Permite crear una navegación por pestañas para mostrar una sección y ocultar las demás.

### Por que merece la pena reutilizarlo

Porque sirve para organizar casi cualquier ejercicio que tenga varias vistas:

- formulario + resumen + resultado
- alta + edición + listado
- teoría + ejemplo + práctica
- productos + carrito + pago

### Métodos útiles

- `createButtons()`: genera los botones automáticamente.
- `showTab(index)`: muestra la pestaña activa.
- `setActiveButton(activeIndex)`: aplica el estilo al botón seleccionado.
- `render(container)`: inserta el componente en el DOM.

### Patrón reutilizable

```js
const tabs = new Tabs(
  ["Inicio", "Datos", "Resumen"],
  ["inicio", "datos", "resumen"],
);
tabs.render(document.getElementById("tabsContainer"));
```

### Cuando usarlo

- Cuando un ejercicio tenga varias zonas independientes.
- Cuando quieras evitar páginas largas.
- Cuando necesites una interfaz más clara y modular.

---

## 2. Counter

### Que hace

Crea un contador con botones para:

- aumentar
- disminuir
- reiniciar

### Por que es muy reutilizable

Este es probablemente el componente más útil del ejercicio, porque se puede adaptar a muchos casos:

- edad
- cantidad de productos
- puntuación
- vidas
- turnos
- número de alumnos
- intentos disponibles

### Métodos útiles

- `increment()`
- `decrement()`
- `reset()`
- `updateDisplay()`
- `getValue()`
- `render(container)`

### Patrón reutilizable

```js
const contador = new Counter(5);
contador.render(document.getElementById("zonaContador"));

console.log(contador.getValue());
```

### Lo más valioso para otros ejercicios

- `getValue()` te deja leer el valor desde otros botones o componentes.
- `updateDisplay()` mantiene separada la lógica de la visualización.
- `bindEvents()` organiza mejor el código que poner toda la lógica mezclada.

### Ejemplos donde encaja muy bien

- Contador de asistentes
- Selector de unidades
- Marcador de juego
- Control de stock
- Número de pasos de un formulario

---

## 3. Modal

### Que hace

Muestra una ventana emergente usando un `template` de HTML clonado con JavaScript.

### Por que es mejor que un `alert()`

Porque se ve mejor, se puede personalizar y resulta más profesional para futuros ejercicios.

### Métodos útiles

- `open()`
- `close()`

### Patrón reutilizable

```js
const modal = new Modal();
modal.open();
```

### Donde reutilizarlo

- Confirmaciones
- Avisos de error
- Mensajes de éxito
- Resúmenes finales
- Invitaciones, tickets o comprobantes

### Idea importante

El uso de:

```html
<template id="modalTemplate"></template>
```

permite preparar estructuras HTML reutilizables sin ensuciar el código JavaScript.

---

## 4. Validacion de edad

### Que hace

Lee el valor del contador y decide qué mensaje mostrar según el rango.

```js
const edad = contadorEdad.getValue();

if (edad >= 0 && edad <= 14) {
  alert("ERROR: Todavía eres muy pequeño");
} else if (edad >= 15 && edad <= 17) {
  alert("WARNING: Ya te queda poco para ser mayor de edad");
} else if (edad >= 18) {
  alert("SUCCESS: Ya puedes salir de fiesta");
} else {
  alert("Edad inválida");
}
```

### Por que esta lógica también se puede reciclar

Porque el mismo patrón sirve para clasificar valores por niveles:

- notas
- descuentos
- acceso por edad
- niveles de batería
- estados de inventario
- rangos de temperatura

### Plantilla mental reutilizable

- leer valor
- evaluar rango
- responder con mensaje o acción

---

## Plantillas rapidas para otros ejercicios

### Usar `Counter` en un carrito

```js
const unidades = new Counter(1);
unidades.render(document.getElementById("cantidadProducto"));
```

### Usar `Tabs` en una app escolar

```js
const tabsEscuela = new Tabs(
  ["Alumnos", "Notas", "Resumen"],
  ["alumnos", "notas", "resumen"],
);
```

### Usar `Modal` para confirmación

```js
document.getElementById("btnGuardar").onclick = () => {
  const modal = new Modal();
  modal.open();
};
```

### Usar validación por rangos

```js
function clasificarNota(nota) {
  if (nota < 5) return "Suspenso";
  if (nota < 7) return "Aprobado";
  if (nota < 9) return "Notable";
  return "Sobresaliente";
}
```

---

## Ideas de reutilizacion

Si quieres aprovechar este ejercicio como base para otros, estas combinaciones funcionan muy bien:

- `Tabs + Counter`: asistentes por grupos, puntos por jugador, control de stock.
- `Counter + Validación`: permisos, niveles, acceso a zonas, descuentos.
- `Modal + Validación`: mostrar éxito o error con mejor diseño.
- `Tabs + Modal`: apps pequeñas con navegación interna y ventanas de aviso.

## Mejoras recomendadas

Estas mejoras no rompen el ejercicio y lo harían aún más reutilizable:

- Evitar valores negativos en `Counter`.
- Permitir que `Modal` reciba título y mensaje dinámicos.
- Cambiar `alert()` por modales de colores.
- Separar cada clase en su propio archivo JS cuando el proyecto crezca.
- Añadir estilos más visuales para estados `error`, `warning` y `success`.

## Conclusion util

Si tuviera que elegir las piezas más valiosas de este ejercicio para reutilizar en otros, serían estas:

- `Counter`: el más práctico y adaptable.
- `Tabs`: perfecto para ordenar interfaces.
- `Modal`: mejora mucho la presentación.
- `getValue()` + validación por rangos: ideal para conectar componentes entre sí.

Este ejercicio está muy bien como base para crear pequeñas aplicaciones modulares con interfaz clara, lógica separada y componentes que se pueden mover fácilmente a otros proyectos.
