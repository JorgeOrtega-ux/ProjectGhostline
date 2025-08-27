let config = null;

function initUrlManager() {
    config = window.PROJECT_CONFIG;
}

function generateUrl(section, subsection = null) {
    if (!config) return '#';

    let path = '';
    if (section === 'home') {
        path = '';
    } else if (section === 'explore' || section === 'trash') {
        path = section;
    } else if (section === 'settings') {
        path = `settings/${subsection || 'accessibility'}`;
    } else if (section === 'help') {
        path = `help/${subsection || 'privacy-policy'}`;
    }

    const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl : `${config.baseUrl}/`;
    return `${baseUrl}${path}`;
}

function navigateToUrl(section, subsection = null) {
    if (!config) return;

    const url = generateUrl(section, subsection);
    const state = {
        section,
        subsection
    };

    if (window.location.href !== url) {
        history.pushState(state, '', url);
    }
}

function setupPopStateHandler(callback) {
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            callback(event.state);
        } else {
            // Handle initial state or cases where state is null
            callback({
                section: 'home',
                subsection: null
            });
        }
    });
}

function setInitialHistoryState() {
    if (!config) return;

    const state = {
        section: config.currentSection,
        subsection: config.currentSubsection
    };

    history.replaceState(state, '', window.location.href);
}

export {
    initUrlManager,
    navigateToUrl,
    setupPopStateHandler,
    setInitialHistoryState
};