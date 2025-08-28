// assets/js/settings-controller.js

function initSettingsController() {
    // --- Theme Management ---
    const themeSelectorContainer = document.querySelector('.selector-container');
    const themeSelectorButton = themeSelectorContainer.querySelector('.selector-button');
    const themeModule = themeSelectorContainer.querySelector('[data-module="moduleSelector"]');
    const themeLinks = themeModule.querySelectorAll('.menu-link');
    const htmlElement = document.documentElement;

    function updateThemeSelectorUI(theme) {
        let activeLink;
        if (theme === 'light') {
            activeLink = Array.from(themeLinks).find(link => link.textContent.includes('Claro'));
        } else if (theme === 'dark') {
            activeLink = Array.from(themeLinks).find(link => link.textContent.includes('Oscuro'));
        } else { // 'sync'
            activeLink = Array.from(themeLinks).find(link => link.textContent.includes('Sincronizar'));
        }

        if (activeLink) {
            themeLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');

            const iconHTML = activeLink.querySelector('.menu-link-icon').innerHTML;
            const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
            const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
            themeSelectorButton.innerHTML = `${iconHTML} ${textHTML} ${arrowHTML}`;
        }
    }

    function applyTheme(theme) {
        htmlElement.classList.remove('light-theme', 'dark-theme');
        if (theme === 'light') {
            htmlElement.classList.add('light-theme');
        } else if (theme === 'dark') {
            htmlElement.classList.add('dark-theme');
        }
        localStorage.setItem('theme', theme);
        updateThemeSelectorUI(theme); // Actualiza la UI cada vez que se aplica un tema
    }

    function handleSystemThemeChange(e) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'sync') {
            if (e.matches) {
                htmlElement.classList.add('dark-theme');
                htmlElement.classList.remove('light-theme');
            } else {
                htmlElement.classList.add('light-theme');
                htmlElement.classList.remove('dark-theme');
            }
        }
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    systemTheme.addEventListener('change', handleSystemThemeChange);

    themeLinks.forEach(link => {
        link.addEventListener('click', () => {
            const themeText = link.querySelector('.menu-link-text span').textContent.toLowerCase();
            let themeValue;
            if (themeText.includes('claro')) {
                themeValue = 'light';
            } else if (themeText.includes('oscuro')) {
                themeValue = 'dark';
            } else {
                themeValue = 'sync';
            }
            applyTheme(themeValue);
            if (themeValue === 'sync') {
                handleSystemThemeChange(systemTheme);
            }
        });
    });

    // --- Initial Load ---
    const savedTheme = localStorage.getItem('theme') || 'sync';
    applyTheme(savedTheme); // Esta función ahora también actualiza la UI
    if (savedTheme === 'sync') {
        handleSystemThemeChange(systemTheme);
    }


    // --- Language Management ---
    const languageSelector = document.querySelectorAll('[data-module="moduleSelector"]')[1];
    const languageLinks = languageSelector.querySelectorAll('.menu-link');
    const availableLanguages = {
        'en': 'English (United States)',
        'es': 'Español (Latinoamérica)',
        'fr': 'Français (France)',
        'de': 'Deutsch (Deutschland)',
        'pt': 'Português (Brasil)'
    };

    function setLanguage(lang) {
        const languageName = availableLanguages[lang] || availableLanguages['en'];
        const button = languageSelector.previousElementSibling;
        const activeLink = Array.from(languageLinks).find(link => link.textContent.includes(languageName));

        if (activeLink) {
            languageLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
            
            // --- INICIO DE LA MODIFICACIÓN ---
            // Se define el ícono directamente aquí para evitar inconsistencias.
            const iconHTML = `<span class="material-symbols-rounded">language</span>`;
            // --- FIN DE LA MODIFICACIÓN ---

            const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
            const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
            button.innerHTML = `${iconHTML} ${textHTML} ${arrowHTML}`;
        }
        localStorage.setItem('language', lang);
    }

    const userLang = navigator.language || navigator.userLanguage;
    const shortLang = userLang.split('-')[0];
    const savedLang = localStorage.getItem('language');

    if (savedLang) {
        setLanguage(savedLang);
    } else if (availableLanguages[userLang]) {
        setLanguage(userLang);
    } else if (availableLanguages[shortLang]) {
        setLanguage(shortLang);
    } else {
        setLanguage('en');
    }

    languageLinks.forEach(link => {
        link.addEventListener('click', () => {
            const langText = link.textContent.trim();
            const langCode = Object.keys(availableLanguages).find(key => availableLanguages[key] === langText);
            if (langCode) {
                setLanguage(langCode);
            }
        });
    });
}

export { initSettingsController };