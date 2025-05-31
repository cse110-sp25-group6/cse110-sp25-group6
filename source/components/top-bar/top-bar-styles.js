export const styles = `
	header {
		flex: 0 0 auto;
		background-color: white;
		padding: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--background-clr);
	}

	header h1 {
		font-size: var(--main-heading-sz);
		font-weight: 900;
		margin: 0;
	}
	
	a {
		color: var(--text-clr);
		font-size: var(--icon-sz);
		transition: all 0.5s ease;
	}
	
	a:hover {
		transform: scale(1.05);
		color: var(--accent-clr);
	}

	stats-container {
		display: flex;
		gap: 1rem;
		font-size: var(--text-sz);
		background-color: var(--foreground-clr);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	stat-display {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stat-icon {
		font-size: var(--icon-sz);
	}

	#gems {
		color: rgb(172, 44, 208)
	}

	#packs {
		color: rgb(187, 36, 36)
	}
`;