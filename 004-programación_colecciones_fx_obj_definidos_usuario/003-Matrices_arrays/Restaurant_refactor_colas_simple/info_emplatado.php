<?php
header("Content-Type: application/json; charset=UTF-8");

$nombre = $_GET["nombre"] ?? "";
$nombre = trim(strtolower($nombre));

$platos = [
    "hamburguesa" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Hamburguesa montada y servida en plato llano."
    ],
    "bacon" => [
        "tiempoEmplatado" => 2,
        "descripcion" => "Bacon crujiente presentado en bandeja caliente."
    ],
    "chuletas" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Chuletas servidas con presentacion sencilla."
    ],
    "costillas" => [
        "tiempoEmplatado" => 4,
        "descripcion" => "Costillas servidas con salsa por encima."
    ],
    "cordero" => [
        "tiempoEmplatado" => 4,
        "descripcion" => "Cordero emplatado como plato principal de horno."
    ],
    "arroz al horno" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Arroz al horno servido en plato hondo."
    ]
];

if (array_key_exists($nombre, $platos)) {
    echo json_encode([
        "valido" => true,
        "tiempoEmplatado" => $platos[$nombre]["tiempoEmplatado"],
        "descripcion" => $platos[$nombre]["descripcion"]
    ]);
} else {
    echo json_encode([
        "valido" => false,
        "mensaje" => "No hay informacion de emplatado para ese plato."
    ]);
}
