/**
 * Card Inspect Styles
 *
 * Exports the Card Inspect styles for the card-inspect component.
 * These styles define the appearance for the inspect container,
 * its next and previous buttons, and lore.
 *
 */

export const styles = `
	:host {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: none;
		justify-content: space-around;
		align-items: center;
	}

	* {
		font-family: var(--font-family);
		color: var(--color-text);
	}

	#inspect-card {
		width: 400px;
		height: auto;
		transform: none;
	}

	button {
		background-color: rgba(0, 0, 0, 0);
		border-style: none;
		font-size: var(--font-size-heading);
		transition: all var(--transition-time) ease;
	}

	button:hover {
		transform: scale(1.5);
		cursor: pointer;
		color: var(--color-accent);
	}

	inspect-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		background-color: var(--color-background);
		padding: 1rem;
		border-radius: 1rem;
		max-width: 80%;
		max-height: 80%;
		height: max-content;
		overflow-y: auto;
		overflow-x: hidden;
	}

	@media (max-width: 1000px) {
		inspect-container {
			grid-template-columns: 1fr;
		}
	}


	inspect-container > * {
		flex: 1 1 auto;
		box-sizing: border-box;
	}

	.lore {
		padding: 2rem;
		max-width: 400px;
		font-size: 1.125rem;
		line-height: 1.5;
	}
`;
