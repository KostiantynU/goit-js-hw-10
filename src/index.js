import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// console.log(fetchCountries('ukraine', optionsObj));

const refs = {
  searchBoxEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.countryInfo'),
};

const optionsObj = {
  official: 'name',
  capital: 'capital',
  population: 'population',
  flags: 'flags',
  languages: 'languages',
};

refs.searchBoxEl.addEventListener('input', debounce(searchByWord, DEBOUNCE_DELAY));

function searchByWord(event) {
  fetchCountries(event.target.value, optionsObj);
}
