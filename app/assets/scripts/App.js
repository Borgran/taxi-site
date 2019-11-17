import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

if (module.hot) {
	module.hot.accept();
}

let MM = new MobileMenu();
let RS = new RevealOnScroll();
