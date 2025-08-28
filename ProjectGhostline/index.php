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
    
    <!-- Script para prevenir flashes (FOUC) -->
    <script>
        (function() {
            // --- Prevenir flash de tema ---
            const savedTheme = localStorage.getItem('theme') || 'sync';
            const htmlElement = document.documentElement;
            
            if (savedTheme === 'light') {
                htmlElement.classList.add('light-theme');
            } else if (savedTheme === 'dark') {
                htmlElement.classList.add('dark-theme');
            } else if (savedTheme === 'sync') {
                // Detectar tema del sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    htmlElement.classList.add('dark-theme');
                } else {
                    htmlElement.classList.add('light-theme');
                }
            }
            
            // --- Prevenir flash de contenido ---
            // Ocultar el body hasta que todo esté cargado
            document.documentElement.style.visibility = 'hidden';
            
            // Función para mostrar el contenido cuando esté listo
            function showContent() {
                document.documentElement.style.visibility = 'visible';
            }
            
            // Mostrar contenido cuando el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showContent);
            } else {
                showContent();
            }
            
            // Failsafe: mostrar contenido después de 500ms máximo
            setTimeout(showContent, 500);
        })();
    </script>
    
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
                        <div class="module-content module-options disabled body-title" data-module="moduleOptions">
                            <div class="menu-content">
                                <div class="pill-container">
                                    <div class="drag-handle"></div>
                                </div>
                                <div class="menu-list">
                                    <div class="menu-link" data-action="toggleSettings">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">settings</span></div>
                                        <div class="menu-link-text"><span>Configuracion</span></div>
                                    </div>
                                    <div class="menu-link" data-action="toggleHelp">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">help</span></div>
                                        <div class="menu-link-text"><span>Ayuda y recursos</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="general-content-bottom">
                    <div class="module-content module-surface disabled body-title" data-module="moduleSurface">
                        <div class="menu-content">
                            <div class="menu-list <?php echo $isMainMenu ? '' : 'disabled'; ?>" data-menu-list="main">
                                <div class="menu-group menu-group-top">
                                    <div class="menu-link <?php echo ($CURRENT_SECTION === 'home') ? 'active' : ''; ?>" data-action="toggleSectionHome">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">home</span></div>
                                        <div class="menu-link-text"><span>Pagina principal</span></div>
                                    </div>
                                    <div class="menu-link <?php echo ($CURRENT_SECTION === 'explore') ? 'active' : ''; ?>" data-action="toggleSectionExplore">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">folder</span></div>
                                        <div class="menu-link-text"><span>Explorar colecciones</span></div>
                                    </div>
                                </div>
                                <div class="menu-group menu-group-bottom">
                                    <div class="menu-link <?php echo ($CURRENT_SECTION === 'trash') ? 'active' : ''; ?>" data-action="toggleSectionTrash">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">delete</span></div>
                                        <div class="menu-link-text"><span>Papelera de reciclaje</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-list <?php echo $isSettingsMenu ? '' : 'disabled'; ?>" data-menu-list="settings">
                                <div class="menu-group menu-group-top">
                                    <div class="menu-link" data-action="toggleSectionHome">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">arrow_back</span></div>
                                        <div class="menu-link-text"><span>Volver a inicio</span></div>
                                    </div>
                                    <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'accessibility') ? 'active' : ''; ?>" data-action="toggleSectionAccessibility">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">accessibility</span></div>
                                        <div class="menu-link-text"><span>Accesibilidad</span></div>
                                    </div>
                                </div>
                                <div class="menu-group menu-group-bottom">
                                    <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'about') ? 'active' : ''; ?>" data-action="toggleSectionAbout">
                                        <div class="menu-link-icon"><span class="material-symbols-rounded">info</span></div>
                                        <div class="menu-link-text"><span>Acerca de ProjectGhostline</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-list <?php echo $isHelpMenu ? '' : 'disabled'; ?>" data-menu-list="help">
                                <div class="menu-link" data-action="toggleSectionHome">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">arrow_back</span></div>
                                    <div class="menu-link-text"><span>Volver a inicio</span></div>
                                </div>
                                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'privacy-policy') ? 'active' : ''; ?>" data-action="toggleSectionPrivacyPolicy">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">policy</span></div>
                                    <div class="menu-link-text"><span>Política de privacidad</span></div>
                                </div>
                                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'terms') ? 'active' : ''; ?>" data-action="toggleSectionTerms">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">gavel</span></div>
                                    <div class="menu-link-text"><span>Términos y condiciones</span></div>
                                </div>
                                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'cookies') ? 'active' : ''; ?>" data-action="toggleSectionCookies">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">cookie</span></div>
                                    <div class="menu-link-text"><span>Política de cookies</span></div>
                                </div>
                                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'feedback') ? 'active' : ''; ?>" data-action="toggleSectionFeedback">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">feedback</span></div>
                                    <div class="menu-link-text"><span>Enviar comentarios</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="general-content-scrolleable overflow-y">
                        <div class="section-wrapper <?php echo $isMainMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperMain">
                            <div class="section-container <?php echo ($CURRENT_SECTION === 'home') ? 'active' : 'disabled'; ?>" data-section="sectionHome">Home Section</div>
                            <div class="section-container <?php echo ($CURRENT_SECTION === 'explore') ? 'active' : 'disabled'; ?>" data-section="sectionExplore">Explore Section</div>
                            <div class="section-container <?php echo ($CURRENT_SECTION === 'trash') ? 'active' : 'disabled'; ?>" data-section="sectionTrash">Trash Section</div>
                        </div>
                        <div class="section-wrapper <?php echo $isSettingsMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperSettings">
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'accessibility') ? 'active' : 'disabled'; ?>" data-section="sectionAccessibility">
                                <div class="settings-section">
                                    <div class="settings-header">
                                        <h2>Accesibilidad</h2>
                                        <p>Configura las opciones de accesibilidad para adaptar la interfaz a tus necesidades.</p>
                                    </div>

                                    <div class="settings-card settings-card--vertical">
                                        <div class="settings-card-content">
                                            <span class="settings-card-title">Tema</span>
                                            <span class="settings-card-description">Personaliza la apariencia de tu cuenta. Selecciona un tema o sincroniza con tu sistema.</span>
                                        </div>
                                        <div class="selector-container">
                                            <button class="selector-button" data-action="toggleModuleSelector">
                                                <span class="material-symbols-rounded">sync</span>
                                                <span>Sincronizar con el sistema</span>
                                                <span class="material-symbols-rounded">expand_more</span>
                                            </button>
                                            <div class="module-content module-selector disabled" data-module="moduleSelector">
                                                <div class="menu-content">
                                                    <div class="menu-list">
                                                        <div class="menu-link active">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">sync</span></div>
                                                            <div class="menu-link-text"><span>Sincronizar con el sistema</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">light_mode</span></div>
                                                            <div class="menu-link-text"><span>Claro</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">dark_mode</span></div>
                                                            <div class="menu-link-text"><span>Oscuro</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="settings-card settings-card--vertical">
                                        <div class="settings-card-content">
                                            <span class="settings-card-title">Idioma</span>
                                            <span class="settings-card-description">Selecciona tu idioma de preferencia para la interfaz.</span>
                                        </div>
                                        <div class="selector-container">
                                            <button class="selector-button" data-action="toggleModuleSelector">
                                                <span class="material-symbols-rounded">language</span>
                                                <span></span> <span class="material-symbols-rounded">expand_more</span>
                                            </button>
                                            <div class="module-content module-selector disabled" data-module="moduleSelector">
                                                <div class="menu-content">
                                                    <div class="menu-list">
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                                            <div class="menu-link-text"><span>English (United States)</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                                            <div class="menu-link-text"><span>Español (Latinoamérica)</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                                            <div class="menu-link-text"><span>Français (France)</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                                            <div class="menu-link-text"><span>Deutsch (Deutschland)</span></div>
                                                        </div>
                                                        <div class="menu-link">
                                                            <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                                            <div class="menu-link-text"><span>Português (Brasil)</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="settings-card settings-card--vertical">
                                        <div class="settings-card-left">
                                            <span class="settings-card-title">Los atajos necesitan un modificador</span>
                                            <span class="settings-card-description">Para crear atajos, es necesario usar la tecla modificadora Alt.</span>
                                        </div>
                                        <div class="settings-card-right">
                                            <label class="toggle-switch">
                                                <input type="checkbox" checked>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="settings-card settings-card--vertical">
                                        <div class="settings-card-left">
                                            <span class="settings-card-title">Contraste alto de colores</span>
                                            <span class="settings-card-description">Se mantiene un mayor contraste entre el texto y el fondo, incluidos los fondos con degradados.</span>
                                        </div>
                                        <div class="settings-card-right">
                                            <label class="toggle-switch">
                                                <input type="checkbox" checked>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'about') ? 'active' : 'disabled'; ?>" data-section="sectionAbout">
                                <div class="about-section">
                                    <div class="about-card">
                                        <div class="about-header">
                                            <span class="material-symbols-rounded about-logo">hub</span>
                                            <h2 class="about-title">ProjectGhostline</h2>
                                        </div>
                                        <div class="about-body">
                                            <div class="about-version-info">
                                                <span class="material-symbols-rounded">verified</span>
                                                <span>Versión 1.0.0 (Build Oficial)</span>
                                            </div>
                                            <ul class="about-links-list">
                                                <li class="about-link-item" data-action="toggleSectionPrivacyPolicy">
                                                    <span>Política de Privacidad</span>
                                                    <span class="material-symbols-rounded">open_in_new</span>
                                                </li>
                                                <li class="about-link-item" data-action="toggleSectionFeedback">
                                                    <span>Informar un problema</span>
                                                    <span class="material-symbols-rounded">open_in_new</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="about-card">
                                        <div class="about-footer">
                                            <p>Copyright 2025 jorgeortega-ux. Todos los derechos reservados.</p>
                                            <p>ProjectGhostline es una realidad gracias al proyecto de código abierto <b>Ghostline Core</b> y a otro <b>software de código abierto</b>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-wrapper <?php echo $isHelpMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperHelp">
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'privacy-policy') ? 'active' : 'disabled'; ?>" data-section="sectionPrivacyPolicy">Sección de Política de privacidad</div>
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'terms') ? 'active' : 'disabled'; ?>" data-section="sectionTerms">Sección de Términos y condiciones</div>
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'cookies') ? 'active' : 'disabled'; ?>" data-section="sectionCookies">Sección de Política de cookies</div>
                            <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'feedback') ? 'active' : 'disabled'; ?>" data-section="sectionFeedback">Sección de Enviar comentarios</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script type="module" src="<?php echo $BASE_URL; ?>/assets/js/init-app.js"></script>

</html>