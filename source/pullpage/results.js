import { getCollectionCards, addCardToCollection } from "../util/utils.js";
import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';

// get references to DOM elements
const stack = document.getElementById("card-stack");
const topRow = document.getElementById("top-row");
const bottomRow = document.getElementById("bottom-row");
let continueButton = document.getElementById("continue");

// configuration
let TOTAL_CARDS = 5;
let DEAL_DELAY = 500;
let WIPE_DELAY = 100;
let BUTTON_OFFSET = 10;
let FLIPPED = TOTAL_CARDS;
let CONTINUE = false;

// back-glow
let blur = 18;
let spread = 7;
let R = 255;
let G = 174;
let B = 0;
let opacity = 1;

// initialize: create cards and trigger deal
async function init() {
    if (sessionStorage.getItem("madePull") != "true") {
        window.location.href = 'pack.html';
    }

    sessionStorage.setItem("madePull", "false");

    if (sessionStorage.getItem("pull5") == "true") {
        TOTAL_CARDS = 25;
        DEAL_DELAY = 100;
        WIPE_DELAY = 20;
        BUTTON_OFFSET = 10;
        FLIPPED = TOTAL_CARDS;
    }
    else {
        TOTAL_CARDS = 5;
        DEAL_DELAY = 500;
        WIPE_DELAY = 100;
        BUTTON_OFFSET = 30;
        FLIPPED = TOTAL_CARDS;
    }

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

    dealCards();

    setTimeout(() => {
        continueButton.classList.remove("hidden");
    }, TOTAL_CARDS * DEAL_DELAY);

    // offset button closer to center for pull1
    continueButton.style.bottom = `${BUTTON_OFFSET}px`;
    continueButton.style.right = `${BUTTON_OFFSET}px`;

    document.getElementById("continue").addEventListener("click", () => {
        if (CONTINUE) {
            wipeCards()

            let delay = WIPE_DELAY * (stack.children.length * 2);
            setTimeout(() => {
                window.location.href = 'pack.html';
            }, delay);
        }
        else {
            flipAll();
        }
    });

}

async function getRandomCard() {
    let rng = Math.random();
    let rarity = 1;
    if (rng > 0.99) {
        rarity = 5;
    }
    else if (rng > 0.9) {
        rarity = 4;
    }
    else if (rng > 0.75) {
        rarity = 3;
    }
    else if (rng > 0.5) {
        rarity = 2;
    }

    // set backglow values (only for 4 and 5 stars)
    if (rarity == 5) {
        blur = 18;
		spread = 7;
		R = 255;
		G = 174;
		B = 0;
		opacity = 1;
    } else if (rarity == 4) {
		blur = 15;
		spread = 5;
		R = 170;
		G = 0;
		B = 255;
		opacity = 1;
    } else {
        blur = 0;
		spread = 0;
		R = 0;
		G = 0;
		B = 0;
		opacity = 0;
    }

    const res = await fetch(`../card_data/${rarity}_star.json`);
    if (!res.ok) {
        console.error(`Failed to load ${rarity}_star.json`);
    }
    const cards = await res.json();
    let index = Math.floor(Math.random() * cards.length);
    return cards[index];

}

// utility: Create a card DOM element
async function createCard(index) {

    let front = document.createElement('card-component');
    front.classList.add("card-front");
    let cardData = await getRandomCard();
    front.data = cardData;
    addCardToCollection(cardData);

    let card = document.createElement("div");
    card.classList.add("card", "facedown");

    let back = document.createElement("div");
    back.classList.add("card-back");
    // back.textContent = `Back ${index + 1}`;
    const img = document.createElement('img');
    img.src = './card-back.png';
    img.alt = `Back ${index + 1}`;
    img.style.width = '226px';
    img.style.height = '318px';
    // img.style.filter = 'brightness(90%) grayscale(30%) blur(5px)';
    img.style.filter = 'brightness(90%)';
    img.style.filter = 'grayscale(35%)';
    // img.style.filter = 'blur(1px)';
    back.appendChild(img);

    // add back glow
    back.style.boxShadow = `0 0 ${blur}px ${spread}px rgb(${R}, ${G}, ${B}, ${opacity}) inset`;

    card.appendChild(front);
    card.appendChild(back);

    // deal from off-screen (centered, above five locations)
    card.style.transform = `translate(-1500px, -1500px)`;

    return card;
}

// deal cards
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


    cards.forEach((card, i) => {

        setTimeout(() => {
            card.style.transform = '';
            card.classList.add("dealt");
            card.style.transition = "transform 0.8s ease";

            card.addEventListener("click", () => flipCard(card));
        }, i * DEAL_DELAY);
    });
    
}

// flip card animation
function flipCard(card) {
    card.classList.remove("facedown");
    card.classList.add("flipped");
    FLIPPED--;
    if (FLIPPED <= 0) {
        CONTINUE = true;
        // if continue is true, change text on button
        document.getElementById("continue").textContent = 'Continue';
    }
}

function flipAll() {
    let cards = Array.from(stack.children);

    cards.forEach((card) => {
        flipCard(card);
    });
}

// wipe card animation
function wipeCards() {
    let cards = Array.from(stack.children);

    //remove pause in wiping animation due to line break
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

            card.style.transition = 'transform 0.7s ease-in-out, opacity 0.5s';
            card.style.opacity = '0';
            card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomAngle}deg)`;
        }, index * WIPE_DELAY); // 100ms stagger per card
    });
}



document.addEventListener("DOMContentLoaded", init);
