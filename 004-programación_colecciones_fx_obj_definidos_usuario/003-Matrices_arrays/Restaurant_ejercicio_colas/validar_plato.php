<?php
header("Content-Type: application/json; charset=UTF-8");

$nombre = $_GET["nombre"] ?? "";
$nombre = trim(strtolower($nombre));

$platos = [
    "hamburguesa" => "plancha",
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
        "mensaje" => "El plato introducido no es valido"
    ]);
}
?>
