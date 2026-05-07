
/*
*Instanciamos nuevos elementos de la clase cola depende en que situaión o donde se va ver su estado actual 
*/

const colaEspera = new Cola();
const colaParrilla = new Cola();
const colaHorno = new Cola();
const colaPlancha = new Cola();
const colaEmplatado = new Cola();

//Variables que nos serviran para contabilizar 
let ultimoId = 0;
let platosTerminados = 0;

//boleanos que nos permiten gestionar la cola 
let parrillaOcupada = false;
let hornoOcupado = false;
let planchaOcupada = false;
let emplatadoOcupado = false;

//Capturta de elementos del DOM
const inputPlato = document.getElementById("inputPlato");
const btnAgregar = document.getElementById("btnAgregar");
const mensajes = document.getElementById("mensajes");
const contadorTerminados = document.getElementById("contadorTerminados");

const listaEspera = document.getElementById("listaEspera");
const listaParrilla = document.getElementById("listaParrilla");
const listaHorno = document.getElementById("listaHorno");
const listaPlancha = document.getElementById("listaPlancha");
const listaEmplatado = document.getElementById("listaEmplatado");

function mostrarMensaje(texto) {
  mensajes.innerHTML = texto;
}

function pintarCola(lista, cola) {
  lista.innerHTML = "";

  cola.toArray().forEach((pedido) => {
    const li = document.createElement("li");
    li.textContent = `${pedido.nombre} (#${pedido.id}) - ${pedido.estado}`;
    lista.appendChild(li);
  });
}

function renderColas() {
  pintarCola(listaEspera, colaEspera);
  pintarCola(listaParrilla, colaParrilla);
  pintarCola(listaHorno, colaHorno);
  pintarCola(listaPlancha, colaPlancha);
  pintarCola(listaEmplatado, colaEmplatado);
  contadorTerminados.textContent = platosTerminados;
}

function obtenerColaPreparacion(tipoCoccion) {
  if (tipoCoccion === "parrilla") return colaParrilla;
  if (tipoCoccion === "horno") return colaHorno;
  if (tipoCoccion === "plancha") return colaPlancha;
  return null;
}

function estaOcupada(tipoCoccion) {
  if (tipoCoccion === "parrilla") return parrillaOcupada;
  if (tipoCoccion === "horno") return hornoOcupado;
  if (tipoCoccion === "plancha") return planchaOcupada;
  return false;
}

function cambiarOcupacion(tipoCoccion, valor) {
  if (tipoCoccion === "parrilla") parrillaOcupada = valor;
  if (tipoCoccion === "horno") hornoOcupado = valor;
  if (tipoCoccion === "plancha") planchaOcupada = valor;
}

async function agregarPedido() {
  const nombrePlato = inputPlato.value.trim().toLowerCase();

  if (nombrePlato === "") {
    mostrarMensaje("Escribe un plato antes de anadirlo.");
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

    const pedido = {
      id: ultimoId,
      nombre: nombrePlato,
      tipoCoccion: datos.tipoCoccion,
      estado: "en espera",
    };

    colaEspera.enqueue(pedido);
    renderColas();
    mostrarMensaje(`Pedido anadido: ${pedido.nombre}.`);

    inputPlato.value = "";
    inputPlato.focus();

    avanzarAPreparacion();
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo validar el plato con el servidor.");
  }
}

function avanzarAPreparacion() {
  const nuevaEspera = new Cola();

  while (!colaEspera.isEmpty()) {
    const pedido = colaEspera.dequeue();
    const colaDestino = obtenerColaPreparacion(pedido.tipoCoccion);

    if (colaDestino && colaDestino.size() < 3) {
      pedido.estado = `en cola de ${pedido.tipoCoccion}`;
      colaDestino.enqueue(pedido);
    } else {
      nuevaEspera.enqueue(pedido);
    }
  }

  while (!nuevaEspera.isEmpty()) {
    colaEspera.enqueue(nuevaEspera.dequeue());
  }

  renderColas();
  intentarIniciarCoccion("parrilla");
  intentarIniciarCoccion("horno");
  intentarIniciarCoccion("plancha");
}

