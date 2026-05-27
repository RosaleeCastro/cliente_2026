// =====================================================
// ESTADO INICIAL DE LA APLICACIÓN
// =====================================================

/**
 * Representa una opcion disponible dentro de la encuesta.
 *
 * @typedef {Object} OpcionEncuesta
 * @property {string} id - Identificador unico de la opcion.
 * @property {string} texto - Texto visible de la opcion.
 * @property {number} votos - Cantidad de votos recibidos.
 */

/**
 * Representa el estado completo de la encuesta.
 *
 * @typedef {Object} Encuesta
 * @property {string} pregunta - Pregunta que se muestra al usuario.
 * @property {OpcionEncuesta[]} opciones - Lista de opciones disponibles.
 */

/**
 * Representa el resultado de intentar registrar un voto.
 *
 * @typedef {Object} ResultadoVoto
 * @property {boolean} correcto - Indica si el voto se registro correctamente.
 * @property {string} mensaje - Mensaje informativo para mostrar al usuario.
 */

/**
 * Datos base usados para crear una encuesta limpia.
 *
 * @type {Encuesta}
 */
const datosIniciales = {
  pregunta: "¿Qué tecnología te gustaría practicar más?",
  opciones: [
    {
      id: "html",
      texto: "HTML y CSS",
      votos: 0,
    },
    {
      id: "javascript",
      texto: "JavaScript",
      votos: 0,
    },
    {
      id: "testing",
      texto: "Testing con Jest",
      votos: 0,
    },
    {
      id: "documentacion",
      texto: "Documentación con JSDoc",
      votos: 0,
    },
  ],
};

let estadoEncuesta = crearEstadoInicial();

// =====================================================
// FUNCIONES DE LÓGICA
// =====================================================

/**
 * Crea un nuevo estado inicial de la encuesta a partir de los datos base.
 *
 * @returns {Encuesta} Nueva encuesta con todas las opciones a cero votos.
 */
function crearEstadoInicial() {
  const opcionesIniciales = [];

  for (let i = 0; i < datosIniciales.opciones.length; i++) {
    const opcion = datosIniciales.opciones[i];

    opcionesIniciales.push({
      id: opcion.id,
      texto: opcion.texto,
      votos: 0,
    });
  }

  return {
    pregunta: datosIniciales.pregunta,
    opciones: opcionesIniciales,
  };
}

/**
 * Calcula el numero total de votos registrados en una encuesta.
 *
 * @param {Encuesta} encuesta - Encuesta de la que se quieren contar los votos.
 * @returns {number} Total de votos de todas las opciones.
 */
function calcularTotalVotos(encuesta) {
  let total = 0;

  for (let i = 0; i < encuesta.opciones.length; i++) {
    total += encuesta.opciones[i].votos;
  }

  return total;
}

/**
 * Calcula el porcentaje que representa una cantidad de votos respecto al total.
 *
 * @param {number} votos - Numero de votos de una opcion.
 * @param {number} total - Numero total de votos de la encuesta.
 * @returns {number} Porcentaje redondeado. Devuelve 0 si el total es 0.
 */
function calcularPorcentaje(votos, total) {
  if (total === 0) {
    return 0;
  }

  return Math.round((votos / total) * 100);
}

/**
 * Busca una opcion dentro de una encuesta usando su identificador.
 *
 * @param {Encuesta} encuesta - Encuesta en la que se realiza la busqueda.
 * @param {string} idOpcion - Identificador de la opcion buscada.
 * @returns {OpcionEncuesta|null} Opcion encontrada o null si no existe.
 */
function buscarOpcionPorId(encuesta, idOpcion) {
  for (let i = 0; i < encuesta.opciones.length; i++) {
    if (encuesta.opciones[i].id === idOpcion) {
      return encuesta.opciones[i];
    }
  }

  return null;
}

/**
 * Registra un voto en la opcion indicada de una encuesta.
 *
 * @param {Encuesta} encuesta - Encuesta que se va a modificar.
 * @param {string|null} idOpcion - Identificador de la opcion seleccionada.
 * @returns {ResultadoVoto} Resultado de la operacion con un mensaje asociado.
 */
function registrarVoto(encuesta, idOpcion) {
  if (!idOpcion) {
    return {
      correcto: false,
      mensaje: "Debes seleccionar una opción antes de votar.",
    };
  }

  const opcion = buscarOpcionPorId(encuesta, idOpcion);

  if (opcion === null) {
    return {
      correcto: false,
      mensaje: "La opción seleccionada no existe.",
    };
  }

  opcion.votos++;

  return {
    correcto: true,
    mensaje: "Voto registrado correctamente.",
  };
}

/**
 * Genera los resultados actuales de la encuesta con votos y porcentajes.
 *
 * @param {Encuesta} encuesta - Encuesta de la que se obtienen los resultados.
 * @returns {Array<Object>} Lista de resultados calculados por opcion.
 */
function obtenerResultados(encuesta) {
  const total = calcularTotalVotos(encuesta);
  const resultados = [];

  for (let i = 0; i < encuesta.opciones.length; i++) {
    const opcion = encuesta.opciones[i];

    resultados.push({
      id: opcion.id,
      texto: opcion.texto,
      votos: opcion.votos,
      porcentaje: calcularPorcentaje(opcion.votos, total),
    });
  }

  return resultados;
}

