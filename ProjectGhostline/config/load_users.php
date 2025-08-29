<?php
require_once 'config/db.php';

$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$limit = 25;

$sql = "SELECT uuid, nombre FROM users LIMIT ?, ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$html = '';
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $html .= '<div class="card">';
        $html .= '    <div class="card-user-info">';
        $html .= '        <div class="user-avatar-placeholder"></div>';
        $html .= '        <span class="user-name">' . htmlspecialchars($row["nombre"]) . '</span>';
        $html .= '    </div>';
        $html .= '</div>';
    }
}

$stmt->close();
$conn->close();

echo $html;

// Detiene la ejecución del script aquí para asegurar que no se envíe nada más.
exit;
?>