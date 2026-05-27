/**
 * @jest-environment jsdom
 *
 * Comando reutilizable:
 * npm.cmd test -- formularioRegistro.bottomup.test.js --runInBand
 */

const fs = require("fs");
const path = require("path");
const FormularioRegistro = require("./formularioRegistro");

function cargarDOM() {
  const rutaHtml = path.join(__dirname, "formulario.html");
  const html = fs.readFileSync(rutaHtml, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  document.body.innerHTML = bodyMatch ? bodyMatch[1] : html;
}

function cargarAplicacion() {
  jest.resetModules();
  cargarDOM();
  globalThis.FormularioRegistro = require("./formularioRegistro");
  require("./script");
}

function enviarFormulario() {
  const formulario = document.getElementById("formRegistro");
  formulario.dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true }),
  );
}

function rellenarFormulario(datos = {}) {
  document.getElementById("nombre").value = datos.nombre ?? "";
  document.getElementById("email").value = datos.email ?? "";
  document.getElementById("edad").value = datos.edad ?? "";
  document.getElementById("password").value = datos.password ?? "";
  document.getElementById("repetirPassword").value =
    datos.repetirPassword ?? "";
  document.getElementById("terminos").checked = datos.terminos ?? false;
}

function clickLimpiar() {
  document.getElementById("btnLimpiar").click();
}

function textoDe(id) {
  return document.getElementById(id).textContent;
}

function tieneClase(id, clase) {
  return document.getElementById(id).classList.contains(clase);
}

function resumenVisible() {
  return document.getElementById("resumen").classList.contains("visible");
}

function datosValidos() {
  return {
    nombre: "  Ana Lopez  ",
    email: "  ana@example.com  ",
    edad: "  25  ",
    password: "123456",
    repetirPassword: "123456",
    terminos: true,
  };
}

function rellenarFormularioInvalido() {
  rellenarFormulario({
    nombre: "",
    email: "correo-invalido",
    edad: "17",
    password: "123",
    repetirPassword: "",
    terminos: false,
  });
}

describe("Carga inicial de la aplicación", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    - El mensaje general debe empezar vacío.
    - El resumen debe empezar oculto.
    - Los tres campos del resumen deben mostrar "--".
    - Todos los mensajes de error por campo deben empezar vacíos.
    - Ningún input debe empezar marcado como correcto o error.
  */

  /*
    SOLUCION / CONSULTA:
    - Se carga el DOM con cargarAplicacion().
    - Se revisan textos iniciales con textoDe(id).
    - Se usa resumenVisible() para comprobar que el resumen empieza oculto.
    - Se recorren los inputs para confirmar que no tienen input-error ni input-correcto.
  */

  test("el mensaje general empieza vacio", () => {
    expect(textoDe("mensajeGeneral")).toBe("");
  });

  test("el resumen empieza oculto", () => {
    expect(resumenVisible()).toBe(false);
  });

  test("los tres campos del resumen muestran guiones", () => {
    expect(textoDe("resumenNombre")).toBe("--");
    expect(textoDe("resumenEmail")).toBe("--");
    expect(textoDe("resumenEdad")).toBe("--");
  });

  test("todos los mensajes de error por campo empiezan vacios", () => {
    expect(textoDe("errorNombre")).toBe("");
    expect(textoDe("errorEmail")).toBe("");
    expect(textoDe("errorEdad")).toBe("");
    expect(textoDe("errorPassword")).toBe("");
    expect(textoDe("errorRepetirPassword")).toBe("");
    expect(textoDe("errorTerminos")).toBe("");
  });

  test("ningun input empieza marcado como correcto o error", () => {
    ["nombre", "email", "edad", "password", "repetirPassword"].forEach((id) => {
      expect(tieneClase(id, "input-correcto")).toBe(false);
      expect(tieneClase(id, "input-error")).toBe(false);
    });
  });
});

