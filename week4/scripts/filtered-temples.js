document.addEventListener("DOMContentLoaded", function () {
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Idaho Falls Idaho",
            location: "Idaho Falls, Idaho, United States",
            dedicated: "1945, September 15-20",
            area: 92177,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/idaho-falls-idaho/2019/400x250/1-Idaho-Falls-Temple-2097425.jpg"
        },
        {
            templeName: "Mount Timpanogos Utah",
            location: "Mount Timpanogos, Utah",
            dedicated: "1996, October, 13",
            area: 107240,
            imageUrl:
                "https://www.churchofjesuschrist.org/imgs/b4b7425f9c94ab4c8086b24ab4a93531044093fe/full/1920%2C/0/default"
        },
        {
            templeName: "Bentonville Arkansas",
            location: "Bentonville, Arkansas, United States",
            dedicated: "2023, September, 17",
            area: 28472,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bentonville-arkansas/400x250/34410870d7d011ed8402eeeeac1ec672bdc0ce45.jpeg"
        },
        {
            templeName: "Provo City Center Temple",
            location: "Provo, Utah, United States",
            dedicated: "2016, March, 20",
            area: 85084,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/2018/400x250/Provo-City-Center-Temple03.jpg"
        },
        {
            templeName: "Rexburg Idaho",
            location: "Rexburg, Idaho, United States",
            dedicated: "2008, February, 10",
            area: 57000,
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjF021utolG7yeE4RN2UhMu03u52HgR39JigFofLndqA&s",
            alt: "Rexburg Idaho Temple",
        },
    ];

    const hamburgerMenuButton = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    const templeContainer = document.getElementById("temple-container");

    function toggleNavMenu() {
        navMenu.classList.toggle("visible");
        hamburgerMenuButton.textContent = navMenu.classList.contains("visible") ? 'X' : '☰';
    }

    function createTempleCard(temple) {
        return `
            <figure>
                <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
                <figcaption>
                    <h3>${temple.templeName}</h3>
                    <p><strong>Location:</strong> ${temple.location}</p>
                    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                    <p><strong>Size:</strong> ${temple.area} sq ft</p>
                </figcaption>
            </figure>
        `;
    }

    function displayTemples(filteredTemples) {
        templeContainer.innerHTML = filteredTemples.map(createTempleCard).join('');
    }

    function filterTemples(criteria) {
        let filteredTemples;
        const currentYear = new Date().getFullYear();

        switch (criteria) {
            case 'old':
                filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
                break;
            case 'new':
                filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000);
                break;
            case 'large':
                filteredTemples = temples.filter(temple => temple.area > 90000);
                break;
            case 'small':
                filteredTemples = temples.filter(temple => temple.area < 10000);
                break;
            default:
                filteredTemples = temples;
        }

        displayTemples(filteredTemples);
    }

    navMenu.addEventListener("click", event => {
        if (event.target.tagName === 'A') {
            const filter = event.target.getAttribute('data-filter');
            filterTemples(filter);
        }
    });

    hamburgerMenuButton.addEventListener("click", toggleNavMenu);

    // Initialize the page with all temples
    displayTemples(temples);

    const currentYearInfo = new Date().getFullYear();
    const lastModifiedInfo = new Date(document.lastModified);

    const currentYear = document.getElementById("currentYear");
    const lastModified = document.getElementById("lastModified");

    currentYear.innerHTML = currentYearInfo;

    const formattedLastModifiedInfo = `${lastModifiedInfo.toLocaleDateString()} ${lastModifiedInfo.toLocaleTimeString()}`;
    lastModified.innerHTML = `Last Modification: ${formattedLastModifiedInfo}`;
});
