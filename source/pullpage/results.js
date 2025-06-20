/**
 * This file initializes the pack results page by loading the card-pack image,
 * setting up event listeners for pulling, generating a pop-up that allows
 * pulling with gems if the user can't afford packs, and playing the pull
 * animation along with navigating the user to the results page after opening
 * a pack.
 * Dependencies:
 *  - cardComponent.js
 *  - top-bar.js
 */
import { addCardToCollection } from "../util/utils.js";
import "../components/card/cardComponent.js";
import "../components/top-bar/top-bar.js";

// get references to DOM elements
const stack = document.getElementById("card-stack");
let continueButton = document.getElementById("continue");

// configuration
let TOTAL_CARDS = 5;
let DEAL_DELAY = 500;
let WIPE_DELAY = 100;
let BUTTON_OFFSET = 10;
let FLIPPED = TOTAL_CARDS;
let CONTINUE = false;

// back-glow
let cardBlur = 18;
let spread = 7;
let R = 255;
let G = 174;
let B = 0;
let opacity = 1;

/**
 * Redirects the user if they inappropriately accessed or reloaded the results page,
 * then initializes the page by checking for pull type (single or 5-pack), creates
 * cards, deals them, then sets up the event listeners for the flip/continue button.
 *
 * @async
 * @returns {Promise<void>}
 */
async function init() {
  //Redirects the user if they attempt to inappropriately access the results page (such as
  // by entering in the URL directly or reloading the page), only allowing access
  //and generating cards if the results were accessed after making a pull.
  if (sessionStorage.getItem("madePull") != "true") {
    window.location.href = "pack.html";
  }

  sessionStorage.setItem("madePull", "false");

  //Alters values of variables depending on pull count
  if (sessionStorage.getItem("pull5") == "true") {
    TOTAL_CARDS = 25;
    DEAL_DELAY = 100;
    WIPE_DELAY = 20;
    BUTTON_OFFSET = 10;
    FLIPPED = TOTAL_CARDS;
  } else {
    TOTAL_CARDS = 5;
    DEAL_DELAY = 500;
    WIPE_DELAY = 100;
    BUTTON_OFFSET = 30;
    FLIPPED = TOTAL_CARDS;
  }

  //Loop to generate the cards
  for (let i = 0; i < TOTAL_CARDS; i++) {
    const card = await createCard(i);
    // add line break for pull1
    if (TOTAL_CARDS == 5 && i == 3) {
      let lineBreak = document.createElement("div");
      lineBreak.className = "break";
      stack.appendChild(lineBreak);
    }
    stack.appendChild(card);
  }

  //Animates the dealing of cards
  dealCards();

  //Hides flip/continue buttons until all cards have been dealt out.
  setTimeout(() => {
    continueButton.classList.remove("hidden");
  }, TOTAL_CARDS * DEAL_DELAY);

  // offset button closer to center for pull1
  continueButton.style.bottom = `${BUTTON_OFFSET}px`;
  continueButton.style.right = `${BUTTON_OFFSET}px`;

  //Adds event listener for the continue button. Flips all cards if there are face-down cards, otherwise wipes all cards and redirects the user.
  document.getElementById("continue").addEventListener("click", () => {
    if (CONTINUE) {
      wipeCards();

      let delay = WIPE_DELAY * (stack.children.length * 2);
      setTimeout(() => {
        window.location.href = "pack.html";
      }, delay);
    } else {
      flipAll();
    }
  });
}

/**
 * Generates a card of a random weighted rarity, pulling the card's
 * data randomly from the appriopriate json file.
 * Higher rarity cards have special glows.
 *
 * @async
 * @returns {Promise<Object>} A promise that resolves to a card data object
 */