describe("Envío válido del formulario", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    - Con todos los datos correctos debe aparecer el mensaje general correcto.
    - Con todos los datos correctos el resumen debe mostrarse.
    - El resumen debe mostrar los datos limpios (sin espacios sobrantes).
    - No debe aparecer ningún mensaje de error por campo.
    - Los inputs de texto válidos deben quedar marcados como correctos.
    - El mensaje general debe llevar la clase CSS de correcto.
  */

  /*
    SOLUCION / CONSULTA:
    - datosValidos() rellena un formulario correcto con espacios alrededor.
    - enviarFormulario() simula el submit real del usuario.
    - Se comprueba mensaje de exito, resumen visible, datos limpios, errores vacios
      y clases CSS de exito.
  */

  test("con todos los datos correctos aparece el mensaje general correcto", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("mensajeGeneral")).toBe("Formulario enviado correctamente.");
  });

  test("con todos los datos correctos el resumen se muestra", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(resumenVisible()).toBe(true);
  });

  test("el resumen muestra los datos limpios", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("resumenNombre")).toBe("Ana Lopez");
    expect(textoDe("resumenEmail")).toBe("ana@example.com");
    expect(textoDe("resumenEdad")).toBe("25");
  });

  test("no aparece ningun mensaje de error por campo", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("errorNombre")).toBe("");
    expect(textoDe("errorEmail")).toBe("");
    expect(textoDe("errorEdad")).toBe("");
    expect(textoDe("errorPassword")).toBe("");
    expect(textoDe("errorRepetirPassword")).toBe("");
    expect(textoDe("errorTerminos")).toBe("");
  });

  test("los inputs de texto validos quedan marcados como correctos", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    ["nombre", "email", "edad", "password", "repetirPassword"].forEach((id) => {
      expect(tieneClase(id, "input-correcto")).toBe(true);
      expect(tieneClase(id, "input-error")).toBe(false);
    });
  });

  test("el mensaje general lleva la clase CSS de correcto", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(tieneClase("mensajeGeneral", "correcto")).toBe(true);
  });
});

describe("Errores de validación integrados en el DOM", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    Nombre
    - Si el nombre está vacío debe aparecer el error correspondiente en errorNombre.
    - Si el nombre es demasiado corto debe aparecer el error correspondiente en errorNombre.
    - Si el nombre es inválido, el input nombre debe quedar con clase input-error.
*/
  /*
    SOLUCION / CONSULTA:
    - Para cada campo se parte de datosValidos() y se cambia solo el dato que se quiere probar.
    - El texto esperado se obtiene desde las funciones de validacion del modulo.
    - La integracion con el DOM se valida leyendo errorNombre, errorEmail, etc.
    - La parte visual se valida con tieneClase(id, "input-error").
  */

  test("si el nombre esta vacio aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(textoDe("errorNombre")).toBe(FormularioRegistro.validarNombre(""));
  });

  test("si el nombre es demasiado corto aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "Al" });
    enviarFormulario();

    expect(textoDe("errorNombre")).toBe(FormularioRegistro.validarNombre("Al"));
  });

  test("si el nombre es invalido queda con clase input-error", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(tieneClase("nombre", "input-error")).toBe(true);
  });
  /*
    Email
    - Si el email está vacío debe aparecer el error correspondiente en errorEmail.
    - Si el email tiene formato inválido debe aparecer el error correspondiente en errorEmail.
    - Si el email es inválido, el input email debe quedar con clase input-error.
*/
  test("si el email esta vacio aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), email: "" });
    enviarFormulario();

    expect(textoDe("errorEmail")).toBe(FormularioRegistro.validarEmail(""));
  });

  test("si el email tiene formato invalido aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), email: "anaexample.com" });
    enviarFormulario();

    expect(textoDe("errorEmail")).toBe(
      FormularioRegistro.validarEmail("anaexample.com"),
    );
  });

  test("si el email es invalido queda con clase input-error", () => {
    rellenarFormulario({ ...datosValidos(), email: "anaexample.com" });
    enviarFormulario();

    expect(tieneClase("email", "input-error")).toBe(true);
  });

  /*
    Edad
    - Si la edad está vacía debe aparecer el error correspondiente en errorEdad.
    - Si la edad es menor de 18 debe aparecer el error correspondiente en errorEdad.
    - Si la edad no es un entero válido debe aparecer el error correspondiente en errorEdad.
    - Si la edad es inválida, el input edad debe quedar con clase input-error.
*/
  test("si la edad esta vacia aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), edad: "" });
    enviarFormulario();

    expect(textoDe("errorEdad")).toBe(FormularioRegistro.validarEdad(""));
  });

  test("si la edad es menor de 18 aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), edad: "17" });
    enviarFormulario();

    expect(textoDe("errorEdad")).toBe(FormularioRegistro.validarEdad("17"));
  });

  test("si la edad no es un entero valido aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), edad: "18.5" });
    enviarFormulario();

    expect(textoDe("errorEdad")).toBe(FormularioRegistro.validarEdad("18.5"));
  });

  test("si la edad es invalida queda con clase input-error", () => {
    rellenarFormulario({ ...datosValidos(), edad: "17" });
    enviarFormulario();

    expect(tieneClase("edad", "input-error")).toBe(true);
  });

  /*
    Contraseña
    - Si la contraseña está vacía debe aparecer el error correspondiente en errorPassword.
    - Si la contraseña es demasiado corta debe aparecer el error correspondiente en errorPassword.
    - Si la contraseña es inválida, el input password debe quedar con clase input-error.
*/

  test("si la contrasena esta vacia aparece el error correspondiente", () => {
    rellenarFormulario({
      ...datosValidos(),
      password: "",
      repetirPassword: "",
    });
    enviarFormulario();

    expect(textoDe("errorPassword")).toBe(
      FormularioRegistro.validarPassword(""),
    );
  });

  test("si la contrasena es demasiado corta aparece el error correspondiente", () => {
    rellenarFormulario({
      ...datosValidos(),
      password: "12345",
      repetirPassword: "12345",
    });
    enviarFormulario();

    expect(textoDe("errorPassword")).toBe(
      FormularioRegistro.validarPassword("12345"),
    );
  });

  test("si la contrasena es invalida queda con clase input-error", () => {
    rellenarFormulario({
      ...datosValidos(),
      password: "",
      repetirPassword: "",
    });
    enviarFormulario();

    expect(tieneClase("password", "input-error")).toBe(true);
  });

  /*
    Repetir contraseña
    - Si repetirPassword está vacía debe aparecer el error correspondiente en errorRepetirPassword.
    - Si no coincide con la contraseña debe aparecer el error correspondiente en errorRepetirPassword.
    - Si repetirPassword es inválida, el input repetirPassword debe quedar con clase input-error.
*/
  test("si repetirPassword esta vacia aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), repetirPassword: "" });
    enviarFormulario();

    expect(textoDe("errorRepetirPassword")).toBe(
      FormularioRegistro.validarRepetirPassword("123456", ""),
    );
  });

  test("si no coincide con la contrasena aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), repetirPassword: "654321" });
    enviarFormulario();

    expect(textoDe("errorRepetirPassword")).toBe(
      FormularioRegistro.validarRepetirPassword("123456", "654321"),
    );
  });
  test("si repetirPassword es invalida queda con clase input-error", () => {
    rellenarFormulario({ ...datosValidos(), repetirPassword: "" });
    enviarFormulario();

    expect(tieneClase("repetirPassword", "input-error")).toBe(true);
  });
  
  /**Términos
    - Si no se aceptan los términos debe aparecer el error correspondiente en errorTerminos.
 */

  test("si no se aceptan los terminos aparece el error correspondiente", () => {
    rellenarFormulario({ ...datosValidos(), terminos: false });
    enviarFormulario();

    expect(textoDe("errorTerminos")).toBe(
      FormularioRegistro.validarTerminos(false),
    );
  });
  /*
    
    Comportamiento general con error
    - Si hay cualquier error, el mensaje general debe indicar que se revisen los errores.
    - Si hay cualquier error, el mensaje general debe llevar la clase CSS de error.
    - Si hay cualquier error, el resumen debe permanecer oculto.
  */

  test("si hay cualquier error el mensaje general indica que se revisen los errores", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(textoDe("mensajeGeneral")).toBe(
      "Revisa los errores del formulario.",
    );
  });

  test("si hay cualquier error el mensaje general lleva la clase CSS de error", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(tieneClase("mensajeGeneral", "error")).toBe(true);
  });

  test("si hay cualquier error el resumen permanece oculto", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(resumenVisible()).toBe(false);
  });
});

