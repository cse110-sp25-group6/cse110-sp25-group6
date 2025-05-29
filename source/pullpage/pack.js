import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {
    populateLocalStorage();

    homepageInit();
    
    cards = getCollectionCards();

    addCurrencyToDocument();
    verifyPullCount();

    document.getElementById("pull1")[0].addEventListener("click", () => {
        sessionStorage.setItem("pull5", "false");
        showVideo();
    });

    document.getElementById("pull5")[0].addEventListener("click", () => {
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

function homepageInit() {
    // Sample user data (replace with your real data source)
    const userData = {
        profileName: "Player123",
        userLevel: 5,
        levelProgress: 65,   // percentage
        gemsCount: 250,
        packsCount: 8,
        currentPacks: 3,
        packProgress: 75,   // percentage
        packTimeLeft: "5h 32min left"
    };

    // Populate profile info
    document.getElementById("profileName").textContent = userData.profileName;
    document.getElementById("userLevel").textContent = `Level ${userData.userLevel}`;
    document.getElementById("levelProgress").style.width = `${userData.levelProgress}%`;

    // Populate header actions
    document.getElementById("gemsCount").textContent = userData.gemsCount;
    document.getElementById("packsCount").textContent = userData.packsCount;

    // Populate pack display
    document.getElementById("currentPacks").textContent = userData.currentPacks;
    document.getElementById("packProgress").style.width = `${userData.packProgress}%`;
    document.getElementById("packTimeLeft").textContent = userData.packTimeLeft;

    // Navigate to pack-opening page when clicking the main pack
    const mainPack = document.getElementById("mainPack");
    mainPack.style.cursor = "pointer";
    mainPack.addEventListener("click", () => {
        window.location.href = "../pullpage/pack.html";
    });

    // Navigate to collection page when clicking Collections button
    const collectionsBtn = document.getElementById("collectionsBtn");
    collectionsBtn.addEventListener("click", () => {
        window.location.href = "../collection/collection.html";
    });

    // Back button navigates home
    document.getElementById("backBtn")?.addEventListener("click", () => {
        window.location.href = "../homepage/index.html";
    });
}