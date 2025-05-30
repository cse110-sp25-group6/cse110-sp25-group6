
class CardComponent extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open'});
		const article = document.createElement('article');
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href','cardComponent.css');

		this.shadow.append(link, article);
	}

	set data(data) {
		if (!data) return;
		const article = this.shadow.querySelector('article');
		article.innerHTML = `
			<div class="card" style="background-image: url('../card_data/common_images/heap.png');">
				<p class="name"> ${data.name} </p>
				<p class="rarity"> ${'★'.repeat(data.rarity + 1)} </p>
				<div class="stats">
					<span class="health"> 
						❤ ${data.health} 
					</span>
					<span class="damage"> 
						⚔ ${data.damage} 
					</span>
				</div>
			</div>
		`;
	}

}

customElements.define('card-component', CardComponent);