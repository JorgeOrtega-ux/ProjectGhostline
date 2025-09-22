<?php 
require_once 'config/session.php';
require_once 'config/db.php'; // 1. INCLUIR LA CONEXIÓN A LA BD
require_once 'config/router.php'; 

// 2. LÓGICA DE VERIFICACIÓN DE SESIÓN MOVIDA AQUÍ
// Siempre verificar el rol más reciente desde la BD si el usuario está logueado
if (isset($_SESSION['user_id'])) {
    $sql = "SELECT role FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    // Verificar si la preparación de la consulta fue exitosa
    if ($stmt) {
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($user = $result->fetch_assoc()) {
            // Actualizar la sesión con el rol fresco de la BD
            $_SESSION['user_role'] = $user['role'];
        }
        $stmt->close();
    }
}
// La conexión $conn se cerrará automáticamente al final del script
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Horizon</title>
    <script>
        // 3. La variable de JS ahora siempre tendrá el rol actualizado
        window.BASE_PATH = "<?php echo rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); ?>";
        window.USER_ROLE = "<?php echo isset($_SESSION['user_role']) ? $_SESSION['user_role'] : 'guest'; ?>";
    </script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" type="text/css" href="<?php echo rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); ?>/assets/css/styles.css">
</head>

<body>
    <div class="page-wrapper">
        <div class="main-content">
            <div class="general-content">
                <div class="general-content-top">
                    <?php include 'includes/layouts/header.php'; ?>
                </div>
                <div class="general-content-bottom">
                    <?php include 'includes/modules/module-surface.php'; ?>
                    <div class="general-content-scrolleable overflow-y"></div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script type="module" src="<?php echo rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); ?>/assets/js/app-init.js"></script>
</body>

</html>