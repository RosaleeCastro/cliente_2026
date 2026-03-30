# 🧠 Métodos, propiedades y herencia en objetos — Guía de referencia
propiedades públicas · privadas · getters/setters · `extends` · `super`

Carpeta centrada en cómo definir atributos y métodos dentro de clases de JavaScript, cómo ocultar datos y cómo reutilizar comportamiento con herencia.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `propiedades.html` | Propiedades públicas, privadas por convención y privadas reales | Cuando necesites explicar encapsulación |
| `herencia.html` | Herencia simple entre `Vehiculo` y `Coche` | Cuando te pidan `extends` y `super()` |
| `ejercicio_creacion_clases_herencia.html` | Ejercicio más completo con clase padre e hijas | Cuando quieras ver herencia aplicada a componentes reales |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Guardar datos en una clase
|   `-- propiedades públicas y privadas
|
|-- Acceder o modificar datos de forma controlada
|   `-- getters / setters / métodos públicos
|
|-- Reutilizar código entre clases
|   `-- herencia con extends
|
`-- Especializar comportamientos
    `-- clases hijas que añaden métodos propios
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Propiedades públicas, privadas y por convención
📄 Ver: `propiedades.html`

```js
class Persona {
  #dni;

  constructor(nombre, edad, dni) {
    this.nombre = nombre;   // pública
    this._edad = edad;      // convención
    this.#dni = dni;        // privada real
  }
}
```

✅ Úsalo para: explicar encapsulación y visibilidad en clases.

### 2️⃣ Acceso controlado con métodos
📄 Ver: `propiedades.html`

```js
getPrivada() {
  return this.#dni;
}

setDNI(nuevoDni) {
  this.#dni = nuevoDni;
}
```

✅ Úsalo para: modificar datos internos sin exponerlos directamente.

### 3️⃣ Herencia simple
📄 Ver: `herencia.html`

```js
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
}

class Coche extends Vehiculo {
  constructor(marca, modelo) {
    super(marca);
    this.modelo = modelo;
  }
}
```

✅ Úsalo para: partir de una clase base y añadir comportamiento nuevo.

### 4️⃣ Clase padre + clases hijas especializadas
📄 Ver: `ejercicio_creacion_clases_herencia.html`

Idea del ejercicio:

- `AlertGeneric` define estructura común
- `AlertSuccess` añade cierre automático
- `AlertError` añade ayuda
- `AlertWarning` añade contador y resaltado

✅ Úsalo para: componentes parecidos que comparten base pero cambian su comportamiento.

## 🔁 Flujo de herencia

```text
Clase padre
   |
   |-- define atributos y métodos comunes
   |
   `-- Clase hija
       |-- usa extends
       |-- llama a super(...)
       `-- añade o modifica comportamiento
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| `#propiedad` es privada real | No se puede acceder desde fuera |
| `_propiedad` solo es convención | Técnicamente sí se puede tocar |
| `extends` crea una clase hija | Reutiliza comportamiento de la clase padre |
| `super()` debe llamarse en el constructor hijo | Inicializa la parte heredada |
| La herencia sirve para reutilizar, no para duplicar | Evita repetir lógica común |

## 🔁 Plantilla reutilizable — herencia mínima

```js
class Base {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return `Hola ${this.nombre}`;
  }
}

class Hija extends Base {
  constructor(nombre, extra) {
    super(nombre);
    this.extra = extra;
  }
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabaja cómo organizar mejor una clase: qué propiedades son públicas o privadas, cómo acceder a ellas con métodos y cómo una clase hija puede heredar de otra.
Lo más importante es distinguir encapsulación (`#`) y herencia (`extends` + `super()`).
El ejemplo de alertas es el caso práctico más completo.
