import { addCurrencyToDocument } from './pack.js';

// get references to DOM elements
const stack = document.getElementById("card-stack");
const topRow = document.getElementById("top-row");
const bottomRow = document.getElementById("bottom-row");
const continueButton = document.querySelector("#continue");

// configuration
let TOTAL_CARDS = 5;
let DEAL_DELAY = 500;
let WIPE_DELAY = 100;
let FLIPPED = TOTAL_CARDS;
let CONTINUE = false;

// initialize: create cards and trigger deal
function init() {
    addCurrencyToDocument();

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
        const card = createCard(i);
        stack.appendChild(card);
    }

    dealCards();

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

// utility: Create a card DOM element
function createCard(index) {

    let card = document.createElement("div");
    card.classList.add("card", "facedown");

    let inner = document.createElement("div");
    inner.classList.add("card-inner");

    let front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = `Front ${index + 1}`;

    let back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = `Back ${index + 1}`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // deal from off-screen (centered, above five locations)
    card.style.transform = `translate(675px, -500px)`;

    return card;
}

// deal cards
function dealCards() {
    if (TOTAL_CARDS == 5) {
        let cards = Array.from(stack.children);
        let cardWidth = 200;
        let cardHeight = 300;
        let gap = 20;

        cards.forEach((card, i) => {
            
            setTimeout(() => {
                let col = i % 3;
                let row = i < 3 ? 0 : 1;

                let cardsInRow = i < 3 ? 3 : 2;
                let totalWidth = cardsInRow * cardWidth + (cardsInRow - 1) * gap;
                let startX = (stack.clientWidth - totalWidth) / 2;

                let x = startX + col * (cardWidth + gap);
                let y = row * (cardHeight + gap);

                card.style.transform = `translate(${x}px, ${y}px)`;

                card.classList.add("dealt");

                card.addEventListener("click", () => flipCard(card));
            }, i * DEAL_DELAY);
        });
    }
    else {
        let cards = Array.from(stack.children);
        let cardWidth = 400/3;
        let cardHeight = 200;
        let gap = 20;

        cards.forEach((card, i) => {
            
            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;

            let col = i < 8  ?  i % 8  :  i < 17  ?  (i + 1) % 9 : (i - 1) % 8;
            let row = i < 8 ? 0 : i < 17 ? 1 : 2;

            let cardsInRow = i < 8 ? 8 : i < 17 ? 9 : 8;
            let totalWidth = cardsInRow * cardWidth + (cardsInRow - 1) * gap;
            let startX = (stack.clientWidth - totalWidth) / 2;

            let x = startX + col * (cardWidth + gap);
            let y = row * (cardHeight + gap) - 50;

            setTimeout(() => {
                card.style.transform = `translate(${x}px, ${y}px)`;

                // Listen for translate end
                // release the card to flex box
                const onTransitionEnd = () => {
                card.style.transform = '';
                card.removeEventListener('transitionend', onTransitionEnd);
                };

                card.addEventListener('transitionend', onTransitionEnd);

                card.classList.add("dealt");

                card.addEventListener("click", () => flipCard(card));
            }, i * DEAL_DELAY);
        });
    }
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
