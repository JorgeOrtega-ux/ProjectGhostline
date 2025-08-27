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
                                <div class="menu-link active">
                                    <div class="menu-link-icon" data-section="toggleSectionHome">
                                        <span class="material-symbols-rounded">home</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Pagina principal</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-section="toggleSectionExplore">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">folder</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Explorar colecciones</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionTrash">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">delete</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Papelera de reciclaje</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="general-content-scrolleable">
                        <div class="section-wrapper" data-wrapper="wrapperMain">
                            <div class="section-container active" data-section="sectionHome">1</div>
                            <div class="section-container disabled" data-section="sectionExplore">2</div>
                            <div class="section-container disabled" data-section="sectionTrash">3</div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="assets/js/main-controller.js"></script>

</html>