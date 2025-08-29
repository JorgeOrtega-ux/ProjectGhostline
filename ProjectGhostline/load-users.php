<?php
// Establecer la cabecera para indicar que la respuesta es JSON
header('Content-Type: application/json');

require_once 'config/db.php';

// Sanitizar y obtener los parámetros de la URL.
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$sort_key = isset($_GET['sort_key']) ? htmlspecialchars($_GET['sort_key']) : 'most_relevant';
$search_query = isset($_GET['search_query']) ? trim(htmlspecialchars($_GET['search_query'])) : '';
$limit = 25; // Número de usuarios a cargar.

// --- Lógica de Conteo Total ---
$count_sql = "SELECT COUNT(u.id) as total FROM users u
              INNER JOIN users_data ud ON u.uuid = ud.user_uuid";
$count_params = [];
$count_types = '';

if (!empty($search_query)) {
    $count_sql .= " WHERE u.nombre LIKE ?";
    $count_params[] = "%" . $search_query . "%";
    $count_types .= 's';
}

$count_stmt = $conn->prepare($count_sql);
if (!empty($search_query)) {
    $count_stmt->bind_param($count_types, ...$count_params);
}
$count_stmt->execute();
$count_result = $count_stmt->get_result()->fetch_assoc();
$total_users = (int)$count_result['total'];
$count_stmt->close();

// --- Lógica de Obtención de Usuarios ---
$allowed_sort_keys = [
    'most_relevant' => 'ud.likes DESC',
    'recent_edits' => 'ud.reg_date DESC',
    'oldest_edits' => 'ud.reg_date ASC',
    'order_az' => 'u.nombre ASC',
    'order_za' => 'u.nombre DESC'
];
$order_by = $allowed_sort_keys[$sort_key] ?? $allowed_sort_keys['most_relevant'];

$sql = "SELECT u.uuid, u.nombre, ud.current_rank, ud.previous_rank FROM users u
        INNER JOIN users_data ud ON u.uuid = ud.user_uuid";
$params = [];
$types = '';

if (!empty($search_query)) {
    $sql .= " WHERE u.nombre LIKE ?";
    $params[] = "%" . $search_query . "%";
    $types .= 's';
}

$sql .= " ORDER BY $order_by LIMIT ?, ?";
$params[] = $offset;
$params[] = $limit;
$types .= 'ii';

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$html = '';
if ($result->num_rows > 0) {
    $rank_counter = $offset + 1;
    while($row = $result->fetch_assoc()) {
        $html .= '<div class="card">';

        if ($sort_key === 'most_relevant') {
            $rank_status = 'same';
            $rank_icon = 'remove';

            if ($row['current_rank'] > 0 && $row['previous_rank'] > 0) {
                if ($row['current_rank'] < $row['previous_rank']) {
                    $rank_status = 'up';
                    $rank_icon = 'trending_up';
                } elseif ($row['current_rank'] > $row['previous_rank']) {
                    $rank_status = 'down';
                    $rank_icon = 'trending_down';
                }
            }
            
            $html .= '<div class="card-rank">';
            $html .= '    <span class="rank-number">' . $rank_counter . '</span>';
            $html .= '    <div class="rank-badge ' . $rank_status . '">';
            $html .= '        <span class="material-symbols-rounded">' . $rank_icon . '</span>';
            $html .= '    </div>';
            $html .= '</div>';
        }

        $html .= '    <div class="card-user-info">';
        $html .= '        <div class="user-avatar-placeholder"></div>';
        $html .= '        <span class="user-name">' . htmlspecialchars($row["nombre"]) . '</span>';
        $html .= '    </div>';
        $html .= '</div>';
        $rank_counter++;
    }
}

$stmt->close();
$conn->close();

echo json_encode(['html' => $html, 'total_count' => $total_users]);
exit;
?>