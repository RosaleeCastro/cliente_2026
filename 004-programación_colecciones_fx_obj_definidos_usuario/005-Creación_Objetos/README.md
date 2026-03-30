# 🧱 Creación de objetos y componentes — Guía de referencia
`class` · componentes UI · `render()` · `Modal` · `Tabs` · `Counter`

Carpeta centrada en crear objetos y pequeños componentes reutilizables con JavaScript y DOM nativo.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `contador.html` | Primer contador orientado a objeto | Cuando necesites un ejemplo base de estado + DOM |
| `contador001.html` | Versión más ordenada del contador | Mejor punto de partida para reutilizar |
| `boton.html` | Botón con activación y desactivación | Cuando quieras encapsular un botón |
| `boton2.html` | Variante con más control de estados | Cuando haya alternancia entre botones |
| `modal.html` | Modal reutilizable basado en `template` | Cuando necesites una ventana emergente |
| `pestanas.html` | Tabs básicas | Para interfaces con varias vistas |
| `pestañas2.html` | Tabs conectadas con secciones externas | Cuando quieras separar contenido |
| `pestañas3.html` | Tabs con botón activo | Cuando quieras una versión más completa |
| `alertConfigurable.html` | Alertas reutilizables | Para mensajes del sistema |
| `Ejercicio01/` | Integración de varios componentes en panel | Cuando quieras verlos trabajar juntos |
| `Ejercicio_Componentes_modulares_interface/` | Ejercicio más modular | Cuando busques un ejemplo más cercano a mini-app |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Crear un componente con estado propio
|   `-- Counter
|
|-- Encapsular un botón y su lógica
|   `-- MyButton
|
|-- Abrir una ventana flotante
|   `-- Modal
|
|-- Cambiar entre secciones
|   `-- Tabs
|
`-- Montar una mini interfaz reutilizable
    `-- Ejercicio01 / ejercicio modular
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Componente con estado y `render()`
📄 Ver: `contador.html` · `contador001.html`

```js
class Counter {
  constructor() {
    this.value = 0;
    this.element = document.createElement("div");
  }

  increment() { this.value++; }
  reset() { this.value = 0; }
  render(container) { container.appendChild(this.element); }
}
```

✅ Úsalo para: contadores, stock, puntuación, cantidad de productos.

### 2️⃣ Botón reutilizable como objeto
📄 Ver: `boton.html`

```js
class MyButton {
  disable() { this.enabled = false; }
  enable() { this.enabled = true; }
  render(container) { container.appendChild(this.button); }
}
```

✅ Úsalo para: activar/desactivar acciones y encapsular eventos.

### 3️⃣ Modal con `template`
📄 Ver: `modal.html`

```js
class Modal {
  open() { document.body.appendChild(this.element); }
  close() { document.body.removeChild(this.element); }
}
```

✅ Úsalo para: formularios pequeños, confirmaciones y mensajes emergentes.

### 4️⃣ Tabs para cambiar de sección
📄 Ver: `pestanas.html` · `pestañas2.html` · `pestañas3.html`

Idea base:

- crear botones
- asociar cada botón a una sección
- mostrar una vista y ocultar las demás
- marcar la pestaña activa

✅ Úsalo para: paneles, formularios por pasos y apps con varias vistas.

## 🔁 Flujo típico de un componente

```text
1. Se crea una instancia con new
2. El objeto guarda estado interno
3. El objeto crea o controla su DOM
4. Se enlazan eventos
5. render(container) lo inserta en la página
6. Sus métodos actualizan estado + interfaz
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| Cada objeto debe controlar una responsabilidad clara | Hace el componente reutilizable |
| `render(container)` es un patrón muy útil | Separa creación y montaje |
| El estado debe vivir dentro del objeto | Evita variables sueltas por la página |
| Si un componente cambia el DOM, conviene encapsularlo | Facilita mantenimiento y copia a otros ejercicios |

## 🔁 Plantilla reutilizable — componente básico

```js
class Componente {
  constructor() {
    this.element = document.createElement("div");
  }

  render(container) {
    container.appendChild(this.element);
  }
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabaja la orientación a objetos aplicada al DOM.
La idea es encapsular estado, estructura HTML y eventos dentro de clases reutilizables como `Counter`, `MyButton`, `Modal` o `Tabs`.
Es la base para montar mini componentes sin frameworks.
