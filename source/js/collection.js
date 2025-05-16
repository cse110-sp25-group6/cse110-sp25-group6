import { getCollectionCards, addCardToCollection } from "./utils.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
	populateLocalStorage();
	let cards = getCollectionCards();
	addCardsToDocument(cards);
}

function addCardsToDocument(cards) {
	const collectionContainer = document.querySelector('collection-container');
	for (let cardData of cards) {
		const cardComponent = document.createElement('card-component');
		cardComponent.data = cardData;
		collectionContainer.append(cardComponent);
	}
}

function populateLocalStorage() {
	if (localStorage.getItem('collection') !== null) {
		return;
	}
	for (let i = 0; i < 30; i++) {
		let card = {
			"name" : `card${i}`,
			"rarity" : i % 5
		}
		addCardToCollection(card);
	}
}