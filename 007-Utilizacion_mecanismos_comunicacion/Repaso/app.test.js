require("./app.js");

test("calcularTotalVotos", () => {
  //preparodatos
  const encuentas = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 2 },
      { id: "javascript", texto: "JavaScript", votos: 3 },
    ],
  };
  //ejecuto funcion
  const total = globalThis.MiniEncuesta.calcularTotalVotos(encuentas);

  //campruebo resultado
  expect(total).toBe(5);
});

test("calcularPorcentaje", () => {
  const total = globalThis.MiniEncuesta.calcularPorcentaje(2, 4);
  expect(total).toBe(50);
});
test("si el total de votos es 0, el porcentaje es 0", () => {
  const porcentaje = globalThis.MiniEncuesta.calcularPorcentaje(0, 0);

  expect(porcentaje).toBe(0);
});

test("busca opcion por id ", () => {
  const encuesta = {
    opciones: [
      { id: "html", texto: "HTML y CSS", votos: 0 },
      { id: "javascript", texto: "JavaScript", votos: 0 },
    ],
  };
  const opcion = globalThis.MiniEncuesta.buscarOpcionPorId(encuesta, "html");

  expect(opcion.texto).toBe("HTML y CSS");
});

test("registra voto correcto", () => {
  // entrada
  const encuesta = {
    opciones: [{ id: "html", texto: "HTML y CSS", votos: 0 }],
  };
  // ejecucion
  const reslutado = globalThis.MiniEncuesta.registrarVoto(encuesta, "html");
  //esperado
  expect(reslutado.correcto).toBe(true);
  expect(encuesta.opciones[0].votos).toBe(1);
});

test("da error si no se selecciona ninguna opción", () => {
  const encuesta = {
    opciones: [{ id: "html", texto: "HTML y CSS", votos: 0 }],
  };

  const resultado = globalThis.MiniEncuesta.registrarVoto(encuesta, null);

  expect(resultado.correcto).toBe(false);
  expect(resultado.mensaje).toBe(
    "Debes seleccionar una opción antes de votar.",
  );
});
