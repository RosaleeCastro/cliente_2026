<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ejemplo encodeURIComponent / decodeURIComponent completo</title>
</head>
<body>

    <h1>Ejemplo con encodeURIComponent(), decodeURIComponent() y PHP</h1>

    <!-- Formulario para enviar datos -->
    <form onsubmit="enviar(); return false;">
        <input type="text" id="texto" placeholder="Escribe algo">
        <button type="submit">Enviar</button>
    </form>

    <script>
        function enviar() {
            const valor = document.getElementById("texto").value;

            // Codificamos correctamente para URL
            const valorCodificado = encodeURIComponent(valor);

            // Redirigimos a este mismo archivo
            window.location.href = "encodeURI.php?dato=" + valorCodificado;
        }

        //hola%20mundo
    </script>

    <hr>

    <?php
    if (isset($_GET['dato'])) {

        // Valor codificado recibido en la URL
        $datoCodificado = $_GET['dato'];

        // PHP lo decodifica correctamente
        $datoOriginal = rawurldecode($datoCodificado);

        echo "<h2>Texto recibido desde GET:</h2>";
        echo "<p><strong>Codificado:</strong> " . htmlspecialchars($datoCodificado) . "</p>";
        echo "<p><strong>Decodificado por PHP:</strong> " . htmlspecialchars($datoOriginal) . "</p>";

        // Mostrar decodeURIComponent() funcionando en JavaScript
        echo "
        <script>
            const recibido = '$datoCodificado';

            // Usamos decodeURIComponent() en el navegador
            const decodificadoJS = decodeURIComponent(recibido);

            document.write('<p><strong>Decodificado con decodeURIComponent() en JavaScript:</strong> ' + decodificadoJS + '</p>');
        </script>
        ";
    }
    ?>

</body>
</html>