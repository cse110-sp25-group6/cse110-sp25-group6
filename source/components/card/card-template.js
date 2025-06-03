export const template = (data) => {
	let blur = 0;
	let spread = 0;
	let R = 0;
	let G = 0;
	let B = 0;
	let opacity = 0;

	if (data.rarity == 1) {
		blur = 10;
		spread = 0.5;
		R = 255;
		G = 255;
		B = 255;
		opacity = 0.7;
	}
	else if (data.rarity == 2) {
		blur = 10;
		spread = 1;
		R = 89;
		G = 255;
		B = 0;
		opacity = 0.9;
	}
	else if (data.rarity == 3) {
		blur = 12;
		spread = 3;
		R = 0;
		G = 38;
		B = 255;
		opacity = 1;
	}
	else if (data.rarity == 4) {
		blur = 15;
		spread = 5;
		R = 170;
		G = 0;
		B = 255;
		opacity = 1;
	}
	else if (data.rarity == 5) {
		blur = 18;
		spread = 7;
		R = 255;
		G = 174;
		B = 0;
		opacity = 1;
	}

	return `
		<div class="card" style="background-image: url('../card_data/images/${data.image}'), url('../card_data/images/Heap.png'); box-shadow: 0 0 ${blur}px ${spread}px rgb(${R}, ${G}, ${B}, ${opacity}) inset;">
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