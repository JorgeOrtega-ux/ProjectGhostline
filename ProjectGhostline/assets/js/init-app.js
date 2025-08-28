// assets/js/init-app.js

import { initMainController } from './main-controller.js';
import { initDragController } from './drag-controller.js';
import { initSettingsController } from './settings-controller.js';

document.addEventListener('DOMContentLoaded', function() {
    initMainController();
    initDragController();
    initSettingsController();
});