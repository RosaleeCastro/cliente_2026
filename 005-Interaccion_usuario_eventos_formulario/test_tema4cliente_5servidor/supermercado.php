<?php
// supermercado.php
// Recibe JSON por POST y devuelve JSON. También gestiona cookie "ingresos".

header("Content-Type: application/json; charset=utf-8");

// Leer JSON de entrada

// TODO:
// 1) Lee el cuerpo de la petición HTTP (POST) que llega en formato JSON y guarda el contenido en una variable $raw.
// 2) Convierte el JSON recibido a un array asociativo llamado %data.
// 3) Guarda en una variable $accion la accion recibida
$raw = file_get_contents("php://input");
$data = json_decode($rawJSON, true);
$accion = $data["accion"];



// Lista simple de precios (€/unidad)
$precios = [
  "Pan"   => 1.20,
  "Leche" => 0.95,
  "Huevos"=> 2.40,
  "Arroz" => 1.10,
  "Café"  => 3.50
];

if ($accion === "calcular_precio") {
  // TODO:
  // 1) Obtén el producto a partir del array $data y guardalo en una variable $item.
$item = $data["item"] ?? "";
  // TODO:
  // 2) Obtén la cantidad a partir del array $data y guardala en una variable $cantidad.
$cantidad = $data["cantidad"] ?? -1;
  // TODO:
  // 3) Calcula el precio total:
  //    - Obtén el precio unitario del producto desde el array $precios usando $item como clave.
  //    - Multiplica precio_unitario * cantidad.
  //    - Guarda el resultado en $precio.
  $precio = ($precios[$item] ?? 0) * $cantidad;

  // TODO:
  // 4) Devuelve una respuesta JSON usando echo json_encode(...) con los siguientes campos:
  //    - "item" => $item
  //    - "cantidad" => $cantidad
  //    - "precio_unitario" => $precios[$item]
  //    - "precio" => $precio
  //    y termina el script con exit;
  $respuesta = [
    "item" => $item,
    "cantidad" => $cantidad,
   "precio_unitario" => $precios[$item],
    "precio" => $precio
  ];
  echo json_encode($respuesta, JSON_PRETTY_PRINT);
  exit;
}

if ($accion === "sumar_ingresos") {
  // TODO:
  // 1) Guarda el importe enviado desde el array $data en $importe.

  $importe = $data["importe"] ?? "";

  // TODO:
  // 2) Comprueba si existe la cookie "ingresos":
  //    - Si existe, guardala en una variable $actual.
  //    - Si no existe, asigna 0 a $actual.

  $actual = $_COOKIE["ingresos"] ?? 0;
  // TODO:
  // 3) Calcula el nuevo total de ingresos:
  //    - $nuevo = $actual + $importe


  $nuevo = $actual + $importe;

  // TODO:
  // 4) Guarda el nuevo valor en la cookie "ingresos"
  //    - Duración: 30 días
  //    - Ruta: "/" 
  
  setcookie("ingresos", $nuevo, time() + (30 * 24 * 60 * 60), "/");
  
  // TODO:
  // 5) Devuelve una respuesta JSON usando echo json_encode(...) con:
  //    - "ok" => true
  //    - "ingresos" => $nuevo
  //    y finalizar con exit;
  
  echo json_encode(["ok" => true, "ingresos" => $nuevo], JSON_UNESCAPED_UNICODE);
  
  exit;
}

echo json_encode(["error" => "Acción no válida"], JSON_UNESCAPED_UNICODE);
exit;
