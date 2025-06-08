

import { styles } from './card-inspector-styles.js';
import { template } from './card-inspector-template.js';

class CardInspector extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.hidden = true;
		this.cardArr = [];
		this.currIdx = -1;
	}

	set cardArray(cardArr) {
		this.cardArr = cardArr;
	}

	set currentIndex(idx) {
		this.currIdx = idx;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template}
        `;
		this.defineEventListeners();
	}

	defineEventListeners() {
		const previousButton = this.shadowRoot.getElementById("previous");
		const nextButton = this.shadowRoot.getElementById("next");

		this.addEventListener("click", (e) => {
			if (e.composedPath()[0] === this) {
				this.hide();
			}
		});

		nextButton.onclick = () => this.next();
		previousButton.onclick = () => this.prev();
	}

	displayCurrentCard() {
		const inspectedCard = this.shadowRoot.querySelector('#inspect-card');
		const lore = this.shadowRoot.querySelector('.lore');
		inspectedCard.data = this.cardArr[this.currIdx];
		lore.textContent = this.cardArr[this.currIdx].lore;
	}

	hide() {
		this.style.display = 'none';
		this.hidden = true;
	}

	show() {
		this.style.display = 'flex';
		this.hidden = false;
		this.displayCurrentCard()
	}

	next() {
		if (this.hidden) {
			return;
		}
		if (this.currIdx !== this.cardArr.length - 1) {
			this.currIdx += 1;
			this.displayCurrentCard();
		}
	}

	prev() {
		if (this.hidden) {
			return;
		}
		if (this.currIdx !== 0) {
			this.currIdx -= 1;
			this.displayCurrentCard();
		}
	}
}

customElements.define('card-inspector', CardInspector);