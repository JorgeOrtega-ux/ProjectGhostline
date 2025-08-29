<?php
// La ruta ahora es correcta porque este archivo está en la raíz 
// y necesita entrar a la carpeta 'config'.
require_once 'config/db.php';

// Obtenemos el offset de la URL, asegurando que sea un entero.
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$limit = 25; // Número de usuarios a cargar.

// Preparamos y ejecutamos la consulta de forma segura.
$sql = "SELECT uuid, nombre FROM users LIMIT ?, ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$html = '';
if ($result->num_rows > 0) {
    // Generamos únicamente el HTML para las nuevas tarjetas.
    while($row = $result->fetch_assoc()) {
        $html .= '<div class="card">';
        $html .= '    <div class="card-user-info">';
        $html .= '        <div class="user-avatar-placeholder"></div>';
        $html .= '        <span class="user-name">' . htmlspecialchars($row["nombre"]) . '</span>';
        $html .= '    </div>';
        $html .= '</div>';
    }
}

// Cerramos las conexiones.
$stmt->close();
$conn->close();

// Devolvemos solo el HTML de las tarjetas.
echo $html;

// Detenemos la ejecución para no enviar contenido extra.
exit;
?>