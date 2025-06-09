describe('User flow for Collection', () => {
	beforeAll(async () => {
		await page.goto('https://cse110-sp25-group6.github.io/cse110-sp25-group6/collection/collection.html');
		await page.evaluate(() => {
			localStorage.clear();
			const cards = [];
			const rarities = [3, 5, 1, 2, 4];
			const names = ['e', 'c', 'a', 'd', 'b']
			for (let i = 0; i < rarities.length; i++) {
				const card = {
					name: names[i],
					image: "Heap.png",
					rarity: rarities[i],
					stats: {
						health: -1,
						damage: -1
					}
				}
				card.acquisition = Date.now() + 10*i;
				cards.push(card);
			}
			localStorage.setItem('Collection', JSON.stringify(cards));
		});
		await page.reload();
	});

	it('Test Sort Rarity Button', async () => {
		console.log("Testing sort rarity button");
		await page.evaluate(() => {
			document.querySelector('#sort-rarity').click();
		});

		const numCards = await page.$$eval('collection-container card-component', (cards) => cards.length);
		expect(numCards).toBe(5);

		const result = await page.$$eval('collection-container card-component', (cards) => {
			for (let i = 0; i < cards.length - 1; i++) {
				// cards must sorted in order of descending rarity
				if (cards[i].cardData.rarity < cards[i+1].cardData.rarity) {
					return false;
				}
			}
			return true;
		});
		expect(result).toBe(true);
	});

	it('Test Sort Recent Button', async () => {
		await page.evaluate(() => {
			document.querySelector('#sort-acquisition').click();
		});
		const numCards = await page.$$eval('collection-container card-component', (cards) => cards.length);
		expect(numCards).toBe(5);

		const result = await page.$$eval('collection-container card-component', (cards) => {
			for (let i = 0; i < cards.length - 1; i++) {
				// cards should be sorted by most recent
				if (cards[i].cardData.acquisition < cards[i+1].cardData.acquisition) {
					return false;
				}
			}
			return true;
		});
		expect(result).toBe(true);
	});

	it('Test Sort Name Button', async () => {
		await page.evaluate(() => {
			document.querySelector('#sort-name').click();
		});
		const result = await page.$$eval('collection-container card-component', (cards) => {
			for (let i = 0; i < cards.length - 1; i++) {
				// cards should be sorted alphabetically
				if (cards[i].cardData.name > cards[i+1].cardData.name) {
					return false;
				}
			}
			return true;
		});
		expect(result).toBe(true);
	});

});