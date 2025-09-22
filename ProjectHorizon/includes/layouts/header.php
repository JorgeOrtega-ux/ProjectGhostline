<div class="header">
    <div class="header-left">
        <div class="header-item">
            <div class="header-button" data-action="toggleModuleSurface" data-tooltip="Menú principal">
                <span class="material-symbols-rounded">menu</span>
            </div>
        </div>
    </div>
    <div class="header-right">
        <div class="header-item" id="user-actions">
            <?php if (isset($_SESSION['user_id'])): ?>
                <div class="user-avatar-container">
                    <div class="user-avatar" data-action="toggle-user-menu">
                        <?php
                        $name_parts = explode(' ', trim($_SESSION['user_name']));
                        $initials = '';
                        if (count($name_parts) > 0) {
                            $initials .= strtoupper(substr($name_parts[0], 0, 1));
                        }
                        if (count($name_parts) > 1) {
                            $initials .= strtoupper(substr($name_parts[count($name_parts) - 1], 0, 1));
                        }
                        echo $initials;
                        ?>
                    </div>
                    <div class="module-content module-select disabled" id="user-menu-select">
                        <div class="menu-content">
                            <div class="menu-list">
                                <div class="menu-link" data-action="logout">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">logout</span></div>
                                    <div class="menu-link-text"><span>Cerrar sesión</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php else: ?>
                <div class="header-button" data-action="toggleHelp" data-tooltip="Ayuda">
                    <span class="material-symbols-rounded">help</span>
                </div>
                <div class="header-button" data-action="toggleSettings" data-tooltip="Configuración">
                    <span class="material-symbols-rounded">settings</span>
                </div>
                <div class="header-button" data-action="toggleSectionLogin" data-tooltip="Acceder">
                    <span class="material-symbols-rounded">login</span>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>