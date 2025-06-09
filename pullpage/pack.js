import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';

window.addEventListener("DOMContentLoaded", init);

const gemsPerPack = 15;

function init() {

    addCurrencyToDocument();
    verifyPullCount();

    const packsValue = localStorage.getItem("Packs");
    let pull1 = document.getElementsByClassName("pull1")[0];
    if (pull1) {
        pull1.addEventListener("click", () => {
            if (packsValue < 1) {
                createPopup(1);
            } else {
                makeAPull(1);
            }

        });
    }

    let pull5 = document.getElementsByClassName("pull5")[0];
    if (pull5) {
        pull5.addEventListener("click", () => {
            if (packsValue < 5) {
                createPopup(5);
            } else {
                makeAPull(5);
            }
        });
    }
}

export function addCurrencyToDocument() {
    const gems = document.getElementsByClassName("gems");
    const packs = document.getElementsByClassName("packs");
    let gemsValue = localStorage.getItem("Gems");
    let packsValue = localStorage.getItem("Packs");



    //temporary setting test values for dev purposes
    let setBudget = false;
    if (setBudget) {
        gemsValue = 100;
        packsValue = 1;
        localStorage.setItem('Gems', JSON.stringify(gemsValue));
        localStorage.setItem('Packs', JSON.stringify(packsValue));
    }



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

function createPopup(pullCount) {

    const gemCount = localStorage.getItem("Gems");
    const packCount = localStorage.getItem("Packs");
    const plural = pullCount > 1;
    const pullCost = pullCount * gemsPerPack;
    const enoughGems = (gemCount > pullCost);

    const mainContainer = document.querySelector('main');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add("popup-container");

    const popup = document.createElement('div');
    popup.classList.add("popup");

    const popupTextContainer = document.createElement('div');
    popupTextContainer.classList.add("popup-text-container");

    const popupText = document.createElement('div');
    popupText.classList.add("popup-text");
    popupText.innerHTML = `An Additional <span class="yellow">${pullCount}</span> pack ${plural ? "s are needed." : "is needed."} <br> Purchase with <span class=${enoughGems ? "yellow" : "red"}>${pullCost}</span> gems?<br><br> ${enoughGems ? "" : "<span class='red'>Insufficient Funds</span>"} `;

    popupTextContainer.append(popupText);

    const popupButtonContainer = document.createElement('div');
    popupButtonContainer.classList.add("popup-button-container");

    const popupCancel = document.createElement('button');
    popupCancel.classList.add("popup-button");
    popupCancel.innerText = "Cancel";

    const popupConfirm = document.createElement('button');
    popupConfirm.classList.add("popup-button");
    if (!enoughGems) {
        popupConfirm.disabled = true;
    }
    popupConfirm.innerText = "Confirm";

    popupButtonContainer.append(popupCancel);
    popupButtonContainer.append(popupConfirm);


    popup.append(popupTextContainer);
    popup.append(popupButtonContainer);

    popupContainer.append(popup);

    mainContainer.append(popupContainer);

    popupConfirm.addEventListener('click', () => {
        popupContainer.remove();
        makeAPull(pullCount, true);
    });

    popupCancel.addEventListener('click', () => {
        popupContainer.remove();
    });

    popupContainer.addEventListener('click', (e) => {
        console.log("E.target:" + e.target);
        if (!popup.contains(e.target)) {
            popupContainer.remove();
        }
    });
}

function makeAPull(pullCount, gemPull) {
    let gemsValue = localStorage.getItem("Gems");
    let packsValue = localStorage.getItem("Packs");
    if (gemPull) {
        gemsValue -= gemsPerPack * pullCount;
        localStorage.setItem('Gems', JSON.stringify(gemsValue));
    } else {
        packsValue -= pullCount;
        localStorage.setItem('Packs', JSON.stringify(packsValue));
    }
    sessionStorage.setItem("madePull", "true");
    sessionStorage.setItem("pull5", pullCount == 5);
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

    videoElement[0].addEventListener("ended", () => {
        // switch to results page
        window.location.href = 'results.html';
        // hideVideo();
    })

}

/*function hideVideo() { //Keeping this around temporarily in case we still need it later, but for now the easiest fix is just to not run this function.
    const videoContainer = document.getElementsByClassName("video-container");
    const videoElement = document.getElementsByClassName("pack-video");

    for (let i = 0; i < videoContainer.length; i++) {
        videoContainer[i].classList.toggle("show", false);
    }

    for (let i = 0; i < videoElement.length; i++) {
        videoElement[i].style.display = "none";
    }
}*/
