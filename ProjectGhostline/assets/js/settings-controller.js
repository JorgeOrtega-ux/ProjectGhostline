import { translatePage } from './language-manager.js';

function initSettingsController() {
    const themeSelectors = document.querySelectorAll('[data-theme-value]');
    const languageSelectors = document.querySelectorAll('[data-lang-value]');
    const openLinksToggle = document.getElementById('openLinksInNewTabToggle');

    // --- MAPA DE IDIOMAS ---
    const languageMap = {
        en: 'en-US',
        es: 'es-419', // CORREGIDO: Código oficial para Español de Latinoamérica
        fr: 'fr-FR',
        de: 'de-DE',
        pt: 'pt-BR'
    };

    // --- LÓGICA DEL TEMA ---
    function applyTheme(preference) {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let finalTheme = preference;

        if (preference === 'sync') {
            finalTheme = isSystemDark ? 'dark' : 'light';
        }

        document.documentElement.className = '';
        document.documentElement.classList.add(`theme-${finalTheme}`);
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

        if (activeLink) {
            const container = activeLink.closest('.selector-container');
            if (container) {
                const dropdown = container.querySelector('.selector-dropdown');
                if (dropdown) {
                    const iconHTML = activeLink.querySelector('.menu-link-icon').innerHTML;
                    const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
                    
                    dropdown.querySelector('.selector-dropdown-icon:first-child').innerHTML = iconHTML;
                    dropdown.querySelector('.selector-dropdown-text').innerHTML = `<div class="menu-link-text">${textHTML}</div>`;
                }
            }
        }
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
        translatePage(lang); 
        let activeLink = null;

        languageSelectors.forEach(selector => {
            if (selector.dataset.langValue === lang) {
                selector.classList.add('active');
                activeLink = selector;
            } else {
                selector.classList.remove('active');
            }
        });

        if (activeLink) {
            const container = activeLink.closest('.selector-container');
            if (container) {
                const dropdown = container.querySelector('.selector-dropdown');
                if (dropdown) {
                    const iconHTML = activeLink.querySelector('.menu-link-icon').innerHTML;
                    const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
                    
                    dropdown.querySelector('.selector-dropdown-icon:first-child').innerHTML = iconHTML;
                    dropdown.querySelector('.selector-dropdown-text').innerHTML = `<div class="menu-link-text">${textHTML}</div>`;
                }
            }
        }
    }

    // --- LÓGICA DE ABRIR ENLACES ---
    function setOpenLinksInNewTab(isChecked) {
        localStorage.setItem('openLinksInNewTab', isChecked);
    }

    function loadOpenLinksInNewTab() {
        const savedState = localStorage.getItem('openLinksInNewTab');
        const initialState = savedState === null ? true : (savedState === 'true');
        if (openLinksToggle) {
            openLinksToggle.checked = initialState;
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

    if (openLinksToggle) {
        openLinksToggle.addEventListener('change', function() {
            setOpenLinksInNewTab(this.checked);
        });
    }

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
    
    loadOpenLinksInNewTab();

    // --- MOSTRAR EN CONSOLA ---
    const languageWithCountry = languageMap[savedLanguage] || savedLanguage;
    console.log('Tema actual:', savedTheme);
    console.log('Idioma actual:', languageWithCountry);
    console.log('Abrir enlaces en nueva pestaña:', openLinksToggle ? openLinksToggle.checked : 'Elemento no encontrado');

}

export { initSettingsController };