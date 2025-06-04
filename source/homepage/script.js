document.addEventListener('DOMContentLoaded', () => {
  // ====================== 1) Define user data ======================
  // In a real app, you’d fetch this from localStorage or a backend API.
  const userData = {
    profileName: "SuperTeam6",
    userLevel: 5,
    levelProgress: 65,   // Percent, e.g. 65% to next level
    gemsCount: 250,
    packsCount: 8,
    packProgress: 75     // Percent, e.g. 75% until next pack unlock
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
});
