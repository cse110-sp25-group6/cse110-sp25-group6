export function getCollectionCards() {
	return JSON.parse(localStorage.getItem('collection'));
}

export function addCardToCollection(card) {
	card.acquisition = Date.now();
	const cards = getCollectionCards();
	cards.push(card);
	localStorage.setItem('collection', JSON.stringify(cards));
}
