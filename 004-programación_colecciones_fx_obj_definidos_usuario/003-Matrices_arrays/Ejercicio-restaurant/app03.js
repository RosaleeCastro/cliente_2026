// =========================
// COLAS
// =========================
let colaEspera = [];
let colaParrilla = [];
let colaHorno = [];
let colaPlancha = [];
let colaEmplatado = [];

// =========================
// CONTROL GENERAL
// =========================
let ultimoId = 0;
let platosTerminados = 0;

// Booleanos para saber si una estación está ocupada
let parrillaOcupada = false;
let hornoOcupado = false;
let planchaOcupada = false;
let emplatadoOcupado = false; // todavía no se usa, quedará para el siguiente paso

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

// Ahora usamos innerHTML porque a veces mostraremos listas de ingredientes
function mostrarMensaje(textoHtml) {
  mensajes.innerHTML = textoHtml;
}

// Dibujar las colas en pantalla
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

// Devuelve la cola de preparación correspondiente
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

// Saber si una estación concreta está ocupada
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

// Cambiar el estado de ocupación de una estación
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

// Mover pedidos desde colaEspera a su cola correcta si hay hueco
function avanzarAPreparacion() {
  let nuevaColaEspera = [];

  colaEspera.forEach((pedido) => {
    let colaDestino = obtenerColaPreparacion(pedido.tipoCoccion);

    // Seguridad por si el tipo no coincide con ninguna cola
    if (!colaDestino) {
      nuevaColaEspera.push(pedido);
      return;
    }

    // Solo caben 3 pedidos como máximo en cada cola de cocina
    if (colaDestino.length < 3) {
      pedido.estado = "en cola de " + pedido.tipoCoccion;
      colaDestino.push(pedido);
    } else {
      nuevaColaEspera.push(pedido);
    }
  });

  colaEspera = nuevaColaEspera;

  renderColas();

  // Después de repartir, intentamos arrancar cocción en cada estación
  intentarIniciarCoccion("plancha");
  intentarIniciarCoccion("parrilla");
  intentarIniciarCoccion("horno");
}

// Si hay pedidos y la estación está libre, empieza el primero
function intentarIniciarCoccion(tipoCoccion) {
  let cola = obtenerColaPreparacion(tipoCoccion);

  if (!cola || cola.length === 0) {
    return;
  }

  if (estaOcupada(tipoCoccion)) {
    return;
  }

  let pedido = cola[0];
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
    // Validamos con el servidor el plato introducido
    const respuesta = await fetch(
      `validar_plato.php?nombre=${encodeURIComponent(nombrePlato)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      mostrarMensaje(datos.mensaje);
      return;
    }

    // Crear nuevo pedido
    ultimoId++;

    let pedido = {
      id: ultimoId,
      nombre: nombrePlato,
      tipoCoccion: datos.tipoCoccion,
      estado: "espera",
    };

    // Entra primero a la cola de espera
    colaEspera.push(pedido);

    // Intentar moverlo a la cola de preparación adecuada
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
    // Pedimos al servidor el tiempo y los ingredientes
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

      // Sale el primero de su cola de cocina
      cola.shift();

      // Pasa a emplatado, pero aún no lo procesamos
      pedido.estado = "pendiente de emplatado";
      colaEmplatado.push(pedido);

      // La estación queda libre
      cambiarOcupacion(pedido.tipoCoccion, false);

      renderColas();
      mostrarMensaje(
        `El plato ${pedido.nombre} terminó de cocinarse y pasó a la cola de emplatado.`,
      );

      // Si hay más platos en esta misma estación, arranca el siguiente
      intentarIniciarCoccion(pedido.tipoCoccion);

      // También revisamos si desde espera puede entrar alguien más
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
// Pendiente para el siguiente paso

function iniciarEmplatado() {
  // pendiente
}

// =========================
// EVENTOS
// =========================

btnAgregar.addEventListener("click", agregarPedido);

// Pintado inicial
renderColas();
