import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';
import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {
    cards = getCollectionCards();

    addCurrencyToDocument();
    verifyPullCount();

    const packsValue = localStorage.getItem("Packs");

    document.getElementsByClassName("pull1")[0].addEventListener("click", () => {
        if (packsValue < 1) {
            createPopup(1);
        } else {
            makeAPull("pull1");
        }

    });

    document.getElementsByClassName("pull5")[0].addEventListener("click", () => {
        if (packsValue < 10) {
            createPopup(10);
        } else {
            makeAPull("pull10");
        }
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

function createPopup(pullType) {
    const mainContainer = document.querySelector('main');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add("popup-container");

    const popup = document.createElement('div');
    popup.classList.add("popup");

    const popupText = document.createElement('div');
    popupText.classList.add("popup-text");
    popupText.textContent = "An Additional 10 Intertwined Fate are needed";

    const popupButtonContainer = document.createElement('div');
    popupButtonContainer.classList.add("popup-button-container");

    const popupCancel = document.createElement('button');
    popupCancel.classList.add("popup-cancel");
    popupCancel.innerText = "Cancel";

    const popupConfirm = document.createElement('button');
    popupConfirm.classList.add("popup-confirm");
    popupConfirm.innerText = "Confirm";

    popupButtonContainer.append(popupCancel);
    popupButtonContainer.append(popupConfirm);


    popup.append(popupText);
    popup.append(popupButtonContainer);

    popupContainer.append(popup);

    mainContainer.append(popupContainer);

    popup.addEventListener('click', () => {
        popupContainer.remove();
    });


    popupContainer.addEventListener('click', (e) => {
        console.log("Clicked uh something?");
        if (e.target != popup) {
            console.log("Clicked outside popup");
            popupContainer.remove();
        }
    });
}

function makeAPull(pullType) {
    sessionStorage.setItem("madePull", "true");
    sessionStorage.setItem("pull5", pullType == "pull5");
    showVideo();
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
