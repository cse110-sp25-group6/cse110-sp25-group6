// script.js for homepage landing page functionality
document.addEventListener('DOMContentLoaded', () => {
    
    // Sample user data (replace with your real data source)
    const defaultData = {
        profileName: "Player123",
        userLevel: 5,
        levelProgress: 65,   // percentage
        gemsCount: 250,
        packsCount: 3,
        currentPacks: 3,
        packProgress: 75,   // percentage
        packTimeLeft: "5h 32min left"
    };

    let userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        userData = defaultData;
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // Populate profile info
    document.getElementById("profileName").textContent = userData.profileName;
    document.getElementById("userLevel").textContent = `Level ${userData.userLevel}`;
    document.getElementById("levelProgress").style.width = `${userData.levelProgress}%`;

    // Populate header actions
    document.getElementById("gemsCount").textContent = userData.gemsCount;
    document.getElementById("packsCount").textContent = userData.packsCount;

    // Populate pack display
    document.getElementById("currentPacks").textContent = userData.currentPacks;
    //document.getElementById("packProgress").style.width = `${userData.packProgress}%`;
    //document.getElementById("packTimeLeft").textContent = userData.packTimeLeft;

    // Navigate to pack-opening page when clicking the main pack
    const mainPack = document.getElementById("mainPack");
    mainPack.style.cursor = "pointer";
    mainPack.addEventListener("click", () => {
        if (mainPack.classList.contains("disabled")) return;
        startCooldown(); // Save unlock time in localStorage
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
    

    updateCooldown();
    setInterval(updateCooldown, 1000); // Update cooldown every second
});

// === Cooldown Timer Settings ===
const COOLDOWN_MINUTES = 1; // 2 minutes

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const seconds = (totalSec % 60).toString().padStart(2, '0');
  return `${minutes}m ${seconds}s left`;
}

function updateCooldown() {
  const timeText = document.getElementById("packTimeLeft");
  const progress = document.getElementById("packProgress");
  const pack = document.getElementById("mainPack");

  const unlockTime = parseInt(localStorage.getItem("nextPackTime"), 10);
  const now = Date.now();
  const fullTime = COOLDOWN_MINUTES * 60 * 1000;

  if (!unlockTime || isNaN(unlockTime)) {
    timeText.textContent = "Ready to open!";
    progress.style.width = "100%";
    pack.classList.remove("disabled");
    return;
  }

  const timeLeft = unlockTime - now;

  if (timeLeft <= 0) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      userData.packsCount += 1;
      userData.currentPacks += 1;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      const packsCountA = document.getElementById("packsCount");
      const currentPacksA = document.getElementById("currentPacks");

      if(packsCountA) {
        packsCountA.textContent = userData.packsCount;
      }

      if(currentPacksA) {
        currentPacksA.textContent = userData.currentPacks;
      }

    }

    timeText.textContent = "Ready to open!";
    progress.style.width = "100%";
    pack.classList.remove("disabled");
    //prevents repeated incrementation
    localStorage.removeItem("nextPackTime");
  } else {
    timeText.textContent = formatTime(timeLeft);
    const percent = ((fullTime - timeLeft) / fullTime) * 100;
    progress.style.width = `${percent}%`;
    pack.classList.add("disabled");
  }
}

function startCooldown() {
  const unlockTime = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
  localStorage.setItem("nextPackTime", unlockTime);
  updateCooldown();
}