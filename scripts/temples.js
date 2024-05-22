document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenuButton = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    function toggleNavMenu() {
        navMenu.classList.toggle("visible");

        if (navMenu.classList.contains("visible")) {
            hamburgerMenuButton.textContent = 'X';
        } else {
            hamburgerMenuButton.textContent = '☰';
        }
    }

    hamburgerMenuButton.addEventListener("click", toggleNavMenu);

    const currentYearInfo = new Date().getFullYear();
    const lastModifiedInfo = new Date(document.lastModified);

    const currentYear = document.getElementById("currentYear");
    const lastModified = document.getElementById("lastModified");

    currentYear.innerHTML = currentYearInfo;

    const formattedLastModifiedInfo = `${lastModifiedInfo.toLocaleDateString()} ${lastModifiedInfo.toLocaleTimeString()}`;
    lastModified.innerHTML = `Last Modification: ${formattedLastModifiedInfo}`;
});
