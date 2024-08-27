document.addEventListener('DOMContentLoaded', () => {
    

// Selectors
const countryContainer = document.getElementById('country-container');
const searchInput = document.getElementById('search-input');
let regionFilter = document.getElementById('region-filter');
const countryDetailContainer = document.getElementById('country-detail');
const backButton = document.getElementById('back-button');
const themeToggle = document.getElementById('theme-toggle');
const controls = document.getElementById('controls');

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
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
            </div>
        `;
        countryCard.addEventListener('click', () => showCountryDetail(country));
        countryContainer.appendChild(countryCard);
    });
}

// Show Country Detail
function showCountryDetail(country) {
    countryContainer.style.display = 'none';
    countryDetailContainer.style.display = 'block';

    countryDetailContainer.innerHTML = `
        <button id="back-button">Back</button>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <h2>${country.name.common}</h2>
        <p><strong>Native Name:</strong> ${country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : country.name.common}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Sub Region:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Top Level Domain:</strong> ${country.tld.join(', ')}</p>
        <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <div><strong>Border Countries:</strong> ${country.borders ? country.borders.map(border => `<button>${border}</button>`).join(' ') : 'None'}</div>
    `;

    document.getElementById('back-button').addEventListener('click', () => {
        countryContainer.style.display = 'grid';
        controls.style.display = 'flex';
        countryDetailContainer.style.display = 'none';
        countryDetailContainer.innerHTML = '';
        backButton.removeEventListener('click', showCountryDetail);
        backButton.style.display = 'none';
        if (regionFilter.value !== 'All') {
            regionFilter.value = 'All';
            searchInput.value = '';
        }

        fetchCountries();
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

regionFilter.addEventListener('change', function () {
    const selectedRegion = regionFilter.value;
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        const countryRegion = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        if (selectedRegion === 'All' || countryRegion === selectedRegion) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

fetchCountries();
})