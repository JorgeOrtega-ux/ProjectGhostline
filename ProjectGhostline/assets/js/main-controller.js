// assets/js/main-controller.js

import {
    initUrlManager,
    navigateToUrl,
    setupPopStateHandler,
    setInitialHistoryState
} from './url-manager.js';

function initMainController() {
    initUrlManager();
    setInitialHistoryState();

    let allowMultipleActiveModules = false;
    let enableCloseWithEscape = true;
    let isAnimating = false;

    const buttons = document.querySelectorAll('[data-action]');
    const modules = document.querySelectorAll('.module-content[data-module]');
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');
    const menuContentOptions = moduleOptions ? moduleOptions.querySelector('.menu-content') : null;

    // --- URL and State Management ---
    setupPopStateHandler((state) => {
        if (state) {
            handleNavigation(state.section, state.subsection, false);
        }
    });

    function handleNavigation(section, subsection, updateHistory = true) {
        // ... (el resto de la función handleNavigation permanece igual)
        document.querySelectorAll('.section-wrapper, .section-container').forEach(el => {
            el.classList.remove('active');
            el.classList.add('disabled');
        });

        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));

        let targetWrapper, targetSection, activeMenu;

        if (section === 'settings') {
            targetWrapper = document.querySelector('[data-wrapper="wrapperSettings"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(subsection)}"]`);
            activeMenu = document.querySelector(`[data-menu-list="settings"] [data-action="toggleSection${capitalize(subsection)}"]`);
            showMenuList('settings');
        } else if (section === 'help') {
            targetWrapper = document.querySelector('[data-wrapper="wrapperHelp"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(subsection)}"]`);
            activeMenu = document.querySelector(`[data-menu-list="help"] [data-action="toggleSection${capitalize(subsection)}"]`);
            showMenuList('help');
        } else {
            targetWrapper = document.querySelector('[data-wrapper="wrapperMain"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(section)}"]`);
            activeMenu = document.querySelector(`[data-menu-list="main"] [data-action="toggleSection${capitalize(section)}"]`);
            showMenuList('main');
        }

        if (targetWrapper) {
            targetWrapper.classList.remove('disabled');
            targetWrapper.classList.add('active');
        }
        if (targetSection) {
            targetSection.classList.remove('disabled');
            targetSection.classList.add('active');
        }
        if (activeMenu) {
            activeMenu.classList.add('active');
        }

        if (updateHistory) {
            navigateToUrl(section, subsection);
        }
        closeAllActiveModules();
    }

    function showMenuList(menuName) {
        document.querySelectorAll('[data-menu-list]').forEach(menu => {
            menu.classList.add('disabled');
        });
        const menuToShow = document.querySelector(`[data-menu-list="${menuName}"]`);
        if (menuToShow) {
            menuToShow.classList.remove('disabled');
        }
    }

    // --- Module Controls (Mobile vs PC) ---
    // ... (el resto de las funciones como openMenuOptions, closeMenuOptions, etc., permanecen aquí)
    function openMenuOptions() {
        if (window.innerWidth <= 468) {
            openMenuOptionsMobile();
        } else {
            openMenuOptionsPC();
        }
    }

    function closeMenuOptions() {
        if (window.innerWidth <= 468) {
            closeMenuOptionsMobile();
        } else {
            closeMenuOptionsPC();
        }
    }

    function openMenuOptionsPC() {
        if (moduleOptions.classList.contains('active')) return;
        if (!allowMultipleActiveModules) closeAllActiveModules();
        moduleOptions.classList.remove('disabled');
        moduleOptions.classList.add('active');
        if (menuContentOptions) {
            menuContentOptions.classList.add('active');
        }
    }

    function closeMenuOptionsPC() {
        if (!moduleOptions.classList.contains('active')) return;
        moduleOptions.classList.remove('active');
        moduleOptions.classList.add('disabled');
        if (menuContentOptions) {
            menuContentOptions.classList.remove('active');
        }
    }

    function openMenuOptionsMobile() {
        if (isAnimating || moduleOptions.classList.contains('active')) return;
        if (!allowMultipleActiveModules) closeAllActiveModules();

        isAnimating = true;
        moduleOptions.classList.remove('disabled', 'fade-out');
        menuContentOptions.classList.remove('disabled');
        moduleOptions.classList.add('active', 'fade-in');

        requestAnimationFrame(() => {
            menuContentOptions.classList.add('active');
        });

        moduleOptions.addEventListener('animationend', (e) => {
            if (e.animationName === 'fadeIn') {
                moduleOptions.classList.remove('fade-in');
                isAnimating = false;
            }
        }, {
            once: true
        });
    }

    function closeMenuOptionsMobile() {
        if (isAnimating || !moduleOptions.classList.contains('active')) return;
        isAnimating = true;

        menuContentOptions.removeAttribute('style');
        moduleOptions.classList.remove('fade-in');
        moduleOptions.classList.add('fade-out');
        menuContentOptions.classList.remove('active');

        moduleOptions.addEventListener('animationend', (e) => {
            if (e.animationName === 'fadeOut') {
                moduleOptions.classList.add('disabled');
                moduleOptions.classList.remove('active', 'fade-out');
                menuContentOptions.classList.add('disabled');
                isAnimating = false;
            }
        }, {
            once: true
        });
    }

    // --- General Logic ---
    function closeAllActiveModules(excludeModule = null) {
        modules.forEach(m => {
            if (m !== excludeModule && m.classList.contains('active')) {
                if (m.dataset.module === 'moduleOptions') {
                    closeMenuOptions();
                } else {
                    m.classList.remove('active');
                    m.classList.add('disabled');
                }
            }
        });
    }
    
    function capitalize(s) {
        if (typeof s !== 'string') return '';
        // Handles kebab-case like 'privacy-policy'
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

    // --- Event Listeners ---
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            // ... (la lógica de los botones permanece igual)
            event.stopPropagation();
            const action = this.getAttribute('data-action');

            if (action === 'toggleSettings') {
                handleNavigation('settings', 'accessibility');
                return;
            }

            if (action === 'toggleHelp') {
                handleNavigation('help', 'privacy-policy');
                return;
            }

            if (action.startsWith('toggleSection')) {
                const sectionName = action.replace('toggleSection', '').toLowerCase();
                const mainSections = ['home', 'explore', 'trash'];
                const settingsSubsections = ['accessibility', 'privacy'];
                const helpSubsections = ['privacypolicy', 'terms', 'cookies', 'feedback'];

                if (mainSections.includes(sectionName)) {
                    handleNavigation(sectionName, null);
                } else if (settingsSubsections.includes(sectionName)) {
                    handleNavigation('settings', sectionName);
                } else if (helpSubsections.includes(sectionName)) {
                    const subsection = sectionName === 'privacypolicy' ? 'privacy-policy' : sectionName;
                    handleNavigation('help', subsection);
                }
                return;
            }


            let moduleName;
            if (action === 'toggleModuleOptions') {
                moduleName = 'moduleOptions';
            } else if (action === 'toggleModuleSurface') {
                moduleName = 'moduleSurface';
            }

            if (!moduleName) return;

            const targetModule = document.querySelector(`.module-content[data-module="${moduleName}"]`);
            if (!targetModule) return;

            const isTargetActive = targetModule.classList.contains('active');
            closeAllActiveModules(isTargetActive ? null : targetModule);

            if (isTargetActive) {
                if (targetModule.dataset.module === 'moduleOptions') {
                    closeMenuOptions();
                } else {
                    targetModule.classList.remove('active');
                    targetModule.classList.add('disabled');
                }
            } else {
                if (targetModule.dataset.module === 'moduleOptions') {
                    openMenuOptions();
                } else {
                    targetModule.classList.remove('disabled');
                    targetModule.classList.add('active');
                }
            }
        });
    });

    if (enableCloseWithEscape) {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") closeAllActiveModules();
        });
    }

    document.addEventListener('click', function(event) {
        // ... (la lógica de cierre de módulos al hacer clic fuera permanece igual)
        const activeModuleOptions = document.querySelector('.module-content[data-module="moduleOptions"].active');
        const activeButtonOptions = document.querySelector('.header-button[data-action="toggleModuleOptions"]');
        const activeModuleSurface = document.querySelector('.module-content[data-module="moduleSurface"].active');
        const activeButtonSurface = document.querySelector('.header-button[data-action="toggleModuleSurface"]');

        if (activeModuleOptions && activeButtonOptions) {
            if (!activeModuleOptions.contains(event.target) && !activeButtonOptions.contains(event.target)) {
                closeMenuOptions();
            }
        }

        if (activeModuleSurface && activeButtonSurface) {
            if (!activeModuleSurface.contains(event.target) && !activeButtonSurface.contains(event.target)) {
                activeModuleSurface.classList.remove('active');
                activeModuleSurface.classList.add('disabled');
            }
        }
    });

    // --- Resize handler ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('no-transition');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('no-transition');
        }, 100);
    });
}

export { initMainController };