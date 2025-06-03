import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';
import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];
let currentIndex = 0;
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

	const inspectorContainer = document.querySelector('.inspector');
	const inspectedCard = document.getElementById('inspect-card');
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	const lore = document.querySelector('.lore');

	inspectorContainer.addEventListener("click", (e) => {
		if (e.target === e.currentTarget) {
			inspectorContainer.style.display = "none";
		}
	})
	previousButton.addEventListener("click", () => {
		if (currentIndex != 0) {
			currentIndex -= 1;
			inspectedCard.data = cards[currentIndex]
			lore.textContent = cards[currentIndex].lore;
		}
	})
	nextButton.addEventListener("click", () => {
		if (currentIndex != cards.length - 1) {
			currentIndex += 1;
			inspectedCard.data = cards[currentIndex]
			lore.textContent = cards[currentIndex].lore;
		}
	})

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
	const inspectorContainer = document.querySelector('.inspector');
	const inspectedCard = document.getElementById('inspect-card');
	const lore = document.querySelector('.lore');
	collectionContainer.innerHTML = ''; // Remove all cards
	for (let c = 0; c < cards.length; c++) {
		let cardData = cards[c];
		const cardComponent = document.createElement('card-component');

		cardComponent.data = cardData;

		cardComponent.addEventListener("click", () => {
			currentIndex = c;
			inspectorContainer.style.display = "flex";
			inspectedCard.data = cardData;
			lore.textContent = cardData.lore;
		})


		cardComponent.classList.remove('animate-in');
		collectionContainer.append(cardComponent);
		void cardComponent.offsetWidth;
		const x = -100 - Math.random() * 500 + '%'
		const y = -100 - Math.random() * 500 + '%'
		cardComponent.style.setProperty('--start-x', x);
    	cardComponent.style.setProperty('--start-y', y);
		cardComponent.classList.add('animate-in');


		const card = cardComponent.shadowRoot.querySelector('.card');
		card.addEventListener('mouseover', () => {
			card.style.transform = 'scale(1.05)';
		});
		card.addEventListener('mouseout', () => {
			card.style.transform = 'scale(1)';
		});
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