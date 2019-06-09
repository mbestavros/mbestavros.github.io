// Import MDC components
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const mainContentElement = document.getElementById('main-content');
const aboutButton = document.getElementById('about-button');



// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(mainContentElement);

//Initialize buttons
const aboutButtonRipple = new MDCRipple(aboutButton);