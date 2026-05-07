# 🌐 Funciones predefinidas de JavaScript — Guía de referencia
`encodeURIComponent()` · `decodeURIComponent()` · `escape()` · `unescape()` · `eval()`

Carpeta centrada en funciones globales del lenguaje y, sobre todo, en cómo codificar y decodificar datos cuando viajan por URL entre JavaScript y PHP.

## 📁 Archivos de esta carpeta

| Archivo | Qué contiene | Cuándo consultarlo |
|---|---|---|
| `encodeUri.php` | Ejemplo de `encodeURIComponent()` en JS y `rawurldecode()` en PHP | Cuando envíes texto por URL de forma correcta |
| `escape.php` | Ejemplo clásico con `escape()` y `unescape()` | Para entender código antiguo o comparar con la opción moderna |
| `eval.html` | Referencia para ejecutar código JS construido como texto | Solo si te piden `eval()` de forma explícita |

## 🗺️ Mapa mental — qué hace cada parte

```text
¿Qué necesito hacer?
|
|-- Enviar texto por la URL sin romper caracteres especiales
|   `-- encodeURIComponent() -> GET -> PHP -> rawurldecode()
|
|-- Entender un ejemplo antiguo de codificación
|   `-- escape() / unescape()
|
`-- Ejecutar código escrito como string
    `-- eval()  (usar solo en ejemplos controlados)
```

## 📡 Los patrones que se reutilizan

### 1️⃣ Codificar texto antes de mandarlo por URL
📄 Ver: `encodeUri.php`

```js
const valor = document.getElementById("texto").value;
const valorCodificado = encodeURIComponent(valor);
window.location.href = "encodeURI.php?dato=" + valorCodificado;
```

```php
$datoCodificado = $_GET['dato'] ?? '';
$datoOriginal = rawurldecode($datoCodificado);
```

✅ Úsalo para: espacios, tildes, símbolos y texto libre enviado por GET.

### 2️⃣ Comparar con el patrón antiguo `escape()`
📄 Ver: `escape.php`

```js
const valorEscapado = escape(valor);
window.location.href = "escape.php?dato=" + valorEscapado;
```

```js
const decodificadoJS = unescape(recibido);
```

✅ Úsalo para: entender ejemplos viejos.
❌ No es la opción moderna recomendada para URLs.

### 3️⃣ Mostrar el dato en PHP de forma segura
📄 Ver: `encodeUri.php` · `escape.php`

```php
echo htmlspecialchars($datoOriginal);
```

✅ Úsalo para: imprimir texto del usuario sin que rompa el HTML.

## 🔁 Flujo JavaScript ↔ PHP

```text
Cliente JS                         Servidor PHP

1. El usuario escribe texto
2. JS lo codifica para URL
3. El navegador redirige con GET
   ---------------------------->
4. PHP recibe $_GET["dato"]
5. PHP decodifica el valor
6. PHP lo muestra en la página
   <----------------------------
7. JS también puede decodificarlo y compararlo
```

## ⚠️ Reglas que no conviene olvidar

| Regla | Por qué |
|---|---|
| Usa `encodeURIComponent()` para parámetros de URL | Es la opción moderna y segura |
| `escape()` y `unescape()` son ejemplos antiguos | Conviene conocerlos, pero no priorizarlos |
| Si imprimes texto del usuario en HTML, usa `htmlspecialchars()` | Evita problemas al renderizar |
| `eval()` solo en ejercicios controlados | Puede ser peligroso si ejecuta texto del usuario |

## 🔁 Función reutilizable — codificar un parámetro

```js
function irConParametro(url, nombre, valor) {
  window.location.href = `${url}?${nombre}=${encodeURIComponent(valor)}`;
}
```

## 🧠 Resumen rápido para decirlo en examen

Aquí se ve cómo JavaScript puede codificar datos antes de enviarlos por URL y cómo PHP los recupera y decodifica.
Lo más importante es usar `encodeURIComponent()` en cliente y `rawurldecode()` o acceso normal a `$_GET` en servidor.
`escape()` y `eval()` quedan más como referencia histórica o teórica.
