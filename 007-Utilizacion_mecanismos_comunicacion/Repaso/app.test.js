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
  expect(total).tobe(5);
});

test("calcularPorcentaje", ()=>{
  const total = globalThis.MiniEncuesta.calcularPorcentaje(2, 4);
  expect(total).tobe(50);
})


