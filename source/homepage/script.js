// ---------- On page load: Main UI logic ----------
document.addEventListener("DOMContentLoaded", () => {
  // [1] Load or initialize user data from localStorage
  updateLocalStorage();

  // [2] Fill profile & stats fields with loaded user data
  fillUserProfile();

  // [4] Register Account Modal: handle open, close, register, enter key, click outside
  const modal = document.getElementById("modalOverlay");
  const openModalBtn = document.getElementById("registerBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const confirmRegisterBtn = document.getElementById("confirmRegisterBtn");
  const newUsernameInput = document.getElementById("newUsername");

  // Open modal
  openModalBtn?.addEventListener("click", () => {
    modal.style.display = "flex";
    newUsernameInput.value = "";
    newUsernameInput.focus();
  });

  // Close modal (ESC button)
  closeModalBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Confirm registration
  confirmRegisterBtn?.addEventListener("click", () => {
    const username = newUsernameInput.value.trim();
    if (!username) {
      alert("Please enter a username!");
      newUsernameInput.focus();
      return;
    }
    const newAccount = createDefaultUser(username);
    // localStorage.setItem("Username", JSON.stringify(newAccount));
    localStorage.clear(); // resets Local Storage for new user
    updateLocalStorage(newAccount);
    modal.style.display = "none";
    fillUserProfile();
    location.reload(); // Sync UI
  });

  // Enter key submits
  newUsernameInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmRegisterBtn.click();
  });

  // Click outside modal to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // [5] Start unlock countdown timer
  setInterval(updatePackTimeLeft, 1000);
  updatePackTimeLeft();
});

// ESC closes registration modal
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modalOverlay");
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
  }
});

/**
 * Utility: Display a temporary notice/toast
 * @param {string} msg - Message to display
 */
function showNotice(msg) {
  const notice = document.getElementById("customNotice");
  const text = document.getElementById("customNoticeText");
  text.textContent = msg;
  notice.style.display = "block";
  setTimeout(() => {
    notice.style.display = "none";
  }, 2000);
}

/**
 * Utility: Create a default (new or guest) user data object
 * @param {string} username - Name for the user
 * @returns {object} New user data
 */
function createDefaultUser(username = "guest") {
  return {
    Username: username,
    AccountCreateTime: new Date().toISOString(),
    UsrLvl: 1,
    LevelProgress: 0,
    Gems: 100,
    Packs: 3,
    PackProgress: 0,
    PacksOpened: 0,
    Collection: [],
    Misc: {},
    nextPackUnlockTime: Date.now() + 5 * 60 * 1000, // 5 minutes
  };
}

/**
 * Checks local storage to make sure that all data is present and populates if empty
 * @param {object} user - object containing all user data
 */
function updateLocalStorage(user = createDefaultUser()) {
  let data = [
    "Username",
    "AccountCreateTime",
    "UsrLvl",
    "LevelProgress",
    "Gems",
    "Packs",
    "PackProgress",
    "PacksOpened",
    "Collection",
    "nextPackUnlockTime",
    "Misc",
  ];
  data.forEach((element) => {
    // checks all fields
    let item = localStorage.getItem(element);
    if (!item) {
      // populates if item does not exist in the local storage
      localStorage.setItem(element, user[element]);
    }
  });
}

/**
 * Utility: Fill all profile/pack info from userData object
 */
function fillUserProfile() {
  // Avatar: Show uppercase initials
  const initials = localStorage.getItem("Username")
    ? localStorage.getItem("Username").match(/[A-Z]/g)?.join("") ||
      localStorage.getItem("Username")[0].toUpperCase()
    : "U";
  document.querySelector(".avatar").textContent = initials;

  // Fill user fields
  document.getElementById("profileName").textContent =
    localStorage.getItem("Username") || "Guest";
  document.getElementById("userLevel").textContent =
    `Level ${localStorage.getItem("Usrlvl") || 1}`;
  document.getElementById("levelProgress").value =
    localStorage.getItem("LevelProgress") || 0;
  document.getElementById("levelProgressLabel").textContent =
    `${localStorage.getItem("LevelProgress") || 0}%`;
  document.getElementById("headerGemsCount").textContent =
    localStorage.getItem("Gems") || 0;
  document.getElementById("headerPacksCount").textContent =
    localStorage.getItem("Packs") || 0;
  document.getElementById("currentPacks").textContent =
    localStorage.getItem("Packs") || 0;
  // Progress and time are auto-updated by updatePackTimeLeft()
}

/**
 * Countdown timer for next pack unlock
 * Updates progress bar & time label, enables pack opening if time is up.
 */
function updatePackTimeLeft() {
  // makes sure local storage is populated
  updateLocalStorage();

  const unlockTime = Number(localStorage.getItem("nextPackUnlockTime"));
  const now = Date.now();
  const totalMs = 5 * 60 * 1000; // 5 minutes
  const msLeft = Math.max(0, unlockTime - now);

  // Progress bar
  const elapsed = totalMs - msLeft;
  const percent = Math.min(100, Math.round((elapsed / totalMs) * 100));
  document.getElementById("packProgress").value = percent;
  document.getElementById("packProgressLabel").textContent = `${percent}%`;

  // Time label and pack increment
  if (msLeft <= 0) {
    // Give a new pack and reset timer
    localStorage.setItem(
      "Packs",
      (parseInt(localStorage.getItem("Packs")) || 0) + 1,
    );
    localStorage.setItem("nextPackUnlockTime", Date.now() + 5 * 60 * 1000); // reset for another 5 minutes
    fillUserProfile();

    document.getElementById("packTimeLeft").textContent = "Ready!";
    document.getElementById("packProgress").value = 100;
    document.getElementById("packProgressLabel").textContent = "100%";
  } else {
    const mins = Math.floor(msLeft / 60000);
    const secs = Math.floor((msLeft % 60000) / 1000);
    document.getElementById("packTimeLeft").textContent =
      `${mins}min ${secs}sec left until the next pack!`;
  }
}

/**
 * Call this after a pack is opened to reset the unlock timer.
 */
function resetPackUnlockTimer() {
  let nextPackUnlockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
  localStorage.setItem("nextPackUnlockTime", nextPackUnlockTime);
}