describe("Varios errores simultáneos", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    - Si varios campos son incorrectos a la vez, deben aparecer varios mensajes de error simultáneamente.
    - Si varios campos son incorrectos a la vez, cada input incorrecto debe quedar marcado con input-error.
    - Si varios campos son incorrectos a la vez, el resumen debe seguir oculto.
    - Si varios campos son incorrectos a la vez, el mensaje general debe ser el de error.
  */

  /*
    SOLUCION / CONSULTA:
    - rellenarFormularioInvalido() prepara varios campos incorrectos a la vez.
    - Se comprueba que todos los errores tengan texto.
    - Se confirma que cada input incorrecto queda marcado con input-error.
    - El resumen debe quedarse oculto y el mensaje general debe ser el de error.
  */

  test("aparecen varios mensajes de error simultaneamente", () => {
    rellenarFormularioInvalido();
    enviarFormulario();

    expect(textoDe("errorNombre")).not.toBe("");
    expect(textoDe("errorEmail")).not.toBe("");
    expect(textoDe("errorEdad")).not.toBe("");
    expect(textoDe("errorPassword")).not.toBe("");
    expect(textoDe("errorRepetirPassword")).not.toBe("");
    expect(textoDe("errorTerminos")).not.toBe("");
  });

  test("cada input incorrecto queda marcado con input-error", () => {
    rellenarFormularioInvalido();
    enviarFormulario();

    ["nombre", "email", "edad", "password", "repetirPassword"].forEach((id) => {
      expect(tieneClase(id, "input-error")).toBe(true);
    });
  });

  test("el resumen sigue oculto", () => {
    rellenarFormularioInvalido();
    enviarFormulario();

    expect(resumenVisible()).toBe(false);
  });

  test("el mensaje general es el de error", () => {
    rellenarFormularioInvalido();
    enviarFormulario();

    expect(textoDe("mensajeGeneral")).toBe(
      "Revisa los errores del formulario.",
    );
  });
});

