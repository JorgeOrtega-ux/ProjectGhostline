<?php
$servername = "localhost";
$username = "root"; // Tu usuario de MySQL
$password = ""; // Tu contraseña de MySQL
$dbname = "projectghostline_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Crear la base de datos si no existe
$conn->query("CREATE DATABASE IF NOT EXISTS $dbname");

// Seleccionar la base de datos
$conn->select_db($dbname);
?>