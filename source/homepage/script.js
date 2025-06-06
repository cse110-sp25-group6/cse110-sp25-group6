// Global: Controls if user can open a new pack
let canOpenPack = false;

// ---------- On page load: Main UI logic ----------
document.addEventListener('DOMContentLoaded', () => {
  // [1] Load or initialize user data from localStorage
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    userData = createDefaultUser();
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  // [2] Fill profile & stats fields with loaded user data
  fillUserProfile(userData);

  // [3] Navigation: handle collection and pack click events
  document.getElementById("collectionsBtn")?.addEventListener("click", () => {
    window.location.href = "../collection/collection.html";
  });
  document.getElementById("mainPack")?.addEventListener("click", () => {
    if (!canOpenPack) {
      showNotice("NOTE: You need to wait until the timer is ready!");
      return;
    }
    // Particle explosion animation
    particleExplosion('.pack-card', 24);

    // Reset unlock timer & navigate to pack opening page
    setTimeout(() => {
      resetPackUnlockTimer();
      window.location.href = "../pullpage/pack.html";
    }, 500); // Give time for the animation
  });

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
    localStorage.setItem("userData", JSON.stringify(newAccount));
    modal.style.display = "none";
    fillUserProfile(newAccount);
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
  const notice = document.getElementById('customNotice');
  const text = document.getElementById('customNoticeText');
  text.textContent = msg;
  notice.style.display = 'block';
  setTimeout(() => {
    notice.style.display = 'none';
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
    nextPackUnlockTime: Date.now() + 6 * 3600 * 1000 // 6 hours later
  };
}

/**
 * Utility: Fill all profile/pack info from userData object
 * @param {object} userData - User data to display
 */
function fillUserProfile(userData) {
  // Avatar: Show uppercase initials
  const initials = userData.Username
    ? (userData.Username.match(/[A-Z]/g)?.join('') || userData.Username[0].toUpperCase())
    : "U";
  document.querySelector(".avatar").textContent = initials;

  // Fill user fields
  document.getElementById("profileName").textContent = userData.Username || "Guest";
  document.getElementById("userLevel").textContent = `Level ${userData.UsrLvl || 1}`;
  document.getElementById("levelProgress").value = userData.LevelProgress || 0;
  document.getElementById("levelProgressLabel").textContent = `${userData.LevelProgress || 0}%`;
  document.getElementById("headerGemsCount").textContent = userData.Gems || 0;
  document.getElementById("headerPacksCount").textContent = userData.Packs || 0;
  document.getElementById("currentPacks").textContent = userData.Packs || 0;
  // Progress and time are auto-updated by updatePackTimeLeft()
}

/**
 * Countdown timer for next pack unlock
 * Updates progress bar & time label, enables pack opening if time is up.
 */
function updatePackTimeLeft() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) return;
  const packSubtext = document.getElementById('packSubtext');

  // Update pack card subtext
  if (canOpenPack && packSubtext) {
    packSubtext.textContent = "Click to open";
    packSubtext.style.color = "#ffec97";
  } else if (packSubtext) {
    packSubtext.textContent = "Locked (Wait for timer)";
    packSubtext.style.color = "#bbb";
  }

  // If no unlock time, set one for backward compatibility
  if (!userData.nextPackUnlockTime) {
    userData.nextPackUnlockTime = Date.now() + 6 * 3600 * 1000;
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  const unlockTime = userData.nextPackUnlockTime;
  const now = Date.now();
  const totalMs = 6 * 3600 * 1000; // 6 hours
  const msLeft = Math.max(0, unlockTime - now);

  // Progress bar
  const elapsed = totalMs - msLeft;
  const percent = Math.min(100, Math.round((elapsed / totalMs) * 100));
  document.getElementById("packProgress").value = percent;
  document.getElementById("packProgressLabel").textContent = `${percent}%`;

  // Time label
  if (msLeft <= 0) {
    canOpenPack = true;
    document.getElementById("packTimeLeft").textContent = "Ready!";
    document.getElementById("packProgress").value = 100;
    document.getElementById("packProgressLabel").textContent = "100%";
  } else {
    canOpenPack = false;
    const hours = Math.floor(msLeft / 3600000);
    const mins = Math.floor((msLeft % 3600000) / 60000);
    document.getElementById("packTimeLeft").textContent =
      `${hours}h ${mins}min left`;
  }
}

/**
 * Call this after a pack is opened to reset the unlock timer.
 */
function resetPackUnlockTimer() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  userData.nextPackUnlockTime = Date.now() + 6 * 3600 * 1000;
  localStorage.setItem("userData", JSON.stringify(userData));
  updatePackTimeLeft();
}

/**
 * Particle explosion animation for "opening" the main pack card.
 * @param {string} containerSelector - CSS selector for card/container
 * @param {number} n - Number of particles
 */
function particleExplosion(containerSelector = '.pack-card', n = 24) {
  const card = document.querySelector(containerSelector);
  const explosion = card.querySelector('.particle-explosion');
  if (!explosion) return;
  explosion.innerHTML = ''; // Clear old particles

  for(let i=0; i<n; ++i) {
    // Compute angle and random radius for explosion
    const angle = (Math.PI * 2) * (i / n);
    const radius = 70 + Math.random() * 30; // px
    const dx = Math.cos(angle) * radius + (Math.random() - 0.5) * 18;
    const dy = Math.sin(angle) * radius + (Math.random() - 0.5) * 18;

    // Create particle
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.setProperty('--dx', dx+'px');
    p.style.setProperty('--dy', dy+'px');
    explosion.appendChild(p);

    // Auto-remove particle after animation
    setTimeout(() => p.remove(), 950);
  }
}
