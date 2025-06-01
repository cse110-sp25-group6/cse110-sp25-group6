export const styles = `
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: var(--color-text);
		font-family: var(--font-family);
	}

	header {
		flex: 0 0 auto;
		padding: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-background);
	}

	header h1 {
		font-size: var(--font-size-title);
		font-weight: var(--font-weight-bold);
		margin: 0;
	}
	
	a {
		font-size: var(--font-size-icon);
		transition: all var(--transition-time) ease;
	}
	
	a:hover {
		transform: scale(var(--scale-hover));
		color: var(--color-accent);
	}

	stats-container {
		display: flex;
		gap: 1rem;
		font-size: var(--font-size-body);
		background-color: var(--color-foreground);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	stat-display {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stat-icon {
		font-size: var(--font-size-icon);
	}

	#gems {
		color: var(--color-gems);
	}

	#packs {
		color: var(--color-packs); 
	}

`;