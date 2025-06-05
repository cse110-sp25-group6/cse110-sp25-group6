export function getCollectionCards() {

	if (localStorage.getItem('Collection')) {
		return JSON.parse(localStorage.getItem('Collection'));
	}
	return [];
}

export function addCardToCollection(card) {
	if (!card) return;
	card.acquisition = Date.now();
	const cards = getCollectionCards();
	cards.push(card);
	localStorage.setItem('Collection', JSON.stringify(cards));
}

