document.addEventListener('DOMContentLoaded', () => {
  // ====================== 1) Define user data ======================
  // In a real app, you’d fetch this from localStorage or a backend API.
  const userData = {
    profileName: "SuperTeam6",
    userLevel: 5,
    levelProgress: 65,   // Percent, e.g. 65% to next level
    gemsCount: 250,
    packsCount: 8,
  };

  // ====================== 2) Set Avatar Initials ======================
  // Extract initials from profileName (e.g. “Team6” → “T”).
  const initials = userData.profileName.match(/[A-Z]/g)?.join('') || "U";
  document.querySelector(".avatar").textContent = initials;

  // ====================== 3) Populate Profile Info ======================
  // Insert the username
  document.getElementById("profileName").textContent = userData.profileName;
  // Insert “Level X”
  document.getElementById("userLevel").textContent = `Level ${userData.userLevel}`;

  // ====================== 4) Level Progress Bar ======================
  const levelBar = document.getElementById("levelProgress");
  // Set width to X% (fills the bar)
  levelBar.style.width = `${userData.levelProgress}%`;
  // Display the numeric percentage inside the colored bar
  levelBar.textContent = `${userData.levelProgress}%`;

  // ====================== 5) Currency (Gems & Packs) ======================
  document.querySelector(".stat-value.gems").textContent = userData.gemsCount;
  document.querySelector(".stat-value.packs").textContent = userData.packsCount;

  // ====================== 6) Pack Footer: Number + Progress ======================
  document.getElementById("currentPacks").textContent = userData.packsCount;
  const packBar = document.getElementById("packProgress");
  // Set width for pack unlock progress
  packBar.style.width = `${userData.packProgress}%`;
  // Display the text “75%” inside the pack progress bar
  packBar.textContent = `${userData.packProgress}%`;

  // ====================== 7) “Collections” Button Click ======================
  const collectionsBtn = document.getElementById("collectionsBtn");
  if (collectionsBtn) {
    collectionsBtn.addEventListener("click", () => {
      // Navigate to the collection/library page
      window.location.href = "../collection/collection.html";
    });
  }

  // ====================== 8) Pack Card Click ======================
  const mainPack = document.getElementById("mainPack");
  if (mainPack) {
    mainPack.addEventListener("click", () => {
      // Navigate to the pack opening page
      window.location.href = "../pullpage/pack.html";
    });
  }

  // ====================== 9) Cooldown Timer & Progress Bar ======================
  const countdownText = document.getElementById("packTimeLeft");
  const cooldownBar = document.getElementById("packProgress");
  const cooldownMinutes = 360; // 6 hours in minutes
  const cooldownDuration = cooldownMinutes * 60 * 1000; // 6 hours in ms

  // Get the start time from localStorage or set it to now if not present
  let startTime = localStorage.getItem("packCooldownStart");
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("packCooldownStart", startTime);
  } else {
    startTime = parseInt(startTime);
  }

  function updateCooldown() {
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = cooldownDuration - elapsed;

    // Calculate progress
    let percent = Math.max(0, Math.min(100, (elapsed / cooldownDuration) * 100));
    cooldownBar.style.width = `${percent}%`;

    cooldownBar.textContent = "";
    cooldownBar.setAttribute("data-percent", `${Math.floor(percent)}%`);

    const remainingMinutes = Math.floor(remaining / (60 * 1000));
    const remainingSeconds = Math.floor((remaining % (60 * 1000)) / 1000);

    // Format remaining time
    if (remainingMinutes >= 60) {
      const hours = String(Math.floor(remainingMinutes / 60)).padStart(2, '0');
      const minutes = String(remainingMinutes % 60).padStart(2, '0');
      countdownText.textContent = `${hours}H ${minutes}M left`;
    } else {
      const minutes = String(remainingMinutes).padStart(2, '0');
      const seconds = String(remainingSeconds).padStart(2, '0');
      countdownText.textContent = `${minutes}M ${seconds}S left`;
    }

    //If finished
    if (remaining <= 0) {
      clearInterval(timerInterval);
      countdownText.textContent = "Ready!";
      cooldownBar.style.width = "100%";
      cooldownBar.setAttribute("data-percent", "100%");
      localStorage.removeItem("packCooldownStart"); // Clear cooldown
      mainPack.classList.remove("disabled"); // Enable pack card
    } else {
      mainPack.classList.add("disabled"); // Disable pack card during cooldown
    }
  }

    // Start the countdown
    const timerInterval = setInterval(updateCooldown, 1000);
    updateCooldown(); // run once immediately
});


/*
// script.js for homepage landing page functionality
document.addEventListener('DOMContentLoaded', () => {
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
const COOLDOWN_MINUTES = 360; // 6 hours in minutes

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
    timeText.textContent = "Ready to open!";
    progress.style.width = "100%";
    pack.classList.remove("disabled");
  } else {
    timeText.textContent = formatTime(timeLeft);
    const percent = ((fullTime - timeLeft) / fullTime) * 100;
    console.log(`Progress: ${percent}%`);
    progress.style.width = `${percent}%`;
    pack.classList.add("disabled");
  }
}
function formatTime(ms) {
  if (ms >= 60 * 60 * 1000) {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${pad(hours)}H ${pad(minutes)}M`;
  } else {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${pad(minutes)}M ${pad(seconds)}S`;
  }

  function pad(n) {
    return n.toString().padStart(2, '0');
  }
}

function startCooldown() {
  const unlockTime = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
  localStorage.setItem("nextPackTime", unlockTime);
  updateCooldown();
}
*/