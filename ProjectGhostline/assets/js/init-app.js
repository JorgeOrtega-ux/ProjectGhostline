// assets/js/init-app.js

import { initMainController } from './main-controller.js';
import { initDragController } from './drag-controller.js';
import { initSettingsController } from './settings-controller.js';
import { initLanguageManager } from './language-manager.js';

document.addEventListener('DOMContentLoaded', async function() {
    await initLanguageManager(); // Espera a que las traducciones se carguen
    initMainController();
    initDragController();
    initSettingsController();
});