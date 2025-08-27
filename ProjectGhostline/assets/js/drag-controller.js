// assets/js/drag-controller.js

function initDragController() {
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');
    const menuContentOptions = moduleOptions ? moduleOptions.querySelector('.menu-content') : null;

    if (moduleOptions && menuContentOptions) {
        const dragHandle = moduleOptions.querySelector('.drag-handle');
        let isDragging = false,
            startY, currentY;
        
        // La variable isAnimating y la función closeMenuOptionsMobile deben ser pasadas o importadas
        // Por simplicidad en este ejemplo, las definiremos aquí, pero idealmente se compartirían desde un módulo de estado.
        let isAnimating = false; 
        
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
                }, {
                    once: true
                });
            }
        }

        if (dragHandle) {
            dragHandle.addEventListener('mousedown', dragStart);
            dragHandle.addEventListener('touchstart', dragStart, {
                passive: true
            });
        }
        document.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', dragging);
        document.addEventListener('touchend', dragEnd);

        moduleOptions.addEventListener('click', function(event) {
            if (event.target === moduleOptions) {
                closeMenuOptionsMobile();
            }
        });
    }
}

export { initDragController };