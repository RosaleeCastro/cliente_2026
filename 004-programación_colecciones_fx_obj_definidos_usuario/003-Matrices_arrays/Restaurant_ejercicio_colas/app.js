// =========================
// COLAS
// =========================
let colaEspera = new Cola();
let colaParrilla = new Cola();
let colaHorno = new Cola();
let colaPlancha = new Cola();
let colaEmplatado = new Cola();

// =========================
// CONTROL GENERAL
// =========================
let ultimoId = 0;
let platosTerminados = 0;

let parrillaOcupada = false;
let hornoOcupado = false;
let planchaOcupada = false;
let emplatadoOcupado = false;

// =========================
// ELEMENTOS DEL DOM
// =========================
const inputPlato = document.getElementById("inputPlato");
const btnAgregar = document.getElementById("btnAgregar");
const mensajes = document.getElementById("mensajes");
const contadorTerminados = document.getElementById("contadorTerminados");

const listaEspera = document.getElementById("listaEspera");
const listaParrilla = document.getElementById("listaParrilla");
const listaHorno = document.getElementById("listaHorno");
const listaPlancha = document.getElementById("listaPlancha");
const listaEmplatado = document.getElementById("listaEmplatado");

// =========================
// FUNCIONES DE APOYO
// =========================
function mostrarMensaje(textoHtml) {
  mensajes.innerHTML = textoHtml;
}

