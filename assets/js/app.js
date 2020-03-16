// Import MDC components
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';
import {MDCTabBar} from '@material/tab-bar';

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const mainContentElement = document.getElementById('main-content');

// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(mainContentElement);

// Initialize article list tab bar
try {
  const articleListTabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
} catch(e) {}

// Add ripples to Card action buttons
const rippleSelector = '.mdc-card__action--button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(rippleSelector), function(el) {
  return new MDCRipple(el);
});
