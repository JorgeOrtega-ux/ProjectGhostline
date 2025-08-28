let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch(`${window.PROJECT_CONFIG.baseUrl}/assets/languages/translations.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
    } catch (error) {
        console.error("Could not load translations:", error);
    }
}

function translatePage(language) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        const category = element.dataset.translateCategory;
        if (category && key && translations[category] && translations[category][key] && translations[category][key][language]) {
            element.textContent = translations[category][key][language];
        }
    });
}

function initLanguageManager() {
    return loadTranslations();
}

export { initLanguageManager, translatePage };