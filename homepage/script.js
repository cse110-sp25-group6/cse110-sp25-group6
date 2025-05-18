// script.js for homepage landing page functionality

document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            // Redirect to collection page or onboarding
            window.location.href = '../collection/collection.html';
        });
    }
});
