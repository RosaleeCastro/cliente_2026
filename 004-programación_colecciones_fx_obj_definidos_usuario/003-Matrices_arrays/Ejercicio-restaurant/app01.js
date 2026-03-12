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
  //normailizamos el texto para que coincida con lo que espera el servidor
  let nombrePlato = inputPlato.value.trim().toLowerCase();

  //validamos el campo vacío
  if (nombrePlato === "") {
    mostrarMensaje("Debes escribir un plato.");
    return;
  }

  try {
    // hacemos fetch  y enviamos el plato al servidor para que ejecute y nos devuleva una respuesta
    const respuesta = await fetch(
      `validar_plato.php?nombre=${encodeURIComponent(nombrePlato)}`,
    );

    //Recibimos la respuesta y la convertimos en json
    const datos = await respuesta.json();

    // si el plato no es válido, mostrar mensaje y terminar
    if (!datos.valido) {
      mostrarMensaje(datos.mensaje);
      return;
    }

    //crear el nuevo pedido
    ultimoId++;

    let pedido = {
      id: ultimoId,
      nombre: nombrePlato,
      tipoCoccion: datos.tipoCoccion,
      estado: "espera",
    };

    //Añadir a la cola de espera

    colaEspera.push(pedido);

    //Actualizar interfaz
    renderColas();

    //Mensaje informativo
    mostrarMensaje(`Pedido añadido : ${pedido.nombre}→ ${pedido.tipoCoccion}`);

    //Limpiar input
    inputPlato.value = "";
    inputPlato.focus();
  } catch (error) {
    console.error(error);
    mostrarMensaje(`Error al conectat con el servidor.`);
  }

  const datos = await respuesta.json();

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
