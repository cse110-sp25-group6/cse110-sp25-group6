/**
 * Test suite for ensuring sorting behavior is correct.
 */

import { sortCards } from '../util/utils.js'

let card1 = {
	'name' : 'b-card',	
	'acquisition' : new Date(1, 1, 2).valueOf(), 
	'rarity' : 5
};

let card2 = {
	'name' : 'a-card',
	'acquisition' : new Date(1, 1, 3).valueOf(),
	'rarity' : 3
};

let card3 = {
	'name' : 'c-card',
	'acquisition' : new Date(1, 1, 1).valueOf(),
	'rarity' : 1
};

let cards = [card1, card2, card3];

test('sort by name', () => {
	sortCards(cards, 'name');
	expect(cards[0]).toBe(card2);
	expect(cards[1]).toBe(card1);
	expect(cards[2]).toBe(card3);
});

test('sort by acquisition', () => {
	sortCards(cards, 'acquisition');
	expect(cards[0]).toBe(card2);
	expect(cards[1]).toBe(card1);
	expect(cards[2]).toBe(card3);
})

test('sort by rarity', () => {
	sortCards(cards, 'rarity');
	expect(cards[0]).toBe(card1);
	expect(cards[1]).toBe(card2);
	expect(cards[2]).toBe(card3);
})