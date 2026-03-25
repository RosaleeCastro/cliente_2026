# Generacion de Texto y Elementos HTML desde Codigo

Guia rapida para examen basada en los ejemplos de esta carpeta.

## Objetivo

En estos ejercicios se repite siempre el mismo circuito:

1. Tener un array de objetos.
2. Seleccionar un contenedor del DOM.
3. Obtener las claves del primer objeto.
4. Construir una cadena HTML.
5. Insertarla con `innerHTML`.
6. Asignar eventos a botones creados dinamicamente.

## Funciones y tecnicas reutilizables

### 1. Seleccionar un elemento del DOM

```js
let tabla = document.querySelector("table");
```

Uso:
- Para guardar una referencia al contenedor donde vas a pintar HTML.

### 2. Obtener las propiedades de un objeto

```js
let claves = Object.keys(clientes[0]);
```

Uso:
- Sirve para generar automaticamente los encabezados de una tabla.
- Muy util cuando no quieres escribir las columnas a mano.

### 3. Recorrer arrays

```js
clientes.forEach((cliente) => {
  console.log(cliente.nombre);
});
```

Uso:
- Para generar una fila por cada objeto.
- Para recorrer botones y asignarles eventos.

### 4. Recorrer las propiedades de un objeto

```js
for (let clave in cliente) {
  console.log(clave, cliente[clave]);
}
```

Uso:
- Para crear celdas automaticamente.
- `cliente[clave]` permite acceder al valor usando el nombre de la propiedad.

### 5. Construir HTML como texto

```js
let cadena = "<tr>";
cadena += "<th>nombre</th>";
cadena += "</tr>";
```

Uso:
- Se utiliza para montar tablas, filas, celdas y botones.
- Muy frecuente en ejercicios introductorios.

### 6. Insertar HTML en la pagina

```js
tabla.innerHTML = cadena;
```

Uso:
- Pinta de golpe todo el contenido generado.
- Importante: los botones no existen en el DOM hasta ejecutar esta linea.

### 7. Crear botones dentro del HTML generado

```js
cadena += `<td><button class="btnSaluda">Saluda</button></td>`;
```

Uso:
- Para añadir acciones por fila.
- Recomendable usar clases para luego localizar todos los botones.

### 8. Buscar varios elementos

```js
document.querySelectorAll(".btnSaluda").forEach((boton) => {
  boton.addEventListener("click", () => {
    alert("Hola");
  });
});
```

Uso:
- Permite asignar eventos a todos los botones creados dinamicamente.

### 9. Obtener la fila del boton pulsado

```js
const fila = e.target.closest("tr");
```

Uso:
- Muy util cuando cada boton debe actuar solo sobre su propia fila.

### 10. Leer una celda por posicion

```js
const nombre = fila.children[1].textContent;
```

Uso:
- Rapido cuando conoces el orden exacto de las columnas.
- Menos flexible si cambias el orden de la tabla.

### 11. Leer una celda por clase

```js
const celdaCP = fila.querySelector(".codigo_postal");
```

Uso:
- Mas claro y mas mantenible que depender de `children[6]`.

### 12. Guardar datos en atributos `data-*`

```js
cadena += `<button class="btnCP" data-cp="${cliente.codigo_postal}">Mostrar CP</button>`;
```

Uso:
- Permite guardar informacion en el propio boton.
- Luego se recupera con `dataset`.

```js
const cp = e.target.dataset.cp;
```

### 13. Cambiar el contenido de una celda

```js
celdaCP.textContent = e.target.dataset.cp;
```

Uso:
- Para revelar datos ocultos.
- Para actualizar una tabla sin reconstruirla entera.

### 14. Funciones auxiliares reutilizables

```js
function obtenerPoblacion(codigoPostal) {
  if (codigoPostal === "46001") return "Valencia";
  if (codigoPostal === "28013") return "Madrid";
  return "Desconocida";
}
```

Uso:
- Para transformar un dato en otro.
- Muy util cuando el examen pida calcular una columna derivada.

## Plantilla base para examen

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Tabla dinamica</title>
  </head>
  <body>
    <table></table>

    <script>
      const datos = [
        { id: 1, nombre: "Ana", activo: true, codigo_postal: "46001" },
        { id: 2, nombre: "Luis", activo: false, codigo_postal: "28013" },
      ];

      const tabla = document.querySelector("table");
      const claves = Object.keys(datos[0]);

      function obtenerTextoExtra(codigoPostal) {
        if (codigoPostal === "46001") return "Valencia";
        if (codigoPostal === "28013") return "Madrid";
        return "Desconocida";
      }

      let cadena = "<tr>";
      claves.forEach((clave) => {
        cadena += "<th>" + clave + "</th>";
      });
      cadena += "<th>Accion</th>";
      cadena += "<th>Poblacion</th>";
      cadena += "</tr>";

      datos.forEach((item) => {
        cadena += "<tr>";

        for (let clave in item) {
          cadena += "<td>" + item[clave] + "</td>";
        }

        if (item.activo) {
          cadena += `<td><button class="btnSaluda">Saluda</button></td>`;
        } else {
          cadena += "<td></td>";
        }

        cadena += "<td>" + obtenerTextoExtra(item.codigo_postal) + "</td>";
        cadena += "</tr>";
      });

      tabla.innerHTML = cadena;

      document.querySelectorAll(".btnSaluda").forEach((boton) => {
        boton.addEventListener("click", (e) => {
          const fila = e.target.closest("tr");
          const nombre = fila.children[1].textContent;
          alert("Hola " + nombre);
        });
      });
    </script>
  </body>
</html>
```

## Mini chuleta mental

- `document.querySelector(...)`: selecciona un elemento.
- `Object.keys(objeto)`: devuelve las propiedades.
- `forEach(...)`: recorre arrays.
- `for...in`: recorre propiedades de un objeto.
- `innerHTML`: inserta HTML.
- `querySelectorAll(...)`: selecciona varios elementos.
- `addEventListener("click", ...)`: responde al click.
- `e.target`: boton pulsado.
- `closest("tr")`: sube hasta la fila.
- `children[indice]`: accede a una celda por posicion.
- `textContent`: lee o cambia el texto.
- `dataset`: lee atributos `data-*`.

## Errores tipicos en examen

- Asignar eventos antes de hacer `tabla.innerHTML = cadena`.
- Usar mal mayusculas: `classList` en vez de `classlist`.
- Comparar texto con booleanos: `"true"` no es igual a `true`.
- Olvidar que `children[1]`, `children[2]`, etc. dependen del orden de columnas.
- Pintar siempre los botones aunque el enunciado diga que dependen de `activo`.
- No crear una funcion auxiliar cuando el ejercicio pide una columna calculada.

## Recomendacion final

Si el ejercicio pide tabla dinamica con botones, piensa siempre en este esquema:

1. Datos.
2. Seleccion del contenedor.
3. Claves.
4. Cabecera.
5. Filas.
6. `innerHTML`.
7. Eventos.

Con ese circuito ya puedes resolver la mayoria de ejercicios de esta carpeta.
