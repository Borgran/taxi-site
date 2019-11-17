import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
	
	constructor(els, thresholdpercent) {
		this.itemToReveal = els;
		this.thresholdpercent = thresholdpercent;
		
		this.browserHeight = window.innerHeight;
		this.hideInit();
		this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
		this.events();
	}

	hideInit(){
		this.itemToReveal.forEach( e => { 
			e.classList.add("reveal-item");
			e.isRevealed = false;
		});		
		this.itemToReveal[this.itemToReveal.length - 1].isLastItem = true;
	}
	
	events() {	
		window.addEventListener("scroll", this.scrollThrottle);
		window.addEventListener("resize", debounce(() => {
			this.browserHeight = window.innerHeight;
			console.log('Resize detected');
		}, 333));
	}
	
	calcCaller () {
		this.itemToReveal.forEach( e => {
			if (!e.isRevealed)
			{
			 	this.calculateIfScrolledTo(e);
			}
		});
	}

	calculateIfScrolledTo(e) {
		if (window.scrollY + this.browserHeight > e.offsetTop) {/*Nie sprawdzaj jeśli dolna cześć okna jest wyżej niż element*/
			let scrollPercent = (e.getBoundingClientRect().top / window.innerHeight) *100;
			if (scrollPercent < this.thresholdpercent) {/*Pokaż tylko gdy element sięgnie 75% okna*/
				e.classList.add("reveal-item--is-visible");
				e.isRevealed = true;
				if (e.isLastItem == true) {
					window.removeEventListener("scroll", this.scrollThrottle);
				}
			}		
		}
	}
}

export default RevealOnScroll;