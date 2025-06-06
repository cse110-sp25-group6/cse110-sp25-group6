/**
 * Card Styles
 *
 * Exports the CSS styles for the card component.
 * These styles define the appearance for the card container,
 * its name, rarity, stats, and icon elements.
 *
 */

export const styles = `
	.card {
	 	aspect-ratio: 5 / 7;
		box-sizing: border-box;
		height: 100%;
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
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		position: absolute;
		background-color: black;
		color: white;
		bottom: 0;
		margin-bottom: 1.5vh;
		font-size: 0.9rem;
	}
	.stats {
		position: absolute;
		bottom: 1.5vh;
		right: 0.5rem;
		display: flex;
		gap: 0.5rem;  
	}

	.health, .damage {
		background-color: black;
		color: white;
		border-radius: 5px;
		padding: 0.2rem 0.5rem;
		font-size: 0.9rem;
	}

	.stats span img {
		width: 0.7rem;
		height: 0.7rem;
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