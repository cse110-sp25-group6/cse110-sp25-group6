
import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {
	populateLocalStorage();

	cards = getCollectionCards();
	sortCards(cards, "acquisition");
	addCardsToDocument(cards);

	addCurrencyToDocument();

	document.getElementById("sort-name").addEventListener("click", () => {
		sortCards(cards, "name");
		addCardsToDocument(cards);
	});
	document.getElementById("sort-rarity").addEventListener("click", () => {
		sortCards(cards, "rarity");
		addCardsToDocument(cards);
	});
	document.getElementById("sort-acquisition").addEventListener("click", () => {
		sortCards(cards, "acquisition");
		addCardsToDocument(cards);
	});
}

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
 * Adds all the cards that the user has to the document
 * @param {List} cards - List of cards to add to the document
 * @returns {void} - Nothing
 */
function addCardsToDocument(cards) {
	const collectionContainer = document.querySelector('collection-container');
	collectionContainer.innerHTML = ''; // Remove all cards
	for (let cardData of cards) {
		const cardComponent = document.createElement('card-component');
		cardComponent.data = cardData;
		collectionContainer.append(cardComponent);
	}
}

/**
 * Populates the local storage with some sample cards 
 * @returns {void} - Nothing
 */
function populateLocalStorage() {
	localStorage.clear();
	localStorage.setItem('Gems',JSON.stringify(50)); // Add some gems
	localStorage.setItem('Packs',JSON.stringify(3)); // Add some packs
	for (let i = 0; i < 30; i++) {
		let card = {
			"name": `card${i}`,
			"rarity": i % 5,
			"acquisition": Date.now() - ((i % 7) * 1000 * 60 * 60 * 24)
		}
		addCardToCollection(card);
	}
}



/**
 * Sorts the cards given in a specific order (in-place)
 * @param {List} cards - List of cards to be sorted
 * @param {String} property - Property by which to sort the given cards by
 * @returns {void} - Nothing
 */
export function sortCards(cards, property) {
	if (property === "name") {
		cards.sort((a, b) => a.name.localeCompare(b.name));
	}
	if (property === "rarity") {
		cards.sort((a, b) => a.rarity - b.rarity);
	}
	if (property === "acquisition") {
		cards.sort((a, b) => a.acquisition - b.acquisition);
	}
}