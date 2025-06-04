export const template = (data) => `
	<header>
		<a href="../homepage/index.html">&#8962</a>
		<h1>${data.pageTitle}</h1>
		<stats-container>
		<stat-display>
			<span class="stat-icon" id="gems">◈</span>
			<span class="stat-value">${data.gems}</span>
		</stat-display>
		<stat-display>
			<span class="stat-icon" id="packs">⧉</span>
			<span class="stat-value">${data.packs}</span></stat-display>
		</stats-container>
	</header>
`;