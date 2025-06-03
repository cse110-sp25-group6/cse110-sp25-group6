/**
 *
 * This file exports a template function that returns an HTML string to render a card.
 * It uses the provided data to populate card properties such as name, rarity, and stats.
 *
 * @param {Object} data - The card data containing properties for name, rarity, and stats.
 * @returns {string} HTML string representing the card element.
 */

export const template = (data) => {
	let blur = 0;
	let spread = 0;
	let R = 0;
	let G = 0;
	let B = 0;
	let opacity = 0;

	if (data.rarity == 1) {
		blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
	}
	else if (data.rarity == 2) {
		blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
	}
	else if (data.rarity == 3) {
		blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
	}
	else if (data.rarity == 4) {
		blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
	}
	else if (data.rarity == 5) {
		blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
	}

	return `
		<div class="card" style="background-image: url('../card_data/images/${data.image}'), url('../card_data/images/heap.png'); box-shadow: 0 0 10px 0.5px rgba(255, 255, 255, 1);">
			<p class="name"> ${data.name} </p>
			<p class="rarity"> ${'★'.repeat(data.rarity)} </p>
			<div class="stats">
				<span class="health"> 
					<span class="heart-icon">
						❤
					</span>
					${data.stats.health} 
				</span>
				<span class="damage"> 
					<span class="damage-icon">
						🗡️
					</span>
					${data.stats.damage} 
				</span>
			</div>
		</div>
	`;
}