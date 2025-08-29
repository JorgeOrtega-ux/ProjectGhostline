(function () {
    // --- Prevenir flash de tema ---
    // CORRECCIÓN: Cambiamos 'theme' por 'selectedTheme'
    const savedTheme = localStorage.getItem('selectedTheme') || 'sync';
    const htmlElement = document.documentElement;

    if (savedTheme === 'light') {
        htmlElement.classList.add('theme-light');
    } else if (savedTheme === 'dark') {
        htmlElement.classList.add('theme-dark');
    } else if (savedTheme === 'sync') {
        // Detectar tema del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.classList.add('theme-dark');
        } else {
            htmlElement.classList.add('theme-light');
        }
    }

})();