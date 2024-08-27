// Selectors

const controls = document.getElementById('controls');
const countryContainer = document.getElementById('country-container');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const countryDetailContainer = document.getElementById('country-detail');
const themeToggle = document.getElementById('theme-toggle');

// Fetch and Display Countries
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    countryContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <div class="country-info">
                <h3>${country.name.common}</h3>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            </div>
        `;
        countryCard.addEventListener('click', () => showCountryDetail(country));
        countryContainer.appendChild(countryCard);
    });
}

function showCountryDetail(country) {
    controls.style.display = 'none';
    countryContainer.style.display = 'none';
    countryDetailContainer.style.display = 'flex';

    countryDetailContainer.innerHTML = `
        <button id="back-button" style="align-self: flex-start;border-radius: 5px; border: 1px solid #ccc;
        background-color: ;padding: 10px 20px; justify-self: flex-start">Back</button>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <div class="country-detail-content">
            <h2>${country.name.common}</h2>
            <p><strong>Native Name:</strong> ${country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : country.name.common}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Top Level Domain:</strong> ${country.tld.join(', ')}</p>
            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <div class="border-countries"><strong>Border Countries:</strong> ${country.borders ? country.borders.map(border => `<button>${border}</button>`).join(' ') : 'None'}</div>
        </div>
    `;

    document.getElementById('back-button').addEventListener('click', () => {
        countryContainer.style.display = 'grid';
        countryDetailContainer.style.display = 'none';
    });
}


// Search Countries
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        const countryName = card.querySelector('h3').textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filter Countries by Region
regionFilter.addEventListener('change', function () {
    const selectedRegion = regionFilter.value;
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        const countryRegion = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        if (selectedRegion === 'All' || countryRegion === selectedRegion) {
            card.style.display = 'flexbox';
        } else {
            card.style.display = 'none';
        }
    });
});

// Toggle Dark Mode
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Initial Fetch
fetchCountries();
