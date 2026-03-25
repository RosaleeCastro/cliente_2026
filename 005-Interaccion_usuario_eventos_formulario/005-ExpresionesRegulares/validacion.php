<?php
// Aquí indico que la respuesta del servidor será JSON y en UTF-8.
// Lo hago porque desde JavaScript voy a trabajar con fetch y necesito una respuesta estructurada.
header("Content-Type: application/json; charset=utf-8");

// Aquí cargo la conexión a la base de datos.
// En este archivo espero que ya exista la variable $pdo creada con PDO.
require_once "conexion.php";

// Aquí leo el cuerpo bruto de la petición.
// Como desde fetch envío JSON, uso php://input para recuperar ese contenido.
$rawJSON = file_get_contents("php://input");

// Aquí convierto el JSON recibido en un array asociativo de PHP.
// El segundo parámetro en true hace que json_decode me devuelva array y no objeto.
$data = json_decode($rawJSON, true);

/*
|--------------------------------------------------------------------------
| FUNCIÓN responder()
|--------------------------------------------------------------------------
| Aquí centralizo la salida JSON para no repetir código.
| Así siempre respondo con la misma estructura:
| ok, mensaje y datos.
*/
function responder($ok, $mensaje, $datos = null, $codigo = 200)
{
    // Aquí establezco el código HTTP de la respuesta.
    http_response_code($codigo);

    // Aquí devuelvo la respuesta al cliente en formato JSON.
    echo json_encode([
        "ok" => $ok,
        "mensaje" => $mensaje,
        "datos" => $datos
    ], JSON_UNESCAPED_UNICODE);

    // Aquí corto la ejecución porque ya he respondido.
    exit;
}

/*
|--------------------------------------------------------------------------
| FUNCIÓN texto()
|--------------------------------------------------------------------------
| Aquí normalizo cualquier valor de texto:
| - lo convierto a string
| - le quito espacios al principio y al final con trim()
*/
function texto($valor)
{
    return trim((string)$valor);
}

