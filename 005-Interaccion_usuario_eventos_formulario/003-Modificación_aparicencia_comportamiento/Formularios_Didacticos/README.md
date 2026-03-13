# 📋 Plantilla base de formulario con validación y captura de datos

> `querySelectorAll` · `forEach` · `FormData` — tres herramientas fundamentales de JavaScript moderno

---

## 🧠 Conceptos importantes de esta plantilla

---

### 1️⃣ Selección dinámica de campos

```js
const campos = formulario.querySelectorAll("input, textarea");
```

Permite manejar formularios grandes sin escribir código repetido. Un solo selector captura todos los campos del formulario a la vez.

---

### 2️⃣ Recorrer elementos con `forEach`

```js
campos.forEach(function (campo) {
  // lógica aplicada a cada campo automáticamente
});
```

Permite aplicar validación u otra lógica a todos los campos de forma automática, sin importar cuántos haya.

---

### 3️⃣ Obtener datos con `FormData`

```js
const datosFormulario = new FormData(formulario);
```

Captura todos los datos del formulario en una sola línea, sin acceder campo por campo.

---

### 4️⃣ Convertir datos a objeto

```js
const datos = Object.fromEntries(datosFormulario.entries());
```

Transforma los datos en un objeto JavaScript listo para:

- 📡 Enviar a una API
- 🗄️ Guardar en base de datos
- ⚙️ Procesar en una aplicación

---

## 🔄 Flujo completo del formulario

```
usuario rellena formulario
        ↓
   evento submit
        ↓
validación automática con forEach
        ↓
  captura datos con FormData
        ↓
   conversión a objeto
        ↓
listo para enviar o guardar
```

---

## 💼 Por qué este patrón se usa mucho

Porque escala bien cuando los formularios crecen. Los mismos tres conceptos funcionan igual en:

| Caso de uso             | Complejidad |
| ----------------------- | ----------- |
| Formulario de contacto  | Básica      |
| Registro de usuario     | Media       |
| Pedido ecommerce        | Media       |
| Inscripción a cursos    | Media       |
| Panel de administración | Alta        |

---

## 🎯 Lo importante para tu aprendizaje

Estas tres herramientas aparecen constantemente en aplicaciones reales:

| Herramienta        | Para qué sirve                                            |
| ------------------ | --------------------------------------------------------- |
| `querySelectorAll` | Seleccionar múltiples elementos del DOM de una vez        |
| `forEach`          | Recorrer y aplicar lógica a cada elemento                 |
| `FormData`         | Capturar todos los datos de un formulario automáticamente |

---

## ⏭️ Siguiente paso

Cuando tengas claro este ejemplo, el siguiente paso será:

- 🔹 Una plantilla base reutilizable para aplicaciones CRUD pequeñas
- 🔹 Más cercana a proyectos reales
- 🔹 Compatible con el formulario que ya estás construyendo
