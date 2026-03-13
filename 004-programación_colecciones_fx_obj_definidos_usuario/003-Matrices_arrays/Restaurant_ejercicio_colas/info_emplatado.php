<?php
header("Content-Type: application/json; charset=UTF-8");

$nombre = $_GET["nombre"] ?? "";
$nombre = trim(strtolower($nombre));

$platos = [
    "hamburguesa" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Hamburguesa montada con pan, carne, queso y lechuga, servida en plato llano."
    ],
    "bacon" => [
        "tiempoEmplatado" => 2,
        "descripcion" => "Bacon crujiente colocado en bandeja caliente con presentación simple."
    ],
    "chuletas" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Chuletas servidas con decoración básica y jugos de cocción."
    ],
    "costillas" => [
        "tiempoEmplatado" => 4,
        "descripcion" => "Costillas colocadas con salsa por encima y presentación rústica."
    ],
    "cordero" => [
        "tiempoEmplatado" => 4,
        "descripcion" => "Cordero servido con acabado cuidado y presentación principal de horno."
    ],
    "arroz al horno" => [
        "tiempoEmplatado" => 3,
        "descripcion" => "Arroz al horno servido en plato hondo con presentación tradicional."
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
        "mensaje" => "No existe información de emplatado para ese plato"
    ]);
}
?>