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

// Estaciones ocupadas o libres
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

// Mostrar mensajes en pantalla
function mostrarMensaje(texto) {
  mensajes.textContent = texto;
}

// Dibujar todas las colas
function renderColas() {
  listaEspera.innerHTML = "";
  listaParrilla.innerHTML = "";
  listaHorno.innerHTML = "";
  listaPlancha.innerHTML = "";
  listaEmplatado.innerHTML = "";

  colaEspera.forEach((pedido) => {
    listaEspera.innerHTML += `<li>${pedido.nombre} (#${pedido.id})</li>`;
  });

  colaParrilla.forEach((pedido) => {
    listaParrilla.innerHTML += `<li>${pedido.nombre} (#${pedido.id})</li>`;
  });

  colaHorno.forEach((pedido) => {
    listaHorno.innerHTML += `<li>${pedido.nombre} (#${pedido.id})</li>`;
  });

  colaPlancha.forEach((pedido) => {
    listaPlancha.innerHTML += `<li>${pedido.nombre} (#${pedido.id})</li>`;
  });

  colaEmplatado.forEach((pedido) => {
    listaEmplatado.innerHTML += `<li>${pedido.nombre} (#${pedido.id})</li>`;
  });

  contadorTerminados.textContent = platosTerminados;
}

// De momento solo estructura
async function agregarPedido() {
  let nombrePlato = inputPlato.value.trim().toLowerCase();

  if (nombrePlato === "") {
    mostrarMensaje("Debes escribir un plato.");
    return;
  }

  // Aquí luego haremos fetch al servidor para validar
  mostrarMensaje("Aquí validaremos el plato con el servidor.");
}

// Luego implementaremos esta lógica
function avanzarAPreparacion() {
  // pendiente
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

// Pintado inicial
renderColas();
