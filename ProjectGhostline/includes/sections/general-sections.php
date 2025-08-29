<div class="section-wrapper <?php echo $isMainMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperMain">
    <div class="section-container <?php echo ($CURRENT_SECTION === 'home') ? 'active' : 'disabled'; ?>" data-section="sectionHome">
        <div class="home-top-container">
            <div class="search-container">
                <span class="material-symbols-rounded search-icon">search</span>
                <input type="text" class="search-input" placeholder="Buscar usuarios" maxlength="64">
            </div>
            <div class="selector-container">
                <div class="selector-dropdown" data-action="toggleModuleSelector" tabindex="0">
                    <div class="selector-dropdown-icon">
                        <span class="material-symbols-rounded">swap_vert</span>
                    </div>
                    <div class="selector-dropdown-text">
                        <div class="menu-link-text">
                            <span data-translate-category="sort_options" data-translate="most_relevant"></span>
                        </div>
                    </div>
                    <div class="selector-dropdown-icon">
                        <span class="material-symbols-rounded">expand_more</span>
                    </div>
                </div>
                <div class="module-content module-selector disabled" data-module="moduleSelector">
                    <div class="menu-content">
                        <div class="menu-list">
                            <div class="menu-link active">
                                <div class="menu-link-icon"><span class="material-symbols-rounded">swap_vert</span></div>
                                <div class="menu-link-text"><span data-translate-category="sort_options" data-translate="most_relevant"></span></div>
                            </div>
                            <div class="menu-link">
                                <div class="menu-link-icon"><span class="material-symbols-rounded">schedule</span></div>
                                <div class="menu-link-text"><span data-translate-category="sort_options" data-translate="recent_edits"></span></div>
                            </div>
                            <div class="menu-link">
                                <div class="menu-link-icon"><span class="material-symbols-rounded">history</span></div>
                                <div class="menu-link-text"><span data-translate-category="sort_options" data-translate="oldest_edits"></span></div>
                            </div>
                            <div class="menu-link">
                                <div class="menu-link-icon"><span class="material-symbols-rounded">sort_by_alpha</span></div>
                                <div class="menu-link-text"><span data-translate-category="sort_options" data-translate="order_az"></span></div>
                            </div>
                            <div class="menu-link">
                                <div class="menu-link-icon"><span class="material-symbols-rounded">sort_by_alpha</span></div>
                                <div class="menu-link-text"><span data-translate-category="sort_options" data-translate="order_za"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-bottom-container">
            <div class="categories-wrapper">
                <div class="category-section">
                    <div class="category-header">
                        <h3 class="category-title">SECCION 1 DE USUARIO ASIGNADOS A UNA CATEGORIA</h3>
                    </div>
                    <div class="category-grid-container">
                        <div class="cards-grid">
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-section">
                     <div class="category-header">
                        <h3 class="category-title">SECCION 1 DE USUARIO ASIGNADOS A UNA CATEGORIA</h3>
                    </div>
                    <div class="category-grid-container">
                        <div class="cards-grid">
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-user-info">
                                    <div class="user-avatar-placeholder"></div>
                                    <span class="user-name">Nombre de usuario</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section-container <?php echo ($CURRENT_SECTION === 'explore') ? 'active' : 'disabled'; ?>" data-section="sectionExplore"></div>
    <div class="section-container <?php echo ($CURRENT_SECTION === 'trash') ? 'active' : 'disabled'; ?>" data-section="sectionTrash"></div>
