# 🧩 Matrices, pilas y colas — Guía de referencia
Arrays bidimensionales · `Stack` · `Queue` · estructuras FIFO/LIFO

Carpeta centrada en estructuras de datos básicas en JavaScript: matrices, pilas y colas, con ejemplos simples y pequeños ejercicios tipo restaurante.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `arrays_bidimensionales.html` | Recorrido de matrices con `for` y `forEach` | Cuando trabajes con tablas o arrays dentro de arrays |
| `pilas.html` | Clase `Pila` con `push`, `pop`, `peek`, `size` | Cuando te pidan una estructura LIFO |
| `colas.html` | Clase `Cola` con `enqueue`, `dequeue`, `size` | Cuando te pidan una estructura FIFO |
| `ejercicio_pilas_colas.html` | Mezcla práctica de las dos ideas | Para ver aplicación rápida |
| `Ejercicio-restaurant/` | Ejercicio de colas aplicado a cocina/emplatado | Cuando quieras ver una simulación más real |
| `Restaurant_ejercicio_colas/` | Variante más modular del ejercicio de colas | Cuando necesites separar lógica y archivos |
| `Restaurant_refactor_colas_simple/` | Versión refactorizada y más limpia | Mejor punto de partida para reutilizar |
| `Ejercicio_pilas/` | Material específico de pilas | Cuando quieras practicar LIFO aparte |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Recorrer una tabla o matriz
|   `-- arrays_bidimensionales.html
|
|-- Guardar y sacar el último elemento
|   `-- Pila -> push() / pop() / peek()
|
|-- Guardar y sacar el primero
|   `-- Cola -> enqueue() / dequeue()
|
`-- Simular tareas en orden de llegada
    `-- ejercicios de restaurant con colas
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Recorrer arrays bidimensionales
📄 Ver: `arrays_bidimensionales.html`

```js
for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    salida += `Elemento en [${i}][${j}] = ${matriz[i][j]}\n`;
  }
}
```

```js
matriz.forEach((fila, i) => {
  fila.forEach((elemento, j) => {
    salida += `Elemento en [${i}][${j}] = ${elemento}\n`;
  });
});
```

✅ Úsalo para: horarios, asientos, tableros, tablas de datos.

### 2️⃣ Pila (`Stack`) con clase
📄 Ver: `pilas.html`

```js
class Pila {
  #elementos = [];

  push(elemento) { this.#elementos.push(elemento); }
  pop() { return this.#elementos.pop(); }
  peek() { return this.#elementos[this.#elementos.length - 1]; }
}
```

✅ Úsalo para: deshacer acciones, historial, navegación, reversión.

### 3️⃣ Cola (`Queue`) con clase
📄 Ver: `colas.html`

```js
class Cola {
  #items = [];

  enqueue(elemento) { this.#items.push(elemento); }
  dequeue() { return this.#items.shift(); }
}
```

✅ Úsalo para: turnos, pedidos, impresión, procesos en orden.

### 4️⃣ Aplicación real de colas
📄 Ver: `Restaurant_refactor_colas_simple/`

Idea del ejercicio:

- entran pedidos
- se validan
- pasan por cola de cocina
- luego por emplatado
- se marcan como terminados

✅ Úsalo para: simulaciones de procesos, colas de tareas y ejercicios cliente-servidor sencillos.

## 🔁 Flujo típico de una cola

```text
Usuario / sistema             Estructura Cola

1. Llega un nuevo elemento
2. Se añade al final
   enqueue(nuevo)
3. Se procesa por orden
4. Sale el primero pendiente
   dequeue()
5. La cola se actualiza en pantalla
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| Pila = LIFO | El último en entrar es el primero en salir |
| Cola = FIFO | El primero en entrar es el primero en salir |
| `push()` y `pop()` suelen modelar pilas | Son las operaciones base |
| `push()` y `shift()` modelan colas | Entra por el final, sale por el inicio |
| Los atributos privados `#` ayudan a encapsular | Evitan tocar el array interno desde fuera |

## 🔁 Clase reutilizable — cola mínima

```js
class Cola {
  #items = [];

  enqueue(item) { this.#items.push(item); }
  dequeue() { return this.#items.length ? this.#items.shift() : null; }
  isEmpty() { return this.#items.length === 0; }
  size() { return this.#items.length; }
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabajan arrays y estructuras de datos básicas en JavaScript.
Las pilas resuelven problemas LIFO, las colas resuelven procesos por orden de llegada y las matrices sirven para recorrer datos en dos dimensiones.
Los ejercicios de restaurante son la aplicación práctica más reutilizable.
