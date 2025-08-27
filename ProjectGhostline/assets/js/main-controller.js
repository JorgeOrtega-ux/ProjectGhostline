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
                // Si el módulo es un selector, también quita la rotación de la flecha
                if (m.dataset.module === 'moduleSelector') {
                    const container = m.closest('.selector-container');
                    if (container) {
                        const button = container.querySelector('[data-action="toggleModuleSelector"]');
                        const arrowIcon = button.querySelector('.material-symbols-rounded:last-child');
                        if (arrowIcon) {
                            arrowIcon.classList.remove('arrow-rotated');
                        }
                    }
                }
            }
        });
    }

    function capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

    // --- MODIFICACIÓN AQUÍ ---
    // Función específica para manejar el selector
    function toggleModuleSelector(button) {
        const container = button.closest('.selector-container');
        if (!container) return;

        const module = container.querySelector('[data-module="moduleSelector"]');
        if (!module) return;

        const isModuleActive = module.classList.contains('active');
        
        // Cierra otros módulos antes de actuar sobre el actual
        closeAllActiveModules(isModuleActive ? null : module);

        // Cambia el estado del módulo actual
        module.classList.toggle('disabled', isModuleActive);
        module.classList.toggle('active', !isModuleActive);
        
        // Busca el ÚLTIMO ícono (la flecha) y lo rota
        const arrowIcon = button.querySelector('.material-symbols-rounded:last-child');
        if (arrowIcon) {
            arrowIcon.classList.toggle('arrow-rotated', !isModuleActive);
        }
    }


    // --- Event Listeners ---
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const action = this.getAttribute('data-action');
            
            // --- MODIFICACIÓN AQUÍ ---
            // Manejador para el selector de temas
            if (action === 'toggleModuleSelector') {
                toggleModuleSelector(this);
                return;
            }

            if (action === 'toggleSettings') {
                handleNavigation('settings', 'accessibility');
                return;
            }

            if (action === 'toggleHelp') {
                handleNavigation('help', 'privacy-policy');
                return;
            }

            if (action.startsWith('toggleSection')) {
                const sectionNameRaw = action.replace('toggleSection', '');
                const sectionName = sectionNameRaw.toLowerCase();
                const mainSections = ['home', 'explore', 'trash'];
                const settingsSubsections = ['accessibility', 'privacy'];
                // Corregido para manejar 'privacy-policy'
                const helpSubsections = ['privacy-policy', 'terms', 'cookies', 'feedback'];
                // Mapeo para casos especiales como 'PrivacyPolicy' a 'privacy-policy'
                const subsectionMap = { 'privacypolicy': 'privacy-policy' };
                const finalSubsection = subsectionMap[sectionName] || sectionName;
                
                if (mainSections.includes(finalSubsection)) {
                    handleNavigation(finalSubsection, null);
                } else if (settingsSubsections.includes(finalSubsection)) {
                    handleNavigation('settings', finalSubsection);
                } else if (helpSubsections.includes(finalSubsection)) {
                    handleNavigation('help', finalSubsection);
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
        const activeModules = document.querySelectorAll('.module-content.active');
        activeModules.forEach(activeModule => {
            const moduleName = activeModule.dataset.module;
            const actionName = 'toggle' + moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
            const activeButton = document.querySelector(`[data-action="${actionName}"]`);

            // Añadimos una excepción para el selector, ya que su botón puede variar
            if (moduleName === 'moduleSelector') {
                 const container = activeModule.closest('.selector-container');
                 if(container && !container.contains(event.target)) {
                     closeAllActiveModules();
                 }
            } else {
                 if (activeButton && !activeModule.contains(event.target) && !activeButton.contains(event.target)) {
                    closeAllActiveModules();
                }
            }
        });
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

export {
    initMainController
};