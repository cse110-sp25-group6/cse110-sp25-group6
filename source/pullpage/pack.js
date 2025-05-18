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