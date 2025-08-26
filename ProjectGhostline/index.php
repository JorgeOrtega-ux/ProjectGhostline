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
                                <div class="pill-container">
                                    <div class="drag-handle"></div>
                                </div>
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
        document.addEventListener('DOMContentLoaded', function() {
            // =================================================================
            // ========================= CONFIGURATION =========================
            // =================================================================
            let allowMultipleActiveModules = false;
            let enableCloseWithEscape = true;
            // =================================================================


            const buttons = document.querySelectorAll('.header-button[data-action]');
            const modules = document.querySelectorAll('.module-content[data-module]');

            function closeActiveModules() {
                modules.forEach(m => {
                    m.classList.remove('active');
                    m.classList.add('disabled');
                });
            }

            buttons.forEach(button => {
                button.addEventListener('click', function() {
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
                            if (!allowMultipleActiveModules) {
                                closeActiveModules();
                            }
                            if (!isTargetModuleActive || allowMultipleActiveModules) {
                                targetModule.classList.toggle('disabled');
                                targetModule.classList.toggle('active');
                            }
                        }
                    }
                });
            });

            if (enableCloseWithEscape) {
                document.addEventListener('keydown', function(event) {
                    if (event.key === "Escape") {
                        closeActiveModules();
                    }
                });
            }

            // =================================================================
            // ===================== DRAGGABLE MENU SCRIPT =====================
            // =================================================================
            const moduleOptions = document.querySelector('[data-module="moduleOptions"]');
            const menuContent = moduleOptions.querySelector('.menu-content');
            const dragHandle = moduleOptions.querySelector('.drag-handle');

            let isAnimating = false;
            let isDragging = false;
            let startY;
            let currentY;

            // =================================================================
            // ================ ANIMATED CLOSING FUNCTION ======================
            // =================================================================
            function closeOptionsMenu() {
                if (isAnimating || !moduleOptions.classList.contains('active')) return;

                isAnimating = true;

                // Elimina los estilos en línea del arrastre para que la animación CSS tome el control.
                menuContent.removeAttribute('style');

                moduleOptions.classList.add('is-closing');

                setTimeout(() => {
                    moduleOptions.classList.add('disabled');
                    moduleOptions.classList.remove('active');
                    moduleOptions.classList.remove('is-closing');
                    isAnimating = false;
                }, 300); 
            }


            function dragStart(e) {
                if (isAnimating) return;
                isDragging = true;
                startY = e.pageY || e.touches[0].pageY;
                // Desactiva temporalmente la transición para un arrastre fluido.
                menuContent.style.transition = 'none';
            }

            function dragging(e) {
                if (!isDragging) return;
                currentY = e.pageY || e.touches[0].pageY;
                const diffY = currentY - startY;
                if (diffY > 0) {
                    menuContent.style.transform = `translateY(${diffY}px)`;
                }
            }

            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;
                
                const dragDistance = currentY - startY;
                const menuHeight = menuContent.offsetHeight;

                if (dragDistance > menuHeight * 0.4) {
                    closeOptionsMenu();
                } else {
                    // Si no se cierra, elimina el atributo style para que vuelva a su
                    // posición original con la transición definida en el CSS.
                    menuContent.removeAttribute('style');
                }
            }

            dragHandle.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', dragging);
            document.addEventListener('mouseup', dragEnd);

            dragHandle.addEventListener('touchstart', dragStart);
            document.addEventListener('touchmove', dragging);
            document.addEventListener('touchend', dragEnd);

            // =================================================================
            // ========= CLICK OUTSIDE (ON OVERLAY) TO CLOSE SCRIPT ==========
            // =================================================================
            moduleOptions.addEventListener('click', function(event) {
                if (event.target === moduleOptions) {
                    closeOptionsMenu();
                }
            });
        });
    </script>
</body>

</html>