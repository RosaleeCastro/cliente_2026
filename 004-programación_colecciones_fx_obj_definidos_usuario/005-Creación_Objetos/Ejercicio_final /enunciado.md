EJERCICIO FINAL: "Mini Sistema Web Interactivo"
🎯 Objetivo

Construir una aplicación web con:

Sistema de pestañas

Botones personalizados dentro de pestañas

Modales dinámicos reutilizables

Alertas del sistema

Interacción entre componentes

🏗️ Escenario

Estás desarrollando un pequeño Panel de Gestión con 3 secciones:

🏠 Inicio

📦 Productos

📞 Contacto

📌 REQUISITOS FUNCIONALES
🏠 1. Pestaña "Inicio"

Debe contener:

Texto de bienvenida ok

Un botón personalizado tipo A/B (usar MyButton)  ok

Un botón llamado "Mostrar mensaje" ok

Al hacer clic → mostrar alert("Bienvenido al sistema") ok

📦 2. Pestaña "Productos"

Debe contener:

Lista simple de productos (pueden ser textos)

Botón: "Agregar producto"

Al hacer clic → abrir un Modal

El modal debe:

Tener título dinámico

Tener input para nombre del producto

Botón Guardar

Botón Cancelar

Al guardar:

Agregar el producto a la lista

Cerrar modal

Mostrar alert("Producto agregado")

Botón: "Eliminar todos"

Abrir modal de confirmación

Si confirma → limpiar lista

Mostrar alert("Productos eliminados")

📞 3. Pestaña "Contacto"

Debe contener:

Texto

Botón: "Enviar mensaje"

Abrir modal

Mostrar mensaje de confirmación

Botón aceptar

Mostrar alert("Mensaje enviado")

🔥 REGLAS TÉCNICAS IMPORTANTES

Debes:

1️⃣ Usar clase Tabs (puedes combinar tus dos versiones)

Una versión que renderiza contenido interno

O la versión que muestra secciones externas

2️⃣ Mejorar clase Modal

Debe permitir:

Recibir título dinámico

Recibir contenido HTML dinámico

Recibir callback para botón confirmar

Cerrar al hacer click en overlay (extra)

3️⃣ Usar clase MyButton

Al menos en una pestaña.

4️⃣ Arquitectura obligatoria

Todo debe estar organizado en clases:

class Tabs
class Modal
class MyButton
class App (opcional pero recomendado)
🧩 DESAFÍOS CLAVE QUE PRACTICARÁS

Comunicación entre clases

Paso de funciones como parámetros

Renderizado dinámico

Uso correcto de this

Encapsulamiento

Manipulación avanzada del DOM

Templates HTML

🏆 NIVEL EXTRA (Para subir nota)

Si quieres hacerlo más profesional:

Agrega clase CSS activa a pestaña seleccionada

Agrega animación al modal

Evita usar alert y crea tu propia clase AlertComponent

Permite múltiples instancias de Tabs

🎓 Resultado esperado

Una mini aplicación completamente interactiva donde:

Las pestañas cambian contenido

Los botones alternan estados

Los modales son reutilizables

Se agregan y eliminan datos dinámicamente

Hay interacción real entre componentes