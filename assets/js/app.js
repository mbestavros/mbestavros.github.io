// Import MDC components
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const mainContentElement = document.getElementById('main-content');

// Instantiate button ripples
const aboutButtonRipple = new MDCRipple(document.getElementById('about-button'));
const blogButtonRipple = new MDCRipple(document.getElementById('blog-button'));


// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(mainContentElement);