async function getRandomCard() {
  //Generates rarity of card randomly based on rarity weights.
  let rng = Math.random();
  let rarity = 1;
  if (rng > 0.99) {
    rarity = 5;
  } else if (rng > 0.9) {
    rarity = 4;
  } else if (rng > 0.75) {
    rarity = 3;
  } else if (rng > 0.5) {
    rarity = 2;
  }

  // set backglow values (only for 4 and 5 stars)
  if (rarity == 5) {
    cardBlur = 18;
    spread = 7;
    R = 255;
    G = 174;
    B = 0;
    opacity = 1;
  } else if (rarity == 4) {
    cardBlur = 15;
    spread = 4;
    R = 170;
    G = 0;
    B = 255;
    opacity = 1;
  } else {
    cardBlur = 0;
    spread = 0;
    R = 0;
    G = 0;
    B = 0;
    opacity = 0;
  }

  //Fetches the appropriate json for the random rarity, then randomly selects a card from the set of cards in that rarity.
  const res = await fetch(`../card_data/${rarity}_star.json`);
  if (!res.ok) {
    console.error(`Failed to load ${rarity}_star.json`);
  }
  const cards = await res.json();
  let index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

/**
 * Creates a card DOM element with front and back faces.
 *
 * @async
 * @param {number} index - The position index of the card in the stack
 * @returns {Promise<HTMLElement>} A promise that resolves to a card element
 */
async function createCard(index) {
  //Generates front of the card element
  let front = document.createElement("card-component");
  front.classList.add("card-front");
  //Generates the data of a random card, before updating local storage to add that card to the user's collection.
  let cardData = await getRandomCard();
  front.data = cardData;
  addCardToCollection(cardData);

  let card = document.createElement("div");
  card.classList.add("card", "facedown");

  //Generates back of the card element.
  let back = document.createElement("div");
  back.classList.add("card-back");
  // back.textContent = `Back ${index + 1}`;
  const img = document.createElement("img");
  img.src = "./card-back.png";
  img.alt = `Back ${index + 1}`;
  img.style.width = "226px";
  img.style.height = "318px";
  // img.style.filter = 'brightness(90%) grayscale(30%) cardBlur(5px)';
  img.style.filter = "brightness(90%)";
  img.style.filter = "grayscale(35%)";
  // img.style.filter = 'cardBlur(1px)';
  back.appendChild(img);

  // add back glow
  back.style.boxShadow = `0 0 ${cardBlur}px ${spread}px rgb(${R}, ${G}, ${B}, ${opacity})`;

  card.appendChild(front);
  card.appendChild(back);

  // deal from off-screen (centered, above five locations)
  card.style.transform = `translate(-1500px, -1500px)`;

  return card;
}

/**
 * Animates card dealing one-by-one from offscreen to the
 * appriopriate position, with altered layout depending on
 * pull type.
 *
 * @returns {void}
 */
function dealCards() {
  let cards = Array.from(stack.children);

  //remove pause in dealing animation due to line break
  if (TOTAL_CARDS == 5) {
    let newCards = [TOTAL_CARDS];
    for (let i = 0; i < cards.length; i++) {
      if (!(i == 3)) {
        newCards.push(cards[i]);
      }
    }
    cards = newCards;
  }

  //Loops through each card in the stack, dealing each card out inddividually.
  cards.forEach((card, i) => {
    setTimeout(() => {
      if (card instanceof HTMLElement) {
        card.style.transform = "";
        card.classList.add("dealt");
        card.style.transition = "transform 0.8s ease";

        card.addEventListener("click", () => flipCard(card));
      }
    }, i * DEAL_DELAY);
  });
}

/**
 * Flips one card from face-down to face-up,
 * and updates the count of non-flipped cards.
 *
 * @param {HTMLElement} card - The card element to flip
 * @returns {void}
 */
function flipCard(card) {
  //Flips the card by updating its classes.
  card.classList.remove("facedown");
  card.classList.add("flipped");
  FLIPPED--;
  //Once all cards have been flipped, updates the continue button to instead continue back to the pull page.
  if (FLIPPED <= 0) {
    CONTINUE = true;
    // if continue is true, change text on button
    document.getElementById("continue").textContent = "Continue";
  }
}

/**
 * Flips all remaining face-down cards to face-up.
 *
 * @returns {void}
 */
function flipAll() {
  let cards = Array.from(stack.children);
  //Loops through every card in the stack, flipping them individually.
  cards.forEach((card) => {
    flipCard(card);
  });
}

/**
 * Animates the wipe/removal of cards with light randomization,
 * with altered behavior depending on pull type.
 *
 * @returns {void}
 */
function wipeCards() {
  let cards = Array.from(stack.children);

  //remove pause in wiping animation due to line break used for single-pull formatting.
  if (TOTAL_CARDS == 5) {
    let newCards = [TOTAL_CARDS];
    for (let i = 0; i < cards.length; i++) {
      if (!(i == 3)) {
        newCards.push(cards[i]);
      }
    }
    cards = newCards;
  }

  // Apply messy wipe with slight delay for each card
  cards.forEach((card, index) => {
    setTimeout(() => {
      let randomX = 800 + Math.random() * 400; // 800px to 1200px
      let randomY = (Math.random() - 0.5) * 200; // -100px to +100px
      let randomAngle = (Math.random() - 0.5) * 60; // -30deg to +30deg

      card.style.transition = "transform 0.7s ease-in-out, opacity 0.5s";
      card.style.opacity = "0";
      card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomAngle}deg)`;
    }, index * WIPE_DELAY); // 100ms stagger per card
  });
}

document.addEventListener("DOMContentLoaded", init);
