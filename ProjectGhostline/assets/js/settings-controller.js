// assets/js/settings-controller.js

function initSettingsController() {
    const settingsSection = document.querySelector('[data-section="sectionAccessibility"]');
    if (!settingsSection) return; // No hacer nada si no estamos en la sección de ajustes

    // --- Theme Management ---
    const themeSelectorContainer = settingsSection.querySelector('.selector-container');
    const themeSelectorButton = themeSelectorContainer.querySelector('.selector-button');
    const themeLinks = themeSelectorContainer.querySelectorAll('.menu-link[data-theme-value]');
    const htmlElement = document.documentElement;

    function updateThemeSelectorUI(theme) {
        const activeLink = themeSelectorContainer.querySelector(`.menu-link[data-theme-value="${theme}"]`);
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
            const themeValue = link.getAttribute('data-theme-value');
            applyTheme(themeValue);
            if (themeValue === 'sync') {
                handleSystemThemeChange(systemTheme);
            }
        });
    });

    // --- Language Management ---
    const languageSelectorContainer = settingsSection.querySelectorAll('.selector-container')[1];
    const languageSelectorButton = languageSelectorContainer.querySelector('.selector-button');
    const languageLinks = languageSelectorContainer.querySelectorAll('.menu-link[data-lang-value]');
    
    function updateLanguageSelectorUI(lang) {
        const activeLink = languageSelectorContainer.querySelector(`.menu-link[data-lang-value="${lang}"]`);
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

    languageLinks.forEach(link => {
        link.addEventListener('click', () => {
            const langCode = link.getAttribute('data-lang-value');
            if (langCode) {
                setLanguage(langCode);
            }
        });
    });

    // --- Open Links Management ---
    const openLinksToggle = document.getElementById('openLinksInNewTabToggle');
    
    function applyOpenLinksSetting() {
        const savedState = localStorage.getItem('openLinksInNewTab') || 'true';
        openLinksToggle.checked = savedState === 'true';
    }

    function saveOpenLinksSetting() {
        localStorage.setItem('openLinksInNewTab', openLinksToggle.checked);
    }

    openLinksToggle.addEventListener('change', saveOpenLinksSetting);

    // --- Initial Settings Load Function ---
    function loadInitialSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme') || 'sync';
        applyTheme(savedTheme);
        if (savedTheme === 'sync') {
            handleSystemThemeChange(systemTheme);
        }

        // Language
        const savedLang = localStorage.getItem('language');
        const availableLangs = Array.from(languageLinks).map(link => link.getAttribute('data-lang-value'));
        
        if (savedLang && availableLangs.includes(savedLang)) {
            setLanguage(savedLang);
        } else {
            const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
            if (availableLangs.includes(userLang)) {
                setLanguage(userLang);
            } else {
                setLanguage('en'); 
            }
        }
        
        // Open Links
        applyOpenLinksSetting();

        console.log("=========================================");
        console.log(" Ghostline Settings Initialized");
        console.log("=========================================");
    }

    // --- RUN INITIALIZATION ---
    loadInitialSettings();
}

export { initSettingsController };