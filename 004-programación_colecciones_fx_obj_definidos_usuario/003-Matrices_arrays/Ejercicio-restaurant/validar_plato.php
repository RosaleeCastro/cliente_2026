<?php
header("Content-type: application/json; charset=UTF-8");

//Recibir el plato enviado por GET
$nombre =$_GET["nombre"]?? "";
$nombre = trim(strtolower($nombre));

//Lista de platos válidos y su tipo de cocción
$platos = [
  "hamburguesa" =>"plancha",
  "bacon" => "plancha",
  "chuletas" => "parrilla",
  "costillas" => "parrilla",
  "cordero" => "horno",
  "arroz al horno" => "horno"
];

if (array_key_exists($nombre, $platos)) {
    echo json_encode([
        "valido" => true,
        "tipoCoccion" => $platos[$nombre]
    ]);
} else {
    echo json_encode([
        "valido" => false,
        "mensaje" => "El plato introducido no es válido"
    ]);
}

?>