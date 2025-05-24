// script.js for homepage landing page functionality

document.addEventListener('DOMContentLoaded', () => {
    const userData = {
        profileName: "Player123",
        userLevel: 5,
        levelProgress: 65,
        gemsCount: 250,
        packsCount: 8,
        packProgress: 75,
        packProgressText: "75/100"
    };

    // Populate DOM
    document.getElementById("profileName").textContent = userData.profileName;
    document.getElementById("userLevel").textContent = `Level ${userData.userLevel}`;
    document.getElementById("levelProgress").style.width = `${userData.levelProgress}%`;
    document.getElementById("gemsCount").textContent = userData.gemsCount;
    document.getElementById("packsCount").textContent = userData.packsCount;
    document.getElementById("currentPacks").textContent = userData.packsCount;
    document.getElementById("packProgress").style.width = `${userData.packProgress}%`;
    document.getElementById("packProgressText").textContent = userData.packProgressText;

    // Click on pack
    const mainPack = document.getElementById("mainPack");
    if (mainPack) {
        mainPack.addEventListener("click", () => {
            console.log("Opening pack page...");
        });
    }

    // Navigate to collection page
    const collectionsBtn = document.getElementById("collectionsBtn");
    if (collectionsBtn) {
        collectionsBtn.addEventListener("click", () => {
            window.location.href = "../collection/collection.html";
        });
    }
});