function renderColas() {
  listaEspera.innerHTML = "";
  listaParrilla.innerHTML = "";
  listaHorno.innerHTML = "";
  listaPlancha.innerHTML = "";
  listaEmplatado.innerHTML = "";

  colaEspera.toArray().forEach((pedido) => {
    listaEspera.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaParrilla.toArray().forEach((pedido) => {
    listaParrilla.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaHorno.toArray().forEach((pedido) => {
    listaHorno.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaPlancha.toArray().forEach((pedido) => {
    listaPlancha.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaEmplatado.toArray().forEach((pedido) => {
    listaEmplatado.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  contadorTerminados.textContent = platosTerminados;
}

function obtenerColaPreparacion(tipoCoccion) {
  if (tipoCoccion === "plancha") {
    return colaPlancha;
  }

  if (tipoCoccion === "parrilla") {
    return colaParrilla;
  }

  if (tipoCoccion === "horno") {
    return colaHorno;
  }

  return null;
}

function estaOcupada(tipoCoccion) {
  if (tipoCoccion === "plancha") {
    return planchaOcupada;
  }

  if (tipoCoccion === "parrilla") {
    return parrillaOcupada;
  }

  if (tipoCoccion === "horno") {
    return hornoOcupado;
  }

  return false;
}

function cambiarOcupacion(tipoCoccion, valor) {
  if (tipoCoccion === "plancha") {
    planchaOcupada = valor;
  }

  if (tipoCoccion === "parrilla") {
    parrillaOcupada = valor;
  }

  if (tipoCoccion === "horno") {
    hornoOcupado = valor;
  }
}

// =========================
// LÓGICA DE AVANCE A PREPARACIÓN
// =========================
function avanzarAPreparacion() {
  let nuevaColaEspera = new Cola();

  while (!colaEspera.isEmpty()) {
    let pedido = colaEspera.dequeue();
    let colaDestino = obtenerColaPreparacion(pedido.tipoCoccion);

    if (!colaDestino) {
      nuevaColaEspera.enqueue(pedido);
      continue;
    }

    if (colaDestino.size() < 3) {
      pedido.estado = "en cola de " + pedido.tipoCoccion;
      colaDestino.enqueue(pedido);
    } else {
      nuevaColaEspera.enqueue(pedido);
    }
  }

  colaEspera = nuevaColaEspera;

  renderColas();

  intentarIniciarCoccion("plancha");
  intentarIniciarCoccion("parrilla");
  intentarIniciarCoccion("horno");
}

function intentarIniciarCoccion(tipoCoccion) {
  let cola = obtenerColaPreparacion(tipoCoccion);

  if (!cola || cola.isEmpty()) {
    return;
  }

  if (estaOcupada(tipoCoccion)) {
    return;
  }

  let pedido = cola.front();
  pedido.estado = "cocinando";

  cambiarOcupacion(tipoCoccion, true);
  renderColas();

  iniciarCoccion(pedido);
}

// =========================
// AÑADIR PEDIDO
// =========================
async function agregarPedido() {
  let nombrePlato = inputPlato.value.trim().toLowerCase();

  if (nombrePlato === "") {
    mostrarMensaje("Debes escribir un plato.");
    return;
  }

  try {
    const respuesta = await fetch(
      `validar_plato.php?nombre=${encodeURIComponent(nombrePlato)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      mostrarMensaje(datos.mensaje);
      return;
    }

    ultimoId++;

    let pedido = {
      id: ultimoId,
      nombre: nombrePlato,
      tipoCoccion: datos.tipoCoccion,
      estado: "espera",
    };

    colaEspera.enqueue(pedido);

    avanzarAPreparacion();

    mostrarMensaje(`Pedido añadido: ${pedido.nombre} → ${pedido.tipoCoccion}`);

    inputPlato.value = "";
    inputPlato.focus();
  } catch (error) {
    console.error(error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

// =========================
// COCCIÓN
// =========================
async function iniciarCoccion(pedido) {
  try {
    const respuesta = await fetch(
      `info_coccion.php?nombre=${encodeURIComponent(pedido.nombre)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      mostrarMensaje(datos.mensaje);
      cambiarOcupacion(pedido.tipoCoccion, false);
      pedido.estado = "en cola de " + pedido.tipoCoccion;
      renderColas();
      return;
    }

    let listaIngredientes = datos.ingredientes
      .map((ingrediente) => `<li>${ingrediente}</li>`)
      .join("");

    mostrarMensaje(`
      <strong>Cocinando:</strong> ${pedido.nombre} en ${pedido.tipoCoccion}<br>
      <strong>Ingredientes:</strong>
      <ul>${listaIngredientes}</ul>
      <strong>Tiempo:</strong> ${datos.tiempoPreparacion} segundos
    `);

    setTimeout(() => {
      let cola = obtenerColaPreparacion(pedido.tipoCoccion);

      cola.dequeue();

      pedido.estado = "pendiente de emplatado";
      colaEmplatado.enqueue(pedido);

      cambiarOcupacion(pedido.tipoCoccion, false);

      renderColas();
      mostrarMensaje(
        `El plato ${pedido.nombre} terminó de cocinarse y pasó a la cola de emplatado.`,
      );

      intentarIniciarEmplatado();
      intentarIniciarCoccion(pedido.tipoCoccion);
      avanzarAPreparacion();
    }, datos.tiempoPreparacion * 1000);
  } catch (error) {
    console.error(error);

    cambiarOcupacion(pedido.tipoCoccion, false);
    pedido.estado = "en cola de " + pedido.tipoCoccion;

    renderColas();
    mostrarMensaje("Error al obtener la información de cocción del servidor.");
  }
}

// =========================
// EMPLATADO
// =========================
function intentarIniciarEmplatado() {
  if (colaEmplatado.isEmpty()) {
    return;
  }

  if (emplatadoOcupado) {
    return;
  }

  let pedido = colaEmplatado.front();
  pedido.estado = "emplatando";
  emplatadoOcupado = true;

  renderColas();
  iniciarEmplatado(pedido);
}

async function iniciarEmplatado(pedido) {
  try {
    const respuesta = await fetch(
      `info_emplatado.php?nombre=${encodeURIComponent(pedido.nombre)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      mostrarMensaje(datos.mensaje);
      pedido.estado = "pendiente de emplatado";
      emplatadoOcupado = false;
      renderColas();
      return;
    }

    mostrarMensaje(`
      <strong>Emplatando:</strong> ${pedido.nombre}<br>
      <strong>Descripción:</strong> ${datos.descripcion}<br>
      <strong>Tiempo de emplatado:</strong> ${datos.tiempoEmplatado} segundos
    `);

    setTimeout(async () => {
      colaEmplatado.dequeue();

      pedido.estado = "listo";

      await actualizarContadorTerminados();

      emplatadoOcupado = false;

      renderColas();
      mostrarMensaje(`
        <strong>Plato listo:</strong> ${pedido.nombre}<br>
        <strong>Descripción final:</strong> ${datos.descripcion}
      `);

      intentarIniciarEmplatado();
    }, datos.tiempoEmplatado * 1000);
  } catch (error) {
    console.error(error);
    pedido.estado = "pendiente de emplatado";
    emplatadoOcupado = false;
    renderColas();
    mostrarMensaje(
      "Error al obtener la información de emplatado del servidor.",
    );
  }
}

async function actualizarContadorTerminados() {
  try {
    const respuesta = await fetch("actualizar_terminados.php");
    const datos = await respuesta.json();

    if (datos.ok) {
      platosTerminados = datos.totalTerminados;
      renderColas();
    }
  } catch (error) {
    console.error(error);
    mostrarMensaje("Error al actualizar el contador de platos terminados.");
  }
}

// =========================
// EVENTOS
// =========================
btnAgregar.addEventListener("click", agregarPedido);

renderColas();
