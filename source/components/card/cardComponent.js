import { styles } from './card-styles.js';
import { template } from './card-template.js';

class CardComponent extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open'});

		this.cardData = {
			name: "unknown",
			rarity: 0,
			stats: {
				health: -1,
				damage: -1
			}
		}
	}

	set data(data) {
		if (!data) return;
		this.cardData = data;
		this.render(1.05);
		this.set = true;
	}

	render(scale_size) {
		this.shadowRoot.innerHTML = `
			<style>
				${styles}
			</style>
			${template(this.cardData)}
		`;
		this.style.setProperty('--scale-size',scale_size);
	}

	connectedCallback() {
		if (!this.set) {
			this.render(1);
		}
	}

}

customElements.define('card-component', CardComponent);