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
            activeLink = Array.from(themeLinks).find(link => link.textContent.includes('Tema Claro'));
        } else if (theme === 'dark') {
            activeLink = Array.from(themeLinks).find(link => link.textContent.includes('Tema Oscuro'));
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
        updateThemeSelectorUI(theme);
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

    // --- Initial Load Theme ---
    const savedTheme = localStorage.getItem('theme') || 'sync';
    applyTheme(savedTheme);
    if (savedTheme === 'sync') {
        handleSystemThemeChange(systemTheme);
    }

    // --- Language Management ---
    const languageSelector = document.querySelectorAll('[data-module="moduleSelector"]')[1];
    const languageSelectorButton = languageSelector.previousElementSibling;
    const languageLinks = languageSelector.querySelectorAll('.menu-link');
    const availableLanguages = {
        'en': 'English (United States)',
        'es': 'Español (Latinoamérica)',
        'fr': 'Français (France)',
        'de': 'Deutsch (Deutschland)',
        'pt': 'Português (Brasil)'
    };

    function updateLanguageSelectorUI(lang) {
        const languageName = availableLanguages[lang] || availableLanguages['en'];
        const activeLink = Array.from(languageLinks).find(link => 
            link.querySelector('.menu-link-text span').textContent.trim() === languageName
        );

        if (activeLink) {
            languageLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
            
            const iconHTML = `<span class="material-symbols-rounded">language</span>`;
            const textHTML = activeLink.querySelector('.menu-link-text').innerHTML;
            const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
            languageSelectorButton.innerHTML = `${iconHTML} ${textHTML} ${arrowHTML}`;
        }
    }

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        updateLanguageSelectorUI(lang);
    }

    // --- Language Event Listeners ---
    languageLinks.forEach(link => {
        link.addEventListener('click', () => {
            const langText = link.querySelector('.menu-link-text span').textContent.trim();
            const langCode = Object.keys(availableLanguages).find(key => availableLanguages[key] === langText);
            if (langCode) {
                setLanguage(langCode);
            }
        });
    });

    // --- Initial Language Load ---
    const savedLang = localStorage.getItem('language');
    
    if (savedLang && availableLanguages[savedLang]) {
        // Si hay un idioma guardado y es válido, usarlo
        setLanguage(savedLang);
    } else {
        // Si no hay idioma guardado, detectar del navegador
        const userLang = navigator.language || navigator.userLanguage;
        const shortLang = userLang.split('-')[0];
        
        if (availableLanguages[userLang]) {
            setLanguage(userLang);
        } else if (availableLanguages[shortLang]) {
            setLanguage(shortLang);
        } else {
            setLanguage('en');
        }
    }

    // --- Open Links Management ---
    const openLinksToggle = document.getElementById('openLinksInNewTabToggle');

    function applyOpenLinksSetting() {
        const savedState = localStorage.getItem('openLinksInNewTab') || 'true';
        openLinksToggle.checked = savedState === 'true';
    }

    function saveOpenLinksSetting() {
        localStorage.setItem('openLinksInNewTab', openLinksToggle.checked);
    }

    applyOpenLinksSetting();
    openLinksToggle.addEventListener('change', saveOpenLinksSetting);
    
    // --- INICIO DE LA MODIFICACIÓN: Log de configuración inicial ---
    function logInitialSettings() {
        const theme = localStorage.getItem('theme') || 'sync';
        const language = localStorage.getItem('language') || 'auto';
        const openLinks = localStorage.getItem('openLinksInNewTab') || 'true';

        console.log("=========================================");
        console.log(" Ghostline Settings Loaded");
        console.log("=========================================");
        console.log(`🎨 Tema: ${theme}`);
        console.log(`🌐 Idioma: ${language}`);
        console.log(`🔗 Abrir enlaces en nueva pestaña: ${openLinks}`);
        console.log("=========================================");
    }

    logInitialSettings();
    // --- FIN DE LA MODIFICACIÓN ---
}

export { initSettingsController };