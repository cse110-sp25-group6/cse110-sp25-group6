import { getCollectionCards, addCardToCollection } from "../util/utils.js";

window.addEventListener("DOMContentLoaded", init);

let cards = [];

function init() {

    homepageInit();

    cards = getCollectionCards();

    // Pull buttons on pack.html
    document.getElementById("pull1").addEventListener("click", () => {
        sessionStorage.setItem("pull5", "false");
        showVideo();
    });

    document.getElementById("pull5").addEventListener("click", () => {
        sessionStorage.setItem("pull5", "true");
        showVideo();
    });
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

function homepageInit() {
    
    // Sample user data (replace with your real data source)
    const userData = {
        profileName: "Player123",
        userLevel: 5,
        levelProgress: 65,   // percentage
        gemsCount: 250,
        packsCount: 3,
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

    // Back button navigates home
    document.getElementById("backBtn")?.addEventListener("click", () => {
        window.location.href = "../homepage/index.html";
    });
}