/**
 *
 * This file initializes the card collection page by loading cards from local storage,
 * setting up event listeners for sorting, card inspection (next/previous navigation),
 * and currency display.
 *
 * Dependencies:
 *  - cardComponent.js
 *  - top-bar.js
 * 	- card-inspect.js
 *  - util/utils.js
 *
 */

import "../components/card/cardComponent.js";
import "../components/top-bar/top-bar.js";
import "../components/card-inspector/card-inspector.js";
import {
  getCollectionCards,
  addCardToCollection,
  sortCards,
} from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];
let currentIndex = 0;
let lastSort = "acquisition";

/**
 * Initializes the page by populating local storage, loading cards, sorting them,
 * and attaching event listeners for interactive elements.
 *
 * @async
 * @returns {Promise<void>}
 */
function init() {
  cards = getCollectionCards();
  // Sort cards by most recent
  sortCards(cards, "acquisition");
  addCardsToDocument(cards);

  addCurrencyToDocument();

  let sortNameButton = document.getElementById("sort-name");
  let sortRarityButon = document.getElementById("sort-rarity");
  let sortAcquisitionButton = document.getElementById("sort-acquisition");
  let cardInspector = document.querySelector("card-inspector");
  cardInspector.cardArray = cards;
  cardInspector.currentIndex = 0;

  // Keyboard shortcuts for the inspect view
  document.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      // inspectorContainer.style.display = "none";
      cardInspector.hide();
    }
    if (event.key == "ArrowLeft") {
      cardInspector.prev();
    }
    if (event.key == "ArrowRight") {
      cardInspector.next();
    }
  });

  // Setup sort by name button
  sortNameButton.addEventListener("click", () => {
    if (lastSort === "name") return;
    sortNameButton.classList.add("selected");
    sortRarityButon.classList.remove("selected");
    sortAcquisitionButton.classList.remove("selected");
    lastSort = "name";
    sortCards(cards, "name");
    addCardsToDocument(cards);
    TrackJS.track("Sort by Name");
  });

  // Setup sort by rarity button
  sortRarityButon.addEventListener("click", () => {
    if (lastSort === "rarity") return;
    sortRarityButon.classList.add("selected");
    sortNameButton.classList.remove("selected");
    sortAcquisitionButton.classList.remove("selected");
    lastSort = "rarity";
    sortCards(cards, "rarity");
    addCardsToDocument(cards);
    TrackJS.track("Sort by Rarity");
  });

  // Setup sort by acquisition date button
  sortAcquisitionButton.addEventListener("click", () => {
    if (lastSort === "acquisition") return;
    sortAcquisitionButton.classList.add("selected");
    sortNameButton.classList.remove("selected");
    sortRarityButon.classList.remove("selected");
    lastSort = "acquisition";
    sortCards(cards, "acquisition");
    addCardsToDocument(cards);
    TrackJS.track("Sort by Recent");
  });

  window.onerror = function (message, source, lineno, colno, error) {
    const details = `Global error: ${message} at ${source}:${lineno}:${colno}`;
    TrackJS.track(details);
  };
}

/**
 * Updates the DOM with the user's currency values (Gems and Packs).
 * Retrieves values from local storage and updates all elements with the classes "gems" and "packs".
 *
 * @returns {void}
 */
function addCurrencyToDocument() {
  const gems = document.getElementsByClassName("gems");
  const packs = document.getElementsByClassName("packs");
  const gemsValue = localStorage.getItem("Gems");
  const packsValue = localStorage.getItem("Packs");

  for (let i = 0; i < gems.length; i++) {
    gems[i].innerHTML = `Gems: ${gemsValue}`;
  }
  for (let i = 0; i < packs.length; i++) {
    packs[i].innerHTML = `Packs: ${packsValue}`;
  }
}

/**
 * Renders all the cards into the document.
 * Clears any existing cards and creates new card components for each card in the array.
 *
 * @param {Array} cards - List of card objects to be rendered.
 * @returns {void}
 */
function addCardsToDocument(cards) {
  const collectionContainer = document.querySelector("collection-container");
  const cardInspector = document.querySelector("card-inspector");
  collectionContainer.innerHTML = ""; // Remove all cards
  for (let c = 0; c < cards.length; c++) {
    let cardData = cards[c];
    const cardComponent = document.createElement("card-component");

    // Pass card data to the custom component
    cardComponent.data = cardData;

    // When a card is clicked, open the inspector and load the card details
    cardComponent.addEventListener("click", () => {
      cardInspector.currentIndex = c;
      cardInspector.show();
    });

    // Restart animation by triggering a reflow
    cardComponent.classList.remove("animate-in");
    collectionContainer.append(cardComponent);
    void cardComponent.offsetWidth;
    // Randomized starting position for the entrance animation
    const x = -100 - Math.random() * 500 + "%";
    const y = -100 - Math.random() * 500 + "%";
    cardComponent.style.setProperty("--start-x", x);
    cardComponent.style.setProperty("--start-y", y);
    cardComponent.classList.add("animate-in");

    // Add hover effect for the inner card
    const card = cardComponent.shadowRoot.querySelector(".card");
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  }
}

/**
 * Populates local storage with sample cards and initial currency values.
 *
 * @async
 * @returns {Promise<void>}
 */
/* async function populateLocalStorage() {
	localStorage.clear();
	localStorage.setItem('Gems', JSON.stringify(50)); // Add some gems
	localStorage.setItem('Packs', JSON.stringify(3)); // Add some packs

	// Loop through sample card data files
	for (let i = 1; i < 6; i++) {
		const res = await fetch(`../card_data/${i}_star.json`);
		if (!res.ok) {
			console.error(`Failed to load ${i}_star.json`);
			continue;
		}

		const cards = await res.json();

		// Adjust acquisition date and add each card to the collection
		for (const card of cards) {
			card.acquisition = Date.now() - ((i % 7) * 1000 * 60 * 60 * 24);
			addCardToCollection(card);
		}
	}
} */
