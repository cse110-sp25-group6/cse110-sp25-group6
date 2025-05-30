
import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];
let lastSort = "acquisition";

async function init() {
	await populateLocalStorage();

	cards = getCollectionCards();
	sortCards(cards, "acquisition");
	addCardsToDocument(cards);

	addCurrencyToDocument();

	let sortNameButton = document.getElementById("sort-name");
	let sortRarityButon = document.getElementById("sort-rarity");
	let sortAcquisitionButton = document.getElementById("sort-acquisition");

	sortNameButton.addEventListener("click", () => {
		if (lastSort === "name") return;
		sortNameButton.classList.add("selected");
		sortRarityButon.classList.remove("selected");
		sortAcquisitionButton.classList.remove("selected");
		lastSort = "name";
		sortCards(cards, "name");
		addCardsToDocument(cards);
	});
	
	sortRarityButon.addEventListener("click", () => {
		if (lastSort === "rarity") return;
		sortRarityButon.classList.add("selected");
		sortNameButton.classList.remove("selected");
		sortAcquisitionButton.classList.remove("selected");
		lastSort = "rarity";
		sortCards(cards, "rarity");
		addCardsToDocument(cards);
	});
	
	sortAcquisitionButton.addEventListener("click", () => {
		if (lastSort === "acquisition") return;
		sortAcquisitionButton.classList.add("selected");
		sortNameButton.classList.remove("selected");
		sortRarityButon.classList.remove("selected");
		lastSort = "acquisition";
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


		cardComponent.classList.remove('animate-in');
		collectionContainer.append(cardComponent);
		void cardComponent.offsetWidth;
		const x = -100 - Math.random() * 500 + '%'
		const y = -100 - Math.random() * 500 + '%'
		console.log(x,y)
		cardComponent.style.setProperty('--start-x', x);
    	cardComponent.style.setProperty('--start-y', y);
		cardComponent.classList.add('animate-in');
	}
}

/**
 * Populates the local storage with some sample cards 
 * @returns {void} - Nothing
 */
async function populateLocalStorage() {
	localStorage.clear();
	localStorage.setItem('Gems',JSON.stringify(50)); // Add some gems
	localStorage.setItem('Packs',JSON.stringify(3)); // Add some packs

	for (let i = 1; i < 6; i++) {
		const res = await fetch(`../card_data/${i}_star.json`);
		if (!res.ok) {
			console.error(`Failed to load ${i}_star.json`);
			continue;
		}

		const cards = await res.json();

		for (const card of cards) {
			card.acquisition = Date.now() - ((i % 7) * 1000 * 60 * 60 * 24);
			addCardToCollection(card);
		}
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