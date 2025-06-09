import { styles } from "./top-bar-styles.js";
import { template } from "./top-bar-template.js";
/**
 *
 * Defines a custom <top-bar> element that displays the page title and currency values.
 * Retrieves currency from local storage and uses a shadow DOM to encapsulate its styles.
 * @class
 * @extends {HTMLElement}
 */
class TopBar extends HTMLElement {
  /**
   * Attaches shadow DOM and sets default data.
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = { pageTitle: "", gems: 0, packs: 0 };
  }

  /**
   * Called when element is connected. Renders the component.
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the top bar by updating data from dataset and local storage, then injecting the template.
   * @returns {void}
   */
  render() {
    this.data.pageTitle = this.dataset.title || "";
    this.data.gems = localStorage.getItem("Gems") || 0;
    this.data.packs = localStorage.getItem("Packs") || 0;
    this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${template(this.data)}
        `;
  }
}

customElements.define("top-bar", TopBar);
