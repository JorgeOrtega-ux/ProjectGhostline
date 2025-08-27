document.addEventListener('DOMContentLoaded', function() {
    let allowMultipleActiveModules = false;
    let enableCloseWithEscape = true;
    let isAnimating = false;

    const buttons = document.querySelectorAll('[data-action]');
    const modules = document.querySelectorAll('.module-content[data-module]');
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');
    const menuContentOptions = moduleOptions ? moduleOptions.querySelector('.menu-content') : null;

    // --- FUNCIONES DE CONTROL DEL MENÚ DE OPCIONES (PC vs Mobile) ---

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
    }

    function closeMenuOptionsPC() {
        if (!moduleOptions.classList.contains('active')) return;
        moduleOptions.classList.remove('active');
        moduleOptions.classList.add('disabled');
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
        }, { once: true });
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
        }, { once: true });
    }

    // --- LÓGICA GENERAL DE MÓDULOS Y SECCIONES ---

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

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const action = this.getAttribute('data-action');
            
            // Lógica para ir a la sección de Ajustes
            if (action === 'toggleSettings') {
                const wrappers = document.querySelectorAll('.section-wrapper');
                const menus = document.querySelectorAll('[data-menu-list]');

                wrappers.forEach(w => { w.classList.remove('active'); w.classList.add('disabled'); });
                document.querySelector('[data-wrapper="wrapperSettings"]').classList.add('active');
                document.querySelector('[data-wrapper="wrapperSettings"]').classList.remove('disabled');

                menus.forEach(m => m.classList.add('disabled'));
                document.querySelector('[data-menu-list="settings"]').classList.remove('disabled');
                
                // Reinicia el estado del menú y las secciones de configuración
                const menuSettings = document.querySelector('[data-menu-list="settings"]');
                const wrapperSettings = document.querySelector('[data-wrapper="wrapperSettings"]');
                menuSettings.querySelector('[data-action="toggleSectionAccessibility"]').click();

                closeAllActiveModules();
                return;
            }
            
            // Lógica para ir a la sección de Ayuda y Recursos
            if (action === 'toggleHelp') {
                const wrappers = document.querySelectorAll('.section-wrapper');
                const menus = document.querySelectorAll('[data-menu-list]');

                wrappers.forEach(w => { w.classList.remove('active'); w.classList.add('disabled'); });
                document.querySelector('[data-wrapper="wrapperHelp"]').classList.add('active');
                document.querySelector('[data-wrapper="wrapperHelp"]').classList.remove('disabled');

                menus.forEach(m => m.classList.add('disabled'));
                document.querySelector('[data-menu-list="help"]').classList.remove('disabled');

                // Reinicia el estado del menú y las secciones de ayuda
                const menuHelp = document.querySelector('[data-menu-list="help"]');
                menuHelp.querySelector('[data-action="toggleSectionPrivacyPolicy"]').click();

                closeAllActiveModules();
                return;
            }

            // Lógica para cambiar entre secciones
            if (action.startsWith('toggleSection')) {
                let sectionName = action.replace('toggle', ''); // "SectionHome"
                sectionName = sectionName.charAt(0).toLowerCase() + sectionName.slice(1);

                // Si se hace clic en "Volver a inicio" o "Pagina principal"
                if (sectionName === 'sectionHome') {
                    const wrappers = document.querySelectorAll('.section-wrapper');
                    const menus = document.querySelectorAll('[data-menu-list]');

                    wrappers.forEach(w => { w.classList.remove('active'); w.classList.add('disabled'); });
                    document.querySelector('[data-wrapper="wrapperMain"]').classList.add('active');
                    document.querySelector('[data-wrapper="wrapperMain"]').classList.remove('disabled');

                    menus.forEach(m => m.classList.add('disabled'));
                    document.querySelector('[data-menu-list="main"]').classList.remove('disabled');
                }

                // *** INICIO DE LA CORRECCIÓN DEL BUG ***
                const links = this.closest('.menu-list').querySelectorAll('.menu-link');
                const targetSection = document.querySelector(`.section-container[data-section="${sectionName}"]`);
                
                if (targetSection) {
                    const parentWrapper = targetSection.closest('.section-wrapper');
                    const sectionsInWrapper = parentWrapper.querySelectorAll('.section-container');

                    // Desactiva todas las secciones en el contenedor correcto
                    sectionsInWrapper.forEach(s => {
                        s.classList.remove('active');
                        s.classList.add('disabled');
                    });
                    
                    // Desactiva todos los links en el menú actual
                    links.forEach(l => l.classList.remove('active'));

                    // Activa la sección y el link correctos
                    targetSection.classList.add('active');
                    targetSection.classList.remove('disabled');
                    this.classList.add('active');
                }
                // *** FIN DE LA CORRECCIÓN DEL BUG ***
                return;
            }

            // Lógica existente para los módulos
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

    // --- DRAG PARA MODULE OPTIONS (SOLO AFECTA MÓVILES) ---
    if (moduleOptions && menuContentOptions) {
        const dragHandle = moduleOptions.querySelector('.drag-handle');
        let isDragging = false, startY, currentY;

        function dragStart(e) {
            if (isAnimating || !moduleOptions.classList.contains('active')) return;
            isDragging = true;
            startY = e.pageY || e.touches[0].pageY;
            menuContentOptions.style.transition = 'none';
        }

        function dragging(e) {
            if (!isDragging) return;
            currentY = e.pageY || e.touches[0].pageY;
            const diffY = currentY - startY;
            if (diffY > 0) {
                menuContentOptions.style.transform = `translateY(${diffY}px)`;
            }
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            menuContentOptions.style.transition = 'transform 0.3s ease-out';
            
            const dragDistance = currentY - startY;
            
            if (dragDistance > menuContentOptions.offsetHeight * 0.4) {
                closeMenuOptionsMobile();
            } else {
                menuContentOptions.style.transform = 'translateY(0)';
                menuContentOptions.addEventListener('transitionend', () => {
                   menuContentOptions.removeAttribute('style');
                }, { once: true });
            }
        }

        if (dragHandle) {
            dragHandle.addEventListener('mousedown', dragStart);
            dragHandle.addEventListener('touchstart', dragStart, { passive: true });
        }
        document.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', dragging);
        document.addEventListener('touchend', dragEnd);
        
        moduleOptions.addEventListener('click', function(event) {
            if (event.target === moduleOptions) {
                closeMenuOptions();
            }
        });
    }
});