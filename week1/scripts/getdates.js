const currentYearInfo = new Date().getFullYear();
const lastModifiedInfo = document.lastModified;

const currentYear = document.getElementById("currentYear");
const lastModified = document.getElementById("lastModified");

currentYear.innerHTML = currentYearInfo;
lastModified.innerHTML = `Last Modification: ${lastModifiedInfo}`;