import { styles } from './card-inspector-styles.js';
import { template } from './card-inspector-template.js';

/**
 * A custom element for inspect cards in a modal-like UI.
 * Displays the selected card side by side with its lore.
 * Allows for navigation between cards with next and previous
 * buttons.
 * 
 * @class
 * @extends {HTMLElement}
 */
class CardInspector extends HTMLElement {

	/**
	 * Creates an instance of CardInspector as an HTMLElement, attaches an open
	 * shadow root, and defines default field values.
	 */
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.hidden = true;
		this.cardArr = [];
		this.currIdx = -1;
	}

	/**
	 * Set the array of cards to inspect.
	 * @param {Array<Object>} cardArr
	 */
	set cardArray(cardArr) {
		this.cardArr = cardArr;
	}

	/**
	 * Set the current card index
	 * @param {number} idx
	 */
	set currentIndex(idx) {
		this.currIdx = idx;
	}

	/**
	 * Render element when it is added the DOM
	 */
	connectedCallback() {
		this.render();
	}

	/**
	 * Renders the shadow DOM content and sets up event listeners.
	 */
	render() {
		this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template}
        `;
		this.defineEventListeners();
	}

	/**
	 * Defines event listeners for UI interactions: 
	 *  - dismissing inspect view when clicking ouside inspect container
	 *  - displaying the next card when next button is pressed
	 *  - displaying the previous card when the previous button is pressed
	 */
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

	/**
	 * Set the current card to be displayed and its lore content.
	 */
	displayCurrentCard() {
		const inspectedCard = this.shadowRoot.querySelector('#inspect-card');
		const lore = this.shadowRoot.querySelector('.lore');
		inspectedCard.data = this.cardArr[this.currIdx];
		lore.textContent = this.cardArr[this.currIdx].lore;
	}

	/**
	 * Hides the inspector.
	 */
	hide() {
		this.style.display = 'none';
		this.hidden = true;
	}

	/**
	 * Shows the inspector.
	 */
	show() {
		this.style.display = 'flex';
		this.hidden = false;
		this.displayCurrentCard()
	}

	/**
	 * Advance the next card if not at the end.
	 */
	next() {
		if (this.hidden) {
			return;
		}
		if (this.currIdx !== this.cardArr.length - 1) {
			this.currIdx += 1;
			this.displayCurrentCard();
		}
	}

	/**
	 * Go to the previous card if not the beginning.
	 */
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