</div>
<div class="section-wrapper <?php echo $isSettingsMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperSettings">
    <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'accessibility') ? 'active' : 'disabled'; ?>" data-section="sectionAccessibility">
        <div class="settings-section">
            <div class="settings-header">
                <h2 data-translate-category="accessibility_page" data-translate="title"></h2>
                <p data-translate-category="accessibility_page" data-translate="description"></p>
            </div>

            <div class="settings-card settings-card--vertical">
                <div class="settings-card-content">
                    <span class="settings-card-title" data-translate-category="accessibility_page" data-translate="theme_title"></span>
                    <span class="settings-card-description" data-translate-category="accessibility_page" data-translate="theme_description"></span>
                </div>
                <div class="selector-container">
                    <div class="selector-dropdown" data-action="toggleModuleSelector" tabindex="0">
                        <div class="selector-dropdown-icon">
                            <span class="material-symbols-rounded">sync</span>
                        </div>
                        <div class="selector-dropdown-text">
                            <div class="menu-link-text">
                                <span data-translate-category="accessibility_page" data-translate="sync_system"></span>
                            </div>
                        </div>
                        <div class="selector-dropdown-icon">
                            <span class="material-symbols-rounded">expand_more</span>
                        </div>
                    </div>
                    <div class="module-content module-selector disabled" data-module="moduleSelector">
                        <div class="menu-content">
                            <div class="menu-list">
                                <div class="menu-link active" data-theme-value="sync">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">sync</span></div>
                                    <div class="menu-link-text"><span data-translate-category="accessibility_page" data-translate="sync_system"></span></div>
                                </div>
                                <div class="menu-link" data-theme-value="light">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">light_mode</span></div>
                                    <div class="menu-link-text"><span data-translate-category="accessibility_page" data-translate="light_theme"></span></div>
                                </div>
                                <div class="menu-link" data-theme-value="dark">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">dark_mode</span></div>
                                    <div class="menu-link-text"><span data-translate-category="accessibility_page" data-translate="dark_theme"></span></div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-card settings-card--vertical">
                <div class="settings-card-content">
                    <span class="settings-card-title" data-translate-category="accessibility_page" data-translate="language_title"></span>
                    <span class="settings-card-description" data-translate-category="accessibility_page" data-translate="language_description"></span>
                </div>
                <div class="selector-container">
                    <div class="selector-dropdown" data-action="toggleModuleSelector" tabindex="0">
                        <div class="selector-dropdown-icon">
                             <span class="material-symbols-rounded">language</span>
                        </div>
                        <div class="selector-dropdown-text">
                            <div class="menu-link-text">
                                 <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="es"></span>
                                 <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="es"></span>
                            </div>
                        </div>
                        <div class="selector-dropdown-icon">
                            <span class="material-symbols-rounded">expand_more</span>
                        </div>
                    </div>
                    <div class="module-content module-selector disabled" data-module="moduleSelector">
                        <div class="menu-content">
                            <div class="menu-list">
                                <div class="menu-link" data-lang-value="en">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                    <div class="menu-link-text">
                                        <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="en"></span>
                                        <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="en"></span>
                                    </div>
                                </div>
                                <div class="menu-link" data-lang-value="es">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                    <div class="menu-link-text">
                                        <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="es"></span>
                                        <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="es"></span>
                                    </div>
                                </div>
                                <div class="menu-link" data-lang-value="fr">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                    <div class="menu-link-text">
                                        <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="fr"></span>
                                        <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="fr"></span>
                                    </div>
                                </div>
                                <div class="menu-link" data-lang-value="de">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                    <div class="menu-link-text">
                                        <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="de"></span>
                                        <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="de"></span>
                                    </div>
                                </div>
                                <div class="menu-link" data-lang-value="pt">
                                    <div class="menu-link-icon"><span class="material-symbols-rounded">language</span></div>
                                    <div class="menu-link-text">
                                        <span class="menu-link-text-primary" data-translate-category="native_languages" data-translate="pt"></span>
                                        <span class="menu-link-text-secondary" data-translate-category="languages" data-translate="pt"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settings-card settings-card--vertical">
                <div class="settings-card-left">
                    <span class="settings-card-title" data-translate-category="accessibility_page" data-translate="open_links_title"></span>
                    <span class="settings-card-description" data-translate-category="accessibility_page" data-translate="open_links_description"></span>
                </div>
                <div class="settings-card-right">
                    <label class="toggle-switch">
                        <input type="checkbox" id="openLinksInNewTabToggle" checked>
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
                        <span data-translate-category="about_page" data-translate="version"></span>
                    </div>
                    <ul class="about-links-list">
                        <li class="about-link-item" data-action="toggleSectionPrivacyPolicy">
                            <span data-translate-category="help_menu" data-translate="privacy_policy"></span>
                            <span class="material-symbols-rounded">open_in_new</span>
                        </li>
                        <li class="about-link-item" data-action="toggleSectionFeedback">
                            <span data-translate-category="help_menu" data-translate="feedback"></span>
                            <span class="material-symbols-rounded">open_in_new</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="section-wrapper <?php echo $isHelpMenu ? 'active' : 'disabled'; ?>" data-wrapper="wrapperHelp">
    <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'privacy-policy') ? 'active' : 'disabled'; ?>" data-section="sectionPrivacyPolicy"></div>
    <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'terms') ? 'active' : 'disabled'; ?>" data-section="sectionTerms"></div>
    <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'cookies') ? 'active' : 'disabled'; ?>" data-section="sectionCookies"></div>
    <div class="section-container <?php echo ($CURRENT_SUBSECTION === 'feedback') ? 'active' : 'disabled'; ?>" data-section="sectionFeedback"></div>
</div>