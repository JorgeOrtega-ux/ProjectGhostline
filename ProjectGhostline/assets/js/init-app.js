// assets/js/init-app.js

import { initMainController } from './main-controller.js';
import { initDragController } from './drag-controller.js';

document.addEventListener('DOMContentLoaded', function() {
    initMainController();
    initDragController();
});