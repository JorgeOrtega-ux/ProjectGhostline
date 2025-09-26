// assets/js/language-manager.js

let translations = {};
const availableLanguages = {
    'es-419': 'Español (Latinoamérica)',
    'en-US': 'English (United States)',
};

async function fetchTranslations(langCode) {
    try {
        const response = await fetch(`${window.BASE_PATH}/assets/lang/${langCode}.json`);
        if (!response.ok) {
            throw new Error(`Could not load ${langCode}.json`);
        }
        translations = await response.json();
        applyTranslations(document.body);
    } catch (error) {
        console.error("Failed to fetch translations:", error);
        // Fallback a un idioma por defecto si falla la carga
        if (langCode !== 'es-419') {
            await setLanguage('es-419');
        }
    }
}

function getTranslation(key, replacements = {}) {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
        result = result[k];
        if (result === undefined) {
            return key; // Devuelve la clave si no se encuentra la traducción
        }
    }

    if (typeof result === 'string') {
        for (const placeholder in replacements) {
            result = result.replace(`{${placeholder}}`, replacements[placeholder]);
        }
    }

    return result;
}

function applyTranslations(element) {
    element.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = getTranslation(key);
    });

    element.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = getTranslation(key);
    });

    element.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.dataset.i18nTooltip;
        el.setAttribute('data-tooltip', getTranslation(key));
    });
}

function getBestLanguageMatch() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (availableLanguages[browserLang]) {
        return browserLang;
    }
    const primaryLang = browserLang.split('-')[0];
    if (primaryLang === 'es') return 'es-419';
    if (primaryLang === 'en') return 'en-US';

    return 'es-419'; // Idioma por defecto
}

export function updateLanguageSelectorUI(langCode) {
    const langSelector = document.querySelector('[data-target="language-select"]');
    if (langSelector) {
        const langText = langSelector.querySelector('.select-trigger-text');
        if (langText && availableLanguages[langCode]) {
            langText.textContent = availableLanguages[langCode];
        }
    }
    const langOptionsContainer = document.getElementById('language-select');
    if (langOptionsContainer) {
        const allLangLinks = langOptionsContainer.querySelectorAll('.menu-link');
        allLangLinks.forEach(link => link.classList.remove('active'));
        const activeLink = langOptionsContainer.querySelector(`.menu-link[data-value="${langCode}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

export async function setLanguage(langCode) {
    if (!availableLanguages[langCode]) return;
    localStorage.setItem('language', langCode);
    await fetchTranslations(langCode);
    updateLanguageSelectorUI(langCode);
    console.log(`Idioma establecido en: ${langCode}`);
}

export function initLanguageManager() {
    let currentLang = localStorage.getItem('language');
    if (!currentLang) {
        currentLang = getBestLanguageMatch();
    }
    setLanguage(currentLang);
}

// Exportar funciones para uso global
window.getTranslation = getTranslation;
window.applyTranslations = applyTranslations;