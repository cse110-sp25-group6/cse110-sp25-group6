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