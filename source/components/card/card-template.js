export const template = (data) => {
	console.log('update template');
	return `
		<div class="card" style="background-image: url('../card_data/common_images/heap.png');">
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