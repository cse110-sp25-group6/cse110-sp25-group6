// script.js for homepage landing page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Sample user data (replace with your real data source)
    const userData = {
        profileName: "Player123",
        userLevel: 5,
        levelProgress: 65,   // percentage
        gemsCount: 250,
        packsCount: 8,
<<<<<<< HEAD
        packProgress: 75,
        packProgressText: "5h 32 min"
=======
        currentPacks: 3,
        packProgress: 75,   // percentage
        packTimeLeft: "5h 32min left"
>>>>>>> main
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

    // Pull buttons on pack.html
    document.getElementById("pull1Btn")?.addEventListener("click", () => {
        console.log("Pulled 1 pack");
        // TODO: decrement packsCount, update UI
    });
    document.getElementById("pull10Btn")?.addEventListener("click", () => {
        console.log("Pulled 10 packs");
        // TODO: batch-pull logic
    });

});
