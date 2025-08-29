import {
    initUrlManager,
    navigateToUrl,
    setupPopStateHandler,
    setInitialHistoryState
} from './url-manager.js';
import { translatePage } from './language-manager.js';
import { resetOffset } from './user-loader.js';

function initMainController() {
    initUrlManager();
    setInitialHistoryState();

    let allowMultipleActiveModules = false;
    let enableCloseWithEscape = true;
    let isAnimating = false;
    let searchTimeout;

    const buttons = document.querySelectorAll('[data-action]');
    const modules = document.querySelectorAll('.module-content[data-module]');
    const moduleOptions = document.querySelector('[data-module="moduleOptions"]');
    const menuContentOptions = moduleOptions ? moduleOptions.querySelector('.menu-content') : null;
    const searchInput = document.querySelector('.search-input');
    const cardsGrid = document.querySelector('.cards-grid');
    const categoryHeader = document.querySelector('.category-header');
    const categoryTitle = document.querySelector('.category-title');
    const loadMoreButton = document.getElementById('loadMoreUsers');


    // --- URL and State Management ---
    setupPopStateHandler((state) => {
        if (state) {
            handleNavigation(state.section, state.subsection, false);
        }
    });

    function handleNavigation(section, subsection, updateHistory = true, menuToKeep = null) {
        document.querySelectorAll('.section-wrapper, .section-container').forEach(el => {
            el.classList.remove('active');
            el.classList.add('disabled');
        });

        document.querySelectorAll('[data-menu-list] .menu-link').forEach(link => link.classList.remove('active'));

        let targetWrapper, targetSection, activeMenu;
        const menuSection = menuToKeep || section;

        if (section === 'settings') {
            targetWrapper = document.querySelector('[data-wrapper="wrapperSettings"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(subsection)}"]`);
        } else if (section === 'help') {
            targetWrapper = document.querySelector('[data-wrapper="wrapperHelp"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(subsection)}"]`);
        } else {
            targetWrapper = document.querySelector('[data-wrapper="wrapperMain"]');
            targetSection = document.querySelector(`[data-section="section${capitalize(section)}"]`);
        }
        
        if (menuSection === 'settings') {
            showMenuList('settings');
            const activeSubsection = (section === 'help' && menuToKeep === 'settings') ? 'about' : 'accessibility';
            activeMenu = document.querySelector(`[data-menu-list="settings"] [data-action="toggleSection${capitalize(activeSubsection)}"]`);
        } else if (menuSection === 'help') {
            showMenuList('help');
            activeMenu = document.querySelector(`[data-menu-list="help"] [data-action="toggleSection${capitalize(subsection)}"]`);
        } else {
            showMenuList('main');
            activeMenu = document.querySelector(`[data-menu-list="main"] [data-action="toggleSection${capitalize(section)}"]`);
        }

        if (targetWrapper) {
            targetWrapper.classList.remove('disabled');
            targetWrapper.classList.add('active');
        }
        if (targetSection) {
            targetSection.classList.remove('disabled');
            targetSection.classList.add('active');
        }
        if (activeMenu) {
            activeMenu.classList.add('active');
        }

        if (updateHistory) {
            navigateToUrl(section, subsection);
        }
        closeAllActiveModules();
    }

    function showMenuList(menuName) {
        document.querySelectorAll('[data-menu-list]').forEach(menu => {
            menu.classList.add('disabled');
        });
        const menuToShow = document.querySelector(`[data-menu-list="${menuName}"]`);
        if (menuToShow) {
            menuToShow.classList.remove('disabled');
        }
    }

    // --- Search Logic ---
    async function performSearch(query) {
        if (!categoryHeader || !categoryTitle || !cardsGrid) return;

        resetOffset(); 

        if (query) {
            categoryTitle.removeAttribute('data-translate-category');
            categoryTitle.removeAttribute('data-translate');
            categoryTitle.textContent = `Resultados para: "${query}"`;
        } else {
            const sortKey = cardsGrid.dataset.sortKey || 'most_relevant';
            categoryTitle.setAttribute('data-translate-category', 'category_titles');
            categoryTitle.setAttribute('data-translate', sortKey);
            const currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
            translatePage(currentLanguage);
        }
        
        cardsGrid.innerHTML = ''; 
        try {
            const sortKey = cardsGrid.dataset.sortKey || 'most_relevant';
            const response = await fetch(`${window.PROJECT_CONFIG.baseUrl}/load-users.php?search_query=${encodeURIComponent(query)}&sort_key=${sortKey}&offset=0`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json(); 
            const totalUsers = data.total_count;

            if (totalUsers === 0 && query) {
                // --- INICIO DE LA MODIFICACIÓN ---
                // Mostrar mensaje de "no se encontraron resultados"
                cardsGrid.innerHTML = `
                    <div class="no-results-message">
                        <span class="material-symbols-rounded">search_off</span>
                        <p>No se encontraron resultados para <b>"${query}"</b>.</p>
                    </div>
                `;
                // --- FIN DE LA MODIFICACIÓN ---
            } else {
                cardsGrid.innerHTML = data.html;
            }
            
            const displayedUsers = (new DOMParser().parseFromString(data.html, 'text/html')).body.children.length;

            if(loadMoreButton){
                loadMoreButton.dataset.total = totalUsers;
                if (displayedUsers >= totalUsers) {
                    loadMoreButton.style.display = 'none';
                } else {
                    loadMoreButton.style.display = 'block';
                }
            }

        } catch (error) {
            console.error('Error during search:', error);
            cardsGrid.innerHTML = `
                <div class="no-results-message">
                    <span class="material-symbols-rounded">error</span>
                    <p>Ocurrió un error al realizar la búsqueda.</p>
                </div>
            `;
        }
    }

    // --- Module Controls (Mobile vs PC) ---
    function openMenuOptions() {
        if (window.innerWidth <= 468) openMenuOptionsMobile();
        else openMenuOptionsPC();
    }

    function closeMenuOptions() {
        if (window.innerWidth <= 468) closeMenuOptionsMobile();
        else closeMenuOptionsPC();
    }

    function openMenuOptionsPC() {
        if (moduleOptions.classList.contains('active')) return;
        if (!allowMultipleActiveModules) closeAllActiveModules();
        moduleOptions.classList.remove('disabled');
        moduleOptions.classList.add('active');
        if (menuContentOptions) menuContentOptions.classList.add('active');
    }

    function closeMenuOptionsPC() {
        if (!moduleOptions.classList.contains('active')) return;
        moduleOptions.classList.remove('active');
        moduleOptions.classList.add('disabled');
        if (menuContentOptions) menuContentOptions.classList.remove('active');
    }

    function openMenuOptionsMobile() {
        if (isAnimating || moduleOptions.classList.contains('active')) return;
        if (!allowMultipleActiveModules) closeAllActiveModules();
        isAnimating = true;
        moduleOptions.classList.remove('disabled', 'fade-out');
        menuContentOptions.classList.remove('disabled');
        moduleOptions.classList.add('active', 'fade-in');
        requestAnimationFrame(() => {
            menuContentOptions.classList.add('active');
        });
        moduleOptions.addEventListener('animationend', (e) => {
            if (e.animationName === 'fadeIn') {
                moduleOptions.classList.remove('fade-in');
                isAnimating = false;
            }
        }, { once: true });
    }

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
        }, { once: true });
    }

    // --- General Logic ---
    function closeAllActiveModules(excludeModule = null) {
        modules.forEach(m => {
            if (m !== excludeModule && m.classList.contains('active')) {
                if (m.dataset.module === 'moduleOptions') closeMenuOptions();
                else {
                    m.classList.remove('active');
                    m.classList.add('disabled');
                }
                if (m.dataset.module === 'moduleSelector') {
                    const container = m.closest('.selector-container');
                    if (container) {
                        const button = container.querySelector('[data-action="toggleModuleSelector"]');
                        const arrowIcon = button.querySelector('.selector-dropdown-icon:last-child .material-symbols-rounded');
                        if (arrowIcon) arrowIcon.classList.remove('arrow-rotated');
                    }
                }
            }
        });
    }

    function capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }
    
    function toggleModuleSelector(button) {
        const container = button.closest('.selector-container');
        if (!container) return;
        const module = container.querySelector('[data-module="moduleSelector"]');
        if (!module) return;
        const isModuleActive = module.classList.contains('active');
        closeAllActiveModules(isModuleActive ? null : module);
        module.classList.toggle('disabled', isModuleActive);
        module.classList.toggle('active', !isModuleActive);
        const arrowIcon = button.querySelector('.selector-dropdown-icon:last-child .material-symbols-rounded');
        if (arrowIcon) arrowIcon.classList.toggle('arrow-rotated', !isModuleActive);
        if (isModuleActive) button.blur();
    }

    async function handleSelectorChoice(selectedLink) {
        const container = selectedLink.closest('.selector-container');
        if (!container) return;
        const dropdown = container.querySelector('.selector-dropdown');
        const module = container.querySelector('[data-module="moduleSelector"]');
        const allLinks = module.querySelectorAll('.menu-link');
        const iconHTML = selectedLink.querySelector('.menu-link-icon').innerHTML;
        const textHTML = selectedLink.querySelector('.menu-link-text').innerHTML;
        const arrowHTML = `<span class="material-symbols-rounded">expand_more</span>`;
        dropdown.querySelector('.selector-dropdown-icon:first-child').innerHTML = iconHTML;
        dropdown.querySelector('.selector-dropdown-text').innerHTML = `<div class="menu-link-text">${textHTML}</div>`;
        dropdown.querySelector('.selector-dropdown-icon:last-child').innerHTML = arrowHTML;
        allLinks.forEach(link => link.classList.remove('active'));
        selectedLink.classList.add('active');
        const sortKey = selectedLink.dataset.sortKey;
        if (cardsGrid) cardsGrid.dataset.sortKey = sortKey;
        
        const currentQuery = searchInput ? searchInput.value.trim() : '';
        performSearch(currentQuery);

        closeAllActiveModules();
        dropdown.blur();
    }

    // --- Event Listeners ---
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const action = this.getAttribute('data-action');
            if (action === 'toggleModuleSelector') {
                toggleModuleSelector(this);
                return;
            }
            if (action === 'toggleSettings') {
                handleNavigation('settings', 'accessibility');
                return;
            }
            if (action === 'toggleHelp') {
                handleNavigation('help', 'privacy-policy');
                return;
            }
            if (action.startsWith('toggleSection')) {
                const sectionNameRaw = action.replace('toggleSection', '');
                const sectionName = sectionNameRaw.toLowerCase();
                const mainSections = ['home', 'explore', 'trash'];
                const settingsSubsections = ['accessibility', 'about'];
                const helpSubsections = ['privacy-policy', 'terms', 'cookies', 'feedback'];
                const subsectionMap = { 'privacypolicy': 'privacy-policy' };
                const finalSubsection = subsectionMap[sectionName] || sectionName;
                const currentActiveMenuLink = document.querySelector('.menu-link.active');
                const isFromAboutPage = currentActiveMenuLink && currentActiveMenuLink.dataset.action === 'toggleSectionAbout';
                if (mainSections.includes(finalSubsection)) handleNavigation(finalSubsection, null);
                else if (settingsSubsections.includes(finalSubsection)) handleNavigation('settings', finalSubsection);
                else if (helpSubsections.includes(finalSubsection)) {
                    if (isFromAboutPage) handleNavigation('help', finalSubsection, true, 'settings');
                    else handleNavigation('help', finalSubsection);
                }
                return;
            }
            let moduleName;
            if (action === 'toggleModuleOptions') moduleName = 'moduleOptions';
            else if (action === 'toggleModuleSurface') moduleName = 'moduleSurface';
            if (!moduleName) return;
            const targetModule = document.querySelector(`.module-content[data-module="${moduleName}"]`);
            if (!targetModule) return;
            const isTargetActive = targetModule.classList.contains('active');
            closeAllActiveModules(isTargetActive ? null : targetModule);
            if (isTargetActive) {
                if (targetModule.dataset.module === 'moduleOptions') closeMenuOptions();
                else {
                    targetModule.classList.remove('active');
                    targetModule.classList.add('disabled');
                }
            } else {
                if (targetModule.dataset.module === 'moduleOptions') openMenuOptions();
                else {
                    targetModule.classList.remove('disabled');
                    targetModule.classList.add('active');
                }
            }
        });
    });

    document.querySelectorAll('[data-module="moduleSelector"] .menu-link').forEach(link => {
        link.addEventListener('click', function() {
            handleSelectorChoice(this);
        });
    });

    if (enableCloseWithEscape) {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") closeAllActiveModules();
        });
    }

    document.addEventListener('click', function(event) {
        const activeModules = document.querySelectorAll('.module-content.active');
        activeModules.forEach(activeModule => {
            const moduleName = activeModule.dataset.module;
            if (moduleName === 'moduleSelector') {
                 const container = activeModule.closest('.selector-container');
                 if(container && !container.contains(event.target)) closeAllActiveModules();
            } else {
                 const actionName = 'toggle' + moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
                 const activeButton = document.querySelector(`[data-action="${actionName}"]`);
                 if (activeButton && !activeModule.contains(event.target) && !activeButton.contains(event.target)) closeAllActiveModules();
            }
        });
    });

    // --- Resize handler ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('no-transition');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('no-transition');
        }, 100);
    });
    
    // --- Initial Page Load Handler ---
    function handleInitialPageLoad() {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part && part !== 'ProjectGhostline');
        let section = pathParts[0] || 'home';
        let subsection = pathParts[1] || null;
        if (section === 'settings' && !subsection) subsection = 'accessibility';
        if (section === 'help' && !subsection) subsection = 'privacy-policy';
        handleNavigation(section, subsection, false);
    }
    
    handleInitialPageLoad();
}

export { initMainController };