/*
|--------------------------------------------------------------------------
| FUNCIÓN obtenerFilaPorId()
|--------------------------------------------------------------------------
| Aquí reutilizo una consulta que me devuelve una fila concreta por id.
| Me sirve después de insertar y también después de actualizar.
*/
function obtenerFilaPorId($pdo, $id)
{
    $stmt = $pdo->prepare("
        SELECT
            id,
            nombre_usuario,
            nombre,
            dni,
            nie,
            matricula,
            descripcion,
            fecha_nacimiento,
            creado_en
        FROM registros_validacion
        WHERE id = :id
        LIMIT 1
    ");

    $stmt->execute([
        ":id" => (int)$id
    ]);

    return $stmt->fetch();
}

/*
|--------------------------------------------------------------------------
| VALIDACIÓN INICIAL DE LA PETICIÓN
|--------------------------------------------------------------------------
| Aquí compruebo que realmente haya llegado un array y que exista la acción.
| Si no viene bien formada la petición, devuelvo error 400.
*/
if (!is_array($data) || !isset($data["accion"])) {
    responder(false, "Petición no válida.", null, 400);
}

// Aquí guardo la acción que llega desde el cliente.
$accion = $data["accion"];

/*
|--------------------------------------------------------------------------
| BLOQUE PRINCIPAL
|--------------------------------------------------------------------------
| Aquí uso try/catch para capturar errores de PDO.
| Así, si hay un problema con la base de datos, puedo responder con JSON.
*/
try {

    switch ($accion) {

        /*
        |----------------------------------------------------------------------
        | ACCIÓN: INSERTAR
        |----------------------------------------------------------------------
        | Aquí inserto todos los datos del formulario en una tabla.
        */
        case "insertar":

            // Aquí recojo el subarray formulario que me envía fetch.
            $formulario = $data["formulario"] ?? [];

            // Aquí voy leyendo y normalizando cada valor recibido.
            $nombreUsuario   = texto($formulario["nombreUsuario"] ?? "");
            $nombre          = texto($formulario["nombre"] ?? "");
            $dni             = strtoupper(texto($formulario["dni"] ?? ""));
            $nie             = strtoupper(texto($formulario["nie"] ?? ""));
            $matricula       = strtoupper(texto($formulario["matricula"] ?? ""));
            $password        = texto($formulario["password"] ?? "");
            $descripcion     = texto($formulario["descripcion"] ?? "");
            $fechaNacimiento = texto($formulario["fechaNacimiento"] ?? "");

            // Aquí hago una validación mínima en servidor.
            // Aunque el cliente ya valida, yo vuelvo a validar porque no debo confiar solo en JS.
            if (
                $nombreUsuario === "" ||
                $nombre === "" ||
                $dni === "" ||
                $nie === "" ||
                $matricula === "" ||
                $password === "" ||
                $descripcion === "" ||
                $fechaNacimiento === ""
            ) {
                responder(false, "Debes rellenar todos los campos obligatorios.", null, 422);
            }

            // Aquí convierto la contraseña en hash.
            // Nunca guardo la contraseña en texto plano en la base de datos.
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            // Aquí preparo el INSERT usando parámetros nombrados para evitar inyecciones SQL.
            $sqlInsert = "
                INSERT INTO registros_validacion
                (
                    nombre_usuario,
                    nombre,
                    dni,
                    nie,
                    matricula,
                    password_hash,
                    descripcion,
                    fecha_nacimiento
                )
                VALUES
                (
                    :nombre_usuario,
                    :nombre,
                    :dni,
                    :nie,
                    :matricula,
                    :password_hash,
                    :descripcion,
                    :fecha_nacimiento
                )
            ";

            $stmtInsert = $pdo->prepare($sqlInsert);

            // Aquí ejecuto el INSERT con los valores reales.
            $stmtInsert->execute([
                ":nombre_usuario"   => $nombreUsuario,
                ":nombre"           => $nombre,
                ":dni"              => $dni,
                ":nie"              => $nie,
                ":matricula"        => $matricula,
                ":password_hash"    => $passwordHash,
                ":descripcion"      => $descripcion,
                ":fecha_nacimiento" => $fechaNacimiento
            ]);

            // Aquí recupero el id de la fila recién insertada.
            $idInsertado = $pdo->lastInsertId();

            // Aquí vuelvo a consultar la fila insertada para devolvérsela al cliente.
            $fila = obtenerFilaPorId($pdo, $idInsertado);

            responder(true, "Registro insertado correctamente.", [
                "fila" => $fila
            ]);
            break;

        /*
        |----------------------------------------------------------------------
        | ACCIÓN: BUSCAR POR NOMBRE DE USUARIO
        |----------------------------------------------------------------------
        | Aquí busco una fila concreta usando nombre_usuario.
        */
        case "buscar_por_usuario":

            // Aquí recojo el nombre de usuario enviado desde el cliente.
            $nombreUsuario = texto($data["nombreUsuario"] ?? "");

            if ($nombreUsuario === "") {
                responder(false, "Debes indicar el nombre de usuario.", null, 422);
            }

            // Aquí preparo la consulta para buscar una única fila.
            $stmtBuscar = $pdo->prepare("
                SELECT
                    id,
                    nombre_usuario,
                    nombre,
                    dni,
                    nie,
                    matricula,
                    descripcion,
                    fecha_nacimiento,
                    creado_en
                FROM registros_validacion
                WHERE nombre_usuario = :nombre_usuario
                LIMIT 1
            ");

            $stmtBuscar->execute([
                ":nombre_usuario" => $nombreUsuario
            ]);

            $fila = $stmtBuscar->fetch();

            // Aquí controlo el caso en el que no exista el usuario.
            if (!$fila) {
                responder(false, "No se encontró ninguna fila con ese nombre de usuario.");
            }

            responder(true, "Fila encontrada.", [
                "fila" => $fila
            ]);
            break;

        /*
        |----------------------------------------------------------------------
        | ACCIÓN: ACTUALIZAR POR NOMBRE
        |----------------------------------------------------------------------
        | Aquí actualizo una sola columna de una fila localizada por nombre.
        | Esta parte sí va en transacción, porque así cumplo lo que pide el ejercicio:
        | - inicio transacción
        | - actualizo
        | - recupero la fila modificada
        | - confirmo con commit()
        | Si algo falla, deshago todo con rollBack().
        */
        case "actualizar_por_nombre":

            // Aquí recibo los datos mínimos para actualizar.
            $nombre = texto($data["nombre"] ?? "");
            $campo = texto($data["campo"] ?? "");
            $valor = $data["valor"] ?? "";

            // Aquí defino una lista blanca de columnas permitidas.
            // Lo hago así porque el nombre de columna no se puede enlazar con bind como un valor.
            // Entonces lo controlo manualmente para evitar inyecciones SQL.
            $camposPermitidos = [
                "nombre_usuario",
                "nombre",
                "dni",
                "nie",
                "matricula",
                "password_hash",
                "descripcion",
                "fecha_nacimiento"
            ];

            if ($nombre === "" || $campo === "" || $valor === "") {
                responder(false, "Debes rellenar nombre, campo y valor.", null, 422);
            }

            if (!in_array($campo, $camposPermitidos, true)) {
                responder(false, "El campo seleccionado no está permitido.");
            }

            // Aquí comienzo la transacción.
            $pdo->beginTransaction();

            // Aquí busco la primera fila que coincida con ese nombre.
            // Uso ORDER BY id ASC y LIMIT 1 para asegurarme de trabajar con una sola fila.
            $stmtId = $pdo->prepare("
                SELECT id
                FROM registros_validacion
                WHERE nombre = :nombre
                ORDER BY id ASC
                LIMIT 1
            ");

            $stmtId->execute([
                ":nombre" => $nombre
            ]);

            $filaBase = $stmtId->fetch();

            // Si no encuentro la fila, deshago la transacción.
            if (!$filaBase) {
                $pdo->rollBack();
                responder(false, "No existe ninguna fila con ese nombre.");
            }

            $id = (int)$filaBase["id"];

            // Aquí normalizo el nuevo valor según el campo que se actualiza.
            // Por ejemplo, DNI, NIE y matrícula los paso a mayúsculas.
            // Si se actualiza la contraseña, la vuelvo a guardar como hash.
            if ($campo === "dni" || $campo === "nie" || $campo === "matricula") {
                $valor = strtoupper(texto($valor));
            } elseif ($campo === "password_hash") {
                $valor = password_hash(texto($valor), PASSWORD_DEFAULT);
            } else {
                $valor = texto($valor);
            }

            // Aquí construyo el UPDATE dinámico.
            // La columna viene controlada por la lista blanca.
            $sqlUpdate = "
                UPDATE registros_validacion
                SET $campo = :valor
                WHERE id = :id
            ";

            $stmtUpdate = $pdo->prepare($sqlUpdate);

            $stmtUpdate->execute([
                ":valor" => $valor,
                ":id" => $id
            ]);

            // Aquí recupero la fila ya modificada.
            // Esto me sirve para devolver el resultado actualizado al cliente.
            $filaModificada = obtenerFilaPorId($pdo, $id);

            // Aquí confirmo definitivamente la transacción.
            $pdo->commit();

            responder(true, "Transacción realizada correctamente.", [
                "fila" => $filaModificada
            ]);
            break;

        /*
        |----------------------------------------------------------------------
        | ACCIÓN: ELIMINAR POR NOMBRE
        |----------------------------------------------------------------------
        | Aquí elimino una fila localizada por nombre.
        | En este caso no me han pedido transacción, así que lo hago directo.
        */
        case "eliminar_por_nombre":

            $nombre = texto($data["nombre"] ?? "");

            if ($nombre === "") {
                responder(false, "Debes indicar el nombre.", null, 422);
            }

            // Aquí busco primero el id de la fila a eliminar.
            $stmtId = $pdo->prepare("
                SELECT id
                FROM registros_validacion
                WHERE nombre = :nombre
                ORDER BY id ASC
                LIMIT 1
            ");

            $stmtId->execute([
                ":nombre" => $nombre
            ]);

            $filaBase = $stmtId->fetch();

            if (!$filaBase) {
                responder(false, "No se encontró ninguna fila con ese nombre.");
            }

            $id = (int)$filaBase["id"];

            // Aquí elimino la fila usando el id.
            $stmtDelete = $pdo->prepare("
                DELETE FROM registros_validacion
                WHERE id = :id
            ");

            $stmtDelete->execute([
                ":id" => $id
            ]);

            responder(true, "Fila eliminada correctamente.");
            break;

        /*
        |----------------------------------------------------------------------
        | ACCIÓN NO RECONOCIDA
        |----------------------------------------------------------------------
        */
        default:
            responder(false, "Acción no reconocida.", null, 400);
    }

} catch (PDOException $e) {

    // Aquí verifico si hay una transacción abierta.
    // Si la hay, la reviento con rollBack() para no dejar cambios a medias.
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    // Aquí devuelvo el error en formato JSON.
    responder(false, "Error: " . $e->getMessage(), null, 500);
}