function intentarIniciarCoccion(tipoCoccion) {
  const cola = obtenerColaPreparacion(tipoCoccion);

  if (!cola || cola.isEmpty() || estaOcupada(tipoCoccion)) {
    return;
  }

  const pedido = cola.front();
  pedido.estado = "cocinando";
  cambiarOcupacion(tipoCoccion, true);
  renderColas();
  cocinarPedido(pedido);
}

async function cocinarPedido(pedido) {
  try {
    const respuesta = await fetch(
      `info_coccion.php?nombre=${encodeURIComponent(pedido.nombre)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      cambiarOcupacion(pedido.tipoCoccion, false);
      pedido.estado = `en cola de ${pedido.tipoCoccion}`;
      renderColas();
      mostrarMensaje(datos.mensaje);
      return;
    }

    const ingredientes = datos.ingredientes.join(", ");
    mostrarMensaje(
      `Cocinando ${pedido.nombre} en ${pedido.tipoCoccion}. Ingredientes: ${ingredientes}. Tiempo: ${datos.tiempoPreparacion}s.`,
    );

    setTimeout(() => {
      const colaPreparacion = obtenerColaPreparacion(pedido.tipoCoccion);
      colaPreparacion.dequeue();

      pedido.estado = "pendiente de emplatado";
      colaEmplatado.enqueue(pedido);
      cambiarOcupacion(pedido.tipoCoccion, false);

      renderColas();
      mostrarMensaje(`${pedido.nombre} ya paso a emplatado.`);

      intentarIniciarCoccion(pedido.tipoCoccion);
      avanzarAPreparacion();
      intentarIniciarEmplatado();
    }, datos.tiempoPreparacion * 1000);
  } catch (error) {
    console.error(error);
    cambiarOcupacion(pedido.tipoCoccion, false);
    pedido.estado = `en cola de ${pedido.tipoCoccion}`;
    renderColas();
    mostrarMensaje("Error al consultar la informacion de coccion.");
  }
}

function intentarIniciarEmplatado() {
  if (colaEmplatado.isEmpty() || emplatadoOcupado) {
    return;
  }

  const pedido = colaEmplatado.front();
  pedido.estado = "emplatando";
  emplatadoOcupado = true;
  renderColas();
  emplatarPedido(pedido);
}

async function emplatarPedido(pedido) {
  try {
    const respuesta = await fetch(
      `info_emplatado.php?nombre=${encodeURIComponent(pedido.nombre)}`,
    );
    const datos = await respuesta.json();

    if (!datos.valido) {
      pedido.estado = "pendiente de emplatado";
      emplatadoOcupado = false;
      renderColas();
      mostrarMensaje(datos.mensaje);
      return;
    }

    mostrarMensaje(
      `Emplatando ${pedido.nombre}. ${datos.descripcion}. Tiempo: ${datos.tiempoEmplatado}s.`,
    );

    setTimeout(async () => {
      colaEmplatado.dequeue();
      pedido.estado = "listo";
      emplatadoOcupado = false;

      await actualizarTerminados();
      renderColas();
      mostrarMensaje(`Plato listo: ${pedido.nombre}. ${datos.descripcion}`);

      intentarIniciarEmplatado();
    }, datos.tiempoEmplatado * 1000);
  } catch (error) {
    console.error(error);
    pedido.estado = "pendiente de emplatado";
    emplatadoOcupado = false;
    renderColas();
    mostrarMensaje("Error al consultar la informacion de emplatado.");
  }
}

async function actualizarTerminados() {
  try {
    const respuesta = await fetch("platosTerminados.php");
    const datos = await respuesta.json();

    if (datos.ok) {
      platosTerminados = datos.totalTerminados;
    }
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo actualizar el contador de platos terminados.");
  }
}

btnAgregar.addEventListener("click", agregarPedido);
inputPlato.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    agregarPedido();
  }
});

renderColas();
