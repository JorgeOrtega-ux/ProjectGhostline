<?php
require_once 'config/db.php';

// Función para generar un UUID v4
function guidv4($data = null) {
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

// SQL para crear la tabla de usuarios
$sql_create_table = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql_create_table) === TRUE) {
    echo "Table users created successfully or already exists.<br>";
} else {
    echo "Error creating table: " . $conn->error . "<br>";
}

// Verificar si ya hay usuarios en la tabla
$result = $conn->query("SELECT COUNT(*) as count FROM users");
$row = $result->fetch_assoc();
$user_count = $row['count'];

if ($user_count == 0) {
    // Nombres y apellidos para generar usuarios
    $nombres = ["Sofía", "Mateo", "Valentina", "Sebastián", "Isabella", "Leonardo", "Camila", "Emiliano", "Valeria", "Matías"];
    $apellidos = ["García", "Rodríguez", "González", "Hernández", "López", "Martínez", "Pérez", "Sánchez", "Ramírez", "Flores"];

    $stmt = $conn->prepare("INSERT INTO users (uuid, nombre) VALUES (?, ?)");

    for ($i = 0; $i < 25; $i++) {
        $nombre_aleatorio = $nombres[array_rand($nombres)] . " " . $apellidos[array_rand($apellidos)];
        $uuid = guidv4();
        $stmt->bind_param("ss", $uuid, $nombre_aleatorio);
        $stmt->execute();
    }

    $stmt->close();
    echo "25 users inserted successfully.<br>";
} else {
    echo "Users table is not empty. No users were inserted.<br>";
}

$conn->close();
?>