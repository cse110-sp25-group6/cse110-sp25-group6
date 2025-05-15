
class CardComponent extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open'});
		const article = document.createElement('article');
		const style = document.createElement('style');

		this.shadow.append(style, article);
	}

	set data(data) {
		if (!data) return;
		const article = this.shadow.querySelector('article');
		article.innerHTML = `
			<p> ${data.name} </p>
			<p> ${new Date(data.acquisition).toString()} </p>
			<p> ${data.rarity} </p>
		`;
	}

}

customElements.define('card-component', CardComponent);