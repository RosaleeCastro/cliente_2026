<?php
header("Content-Type: application/json; charset=UTF-8");

$nombre = $_GET["nombre"] ?? "";
$nombre = trim(strtolower($nombre));

$platos = [
    "hamburguesa" => [
        "tiempoPreparacion" => 5,
        "ingredientes" => ["Pan", "Carne", "Queso", "Lechuga"]
    ],
    "bacon" => [
        "tiempoPreparacion" => 4,
        "ingredientes" => ["Lonchas de bacon", "Aceite"]
    ],
    "chuletas" => [
        "tiempoPreparacion" => 6,
        "ingredientes" => ["Chuletas", "Sal", "Pimienta"]
    ],
    "costillas" => [
        "tiempoPreparacion" => 7,
        "ingredientes" => ["Costillas", "Salsa barbacoa", "Sal"]
    ],
    "cordero" => [
        "tiempoPreparacion" => 8,
        "ingredientes" => ["Cordero", "Ajo", "Romero"]
    ],
    "arroz al horno" => [
        "tiempoPreparacion" => 9,
        "ingredientes" => ["Arroz", "Caldo", "Tomate", "Especias"]
    ]
];

if (array_key_exists($nombre, $platos)) {
    echo json_encode([
        "valido" => true,
        "tiempoPreparacion" => $platos[$nombre]["tiempoPreparacion"],
        "ingredientes" => $platos[$nombre]["ingredientes"]
    ]);
} else {
    echo json_encode([
        "valido" => false,
        "mensaje" => "No existe información de cocción para ese plato"
    ]);
}
?>