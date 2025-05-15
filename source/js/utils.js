export function getCollectionCards() {
	if (localStorage.getItem('collection')) {
		return JSON.parse(localStorage.getItem('collection'));
	}
	return [];
}

export function addCardToCollection(card) {
	if (!card) return;
	card.acquisition = Date.now();
	const cards = getCollectionCards();
	cards.push(card);
	localStorage.setItem('collection', JSON.stringify(cards));
}
