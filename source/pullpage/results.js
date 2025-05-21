// get references to DOM elements
const stack = document.getElementById("card-stack");
const topRow = document.getElementById("top-row");
const bottomRow = document.getElementById("bottom-row");
const continueButton = document.querySelector("#continue");

// configuration
const TOTAL_CARDS = 5;
const DEAL_DELAY = 500;
let FLIPPED = TOTAL_CARDS;
let CONTINUE = false;

// utility: Create a card DOM element
function createCard(index) {

    const card = document.createElement("div");
    card.classList.add("card", "facedown");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = `Front ${index + 1}`;

    const back = document.createElement("div");
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
    const cards = Array.from(stack.children);
    const cardWidth = 200;
    const cardHeight = 300;
    const gap = 20;

    cards.forEach((card, i) => {
        
        setTimeout(() => {
            const col = i % 3;
            const row = i < 3 ? 0 : 1;

            const cardsInRow = i < 3 ? 3 : 2;
            const totalWidth = cardsInRow * cardWidth + (cardsInRow - 1) * gap;
            const startX = (stack.clientWidth - totalWidth) / 2;

            const x = startX + col * (cardWidth + gap);
            const y = row * (cardHeight + gap);

            card.style.transform = `translate(${x}px, ${y}px)`;

            card.classList.add("dealt");

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
    }
}

// initialize: create cards and trigger deal
function init() {
    
    for (let i = 0; i < TOTAL_CARDS; i++) {
        const card = createCard(i);
        stack.appendChild(card);
    }
    
    dealCards();

    // if continue is true, change text on button

    document.getElementById("continue").addEventListener("click", () => {
        window.location.href = 'pack.html';
    });

}

document.addEventListener("DOMContentLoaded", init);
