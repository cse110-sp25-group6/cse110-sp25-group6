export const styles = `
	.card {
		width: 13rem;
		height: calc(13rem * (7 / 5));
		background-color: #ddd;
		border-color: black;
		border-style: solid;
		border-width: 0.3rem;
		border-radius: 10px;
		box-shadow: 0 5px 15px rgba(0,0,0,0.2);
		cursor: pointer;
		transition: transform 0.3s ease;
		overflow: hidden;
		position: relative;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}



	.card:hover {
		transform: scale(1.05);
	}

	.name {
		border-radius: 0px;
		width: 100%;
		text-align: center;
		display: inline-block;
		margin-top: 1vh;
		color:white;
		background-color: rgba(0,0,0,0.6);
		font-size: 20px;
	}

	.rarity {
		border-radius: 5px;
		position: absolute;
		background-color: black;
		color: white;
		bottom: 0;
		margin-bottom: 1.5vh;
	}
	.stats {
		position: absolute;
		bottom: 1.5vh;
		right: 0.5em;
		display: flex;
		gap: 0.5em;  
	}

	.health, .damage {
		background-color: black;
		color: white;
		border-radius: 5px;
		padding: 0.2em 0.5em;
		font-size: 0.9em;
	}

	.stats span img {
		width: 0.7em;
		height: 0.7em;
		object-fit: contain;
	}

	.rarity {
		color: yellow;
	}

	.heart-icon {
		color: red;
	}

	.damage-icon {
		color: blue;
	}
`;