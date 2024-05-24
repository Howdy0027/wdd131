document.addEventListener('DOMContentLoaded', () => {
    // Get references to the DOM elements that display temperature, wind speed, and wind chill
    const tempEl = document.getElementById("celsius");
    const windchillEl = document.getElementById("windchill");
    const windSpeedEl = document.getElementById("km_h");

    // Convert the text content of the temperature and wind speed elements to numbers
    const temp = Number(tempEl.textContent);
    const windSpeed = Number(windSpeedEl.textContent);

    // Function to calculate wind chill based on temperature and wind speed
    const calculateWindChill = (temp, windSpeed) => {
        // If the temperature is above 10°C or wind speed is 4.8 km/h or less, return "N/A"
        if (temp > 10 || windSpeed <= 4.8) {
            return "N/A";
        }
        // Calculate the wind chill using the formula
        const windchill =
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(windSpeed, 0.16) +
            0.3965 * temp * Math.pow(windSpeed, 0.16);
        // Return the wind chill value rounded to one decimal place
        return windchill.toFixed(1);
    };

    // Calculate the wind chill using the temperature and wind speed values
    const windchill = calculateWindChill(temp, windSpeed);
    // Display the wind chill value in the wind chill element, adding "°C" if it is a number
    windchillEl.innerHTML = windchill !== "N/A" ? `${windchill}&deg;C` : windchill;

    // Get references to the DOM elements for displaying the current year and last modified date
    const currentYearElement = document.getElementById("currentYear");
    const lastModifiedElement = document.getElementById("lastModified");

    // Get the current date and extract the current year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Display the current year and the last modified date in their respective elements
    currentYearElement.textContent = currentYear;
    lastModifiedElement.textContent = document.lastModified;
});