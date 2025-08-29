<?php
// update_ranks.php

// 1. MEDIDA DE SEGURIDAD:
// Asegurarse de que el script no se pueda ejecutar desde un navegador web.
// Solo se podrá ejecutar desde la línea de comandos (como lo hace el Cron Job).
if (php_sapi_name() !== 'cli') {
    die("Acceso denegado. Este script solo puede ser ejecutado desde la línea de comandos.");
}

// Incluir la configuración de la base de datos
require_once 'db.php';

echo "Iniciando la actualización de rankings...\n";

// Iniciar una transacción para asegurar la integridad de los datos.
$conn->begin_transaction();

try {
    // 2. ACTUALIZAR RANKINGS ANTERIORES:
    // Copia el ranking actual al ranking anterior para todos los usuarios.
    $sql_update_previous = "UPDATE users_data SET previous_rank = current_rank";
    if (!$conn->query($sql_update_previous)) {
        throw new Exception("Error al actualizar previous_rank: " . $conn->error);
    }
    echo "Paso 1: Se actualizaron los rankings anteriores.\n";

    // 3. OBTENER NUEVO ORDEN DE USUARIOS:
    // Obtiene todos los usuarios ordenados por 'likes' de mayor a menor.
    $sql_get_new_order = "SELECT user_uuid FROM users_data ORDER BY likes DESC";
    $result = $conn->query($sql_get_new_order);
    if (!$result) {
        throw new Exception("Error al obtener el nuevo orden de usuarios: " . $conn->error);
    }

    $users_ranked = $result->fetch_all(MYSQLI_ASSOC);
    $result->free();

    // 4. ACTUALIZAR RANKINGS ACTUALES:
    // Prepara la consulta para actualizar el nuevo ranking de cada usuario.
    $stmt = $conn->prepare("UPDATE users_data SET current_rank = ? WHERE user_uuid = ?");
    $rank = 1; // El ranking empieza en 1

    foreach ($users_ranked as $user) {
        $stmt->bind_param("is", $rank, $user['user_uuid']);
        $stmt->execute();
        $rank++;
    }
    $stmt->close();
    echo "Paso 2: Se calcularon y actualizaron " . count($users_ranked) . " nuevos rankings.\n";

    // 5. CONFIRMAR CAMBIOS:
    // Si todo salió bien, confirma los cambios en la base de datos.
    $conn->commit();
    echo "¡Éxito! La actualización de rankings ha finalizado correctamente.\n";

} catch (Exception $e) {
    // 6. REVERTIR EN CASO DE ERROR:
    // Si algo falló, revierte todos los cambios para no dejar datos corruptos.
    $conn->rollback();
    echo "Error: Se ha producido un problema durante la actualización. " . $e->getMessage() . "\n";
}

$conn->close();
?>