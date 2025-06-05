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
let FLIPPED = TOTAL_CARDS;
let CONTINUE = false;

// initialize: create cards and trigger deal
async function init() {
    if (sessionStorage.getItem("madePull") != "true") {
        window.location.href = 'pack.html';
    }

    //sessionStorage.setItem("madePull", "false");

    if (sessionStorage.getItem("pull5") == "true") {
        TOTAL_CARDS = 25;
        DEAL_DELAY = 100;
        WIPE_DELAY = 20;
        FLIPPED = TOTAL_CARDS;
    }
    else {
        TOTAL_CARDS = 5;
        DEAL_DELAY = 500;
        WIPE_DELAY = 100;
        FLIPPED = TOTAL_CARDS;
    }

    for (let i = 0; i < TOTAL_CARDS; i++) {
        const card = await createCard(i);
        stack.appendChild(card);
    }

    dealCards();

    setTimeout(() => {
        continueButton.classList.remove("hidden");
    }, TOTAL_CARDS * DEAL_DELAY);

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
    back.textContent = `Back ${index + 1}`;

    card.appendChild(front);
    card.appendChild(back);

    // deal from off-screen (centered, above five locations)
    card.style.transform = `translate(-1500px, -1500px)`;

    return card;
}

// deal cards
function dealCards() {
    let cards = Array.from(stack.children);
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
