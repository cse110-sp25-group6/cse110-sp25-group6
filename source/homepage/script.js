let canOpenPack = false;

  // --------------- Main logic on page load ---------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Load or initialize user data from localStorage
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      userData = createDefaultUser();
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    // 2. Fill all profile and stat fields
    fillUserProfile(userData);

    // 3. Navigation (collections, pack opening)
    document.getElementById("collectionsBtn")?.addEventListener("click", () => {
      window.location.href = "../collection/collection.html";
    });
    document.getElementById("mainPack")?.addEventListener("click", () => {
      let userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || (userData.Packs ?? 0) < 1) {
        showNotice("You don't have any packs to open!");
        return;
      }
      // Decrement packs by 1 and update localStorage
      userData.Packs -= 1;
      localStorage.setItem("userData", JSON.stringify(userData));
      fillUserProfile(userData); // Update UI immediately
      resetPackUnlockTimer();
      window.location.href = "../pullpage/pack.html";
    });

    //showing a ui
    function showNotice(msg) {
      const notice = document.getElementById('customNotice');
      const text = document.getElementById('customNoticeText');
      text.textContent = msg;
      notice.style.display = 'block';
      setTimeout(() => {
        notice.style.display = 'none';
      }, 2000); // 2 sec will hide
    }
    

    // 4. Register Account modal logic
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

    // Close modal (X)
    closeModalBtn?.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Confirm registration (button)
    confirmRegisterBtn?.addEventListener("click", () => {
      const username = newUsernameInput.value.trim();
      if (!username) {
        alert("Please enter a username!");
        newUsernameInput.focus();
        return;
      }
      // Create new account
      const newAccount = createDefaultUser(username);
      localStorage.setItem("userData", JSON.stringify(newAccount));
      modal.style.display = "none";
      fillUserProfile(newAccount);
      location.reload(); // Ensures UI is fully synced
    });

    // Support Enter key for submit
    newUsernameInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        confirmRegisterBtn.click();
      }
    });

    // Click outside modal to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });

    // 5. Start countdown timer for pack unlock progress
    setInterval(updatePackTimeLeft, 1000);
    updatePackTimeLeft();
  });


  // ----------- Utility: Create a default (new or guest) user -----------
  function createDefaultUser(username = "guest") {
    return {
      Username: username,
      AccountCreateTime: new Date().toISOString(),
      UsrLvl: 1,
      LevelProgress: 0,
      Gems: 100,
      Packs: 10,
      PackProgress: 0,
      PacksOpened: 0,
      Collection: [],
      Misc: {},
      // Set unlock time to 6 hours from now for first use
      nextPackUnlockTime: Date.now() + 5 * 60 * 1000 // 5 minutes
    };
  }

  // ----------- Utility: Fill all profile/pack info from userData -----------
  function fillUserProfile(userData) {
    // Avatar initials
    const initials = userData.Username
      ? (userData.Username.match(/[A-Z]/g)?.join('') || userData.Username[0].toUpperCase())
      : "U";
    document.querySelector(".avatar").textContent = initials;

    // Name/Level
    document.getElementById("profileName").textContent = userData.Username || "Guest";
    document.getElementById("userLevel").textContent = `Level ${userData.UsrLvl || 1}`;
    document.getElementById("levelProgress").value = userData.LevelProgress || 0;
    document.getElementById("levelProgressLabel").textContent = `${userData.LevelProgress || 0}%`;
    document.getElementById("headerGemsCount").textContent = userData.Gems || 0;
    document.getElementById("headerPacksCount").textContent = userData.Packs || 0;
    document.getElementById("currentPacks").textContent = userData.Packs || 0;
    // Progress and time will be auto-updated by updatePackTimeLeft()
  }

  // ----------- Countdown timer for next pack unlock (updates progress bar & time) -----------
  function updatePackTimeLeft() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;

    // If no unlock time, initialize (for older accounts)
    if (!userData.nextPackUnlockTime) {
      userData.nextPackUnlockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
      localStorage.setItem("userData", JSON.stringify(userData)); 
    }
    const unlockTime = userData.nextPackUnlockTime;
    const now = Date.now();
    const totalMs = 5 * 60 * 1000; // 5 minutes
    const msLeft = Math.max(0, unlockTime - now);

    // Progress bar percent (0% ... 100%)
    const elapsed = Math.max(0, totalMs - msLeft);
    const percent = Math.max(0, Math.min(100, Math.round((elapsed / totalMs) * 100)));
    document.getElementById("packProgress").value = percent;
    document.getElementById("packProgressLabel").textContent = `${percent}%`;

    // Time label ("xh ymin left" or "Ready!")
    if (msLeft <= 0) {
      if (!userData._packGiven || userData._packGiven < unlockTime) {
        // Give a new pack and mark as given for this unlock time
        userData.Packs = (userData.Packs || 0) + 1;
        userData._packGiven = unlockTime;
        // Reset timer for next pack
        userData.nextPackUnlockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
        localStorage.setItem("userData", JSON.stringify(userData));
        fillUserProfile(userData);
      }
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

  // ----------- Call this when pack is opened to reset timer -----------
  function resetPackUnlockTimer() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    userData.nextPackUnlockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
    localStorage.setItem("userData", JSON.stringify(userData));
    updatePackTimeLeft();
  }
