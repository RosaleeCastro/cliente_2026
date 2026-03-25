# README · 005-Creación_Objetos

> Guía rápida para ubicar las clases, funciones y utilidades más importantes de esta carpeta y reutilizarlas en otros ejercicios.

## Índice

- [Vista rápida](#vista-rapida)
- [Mapa de la carpeta](#mapa-de-la-carpeta)
- [Componentes más reutilizables](#componentes-mas-reutilizables)
- [1. Counter](#1-counter)
- [2. MyButton](#2-mybutton)
- [3. Modal](#3-modal)
- [4. Tabs](#4-tabs)
- [5. AlertBox](#5-alertbox)
- [6. Utilidades del ejercicio final](#6-utilidades-del-ejercicio-final)
- [Dónde mirar según lo que necesites](#donde-mirar-segun-lo-que-necesites)
- [Patrones que conviene copiar](#patrones-que-conviene-copiar)
- [Recomendaciones de reutilización](#recomendaciones-de-reutilizacion)

## Vista rapida

En esta carpeta hay una colección muy útil de componentes base hechos con JavaScript y DOM nativo.

Las piezas más importantes para reutilizar son:

- `Counter`: contador básico reutilizable.
- `MyButton`: botón personalizado con activación y desactivación.
- `Modal`: ventana emergente reutilizable.
- `Tabs`: navegación por pestañas.
- `AlertBox`: aviso temporal para mensajes del sistema.
- `crearGrupoCampo()`: mini fábrica de campos de formulario.

## Mapa de la carpeta

Archivos base de componentes:

- [contador.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador.html)
- [contador001.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador001.html)
- [boton.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton.html)
- [boton2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton2.html)
- [modal.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/modal.html)
- [pestanas.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestanas.html)
- [pestañas2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas2.html)
- [pestañas3.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas3.html)
- [alertConfigurable.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/alertConfigurable.html)

Ejercicios integradores:

- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)
- [Ejercicio01/style.css](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/style.css)
- [Ejercicio01/enunciado.md](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/enunciado.md)
- [Ejercicio_Componentes_modulares_interface/permiso_fiesta.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/permiso_fiesta.html)
- [Ejercicio_Componentes_modulares_interface/README.md](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/README.md)

## Componentes mas reutilizables

### Nivel muy reutilizable

- `class Counter`
- `class Modal`
- `class Tabs`
- `class MyButton`
- `render(container)`
- `open()`
- `close()`
- `showTab(index)`
- `getValue()`
- `updateDisplay()`

### Nivel útil como patrón

- `bindEvents()`
- `createStructure()`
- `addButton(text, callback, isPrimary)`
- `initSection(sectionId)`
- `crearGrupoCampo(textoLabel, id)`

---

## 1. Counter

Archivos donde aparece:

- [contador.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador.html)
- [contador001.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador001.html)
- [Ejercicio_Componentes_modulares_interface/permiso_fiesta.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/permiso_fiesta.html)

### Qué hace

Controla un valor numérico y lo muestra en pantalla.

### Métodos clave

- `increment()`
- `decrement()`
- `reset()`
- `updateDisplay()`
- `render(container)`
- `getValue()`

### Versión más útil para reutilizar

La mejor base es la de [contador001.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador001.html) porque separa:

- creación de estructura
- eventos
- actualización visual
- estado interno

### Dónde reutilizarlo

- edades
- stock
- puntuaciones
- intentos
- cantidad de productos
- asistentes

### Patrón rápido

```js
const contador = new Counter(0);
contador.render(document.getElementById("app"));
```

---

## 2. MyButton

Archivos donde aparece:

- [boton.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton.html)
- [boton2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton2.html)
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)

### Qué hace

Crea botones personalizados con lógica encapsulada.

### Métodos y patrones clave

- `disable()`
- `enable()`
- `toggle(btnOff, btnOn)`
- `render(container)`

### Versiones útiles

- [boton.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton.html): base simple para activar y desactivar un único botón.
- [boton2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton2.html): útil para alternar estados entre dos botones.
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html): mejora la idea con un método `toggle()` más limpio.

### Dónde reutilizarlo

- modos A/B
- activar/desactivar acciones
- botones de filtro
- selector de vista
- botones mutuamente excluyentes

### Patrón rápido

```js
const botonesAlternos = new MyButton("Modo");
botonesAlternos.render(document.getElementById("zona"));
```

---

## 3. Modal

Archivos donde aparece:

- [modal.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/modal.html)
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)
- [Ejercicio_Componentes_modulares_interface/permiso_fiesta.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/permiso_fiesta.html)

### Qué hace

Abre una ventana flotante para pedir datos, confirmar acciones o mostrar mensajes.

### Métodos clave

- `open()`
- `close()`
- `addButton(text, callback, isPrimary)`

### Versión más reutilizable

La más potente está en [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html) porque permite:

- título dinámico
- acceso al input
- acceso al label interno
- agregar botones con callback
- reutilizar el mismo template para varios casos

### Dónde reutilizarlo

- formularios pequeños
- confirmaciones de borrado
- mensajes de éxito
- resúmenes antes de guardar
- edición rápida

### Patrón rápido

```js
const modal = new Modal("Nuevo producto");
modal.addButton("Guardar", (valor) => {
  console.log(valor);
}, true);
modal.addButton("Cancelar", () => {});
modal.open();
```

---

## 4. Tabs

Archivos donde aparece:

- [pestanas.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestanas.html)
- [pestañas2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas2.html)
- [pestañas3.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas3.html)
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)
- [Ejercicio_Componentes_modulares_interface/permiso_fiesta.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/permiso_fiesta.html)

### Qué hace

Organiza una interfaz en pestañas y muestra solo la sección activa.

### Métodos clave

- `createButtons()`
- `showTab(index)`
- `setActiveButton(activeIndex)`
- `render(container)`
- `initSection(sectionId)`

### Evolución útil

- [pestanas.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestanas.html): versión mínima con contenido interno.
- [pestañas2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas2.html): muestra secciones externas por ID.
- [pestañas3.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas3.html): añade botón activo.
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html): conecta cada pestaña con lógica propia usando `initSection()`.

### Dónde reutilizarlo

- paneles de administración
- pasos de formularios
- zonas de una mini app
- ejercicios con varias vistas

### Patrón rápido

```js
const tabs = new Tabs(
  ["Inicio", "Productos", "Contacto"],
  ["inicio", "productos", "contacto"],
);
tabs.render(document.getElementById("tabsContainer"));
```

---

## 5. AlertBox

Archivo donde aparece:

- [alertConfigurable.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/alertConfigurable.html)

### Qué hace

Muestra un mensaje temporal en pantalla y luego lo oculta automáticamente.

### Métodos clave

- `show()`
- `render(container)`

### Dónde reutilizarlo

- mensajes de éxito
- errores de validación
- avisos de guardado
- notificaciones del sistema

### Observación importante

Hay un detalle a corregir si quieres reutilizarlo tal cual: en la clase aparece

```js
this.element.className = "alert ${type}";
```

Eso debería usar plantilla real con backticks para que aplique la clase dinámica.

---

## 6. Utilidades del ejercicio final

Archivo clave:

- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)

Este archivo no solo integra componentes. También tiene utilidades pequeñas muy aprovechables.

### `initSection(sectionId)`

Sirve para disparar la lógica correcta según la pestaña activa.

Muy útil cuando quieras separar comportamiento por módulos.

### `initInicio()`

Ejemplo sencillo de renderizado condicional para evitar duplicados:

```js
if (section.querySelector(".myButton")) return;
```

Ese patrón es muy valioso cuando una sección se vuelve a inicializar varias veces.

### `initProductos()`

Patrones útiles:

- reconstruir una vista después de cambiar un array
- usar `forEach()` para pintar listas
- usar modal de confirmación para borrado
- refrescar la interfaz llamando otra vez al mismo método

### `crearGrupoCampo(textoLabel, id)`

Es una mini fábrica de campos de formulario.

Muy reutilizable para:

- formularios de contacto
- formularios de registro
- formularios de edición

Patrón rápido:

```js
const crearGrupoCampo = (textoLabel, id) => {
  const contenedorFila = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  return contenedorFila;
};
```

### `datosContacto`

Objeto preparado para almacenar información del formulario antes de enviarla a otro sistema.

Es útil como patrón de:

- estado local
- borrador de formulario
- objeto puente para enviar datos después

---

## Dónde mirar según lo que necesites

Si necesitas un contador:

- mira [contador001.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador001.html)

Si necesitas pestañas:

- empieza en [pestañas3.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas3.html)
- si quieres integración real, mira [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)

Si necesitas un modal:

- base simple en [modal.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/modal.html)
- versión más útil en [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)

Si necesitas botones de estado:

- mira [boton.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton.html) y [boton2.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/boton2.html)

Si necesitas una app completa como referencia:

- mira [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)
- mira [Ejercicio_Componentes_modulares_interface/permiso_fiesta.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio_Componentes_modulares_interface/permiso_fiesta.html)

## Patrones que conviene copiar

- separar `createStructure()`, `bindEvents()` y `updateDisplay()`
- centralizar el render con `render(container)`
- usar `template` para construir modales
- refrescar listas reconstruyendo la vista tras cambiar datos
- usar callbacks para personalizar acciones de botones
- encapsular comportamiento en clases pequeñas
- usar métodos como `initSection()` para organizar aplicaciones por secciones

## Recomendaciones de reutilizacion

Si quieres sacar una base limpia para futuros ejercicios, estas serían mis elecciones:

- `Counter`: tomar como base la versión de `contador001.html`
- `Tabs`: tomar como base la versión de `pestañas3.html`
- `Modal`: tomar como base la versión de `Ejercicio01/panel.html`
- `MyButton`: tomar como base la versión de `Ejercicio01/panel.html`
- formularios: reaprovechar `crearGrupoCampo()`

## Resumen útil

Los archivos más importantes de toda la carpeta para reutilizar código son:

- [contador001.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/contador001.html)
- [pestañas3.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/pestañas3.html)
- [modal.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/modal.html)
- [Ejercicio01/panel.html](/mnt/c/xampp/htdocs/cliente_2026/004-programación_colecciones_fx_obj_definidos_usuario/005-Creación_Objetos/Ejercicio01/panel.html)

Con esos cuatro archivos ya tienes una base muy buena para montar interfaces modulares pequeñas, con componentes claros y bastante fáciles de adaptar.
