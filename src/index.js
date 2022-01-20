import './css/styles.css';
import CountriesApiService from './JS/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('input#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const countriesApiService = new CountriesApiService();

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  if (e.target.value === '' || e.target.value === ' ') {
    refs.countriesList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  countriesApiService.country = e.target.value.trim();

  countriesApiService.fetchCountries().then(countries => {
    if (countries.length === 1) {
      const oneCountry = countries.map(country => markupOneCountry(country));
      refs.countriesList.innerHTML = '';
      refs.countryInfo.innerHTML = oneCountry;
    }
    if (countries.length < 10 && countries.length > 1) {
      const countryList = countries.map(country => markaupCountryList(country)).join('');
      refs.countriesList.innerHTML = countryList;
    }
    if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
  });
}

function markupOneCountry(country) {
  return `<p><img src="${country.flags.svg}" alt="${country.name.official}" />${
    country.name.official
  }</p>
      <p><b>Capital</b>: ${country.capital}</p>
      <p><b>Population</b>: ${country.population}</p>
     <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
}

function markaupCountryList(country) {
  return `<li>
    <img src=${country.flags.svg} alt=${country.name.official} >
    <b >${country.name.official}</b>
</li>`;
}
