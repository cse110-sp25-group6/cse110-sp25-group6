
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
			<div class="card" style="background-image: url('../../admin/branding/team_pic.png');">
				<p class="name"> ${data.name} </p>
				<p class="acquisition"> ${new Date(data.acquisition).toString()} </p>
				<p class="rarity"> ${data.rarity} </p>
			</div>
		`;
	}

}

customElements.define('card-component', CardComponent);