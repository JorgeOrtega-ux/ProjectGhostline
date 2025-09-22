<?php
require_once '../config/db.php';
require_once '../config/session.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action === 'register') {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (empty($name) || empty($email) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'El correo electrónico no es válido.']);
            exit;
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $hashed_password);

        if ($stmt->execute()) {
            $user_id = $stmt->insert_id;
            $_SESSION['user_id'] = $user_id;
            $_SESSION['user_name'] = $name;
            $_SESSION['user_role'] = 'user'; // Asignar rol por defecto
            echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
        } else {
            if ($conn->errno === 1062) {
                echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error en el registro.']);
            }
        }
        $stmt->close();

    } elseif ($action === 'login') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
            exit;
        }

        $sql = "SELECT id, name, password, role FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_role'] = $user['role']; // Guardar rol en la sesión
                echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'El usuario no existe.']);
        }
        $stmt->close();

    } elseif ($action === 'logout') {
        session_destroy();
        echo json_encode(['success' => true]);

    } elseif ($action === 'check_session') {
        if (isset($_SESSION['user_id'])) {
            echo json_encode(['loggedIn' => true, 'userName' => $_SESSION['user_name'], 'userRole' => $_SESSION['user_role']]);
        } else {
            echo json_encode(['loggedIn' => false]);
        }

    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Acción no válida']);
    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}

$conn->close();
?>