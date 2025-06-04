import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';
import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {
    cards = getCollectionCards();

    addCurrencyToDocument();
    verifyPullCount();

    document.getElementsByClassName("pull1")[0].addEventListener("click", () => {
        sessionStorage.setItem("pull5", "false");
        showVideo();
    });

    document.getElementsByClassName("pull5")[0].addEventListener("click", () => {
        sessionStorage.setItem("pull5", "true");
        showVideo();
    });
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

function verifyPullCount() {
    const pull1 = document.getElementsByClassName("pull1");
    const pull5 = document.getElementsByClassName("pull5");

    const packsValue = localStorage.getItem("Packs");

    for (let i = 0; i < pull1.length; i++) {
        pull1[i].classList.toggle("not-enough-packs", packsValue < 1);
    }

    for (let i = 0; i < pull5.length; i++) {
        pull5[i].classList.toggle("not-enough-packs", packsValue < 5);
    }
}

function showVideo() {
    const videoContainer = document.getElementsByClassName("video-container");
    const videoElement = document.getElementsByClassName("pack-video");

    for (let i = 0; i < videoContainer.length; i++) {
        videoContainer[i].classList.toggle("show", true);
    }

    for (let i = 0; i < videoElement.length; i++) {
        videoElement[i].style.display = "unset";
        videoElement[i].play();
    }

    videoElement[0].addEventListener("ended", (event) => {
        // switch to results page
        window.location.href = 'results.html';
        // hideVideo();
    })

}

function hideVideo() { //Keeping this around temporarily in case we still need it later, but for now the easiest fix is just to not run this function.
    const videoContainer = document.getElementsByClassName("video-container");
    const videoElement = document.getElementsByClassName("pack-video");

    for (let i = 0; i < videoContainer.length; i++) {
        videoContainer[i].classList.toggle("show", false);
    }

    for (let i = 0; i < videoElement.length; i++) {
        videoElement[i].style.display = "none";
    }
}
