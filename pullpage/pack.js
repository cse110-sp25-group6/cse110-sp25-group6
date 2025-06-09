/**
 * This file initializes the pack opening page by loading the card-pack image, 
 * setting up event listeners for pulling, generating a pop-up that allows
 * pulling with gems if the user can't affordd packs, and playing the pull
 * animation along with navigating the user to the results page after opening
 * a pack.
 * Dependencies:
 *  - cardComponent.js
 *  - top-bar.js
 */

import '../components/card/cardComponent.js';
import '../components/top-bar/top-bar.js';

window.addEventListener("DOMContentLoaded", init);

const gemsPerPack = 15;

/**
 * Initializes the pack opening functionality by:
 * - Loading and displaying current currency values (gems and packs)
 * - Setting up event listeners for pack opening buttons
 * - Verifying available pack counts for UI feedback
 *  @async
 * @returns {Promise<void>}
 */
function init() {

    //Adds currency values to display in top right, along with altering color of pull buttons if user can't afford to pull.
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

    //Event listener for single-pull button. Makes a single-pull for 5 cards if user can afford to pull, generates a pop-up otherwise.
    document.getElementsByClassName("pull1")[0].addEventListener("click", () => {
        if (packsValue < 1) {
            createPopup(1);
        } else {
            makeAPull(1);
        }

    });

    //Event listener for five-pull button. Makes a five-pull for 25 cards if user can afford to pull, generates a pop-up otherwise.
    document.getElementsByClassName("pull5")[0].addEventListener("click", () => {
        if (packsValue < 5) {
            createPopup(5);
        } else {
            makeAPull(5);
        }
    });
}

/**
 * Updates the displayed currency values (gems and packs) from local storage
 * @returns {void}
 */
export function addCurrencyToDocument() {
    const gems = document.getElementsByClassName("gems");
    const packs = document.getElementsByClassName("packs");

    //Retrives currency values from local storage.
    let gemsValue = localStorage.getItem("Gems");
    let packsValue = localStorage.getItem("Packs");



    //temporary setting test values for dev purposes
    let setBudget = true;
    if (setBudget) {
        gemsValue = 999999;
        packsValue = 100;
        localStorage.setItem('Gems', JSON.stringify(gemsValue));
        localStorage.setItem('Packs', JSON.stringify(packsValue));
    }


    //Update display in top right with appriopriate values
    for (let i = 0; i < gems.length; i++) {
        gems[i].innerHTML = `Gems: ${gemsValue}`;
    }
    for (let i = 0; i < packs.length; i++) {
        packs[i].innerHTML = `Packs: ${packsValue}`;
    }
}

/**
 * Verifies if there are enough packs for pulls and updates button states
 * @returns {void}
*/
function verifyPullCount() {
    const pull1 = document.getElementsByClassName("pull1");
    const pull5 = document.getElementsByClassName("pull5");

    const packsValue = localStorage.getItem("Packs");

    //Updates class of "Pull 1" button if user can't afford a single-pull.
    for (let i = 0; i < pull1.length; i++) {
        pull1[i].classList.toggle("not-enough-packs", packsValue < 1);
    }

    //Updates class of "Pull 1" button if user can't afford a five-pull.
    for (let i = 0; i < pull5.length; i++) {
        pull5[i].classList.toggle("not-enough-packs", packsValue < 5);
    }
}

/**
 * Creates a popup dialog when user doesn't have enough packs. Popup
 * allows pulling by spending gems if user can afford the gem-cost.
 * @param {number} pullCount - Number of packs the user wants to open
 * @returns {void}
 */
