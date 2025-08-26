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
        
        // --- MODIFICACIÓN CLAVE ---
        // Limpia cualquier estilo inline de un posible drag anterior para que la animación CSS funcione.
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

    // --- LÓGICA GENERAL DE MÓDULOS ---

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

            if (action === 'toggleModuleOptions') {
                if (moduleOptions.classList.contains('active')) {
                    closeMenuOptions();
                } else {
                    openMenuOptions();
                }
            } else if (action === 'toggleModuleSurface') {
                const surfaceModule = document.querySelector('[data-module="moduleSurface"]');
                if (!surfaceModule) return;
                const isSurfaceActive = surfaceModule.classList.contains('active');
                closeAllActiveModules(isSurfaceActive ? null : surfaceModule);
                if (isSurfaceActive) {
                    surfaceModule.classList.remove('active');
                    surfaceModule.classList.add('disabled');
                } else {
                    surfaceModule.classList.remove('disabled');
                    surfaceModule.classList.add('active');
                }
            }
        });
    });

    if (enableCloseWithEscape) {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") closeAllActiveModules();
        });
    }

    // --- DRAG & CLICK OUTSIDE PARA MODULE OPTIONS ---
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
                // --- MODIFICACIÓN CLAVE ---
                // Limpia el atributo style por completo una vez que la animación de retorno termina.
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