describe("Integración del resumen", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    - Tras un envío válido, resumenNombre debe mostrar el nombre.
    - Tras un envío válido, resumenEmail debe mostrar el email.
    - Tras un envío válido, resumenEdad debe mostrar la edad.
    - Tras un envío inválido, el resumen no debe mostrarse.
    - Si antes hubo un envío válido y luego uno inválido, el resumen debe ocultarse otra vez.
  */

  /*
    SOLUCION / CONSULTA:
    - Con un envio valido se comprueban resumenNombre, resumenEmail y resumenEdad.
    - Con un envio invalido se comprueba que resumenVisible() sea false.
    - Para probar el cambio de estado, primero se envia bien y despues se envia mal.
  */

  test("tras un envio valido resumenNombre muestra el nombre", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("resumenNombre")).toBe("Ana Lopez");
  });

  test("tras un envio valido resumenEmail muestra el email", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("resumenEmail")).toBe("ana@example.com");
  });

  test("tras un envio valido resumenEdad muestra la edad", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();

    expect(textoDe("resumenEdad")).toBe("25");
  });

  test("tras un envio invalido el resumen no se muestra", () => {
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(resumenVisible()).toBe(false);
  });

  test("si antes hubo un envio valido y luego uno invalido el resumen se oculta otra vez", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();
    rellenarFormulario({ ...datosValidos(), nombre: "" });
    enviarFormulario();

    expect(resumenVisible()).toBe(false);
  });
});

describe("Botón limpiar", () => {
  beforeEach(() => {
    cargarAplicacion();
  });

  /*
    TODO: Casos a testear:

    - Debe vaciar todos los inputs de texto.
    - Debe desmarcar el checkbox de términos.
    - Debe borrar todos los mensajes de error.
    - Debe borrar el mensaje general.
    - Debe ocultar el resumen.
    - Debe restaurar los textos del resumen a "--".
    - Debe quitar las clases input-error e input-correcto de los inputs.
  */

  /*
    SOLUCION / CONSULTA:
    - Se deja el formulario con datos, errores o resumen visible segun el caso.
    - clickLimpiar() ejecuta el boton limpiar.
    - Se revisa que inputs, checkbox, mensajes, resumen y clases vuelvan al estado inicial.
  */

  test("vacia todos los inputs de texto", () => {
    rellenarFormulario(datosValidos());
    clickLimpiar();

    expect(document.getElementById("nombre").value).toBe("");
    expect(document.getElementById("email").value).toBe("");
    expect(document.getElementById("edad").value).toBe("");
    expect(document.getElementById("password").value).toBe("");
    expect(document.getElementById("repetirPassword").value).toBe("");
  });

  test("desmarca el checkbox de terminos", () => {
    rellenarFormulario(datosValidos());
    clickLimpiar();

    expect(document.getElementById("terminos").checked).toBe(false);
  });

  test("borra todos los mensajes de error", () => {
    rellenarFormularioInvalido();
    enviarFormulario();
    clickLimpiar();

    expect(textoDe("errorNombre")).toBe("");
    expect(textoDe("errorEmail")).toBe("");
    expect(textoDe("errorEdad")).toBe("");
    expect(textoDe("errorPassword")).toBe("");
    expect(textoDe("errorRepetirPassword")).toBe("");
    expect(textoDe("errorTerminos")).toBe("");
  });

  test("borra el mensaje general", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();
    clickLimpiar();

    expect(textoDe("mensajeGeneral")).toBe("");
  });

  test("oculta el resumen", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();
    clickLimpiar();

    expect(resumenVisible()).toBe(false);
  });

  test("restaura los textos del resumen a guiones", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();
    clickLimpiar();

    expect(textoDe("resumenNombre")).toBe("--");
    expect(textoDe("resumenEmail")).toBe("--");
    expect(textoDe("resumenEdad")).toBe("--");
  });

  test("quita las clases input-error e input-correcto de los inputs", () => {
    rellenarFormulario(datosValidos());
    enviarFormulario();
    clickLimpiar();

    ["nombre", "email", "edad", "password", "repetirPassword"].forEach((id) => {
      expect(tieneClase(id, "input-error")).toBe(false);
      expect(tieneClase(id, "input-correcto")).toBe(false);
    });
  });
});
