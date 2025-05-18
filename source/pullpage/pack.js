import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {
    populateLocalStorage();

    cards = getCollectionCards();
    sortCards(cards, "acquisition");
    addCardsToDocument(cards);

    addCurrencyToDocument();
}

function addCurrencyToDocument() {
    const gems = document.getElementsByClassName("gems");
    const packs = document.getElementsByClassName("packs");
    const gemsValue = localStorage.getItem("Gems");
    const packsValue = localStorage.getItem("Packs");

    for (let i = 0; i < gems.length; i++) {
        gems[i].innerHTML = `Gems: ${gemsValue}`;
    }
    for (let i = 0; i < packs.length; i++) {
        packs[i].innerHTML = `Packs: ${packsValue}`;
    }
}

function populateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('Gems', JSON.stringify(50)); // Add some gems
    localStorage.setItem('Packs', JSON.stringify(3)); // Add some packs
    for (let i = 0; i < 30; i++) {
        let card = {
            "name": `card${i}`,
            "rarity": i % 5,
            "acquisition": Date.now() - ((i % 7) * 1000 * 60 * 60 * 24)
        }
        addCardToCollection(card);
    }
}

function verifyPullCount() {
    const pull1 = document.getElementsByClassName("pull1");
    const pull10 = document.getElementsByClassName("pull10");

    const packsValue = localStorage.getItem("Packs");

    for (let i = 0; i < pull1.length; i++) {
        pull1[i].classList.toggle("not-enough-packs", packsValue < 1);
    }

    for (let i = 0; i < pull10.length; i++) {
        pull10[i].classList.toggle("not-enough-packs", packsValue < 10);
    }
}