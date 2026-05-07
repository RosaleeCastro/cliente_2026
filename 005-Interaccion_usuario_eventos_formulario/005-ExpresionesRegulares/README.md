# 🔎 Expresiones regulares y validación — Guía de referencia
`RegExp` · `test()` · `replace()` · validación cliente · `fetch()` · PHP + MySQL

Carpeta centrada en validar datos con expresiones regulares y en combinar esa validación con envío al servidor, base de datos y operaciones CRUD sencillas.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `introduccionRegExp.html` | Introducción práctica a patrones, `test()` y `replace()` | Cuando quieras repasar RegExp desde cero |
| `validacion.html` | Formulario completo con validación fuerte en cliente y operaciones servidor | Cuando necesites una plantilla de examen más completa |
| `validacion.php` | Backend JSON con inserción, búsqueda, actualización y borrado | Cuando quieras ver el lado servidor |
| `conexion.php` | Conexión PDO a MySQL | Cuando necesites la plantilla de conexión |
| `db.sql` | Estructura de base de datos del ejercicio | Cuando quieras montar la BD local |
| `validacion.txt` | Enunciado o apuntes del ejercicio | Cuando quieras ver qué se pedía |
| `transacciones_dinamicas.txt` | Apoyo teórico de transacciones | Cuando repases la parte de actualización segura |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Comprobar formato de un dato
|   `-- RegExp + test()
|
|-- Reemplazar partes de un texto
|   `-- replace()
|
|-- Validar un formulario completo en cliente
|   `-- patrones + mensajes de error + focus()
|
|-- Validar documentos españoles
|   `-- DNI / NIE / matrícula
|
|-- Enviar datos al servidor
|   `-- fetch() con JSON
|
`-- Guardar o buscar en MySQL
    `-- PHP + PDO + respuestas JSON
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Validar con `RegExp.test()`
📄 Ver: `introduccionRegExp.html`

```js
const patronTelefono = /^[69][0-9]{8}$/;
const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const patronWeb = /^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}$/i;

patronTelefono.test(valor);
```

✅ Úsalo para: teléfonos, emails, webs, usuarios y formatos fijos.

### 2️⃣ Modificar cadenas con `replace()`
📄 Ver: `introduccionRegExp.html`

```js
const emailNuevo = emailOriginal.replace(/@hotmail\.com$/i, "@gmail.com");
const webNueva = webOriginal.replace(/\.com$/i, ".es");
```

✅ Úsalo para: limpiar, normalizar o transformar texto.

### 3️⃣ Validación fuerte en cliente
📄 Ver: `validacion.html`

La carpeta valida, entre otras cosas:

- nombre de usuario
- nombre
- DNI
- NIE
- matrícula
- contraseña y confirmación
- descripción con longitud mínima y máxima
- palabras prohibidas
- fecha de nacimiento válida

✅ Úsalo para: formularios completos donde te pidan varias expresiones regulares juntas.

### 4️⃣ DNI y NIE con fórmula real
📄 Ver: `validacion.html`

Idea del patrón:

- primero se valida formato con RegExp
- después se calcula la letra correcta
- al final se compara con la letra escrita por el usuario

✅ Úsalo para: exámenes donde no basta con la forma, también hay que validar el contenido.

### 5️⃣ Enviar datos al servidor con JSON
📄 Ver: `validacion.html` · `validacion.php`

```js
const respuesta = await fetch("api_validacion.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

```php
$rawJSON = file_get_contents("php://input");
$data = json_decode($rawJSON, true);
```

✅ Úsalo para: cliente y servidor comunicándose como mini API.

### 6️⃣ Responder JSON de forma uniforme desde PHP
📄 Ver: `validacion.php`

```php
function responder($ok, $mensaje, $datos = null, $codigo = 200)
{
    http_response_code($codigo);
    echo json_encode([
        "ok" => $ok,
        "mensaje" => $mensaje,
        "datos" => $datos
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
```

✅ Úsalo para: mantener respuestas consistentes en todos los endpoints.

### 7️⃣ CRUD simple con PDO
📄 Ver: `validacion.php` · `conexion.php`

La práctica incluye:

- insertar registro
- buscar por nombre de usuario
- actualizar por nombre
- eliminar por nombre

✅ Úsalo para: ejercicios CRUD conectados a formularios validados.

## 🔁 Flujo cliente ↔ servidor

```text
1. El usuario rellena el formulario
2. JavaScript normaliza y valida los datos
3. Si hay error, se muestra mensaje y focus()
4. Si todo está bien, JS envía JSON con fetch()
5. PHP lee php://input y valida de nuevo
6. PHP usa PDO para insertar o consultar
7. PHP responde en JSON
8. JS pinta el resultado en pantalla
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| Una RegExp comprueba formato, no siempre validez real | DNI y NIE necesitan cálculo extra |
| `test()` devuelve `true` o `false` | Es la forma más común de validar |
| `replace()` sirve para transformar texto, no solo para validar | Muy útil en ejercicios |
| También hay que validar en servidor | No se debe confiar solo en JavaScript |
| Con JSON en PHP usa `php://input` | `$_POST` no sirve igual en este caso |

## 🔁 Función reutilizable — validar con patrón

```js
function cumplePatron(valor, patron) {
  return patron.test(valor.trim());
}
```

## 🔁 Función reutilizable — responder JSON en PHP

```php
function responderJSON($ok, $mensaje, $datos = null) {
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        "ok" => $ok,
        "mensaje" => $mensaje,
        "datos" => $datos
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se trabaja cómo usar expresiones regulares para validar datos en cliente y cómo combinar esa validación con un backend en PHP.
Lo importante es distinguir validación de formato (`RegExp`) y validación real de datos como DNI o NIE.
`introduccionRegExp.html` es la base de regex y `validacion.html` + `validacion.php` forman la práctica completa.

## 📌 Nota útil

En `validacion.html` la llamada se hace a `api_validacion.php`, pero en la carpeta el archivo disponible es `validacion.php`.
Si lo pruebas tal cual, conviene revisar ese nombre para que cliente y servidor coincidan.
