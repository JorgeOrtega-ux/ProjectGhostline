<div class="module-content module-surface disabled body-title" data-module="moduleSurface">
    <div class="menu-content">
        <div class="menu-list <?php echo $isMainMenu ? '' : 'disabled'; ?>" data-menu-list="main">
            <div class="menu-group menu-group-top">
                <div class="menu-link <?php echo ($CURRENT_SECTION === 'home') ? 'active' : ''; ?>" data-action="toggleSectionHome">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">home</span></div>
                    <div class="menu-link-text"><span data-translate-category="main_menu" data-translate="home"></span></div>
                </div>
                <div class="menu-link <?php echo ($CURRENT_SECTION === 'explore') ? 'active' : ''; ?>" data-action="toggleSectionExplore">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">folder</span></div>
                    <div class="menu-link-text"><span data-translate-category="main_menu" data-translate="explore"></span></div>
                </div>
            </div>
            <div class="menu-group menu-group-bottom">
                <div class="menu-link <?php echo ($CURRENT_SECTION === 'trash') ? 'active' : ''; ?>" data-action="toggleSectionTrash">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">delete</span></div>
                    <div class="menu-link-text"><span data-translate-category="main_menu" data-translate="trash"></span></div>
                </div>
            </div>
        </div>
        <div class="menu-list <?php echo $isSettingsMenu ? '' : 'disabled'; ?>" data-menu-list="settings">
            <div class="menu-group menu-group-top">
                <div class="menu-link" data-action="toggleSectionHome">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">arrow_back</span></div>
                    <div class="menu-link-text"><span data-translate-category="settings_menu" data-translate="back_home"></span></div>
                </div>
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'accessibility') ? 'active' : ''; ?>" data-action="toggleSectionAccessibility">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">accessibility</span></div>
                    <div class="menu-link-text"><span data-translate-category="settings_menu" data-translate="accessibility"></span></div>
                </div>
            </div>
            <div class="menu-group menu-group-bottom">
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'about') ? 'active' : ''; ?>" data-action="toggleSectionAbout">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">info</span></div>
                    <div class="menu-link-text"><span data-translate-category="settings_menu" data-translate="about"></span></div>
                </div>
            </div>
        </div>
        <div class="menu-list <?php echo $isHelpMenu ? '' : 'disabled'; ?>" data-menu-list="help">
            <div class="menu-group menu-group-top">
                <div class="menu-link" data-action="toggleSectionHome">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">arrow_back</span></div>
                    <div class="menu-link-text"><span data-translate-category="settings_menu" data-translate="back_home"></span></div>
                </div>
            </div>
            <div class="menu-group">
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'privacy-policy') ? 'active' : ''; ?>" data-action="toggleSectionPrivacyPolicy">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">policy</span></div>
                    <div class="menu-link-text"><span data-translate-category="help_menu" data-translate="privacy_policy"></span></div>
                </div>
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'terms') ? 'active' : ''; ?>" data-action="toggleSectionTerms">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">gavel</span></div>
                    <div class="menu-link-text"><span data-translate-category="help_menu" data-translate="terms"></span></div>
                </div>
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'cookies') ? 'active' : ''; ?>" data-action="toggleSectionCookies">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">cookie</span></div>
                    <div class="menu-link-text"><span data-translate-category="help_menu" data-translate="cookies"></span></div>
                </div>
                <div class="menu-link <?php echo ($CURRENT_SUBSECTION === 'feedback') ? 'active' : ''; ?>" data-action="toggleSectionFeedback">
                    <div class="menu-link-icon"><span class="material-symbols-rounded">feedback</span></div>
                    <div class="menu-link-text"><span data-translate-category="help_menu" data-translate="feedback"></span></div>
                </div>
            </div>
        </div>
    </div>
</div>