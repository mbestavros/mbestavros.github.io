// Import MDC components
import {MDCTopAppBar} from '@material/top-app-bar';

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const mainContentElement = document.getElementById('main-content');

// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(mainContentElement);
