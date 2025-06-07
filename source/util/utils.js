/**
 * Gets list of cards that user has in their collection and returns it
 * @returns {Promise<Object>} A JSON object containing all cards user has
 */
export function getCollectionCards() {

	if (localStorage.getItem('Collection')) {
		return JSON.parse(localStorage.getItem('Collection'));
	}
	return [];
}

/**
 * Takes a card as a parameter and adds this particular card to the user's current collection of cards
 * @param {Object} - A JSON object of a particular card
 * @returns {void}
 */
export function addCardToCollection(card) {
	if (!card) return;
	card.acquisition = Date.now();
	const cards = getCollectionCards();
	cards.push(card);
	localStorage.setItem('Collection', JSON.stringify(cards));
}

