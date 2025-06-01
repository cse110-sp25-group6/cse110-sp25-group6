import { styles } from './top-bar-styles.js';
import { template } from './top-bar-template.js';

class TopBar extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.data = {
			pageTitle: "",
			gems: 0,
			packs: 0
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.data.pageTitle = this.dataset.title || "";
		this.data.gems = localStorage.getItem('Gems') || 0;
		this.data.packs = localStorage.getItem('Packs') || 0;
		this.shadowRoot.innerHTML = `
			<style>
				${styles}
			</style>
			${template(this.data)}
		`;
	}
}

customElements.define('top-bar', TopBar);