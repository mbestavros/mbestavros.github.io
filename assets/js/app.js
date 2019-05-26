// Import MDC components
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";

// Instantiate elements
const topAppBarElement = document.getElementById('app-bar');
const drawerElement = document.getElementById('app-drawer');
const drawerListElement = document.getElementById('drawer-list');
const mainContentElement = document.getElementById('main-content');

// Initialize top app bar
const topAppBar = new MDCTopAppBar(topAppBarElement);

// Initialize drawer
const initModalDrawer = () => {
    drawerElement.classList.add("mdc-drawer--modal");
    const drawer = MDCDrawer.attachTo(drawerElement);
    drawer.open = false;

    // Set separate scrolling for drawer and content
    topAppBar.setScrollTarget(mainContentElement);

    // Open drawer when hamburger button clicked
    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });

    drawerListElement.addEventListener('click', (event) => {
        drawer.open = false;
    });
}

if (window.matchMedia("(max-width: 900px)").matches) {
    initModalDrawer();
} else {
    const drawerList = new MDCList(drawerListElement);
    drawerList.wrapFocus = true;
}

// Toggle between permanent drawer and modal drawer at breakpoint 900px
const resizeHandler = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
        initModalDrawer();
    } else {
        drawerElement.classList.remove("mdc-drawer--modal");
    }
}
window.addEventListener('resize', resizeHandler);