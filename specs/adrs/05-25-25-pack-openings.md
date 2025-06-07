---
Date: 05/25/25
---

# General Pack Openings Decisions


## Context and Problem Statement

We needed to confirm some design and implementation ideas about the pack opening.
Number of cards, Open X packs, pack opening style, etc.

## Considered Solutions/Options


* Number of cards varies with other cards/packs, have seen anything ranging from like 3-16 cards per pack
* Our feature that allows for the opening of multiple packs needs a specific number, such as 3, 5, 10
* Based on what we have seen online and our own experiences, packs can be opening in many ways:
  * Packs that open and show all cards except high ratiry cards, which have a glow and must be flipped.
  * Packs that open and group inner cards by rarity, displaying smaller, reduced size displays of the cards that can be expanded on click.
  * Packs that open and allow you to flip the cards inside to choose one.
  * Packs that open and show you one card at a time and let you swipe through them.

## Decision:

We chose to have packs that contain 5 cards inside each of them, and that the user gets to see all the cards face down and individually flip them over, one by one. Additionally for the Open X pack we decided to cap it at 3 packs, in order to preserve the card display and so we don't have to shrink the size of the cards too much.

## Pros

* 5 cards is a small amount, allowing for them to all be displayed large on one screen
* 3 packs allows for a screen that can show 15 cards total, but is not cluttered/does not need the user to "scroll" through a list of cards.
* Flipping the cards provides suspense and satisfaction for the user.

## Cons 

* Users cannot have "mega" 10-pack openings
* Users must individually click to flip each card (might implement a flip all button in the future.)

## Examples/Any more important information

*write anything else relevant to the decision/important information related*
