<?php
header("Content-Type: application/json; charset=UTF-8");

$total = 0;

if (isset($_COOKIE["platosTerminados"])) {
    $total = (int) $_COOKIE["platosTerminados"];
}

$total++;

setcookie("platosTerminados", $total, time() + 86400, "/");

echo json_encode([
    "ok" => true,
    "totalTerminados" => $total
]);
?>
