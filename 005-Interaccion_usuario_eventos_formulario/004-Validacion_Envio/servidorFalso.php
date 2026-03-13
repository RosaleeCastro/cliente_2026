<?php
header("Content-Type: text/plain; charset=utf-8");

// Simula un servidor que nunca atiende realmente la petición
if (isset($_POST["accion"]) && $_POST["accion"] === "peticion_lenta") {

    // Espera muchísimo tiempo para forzar el timeout del cliente
    sleep(60);

    // Aunque llegara aquí, no sería a tiempo para el cliente
    echo "Respuesta tardía del servidor";
    exit;
}

echo "Petición no reconocida.";
?>