<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ejemplo escape / unescape completo</title>
</head>
<body>

    <h1>Ejemplo con escape(), unescape() y PHP</h1>

    <!-- Formulario para enviar datos -->
    <form onsubmit="enviar(); return false;">
        <input type="text" id="texto" placeholder="Escribe algo">
        <button type="submit">Enviar</button>
    </form>

    <script>
        function enviar() {
            const valor = document.getElementById("texto").value;

            // Escapamos el valor antes de enviarlo por GET
            const valorEscapado = escape(valor);

            // Redirigimos a este mismo archivo
            window.location.href = "escape.php?dato=" + valorEscapado;
        }

        //hola%20mundo
    </script>

    <hr>

    <?php
    if (isset($_GET['dato'])) {

        // Valor escapado recibido en la URL
        $datoEscapado = $_GET['dato'];

        // PHP lo decodifica
        $datoOriginal = rawurldecode($datoEscapado);

        echo "<h2>Texto recibido desde GET:</h2>";
        echo "<p><strong>Escapado:</strong> " . htmlspecialchars($datoEscapado) . "</p>";
        echo "<p><strong>Decodificado por PHP:</strong> " . htmlspecialchars($datoOriginal) . "</p>";

        // Ahora mostramos unescape() funcionando con JS
        echo "
        <script>
            const recibido = '$datoEscapado';

            // Usamos unescape() en el navegador
            const decodificadoJS = unescape(recibido);

            document.write('<p><strong>Decodificado con unescape() en JavaScript:</strong> ' + decodificadoJS + '</p>');
        </script>
        ";
    }
    ?>

</body>
</html>