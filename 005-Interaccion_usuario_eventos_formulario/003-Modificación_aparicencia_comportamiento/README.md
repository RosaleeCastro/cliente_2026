# 🎨 Modificación de apariencia y comportamiento — Guía de referencia
clases CSS dinámicas · `classList` · `disabled` · `focus()` · `localStorage` · validación visual

Carpeta centrada en cambiar la interfaz en tiempo real desde JavaScript: aplicar estilos según valores, mostrar y ocultar bloques, limitar texto, validar visualmente y guardar datos en navegador.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `comportamiento.html` | Versión base de formulario dinámico | Cuando quieras ver lo mínimo de apariencia + comportamiento |
| `comportamiento_001.html` | Añade guardado en `localStorage` y reseteo | Cuando necesites guardar datos en navegador |
| `comportamiento_002.html` | Refactor con funciones modulares | Cuando quieras una versión más ordenada |
| `comportamiento_003.html` | Añade tabla de registros guardados | Cuando necesites pintar datos en pantalla |
| `comportamiento_004.html` | Variante avanzada / evolución del ejemplo | Cuando busques una versión más completa |
| `valores.html` | Formulario más extenso con validación de campos | Cuando quieras un ejemplo serio de validación visual |
| `index.html` | Punto de entrada o versión principal | Cuando quieras ver el conjunto rápido |
| `style.css` | Estilos reutilizados por varias versiones | Cuando necesites clases visuales base |
| `Formularios_Didacticos/` | Material complementario con `querySelector`, `forEach`, `FormData` | Cuando quieras repasar técnicas auxiliares |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Cambiar aspecto visual según lo que escribe el usuario
|   `-- classList.add() / remove()
|
|-- Mostrar u ocultar campos opcionales
|   `-- display none / block + disabled
|
|-- Limitar texto y mostrar contador
|   `-- input + substring() + textContent
|
|-- Validar antes de guardar
|   `-- funciones de validación + mensajes de error
|
|-- Guardar datos localmente
|   `-- localStorage + JSON
|
`-- Pintar registros guardados
    `-- createElement() / innerHTML / appendChild()
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Validación visual con clases CSS
📄 Ver: `comportamiento.html` · `style.css`

```js
edad.addEventListener("input", function () {
  if (this.value < 18) {
    this.classList.remove("correcto");
    this.classList.add("error");
  } else {
    this.classList.remove("error");
    this.classList.add("correcto");
  }
});
```

✅ Úsalo para: marcar errores, resaltar campos válidos y dar feedback inmediato.

### 2️⃣ Mostrar u ocultar bloques dinámicos
📄 Ver: `comportamiento.html` · `valores.html`

```js
empresaCheck.addEventListener("change", function () {
  if (this.checked) {
    campoEmpresa.classList.remove("oculto");
    cif.disabled = false;
    cif.focus();
  } else {
    campoEmpresa.classList.add("oculto");
    cif.disabled = true;
    cif.value = "";
  }
});
```

✅ Úsalo para: campos condicionales, formularios dinámicos y pasos opcionales.

### 3️⃣ Limitar caracteres y mostrar contador
📄 Ver: `comportamiento.html`

```js
comentarios.addEventListener("input", function () {
  if (this.value.length > 100) {
    this.value = this.value.substring(0, 100);
  }
  contador.textContent = this.value.length + " / 100";
});
```

✅ Úsalo para: descripciones, comentarios, bios, notas y resúmenes.

### 4️⃣ Guardar datos en `localStorage`
📄 Ver: `comportamiento_001.html` · `comportamiento_002.html` · `comportamiento_003.html`

```js
let registros = JSON.parse(localStorage.getItem("registros")) || [];
registros.push(datosForm);
localStorage.setItem("registros", JSON.stringify(registros));
```

✅ Úsalo para: guardar formularios sin base de datos.

### 5️⃣ Renderizar registros en una tabla
📄 Ver: `comportamiento_003.html`

```js
registros.forEach((reg) => {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${reg.nombre}</td>
    <td>${reg.edad}</td>
    <td>${reg.empresa ? "Sí" : "No"}</td>
    <td>${reg.cif}</td>
  `;
  tabla.appendChild(fila);
});
```

✅ Úsalo para: listados rápidos, tablas temporales y vistas de datos guardados.

### 6️⃣ Validación modular con mensajes de error
📄 Ver: `valores.html`

Idea del ejemplo:

- limpia errores anteriores
- valida campo por campo
- inserta mensajes debajo del input
- calcula edad desde fecha
- cancela el envío si algo falla

✅ Úsalo para: formularios más realistas y exámenes donde pidan validación completa en cliente.

## 🔁 Flujo típico de trabajo

```text
1. Se carga la página y se captura el DOM
2. Se pone foco inicial en el campo principal
3. El usuario escribe o marca opciones
4. JavaScript cambia estilos, contador o bloques visibles
5. Se valida el formulario antes de guardar
6. Si todo está bien, se guardan datos en localStorage
7. La interfaz se resetea y puede mostrar registros guardados
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| `classList` es la forma más limpia de cambiar apariencia | Evita tocar estilos inline constantemente |
| Si ocultas un campo opcional, limpia su valor | Evita guardar datos inconsistentes |
| `disabled` impide que el campo se use | Muy útil junto a bloques ocultos |
| `localStorage` guarda texto, no objetos directos | Hay que usar `JSON.stringify()` y `JSON.parse()` |
| Antes de validar, conviene limpiar errores viejos | Evita mensajes duplicados |

## 🔁 Función reutilizable — mostrar u ocultar un bloque

```js
function toggleBloque(visible, bloque, campo = null) {
  bloque.style.display = visible ? "block" : "none";

  if (campo) {
    campo.disabled = !visible;
    if (!visible) campo.value = "";
  }
}
```

## 🔁 Función reutilizable — guardar en localStorage

```js
function guardarRegistro(clave, datos) {
  const lista = JSON.parse(localStorage.getItem(clave)) || [];
  lista.push(datos);
  localStorage.setItem(clave, JSON.stringify(lista));
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabaja cómo JavaScript puede cambiar la apariencia y el comportamiento de un formulario en tiempo real.
Lo importante es saber usar `classList`, `focus()`, `disabled`, `style.display`, validación visual y `localStorage`.
La carpeta evoluciona desde un formulario dinámico básico hasta ejemplos más completos con guardado y renderizado de datos.
