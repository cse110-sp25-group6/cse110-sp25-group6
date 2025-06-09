/**
 * This test suite verifies the user interaction for the Collection page.
 * It sets up mock card data in localStorage and tests the sorting functionality
 * for the collection cards by rarity, acquisition data (recency), and name.
 */

describe("User flow for Collection", () => {
  beforeAll(async () => {
    // Navigate the Collection Page
    await page.goto(
      "https://cse110-sp25-group6.github.io/cse110-sp25-group6/collection/collection.html",
    );

    // Set up localStorage with mock card data out of order before the test run.
    await page.evaluate(() => {
      localStorage.clear();
      const cards = [];
      const rarities = [3, 5, 1, 2, 4];
      const names = ["e", "c", "a", "d", "b"];

      // Create mock card objects
      for (let i = 0; i < rarities.length; i++) {
        const card = {
          name: names[i],
          image: "Heap.png",
          rarity: rarities[i],
          stats: {
            health: -1,
            damage: -1,
          },
        };
        card.acquisition = Date.now() + 10 * i;
        cards.push(card);
      }

      // Save card array to local storage
      localStorage.setItem("Collection", JSON.stringify(cards));
    });

    // Reload the page to reflect the updated localStorage
    await page.reload();
  });

  it("Test Sort Rarity Button", async () => {
    console.log("Testing sort rarity button");

    // Simulate user clicking on sorty by rarity button
    await page.evaluate(() => {
      document.querySelector("#sort-rarity").click();
    });

    // Confirm that 5 cards are rendered
    const numCards = await page.$$eval(
      "collection-container card-component",
      (cards) => cards.length,
    );
    expect(numCards).toBe(5);

    // Validate that cards are sorted in order of descending rarity
    const result = await page.$$eval(
      "collection-container card-component",
      (cards) => {
        for (let i = 0; i < cards.length - 1; i++) {
          if (cards[i].cardData.rarity < cards[i + 1].cardData.rarity) {
            return false;
          }
        }
        return true;
      },
    );
    expect(result).toBe(true);
  });

  it("Test Sort Recent Button", async () => {
    console.log("Testing sort recent button");

    // Simulate user clicking on sorty by recent button
    await page.evaluate(() => {
      document.querySelector("#sort-acquisition").click();
    });

    // Confirm that 5 cards are rendered
    const numCards = await page.$$eval(
      "collection-container card-component",
      (cards) => cards.length,
    );
    expect(numCards).toBe(5);

    // Validate that cards are sorted in order of descending acquisition time
    const result = await page.$$eval(
      "collection-container card-component",
      (cards) => {
        for (let i = 0; i < cards.length - 1; i++) {
          if (
            cards[i].cardData.acquisition < cards[i + 1].cardData.acquisition
          ) {
            return false;
          }
        }
        return true;
      },
    );
    expect(result).toBe(true);
  });

  it("Test Sort Name Button", async () => {
    console.log("Testing sort recent button");

    // Simulate user clicking on sorty by name button
    await page.evaluate(() => {
      document.querySelector("#sort-name").click();
    });

    // Confirm that 5 cards are rendered
    const numCards = await page.$$eval(
      "collection-container card-component",
      (cards) => cards.length,
    );
    expect(numCards).toBe(5);

    // Validate that cards are sorted in alphabetical order
    const result = await page.$$eval(
      "collection-container card-component",
      (cards) => {
        for (let i = 0; i < cards.length - 1; i++) {
          if (cards[i].cardData.name > cards[i + 1].cardData.name) {
            return false;
          }
        }
        return true;
      },
    );
    expect(result).toBe(true);
  });
});
