import { getCollectionCards } from "./utils.js";

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
	const collectionData = [
		{
			"name" : "card1",
			"acquisition": Date.now(),
			"rarity": 1
		},
		{
			"name" : "card2",
			"acquisition": new Date(2025, 5, 16),
			"rarity": 3
		},
		{
			"name" : "card3",
			"acquisition": new Date(2025, 5, 14),
			"rarity": 2
		}	
	];

	localStorage.setItem('collection', JSON.stringify(collectionData));

}