function createPopup(pullCount) {
    // Initializes variables used to handle dynamic logic. 
    const gemCount = localStorage.getItem("Gems");
    //Plural is used to fix grammatical errors for single vs five pulls.
    const plural = pullCount > 1;
    const pullCost = pullCount * gemsPerPack;
    const enoughGems = (gemCount > pullCost);

    //Generates popup container that fills entire page and hosts the pop-up.
    const mainContainer = document.querySelector('main');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add("popup-container");

    //Generates actual popup element to host the subsections of the pop-up.
    const popup = document.createElement('div');
    popup.classList.add("popup");

    //Generates popup text container that hosts the text for the pop-up
    const popupTextContainer = document.createElement('div');
    popupTextContainer.classList.add("popup-text-container");

    //Generates popup text, which will notify the user that they can not afford the pull using packs. 
    //Uses template literals to have dynamic text, depending on if they can afford to pull using gems.
    const popupText = document.createElement('div');
    popupText.classList.add("popup-text");
    popupText.innerHTML = `An Additional <span class="yellow">${pullCount}</span> pack ${plural ? "s are needed." : "is needed."} <br> Purchase with <span class=${enoughGems ? "yellow" : "red"}>${pullCost}</span> gems?<br><br> ${enoughGems ? "" : "<span class='red'>Insufficient Funds</span>"} `;

    popupTextContainer.append(popupText);

    //Generates container for the two pop-up buttons
    const popupButtonContainer = document.createElement('div');
    popupButtonContainer.classList.add("popup-button-container");

    //Generates cancel button to exit pop-up
    const popupCancel = document.createElement('button');
    popupCancel.classList.add("popup-button");
    popupCancel.innerText = "Cancel";

    //Generates confirm button to allow user to pull using gems
    const popupConfirm = document.createElement('button');
    popupConfirm.classList.add("popup-button");
    //Prevents user from pulling using gems if they are unable to afford the gem-cost.
    if (!enoughGems) {
        popupConfirm.disabled = true;
    }
    popupConfirm.innerText = "Confirm";

    //Appends containers and other DOM elements for appropriate nesting.
    popupButtonContainer.append(popupCancel);
    popupButtonContainer.append(popupConfirm);

    popup.append(popupTextContainer);
    popup.append(popupButtonContainer);

    popupContainer.append(popup);

    mainContainer.append(popupContainer);

    //Adds event listener for the "confirm" button, which makes a pull.
    popupConfirm.addEventListener('click', () => {
        popupContainer.remove();
        makeAPull(pullCount, true);
    });

    //Addds event listener for the "cancel" button, which closes the pop-up.
    popupCancel.addEventListener('click', () => {
        popupContainer.remove();
    });

    //Adds event listener to allow user to click outside the pop-up to close the pop-up.
    popupContainer.addEventListener('click', (e) => {
        if (!popup.contains(e.target)) {
            popupContainer.remove();
        }
    });
}

/**
 * Handles the logic for opening card packs
 * @param {number} pullCount - Number of packs to open
 * @param {boolean} gemPull - Whether the pull is paid with gems
 * @returns {void}
 */
function makeAPull(pullCount, gemPull) {
    let gemsValue = localStorage.getItem("Gems");
    let packsValue = localStorage.getItem("Packs");
    //Decrements gems or packs value (depending on the type of currency spent) and updates local storage to match.
    if (gemPull) {
        gemsValue -= gemsPerPack * pullCount;
        localStorage.setItem('Gems', JSON.stringify(gemsValue));
    } else {
        packsValue -= pullCount;
        localStorage.setItem('Packs', JSON.stringify(packsValue));
    }
    //Updates session storage with values needed for results logic. 
    sessionStorage.setItem("madePull", "true");
    sessionStorage.setItem("pull5", pullCount == 5);
    //Plays pull animation.
    showVideo(pullCount);
}

/**
 * Displays the pack opening animation video and handles transition to results page
 * @returns {void}
 */
function showVideo(pullCount) {
    const videoContainer = document.getElementsByClassName("video-container");
    const videoElement = document.getElementsByClassName("pack-video");

    //Makes video container visible
    for (let i = 0; i < videoContainer.length; i++) {
        videoContainer[i].classList.toggle("show", true);
    }

    if (pullCount == 5) {
        videoElement[0].src = "pull5Video.mp4";
    } else {
        videoElement[0].src = "pull1Video.mp4";
    }

    //Makes the video itself display, then plays the video
    for (let i = 0; i < videoElement.length; i++) {
        videoElement[i].style.display = "unset";
        videoElement[i].play();
    }

    //Adds event listener to wait until the video finishes playing, before redirecting user to the pack results page.
    videoElement[0].addEventListener("ended", () => {
        // switch to results page
        window.location.href = 'results.html';
    })

}