import { translatePage } from './language-manager.js';

function initSettingsController() {
    const themeSelectors = document.querySelectorAll('[data-theme-value]');
    const languageSelectors = document.querySelectorAll('[data-lang-value]');

    // --- LÓGICA DEL TEMA ---
    function applyTheme(preference) {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let finalTheme = preference;

        if (preference === 'sync') {
            finalTheme = isSystemDark ? 'dark' : 'light';
        }

        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${finalTheme}`);
    }

    function updateActiveThemeSelector(preference) {
        let activeLink = null;
        themeSelectors.forEach(selector => {
            if (selector.dataset.themeValue === preference) {
                selector.classList.add('active');
                activeLink = selector;
            } else {
                selector.classList.remove('active');
            }
        });

        // --- INICIO DE LA MODIFICACIÓN ---
        // Actualiza el botón principal del selector de tema para que muestre la selección actual.
        if (activeLink) {
            const container = activeLink.closest('.selector-container');
            if (container) {
                const button = container.querySelector('.selector-button');
                if (button) {
                    const iconHTML = activeLink.querySelector('.menu-link-icon').innerHTML;
                    const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
                    const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
                    
                    button.innerHTML = `${iconHTML} ${textHTML} ${arrowHTML}`;
                }
            }
        }
        // --- FIN DE LA MODIFICACIÓN ---
    }

    function setTheme(preference) {
        localStorage.setItem('selectedTheme', preference);
        updateActiveThemeSelector(preference);
        applyTheme(preference);
    }

    // --- LÓGICA DEL IDIOMA ---
    function setLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
        document.documentElement.lang = lang;
        translatePage(lang); // <--- AÑADIDO: Llama a la función de traducción
        let activeLink = null;

        // 1. Pone la clase 'active' en el elemento correcto de la lista
        languageSelectors.forEach(selector => {
            if (selector.dataset.langValue === lang) {
                selector.classList.add('active');
                activeLink = selector; // Guarda una referencia al elemento activo
            } else {
                selector.classList.remove('active');
            }
        });

        // 2. --- ESTA ES LA PARTE NUEVA ---
        // Actualiza el texto y el icono del botón principal.
        if (activeLink) {
            const container = activeLink.closest('.selector-container');
            if (container) {
                const button = container.querySelector('.selector-button');
                if (button) {
                    const iconHTML = activeLink.querySelector('.menu-link-icon').innerHTML;
                    const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
                    const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
                    
                    // Reconstruye el contenido del botón para que muestre la selección
                    button.innerHTML = `${iconHTML} ${textHTML} ${arrowHTML}`;
                }
            }
        }
    }

    // --- INICIALIZACIÓN Y EVENTOS ---
    themeSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            setTheme(this.dataset.themeValue);
        });
    });

    languageSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            setLanguage(this.dataset.langValue);
        });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentPreference = localStorage.getItem('selectedTheme');
        if (currentPreference === 'sync') {
            applyTheme('sync');
        }
    });

    // --- CARGA INICIAL DE LA PÁGINA ---
    const savedTheme = localStorage.getItem('selectedTheme') || 'sync';
    setTheme(savedTheme);

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    setLanguage(savedLanguage);
}

export { initSettingsController };