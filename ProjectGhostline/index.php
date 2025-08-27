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
                                    <div class="menu-link" data-action="toggleSettings">
                                        <div class="menu-link-icon">
                                            <span class="material-symbols-rounded">settings</span>
                                        </div>
                                        <div class="menu-link-text">
                                            <span>Configuracion</span>
                                        </div>
                                    </div>
                                    <div class="menu-link" data-action="toggleHelp">
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
                            <div class="menu-list" data-menu-list="main">
                                <div class="menu-link active" data-action="toggleSectionHome">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">home</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Pagina principal</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionExplore">
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
                            <div class="menu-list disabled" data-menu-list="settings">
                                <div class="menu-link" data-action="toggleSectionHome">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">arrow_back</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Volver a inicio</span>
                                    </div>
                                </div>
                                <div class="menu-link active" data-action="toggleSectionAccessibility">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">accessibility</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Accesibilidad</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionPrivacy">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">lock</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Privacidad individual</span>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-list disabled" data-menu-list="help">
                                <div class="menu-link" data-action="toggleSectionHome">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">arrow_back</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Volver a inicio</span>
                                    </div>
                                </div>
                                <div class="menu-link active" data-action="toggleSectionPrivacyPolicy">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">policy</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Política de privacidad</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionTerms">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">gavel</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Términos y condiciones</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionCookies">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">cookie</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Política de cookies</span>
                                    </div>
                                </div>
                                <div class="menu-link" data-action="toggleSectionFeedback">
                                    <div class="menu-link-icon">
                                        <span class="material-symbols-rounded">feedback</span>
                                    </div>
                                    <div class="menu-link-text">
                                        <span>Enviar comentarios</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="general-content-scrolleable">
                        <div class="section-wrapper active" data-wrapper="wrapperMain">
                            <div class="section-container active" data-section="sectionHome">1</div>
                            <div class="section-container disabled" data-section="sectionExplore">2</div>
                            <div class="section-container disabled" data-section="sectionTrash">3</div>
                        </div>
                        <div class="section-wrapper disabled" data-wrapper="wrapperSettings">
                            <div class="section-container active" data-section="sectionAccessibility">Sección de Accesibilidad</div>
                            <div class="section-container disabled" data-section="sectionPrivacy">Sección de Privacidad</div>
                        </div>
                        <div class="section-wrapper disabled" data-wrapper="wrapperHelp">
                            <div class="section-container active" data-section="sectionPrivacyPolicy">Sección de Política de privacidad</div>
                            <div class="section-container disabled" data-section="sectionTerms">Sección de Términos y condiciones</div>
                            <div class="section-container disabled" data-section="sectionCookies">Sección de Política de cookies</div>
                            <div class="section-container disabled" data-section="sectionFeedback">Sección de Enviar comentarios</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="assets/js/main-controller.js"></script>

</html>