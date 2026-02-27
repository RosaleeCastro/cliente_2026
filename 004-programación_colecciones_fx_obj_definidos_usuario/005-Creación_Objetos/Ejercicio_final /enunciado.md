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

Lista simple de productos (pueden ser textos) ok


Botón: "Agregar producto"ok

Al hacer clic → abrir un Modal ok

El modal debe:

Tener título dinámico ok

Tener input para nombre del producto  ok

Botón Guardar ok

Botón Cancelar ok

Al guardar:

Agregar el producto a la lista ok

Cerrar modal ok

Mostrar alert("Producto agregado") ok

Botón: "Eliminar todos"  ok

Abrir modal de confirmación

Si confirma → limpiar lista

Mostrar alert("Productos eliminados")



📞 Pestaña "Contacto"

1. Contenido de la Sección (Renderizado directo):

Al entrar a la pestaña, se mostrará un formulario con los siguientes campos:

Nombre (Input texto)

Dirección (Input texto)

Teléfono (Input tel/número)

Correo (Input email)

Un botón al final: "Validar y Guardar Datos".

2. Proceso de Confirmación (El Modal):

Al pulsar el botón, se abrirá el Modal que ya tenemos construido.

El título del modal será: "Confirmación de Datos".

El contenido del modal (en el área de texto/label) mostrará el resumen de lo escrito (ej: "Nombre: Pepe, Tel: 600...").

El input del modal se mantendrá oculto (ya que los datos se editarían en la pestaña, no en el modal).

3. Acciones del Modal:

Botón "Confirmar": * Muestra alert("Información guardada localmente").

Limpia los campos del formulario de la pestaña.

Cierra el modal.

Botón "Corregir": * Simplemente cierra el modal para permitir al usuario cambiar los datos en la pestaña.

4. Preparación para el Futuro:

Los datos se guardarán en un objeto JavaScript llamado datosContacto para su posterior envío a PHP.

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