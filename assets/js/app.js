// Import MDC components
import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCRipple} from '@material/ripple/index';
import {MDCTabBar} from '@material/tab-bar/index';
import {MDCChipSet} from '@material/chips/deprecated/index';

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const mainContentElement = document.getElementById('main-content');

// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);
topAppBar.setScrollTarget(mainContentElement);

// Initialize article list tab bar
try {
  const articleListTabBar = new MDCTabBar(document.getElementById('post-page-list'));
} catch(e) {}

// Add ripples to things
const rippleSelector = '.mdc-card__primary-action, .mdc-fab, .mdc-button, .mdc-evolution-chip';
const ripples = [].map.call(document.querySelectorAll(rippleSelector), function(el) {
  return new MDCRipple(el);
});

// Initialize post chip sets
const chipSetSelector = '.mdc-evolution-chip-set';
const chipSets = [].map.call(document.querySelectorAll(chipSetSelector), function(el) {
  return new MDCChipSet(el);
});
