<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded">
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css">
    <title>ProjectGhostline</title>
</head>

<body>
    <div class="page-wrapper">
        <div class="main-content">
            <div class="general-content">
                <div class="general-content-top">
                    <div class="header">
                        <div class="header-left">
                            <div class="header-item">
                                <div class="header-button" data-action="toggleModuleSurface">
                                    <span class="material-symbols-rounded">menu</span>
                                </div>
                            </div>
                        </div>
                        <div class="header-right">
                            <div class="header-item">
                                <div class="header-button" data-action="toggleModuleOptions">
                                    <span class="material-symbols-rounded">settings</span>
                                </div>
                            </div>
                        </div>
                        <div class="module-content module-options disabled" data-module="moduleOptions">
                            <div class="menu-content">
                                <div class="menu-list">
                                    <div class="menu-link">
                                        <div class="menu-link-icon">
                                            <span class="material-symbols-rounded">settings</span>
                                        </div>
                                        <div class="menu-link-text">
                                            <span>Configuracion</span>
                                        </div>
                                    </div>
                                    <div class="menu-link">
                                        <div class="menu-link-icon">
                                            <span class="material-symbols-rounded">help</span>
                                        </div>
                                        <div class="menu-link-text">
                                            <span>Ayuda y recursos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="general-content-bottom">
                    <div class="module-content module-surface disabled" data-module="moduleSurface">
                        <div class="menu-content">
                            <div class="menu-list">
                                <div class="menu-link">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">home</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Pagina principal</span>
                                    </div>
                                </div>
                                <div class="menu-link">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">home</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Mis colecciones</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="general-content-scrolleable"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // =================================================================
            // ========================= CONFIGURATION =========================
            // =================================================================
            // Set to 'true' to allow multiple modules to be open at once.
            // Set to 'false' to ensure only one module can be active at a time.
            let allowMultipleActiveModules = false;

            // Set to 'true' to allow closing active modules by pressing the ESC key.
            let enableCloseWithEscape = true;
            // =================================================================


            const buttons = document.querySelectorAll('.header-button[data-action]');
            const modules = document.querySelectorAll('.module-content[data-module]');

            // Function to close all active modules
            function closeActiveModules() {
                modules.forEach(m => {
                    m.classList.remove('active');
                    m.classList.add('disabled');
                });
            }

            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const action = this.getAttribute('data-action');
                    let moduleName;

                    if (action === 'toggleModuleSurface') {
                        moduleName = 'moduleSurface';
                    } else if (action === 'toggleModuleOptions') {
                        moduleName = 'moduleOptions';
                    }

                    if (moduleName) {
                        const targetModule = document.querySelector(`.module-content[data-module="${moduleName}"]`);

                        if (targetModule) {
                            const isTargetModuleActive = targetModule.classList.contains('active');

                            // If multiple modules are not allowed, close all of them first
                            if (!allowMultipleActiveModules) {
                                closeActiveModules();
                            }

                            // If the clicked module was not active, activate it.
                            // If it was already active (and we closed the others), this toggle will deactivate it.
                            if (!isTargetModuleActive || allowMultipleActiveModules) {
                                targetModule.classList.toggle('disabled');
                                targetModule.classList.toggle('active');
                            }
                        }
                    }
                });
            });

            // Event listener for the 'Escape' key
            if (enableCloseWithEscape) {
                document.addEventListener('keydown', function (event) {
                    if (event.key === "Escape") {
                        closeActiveModules();
                    }
                });
            }
        });
    </script>
</body>

</html>