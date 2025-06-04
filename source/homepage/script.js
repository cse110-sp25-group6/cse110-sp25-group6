document.addEventListener('DOMContentLoaded', () => {
    const userData = {
      profileName: "Team6",
      userLevel: 5,
      levelProgress: 65,
      gemsCount: 250,
      packsCount: 8,
      packProgress: 75
    };
  
    // Set initials into avatar
    const initials = userData.profileName.match(/[A-Z]/g)?.join('') || "U";
    document.querySelector(".avatar").textContent = initials;
  
    // Profile info
    document.getElementById("profileName").textContent = userData.profileName;
    document.getElementById("userLevel").textContent = `Level ${userData.userLevel}`;
    document.getElementById("levelProgress").style.width = `${userData.levelProgress}%`;
  
    // Currency UI
    document.querySelector(".stat-value.gems").textContent = userData.gemsCount;
    document.querySelector(".stat-value.packs").textContent = userData.packsCount;
  
    // Current pack + progress bar
    document.getElementById("currentPacks").textContent = userData.packsCount;
    document.getElementById("packProgress").style.width = `${userData.packProgress}%`;
  
    // Collection button
    const collectionsBtn = document.getElementById("collectionsBtn");
    if (collectionsBtn) {
      collectionsBtn.addEventListener("click", () => {
        window.location.href = "../collection/collection.html";
      });
    }
  
    // Clickable pack
    const mainPack = document.getElementById("mainPack");
    if (mainPack) {
      mainPack.addEventListener("click", () => {
        window.location.href = "../pullpage/pack.html";
      });
    }
  });
  