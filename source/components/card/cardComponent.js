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
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				${styles}
			</style>
			${template(this.cardData)}
		`;
	}

	connectedCallback() {
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href','../components/card/cardComponent.css');
		this.shadowRoot.append(link);
	}

}

customElements.define('card-component', CardComponent);