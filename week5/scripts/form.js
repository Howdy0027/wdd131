document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 'fc-1888', name: 'flux capacitor', avg_rating: 4.5 },
        { id: 'fc-2050', name: 'power laces', avg_rating: 4.7 },
        { id: 'fs-1987', name: 'time circuits', avg_rating: 3.5 },
        { id: 'ac-2000', name: 'low voltage reactor', avg_rating: 3.9 },
        { id: 'jj-1969', name: 'warp equalizer', avg_rating: 5.0 }
    ];

    const productNameSelect = document.getElementById('product-name');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productNameSelect.appendChild(option);
    });

    const form = document.getElementById('product-review-form');
    form.addEventListener('submit', function (event) {
        let reviewCount = localStorage.getItem('reviewCount') || 0;
        localStorage.setItem('reviewCount', ++reviewCount);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const currentYearInfo = new Date().getFullYear();
    const lastModifiedInfo = new Date(document.lastModified);

    const currentYear = document.getElementById("currentYear");
    const lastModified = document.getElementById("lastModified");

    currentYear.innerHTML = currentYearInfo;

    const formattedLastModifiedInfo = `${lastModifiedInfo.toLocaleDateString()} ${lastModifiedInfo.toLocaleTimeString()}`;
    lastModified.innerHTML = `Last Modification: ${formattedLastModifiedInfo}`;
});


