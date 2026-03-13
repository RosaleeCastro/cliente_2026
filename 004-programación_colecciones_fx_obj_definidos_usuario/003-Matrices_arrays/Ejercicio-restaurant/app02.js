// --------------------
// COLAS
// --------------------
let colaEspera = [];
let colaParrilla = [];
let colaHorno = [];
let colaPlancha = [];
let colaEmplatado = [];

// --------------------
// CONTROL
// --------------------
let ultimoId = 0;
let platosTerminados = 0;

let parrillaOcupada = false;
let hornoOcupado = false;
let planchaOcupada = false;
let emplatadoOcupado = false;

// --------------------
// ELEMENTOS DEL DOM
// --------------------
const inputPlato = document.getElementById("inputPlato");
const btnAgregar = document.getElementById("btnAgregar");
const mensajes = document.getElementById("mensajes");
const contadorTerminados = document.getElementById("contadorTerminados");

const listaEspera = document.getElementById("listaEspera");
const listaParrilla = document.getElementById("listaParrilla");
const listaHorno = document.getElementById("listaHorno");
const listaPlancha = document.getElementById("listaPlancha");
const listaEmplatado = document.getElementById("listaEmplatado");

// --------------------
// FUNCIONES
// --------------------
function mostrarMensaje(texto) {
  mensajes.textContent = texto;
}

function renderColas() {
  listaEspera.innerHTML = "";
  listaParrilla.innerHTML = "";
  listaHorno.innerHTML = "";
  listaPlancha.innerHTML = "";
  listaEmplatado.innerHTML = "";

  colaEspera.forEach((pedido) => {
    listaEspera.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaParrilla.forEach((pedido) => {
    listaParrilla.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaHorno.forEach((pedido) => {
    listaHorno.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaPlancha.forEach((pedido) => {
    listaPlancha.innerHTML += `<li>${pedido.nombre} (#${pedido.id}) - ${pedido.estado}</li>`;
  });

  colaEmplatado.forEach((pedido) => {
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

function avanzarAPreparacion() {
  let nuevaColaEspera = [];

  colaEspera.forEach((pedido) => {
    let colaDestino = obtenerColaPreparacion(pedido.tipoCoccion);

    if (!colaDestino) {
      nuevaColaEspera.push(pedido);
      return;
    }

    if (colaDestino.length < 3) {
      pedido.estado = "preparacion";
      colaDestino.push(pedido);
    } else {
      nuevaColaEspera.push(pedido);
    }
  });

  colaEspera = nuevaColaEspera;

  renderColas();
}

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

    colaEspera.push(pedido);

    avanzarAPreparacion();

    mostrarMensaje(`Pedido añadido: ${pedido.nombre} → ${pedido.tipoCoccion}`);

    inputPlato.value = "";
    inputPlato.focus();
  } catch (error) {
    console.error(error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
}

function iniciarCoccion(tipoCoccion) {
  // pendiente
}

function iniciarEmplatado() {
  // pendiente
}

// --------------------
// EVENTOS
// --------------------
btnAgregar.addEventListener("click", agregarPedido);

renderColas();
