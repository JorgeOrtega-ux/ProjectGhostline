<?php
require_once 'config/router.php';
$BASE_URL = rtrim(dirname($_SERVER["SCRIPT_NAME"]), '/');
// --- INICIO DE LA MODIFICACIÓN ---
$isMainMenu = ($CURRENT_SECTION === 'home' || $CURRENT_SECTION === 'explore' || $CURRENT_SECTION === 'trash');
$isSettingsMenu = ($CURRENT_SECTION === 'settings');
$isHelpMenu = ($CURRENT_SECTION === 'help');
// --- FIN DE LA MODIFICACIÓN ---
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">
    <link rel="stylesheet" type="text/css" href="<?php echo $BASE_URL; ?>/assets/css/styles.css">
    <title>ProjectGhostline</title>

    <script src="<?php echo $BASE_URL; ?>/assets/js/preferences-loader.js"></script>

    <script>
        window.PROJECT_CONFIG = {
            baseUrl: '<?php echo $BASE_URL; ?>',
            currentSection: '<?php echo $CURRENT_SECTION; ?>',
            currentSubsection: <?php echo $CURRENT_SUBSECTION ? '"' . $CURRENT_SUBSECTION . '"' : 'null'; ?>,
        };
    </script>
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
                    <div class="general-content-scrolleable overflow-y">
                        <?php include 'includes/sections/general-sections.php'; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script type="module" src="<?php echo $BASE_URL; ?>/assets/js/init-app.js"></script>

</html>