/**
 * Reinicia la encuesta global a su estado inicial.
 *
 * @returns {void}
 */
function reiniciarEncuesta() {
  estadoEncuesta = crearEstadoInicial();
}

// =====================================================
// FUNCIONES DE INTERFAZ
// =====================================================

/**
 * Muestra la pregunta de la encuesta en el elemento HTML correspondiente.
 *
 * @returns {void}
 */
function pintarPregunta() {
  const elementoPregunta = document.getElementById("pregunta");
  elementoPregunta.textContent = estadoEncuesta.pregunta;
}

/**
 * Crea y muestra en el DOM los botones de opcion de la encuesta.
 *
 * @returns {void}
 */
function pintarOpciones() {
  const contenedorOpciones = document.getElementById("contenedorOpciones");
  contenedorOpciones.innerHTML = "";

  for (let i = 0; i < estadoEncuesta.opciones.length; i++) {
    const opcion = estadoEncuesta.opciones[i];

    const label = document.createElement("label");
    label.className = "opcion";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "opcionEncuesta";
    input.value = opcion.id;

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opcion.texto));

    contenedorOpciones.appendChild(label);
  }
}

/**
 * Muestra en el DOM los votos, porcentajes y barras de resultado.
 *
 * @returns {void}
 */
function pintarResultados() {
  const contenedorResultados = document.getElementById("contenedorResultados");
  const totalVotos = document.getElementById("totalVotos");

  contenedorResultados.innerHTML = "";

  const resultados = obtenerResultados(estadoEncuesta);
  const total = calcularTotalVotos(estadoEncuesta);

  for (let i = 0; i < resultados.length; i++) {
    const resultado = resultados[i];

    const divResultado = document.createElement("div");
    divResultado.className = "resultado";

    const texto = document.createElement("p");
    texto.textContent =
      resultado.texto +
      ": " +
      resultado.votos +
      " votos (" +
      resultado.porcentaje +
      "%)";

    const barraContenedor = document.createElement("div");
    barraContenedor.className = "barra-contenedor";

    const barra = document.createElement("div");
    barra.className = "barra";
    barra.style.width = resultado.porcentaje + "%";

    barraContenedor.appendChild(barra);

    divResultado.appendChild(texto);
    divResultado.appendChild(barraContenedor);

    contenedorResultados.appendChild(divResultado);
  }

  totalVotos.textContent = "Total de votos: " + total;
}

/**
 * Muestra un mensaje de estado al usuario.
 *
 * @param {string} texto - Texto del mensaje.
 * @param {string} tipo - Tipo de mensaje. Puede ser "error" o "exito".
 * @returns {void}
 */
function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("mensaje");

  mensaje.textContent = texto;
  mensaje.className = "mensaje";

  if (tipo === "error") {
    mensaje.classList.add("error");
  }

  if (tipo === "exito") {
    mensaje.classList.add("exito");
  }
}

/**
 * Obtiene el valor de la opcion seleccionada por el usuario.
 *
 * @returns {string|null} Identificador de la opcion seleccionada o null.
 */
function obtenerOpcionSeleccionada() {
  const opcionSeleccionada = document.querySelector(
    "input[name='opcionEncuesta']:checked",
  );

  if (opcionSeleccionada === null) {
    return null;
  }

  return opcionSeleccionada.value;
}

/**
 * Desmarca todas las opciones de la encuesta en el formulario.
 *
 * @returns {void}
 */
function limpiarSeleccion() {
  const opciones = document.querySelectorAll("input[name='opcionEncuesta']");

  for (let i = 0; i < opciones.length; i++) {
    opciones[i].checked = false;
  }
}

/**
 * Actualiza toda la interfaz de la encuesta.
 *
 * @returns {void}
 */
function actualizarInterfaz() {
  pintarPregunta();
  pintarOpciones();
  pintarResultados();
}

// =====================================================
// EVENTOS
// =====================================================
/**
 * Configura los eventos principales del formulario y del boton de reinicio.
 *
 * @returns {void}
 */
function configurarEventos() {
  const formulario = document.getElementById("formEncuesta");
  const botonReiniciar = document.getElementById("btnReiniciar");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const idOpcion = obtenerOpcionSeleccionada();
    const resultado = registrarVoto(estadoEncuesta, idOpcion);

    if (resultado.correcto) {
      mostrarMensaje(resultado.mensaje, "exito");
      limpiarSeleccion();
      pintarResultados();
    } else {
      mostrarMensaje(resultado.mensaje, "error");
    }
  });

  botonReiniciar.addEventListener("click", function () {
    reiniciarEncuesta();
    actualizarInterfaz();
    mostrarMensaje("La encuesta se ha reiniciado.", "exito");
  });
}

// =====================================================
// INICIO DE LA APLICACIÓN
// =====================================================

/**
 * Inicializa la aplicacion pintando la interfaz y configurando los eventos.
 *
 * @returns {void}
 */
function iniciarAplicacion() {
  actualizarInterfaz();
  configurarEventos();
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

// =====================================================
// EXPORTACIÓN PARA PRUEBAS
// =====================================================

globalThis.MiniEncuesta = {
  crearEstadoInicial,
  calcularTotalVotos,
  calcularPorcentaje,
  buscarOpcionPorId,
  registrarVoto,
  obtenerResultados,
  reiniciarEncuesta,
};
