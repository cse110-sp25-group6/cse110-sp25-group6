/**
 * 
 * This file defines a custom HTML element <card-component> that renders a card using
 * shadow DOM. It imports CSS styles and an HTML template for the card structure.
 *
 * Dependencies:
 *  - card-styles.js
 *  - card-template.js
 *
 */

import { styles } from './card-styles.js';
import { template } from './card-template.js';

class CardComponent extends HTMLElement {
	/**
	 * Creates an instance of CardComponent and attaches an open shadow root.
	 */
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		/**
		 * Default card data used as a fallback.
		 * @type {Object}
		 */
		this.cardData = {
			name: "unknown",
			image: "heap.png",
			rarity: 0,
			stats: {
				health: -1,
				damage: -1
			}
		};
	}

	/**
	 * Setter for the card data.
	 * If valid data is provided, it updates internal state and triggers a re-render.
	 *
	 * @param {Object} data - The card data to be rendered.
	 */
	set data(data) {
		if (!data) return;
		this.cardData = data;
		this.render();
	}

	/**
	 * Renders the card by inserting the style and template into the shadow DOM.
	 * Combines the imported CSS styles and HTML template with the current card data.
	 *
	 * @returns {void}
	 */
	render() {
		this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${template(this.cardData)}
        `;
	}

	/**
	 * Lifecycle callback invoked when the element is connected to the document.
	 * Ensures that the card is rendered when the element is added to the DOM.
	 *
	 * @returns {void}
	 */
	connectedCallback() {
		this.render();
	}
}

customElements.define('card-component', CardComponent);