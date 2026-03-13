<?php
// Este archivo ahora actua como backend/API.
// Ya no genera HTML.
// Solo recibe peticiones desde fetch y devuelve JSON.

header("Content-Type: application/json; charset=UTF-8");

// =========================================================
// 1. CONFIGURACION DE LA CONEXION
// =========================================================
$host = "127.0.0.1";
$port = "3307";
$dbname = "videojuegos_asir";
$user = "root";
$pass = "";

// =========================================================
// 2. FUNCIONES AUXILIARES
// =========================================================
function responder(int $codigoHttp, array $datos): void
{
    http_response_code($codigoHttp);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function limpiarTexto(?string $valor): string
{
    return trim(strip_tags((string) $valor));
}

function limpiarEmail(?string $valor): string
{
    return trim(filter_var((string) $valor, FILTER_SANITIZE_EMAIL));
}

function vacioANull(?string $valor): ?string
{
    $valor = trim((string) $valor);
    return $valor === "" ? null : $valor;
}

function esFechaValida(?string $fecha): bool
{
    if ($fecha === null || $fecha === "") {
        return false;
    }

    $objetoFecha = DateTime::createFromFormat("Y-m-d", $fecha);

    return $objetoFecha !== false
        && $objetoFecha->format("Y-m-d") === $fecha;
}

function esFechaFutura(string $fecha): bool
{
    return $fecha > date("Y-m-d");
}

function obtenerEstudios(PDO $pdo): array
{
    $sql = "SELECT id_estudio, nombre FROM estudio ORDER BY nombre ASC";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function obtenerDesarrolladores(PDO $pdo): array
{
    $sql = "
        SELECT
            d.id_desarrollador,
            d.nombre,
            d.apellido,
            d.email,
            d.ciudad,
            d.pais,
            d.fecha_nacimiento,
            d.fecha_alta,
            d.activo,
            d.id_estudio,
            e.nombre AS nombre_estudio
        FROM desarrollador d
        LEFT JOIN estudio e
            ON d.id_estudio = e.id_estudio
        ORDER BY d.id_desarrollador DESC
    ";

    $stmt = $pdo->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function validarFormulario(array $datos): array
{
    $errores = [];

    if ($datos["accion"] === "delete") {
        if ($datos["id_desarrollador"] === "" || !ctype_digit($datos["id_desarrollador"])) {
            $errores["id_desarrollador"] = "Para eliminar debes indicar un ID valido.";
        }

        return $errores;
    }

    if ($datos["nombre"] === "" || mb_strlen($datos["nombre"]) < 2) {
        $errores["nombre"] = "El nombre es obligatorio y debe tener al menos 2 caracteres.";
    }

    if ($datos["apellido"] === "" || mb_strlen($datos["apellido"]) < 2) {
        $errores["apellido"] = "El apellido es obligatorio y debe tener al menos 2 caracteres.";
    }

    if ($datos["email"] !== "" && !filter_var($datos["email"], FILTER_VALIDATE_EMAIL)) {
        $errores["email"] = "Si escribes un email, debe tener un formato valido.";
    }

    if ($datos["ciudad"] !== "" && mb_strlen($datos["ciudad"]) < 2) {
        $errores["ciudad"] = "La ciudad debe tener al menos 2 caracteres.";
    }

    if ($datos["pais"] !== "" && mb_strlen($datos["pais"]) < 2) {
        $errores["pais"] = "El pais debe tener al menos 2 caracteres.";
    }

    if ($datos["fecha_nacimiento"] !== "") {
        if (!esFechaValida($datos["fecha_nacimiento"])) {
            $errores["fecha_nacimiento"] = "La fecha de nacimiento no es valida.";
        } elseif (esFechaFutura($datos["fecha_nacimiento"])) {
            $errores["fecha_nacimiento"] = "La fecha de nacimiento no puede ser futura.";
        }
    }

    if ($datos["fecha_alta"] === "") {
        $errores["fecha_alta"] = "La fecha de alta es obligatoria porque la base de datos la exige.";
    } elseif (!esFechaValida($datos["fecha_alta"])) {
        $errores["fecha_alta"] = "La fecha de alta no es valida.";
    }

    if ($datos["activo"] === "1") {
        if ($datos["id_estudio"] === "") {
            $errores["id_estudio"] = "Si esta activo, debes seleccionar un estudio.";
        }
    } elseif ($datos["fecha_alta"] !== "" && esFechaFutura($datos["fecha_alta"])) {
        $errores["fecha_alta"] = "Si no esta activo, la fecha de alta no puede ser futura.";
    }

    if ($datos["accion"] === "update") {
        if ($datos["id_desarrollador"] === "" || !ctype_digit($datos["id_desarrollador"])) {
            $errores["id_desarrollador"] = "Para actualizar debes indicar un ID valido.";
        }
    }

    return $errores;
}

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // GET: devuelve datos iniciales para pintar el formulario y la tabla.
    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        responder(200, [
            "ok" => true,
            "mensaje" => "Datos cargados correctamente.",
            "estudios" => obtenerEstudios($pdo),
            "desarrolladores" => obtenerDesarrolladores($pdo),
        ]);
    }

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        responder(405, [
            "ok" => false,
            "mensaje" => "Metodo no permitido.",
        ]);
    }

    $datosFormulario = [
        "id_desarrollador" => limpiarTexto($_POST["id_desarrollador"] ?? ""),
        "nombre" => mb_substr(limpiarTexto($_POST["nombre"] ?? ""), 0, 80),
        "apellido" => mb_substr(limpiarTexto($_POST["apellido"] ?? ""), 0, 120),
        "email" => mb_substr(limpiarEmail($_POST["email"] ?? ""), 0, 150),
        "ciudad" => mb_substr(limpiarTexto($_POST["ciudad"] ?? ""), 0, 80),
        "pais" => mb_substr(limpiarTexto($_POST["pais"] ?? ""), 0, 80),
        "fecha_nacimiento" => limpiarTexto($_POST["fecha_nacimiento"] ?? ""),
        "fecha_alta" => limpiarTexto($_POST["fecha_alta"] ?? ""),
        "activo" => isset($_POST["activo"]) && $_POST["activo"] === "1" ? "1" : "0",
        "id_estudio" => limpiarTexto($_POST["id_estudio"] ?? ""),
        "accion" => limpiarTexto($_POST["accion"] ?? ""),
    ];

    if ($datosFormulario["activo"] !== "1") {
        $datosFormulario["id_estudio"] = "";
    }

    if (!in_array($datosFormulario["accion"], ["insert", "update", "delete"], true)) {
        responder(422, [
            "ok" => false,
            "mensaje" => "La accion enviada no es valida.",
            "errores" => ["accion" => "La accion enviada no es valida."],
        ]);
    }

    $errores = validarFormulario($datosFormulario);

    if (!empty($errores)) {
        responder(422, [
            "ok" => false,
            "mensaje" => "Revisa los campos marcados antes de continuar.",
            "errores" => $errores,
            "estudios" => obtenerEstudios($pdo),
            "desarrolladores" => obtenerDesarrolladores($pdo),
        ]);
    }

    $pdo->beginTransaction();

    if ($datosFormulario["accion"] === "insert") {
        $sqlInsert = "
            INSERT INTO desarrollador
            (
                nombre,
                apellido,
                email,
                ciudad,
                pais,
                fecha_nacimiento,
                fecha_alta,
                activo,
                id_estudio
            )
            VALUES
            (
                :nombre,
                :apellido,
                :email,
                :ciudad,
                :pais,
                :fecha_nacimiento,
                :fecha_alta,
                :activo,
                :id_estudio
            )
        ";

        $stmtInsert = $pdo->prepare($sqlInsert);
        $stmtInsert->execute([
            ":nombre" => $datosFormulario["nombre"],
            ":apellido" => $datosFormulario["apellido"],
            ":email" => vacioANull($datosFormulario["email"]),
            ":ciudad" => vacioANull($datosFormulario["ciudad"]),
            ":pais" => vacioANull($datosFormulario["pais"]),
            ":fecha_nacimiento" => vacioANull($datosFormulario["fecha_nacimiento"]),
            ":fecha_alta" => vacioANull($datosFormulario["fecha_alta"]),
            ":activo" => (int) $datosFormulario["activo"],
            ":id_estudio" => $datosFormulario["id_estudio"] === "" ? null : (int) $datosFormulario["id_estudio"],
        ]);

        $mensaje = "Desarrollador insertado correctamente.";
    }

    if ($datosFormulario["accion"] === "update") {
        $sqlUpdate = "
            UPDATE desarrollador
            SET
                nombre = :nombre,
                apellido = :apellido,
                email = :email,
                ciudad = :ciudad,
                pais = :pais,
                fecha_nacimiento = :fecha_nacimiento,
                fecha_alta = :fecha_alta,
                activo = :activo,
                id_estudio = :id_estudio
            WHERE id_desarrollador = :id_desarrollador
        ";

        $stmtUpdate = $pdo->prepare($sqlUpdate);
        $stmtUpdate->execute([
            ":nombre" => $datosFormulario["nombre"],
            ":apellido" => $datosFormulario["apellido"],
            ":email" => vacioANull($datosFormulario["email"]),
            ":ciudad" => vacioANull($datosFormulario["ciudad"]),
            ":pais" => vacioANull($datosFormulario["pais"]),
            ":fecha_nacimiento" => vacioANull($datosFormulario["fecha_nacimiento"]),
            ":fecha_alta" => vacioANull($datosFormulario["fecha_alta"]),
            ":activo" => (int) $datosFormulario["activo"],
            ":id_estudio" => $datosFormulario["id_estudio"] === "" ? null : (int) $datosFormulario["id_estudio"],
            ":id_desarrollador" => (int) $datosFormulario["id_desarrollador"],
        ]);

        if ($stmtUpdate->rowCount() === 0) {
            throw new Exception("No se encontro ningun desarrollador con ese ID para actualizar.");
        }

        $mensaje = "Desarrollador actualizado correctamente.";
    }

    if ($datosFormulario["accion"] === "delete") {
        $sqlDelete = "DELETE FROM desarrollador WHERE id_desarrollador = :id_desarrollador";
        $stmtDelete = $pdo->prepare($sqlDelete);
        $stmtDelete->execute([
            ":id_desarrollador" => (int) $datosFormulario["id_desarrollador"],
        ]);

        if ($stmtDelete->rowCount() === 0) {
            throw new Exception("No se encontro ningun desarrollador con ese ID para eliminar.");
        }

        $mensaje = "Desarrollador eliminado correctamente.";
    }

    $pdo->commit();

    responder(200, [
        "ok" => true,
        "mensaje" => $mensaje,
        "estudios" => obtenerEstudios($pdo),
        "desarrolladores" => obtenerDesarrolladores($pdo),
    ]);
} catch (Throwable $e) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    responder(500, [
        "ok" => false,
        "mensaje" => "Error en la operacion: " . $e->getMessage(),
    ]);
}
