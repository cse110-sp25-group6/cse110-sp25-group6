// Get references to DOM elements
const stack = document.getElementById("card-stack");
const topRow = document.getElementById("top-row");
const bottomRow = document.getElementById("bottom-row");
const continueButton = document.querySelector("#continue button");

// Configuration
const TOTAL_CARDS = 5;
const DEAL_DELAY = 500;

// Utility: Create a card DOM element
function createCard(index) {
    /*const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");*/

    const card = document.createElement("div");
    card.classList.add("card");
    // card.classList.add("hidden");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = `Front ${index + 1}`;
    card.classList.add("facedown");

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = `Back ${index + 1}`;

    card.appendChild(front);
    card.appendChild(back);
    // cardContainer.appendChild(card);

    return card;
}

// Deal cards with delay
function dealCards() {
    const cards = Array.from(stack.children);

    cards.forEach((card, i) => {
        
        setTimeout(() => {
            const targetRow = i < 3 ? topRow : bottomRow;
            targetRow.appendChild(card);

            card.classList.add("dealt");

            card.addEventListener("click", () => flipCard(card));

            if (i === cards.length - 1) {
                continueButton.classList.remove("hidden");
            }
        }, i * DEAL_DELAY);
    });
}

// Flip card animation
function flipCard(card) {
    card.classList.remove("facedown");
    card.classList.add("flipped");
}

// Initialize: create cards and trigger deal
function init() {
    for (let i = 0; i < TOTAL_CARDS; i++) {
        const card = createCard(i);
        stack.appendChild(card);
    }
    dealCards();
}

document.addEventListener("DOMContentLoaded", init);
