import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// console.log(fetchCountries('ukraine', optionsObj));

const refs = {
  searchBoxEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),

  optionsObj: {
    official: 'name',
    capital: 'capital',
    population: 'population',
    flags: 'flags',
    languages: 'languages',
  },

  notiflixOpt: { timeout: 1000 },
};

refs.searchBoxEl.addEventListener('input', debounce(searchByWord, DEBOUNCE_DELAY));

function searchByWord(event) {
  if (!event.target.value.trim()) {
    Notiflix.Notify.info('The field is empty.', refs.notiflixOpt);
    refs.countryInfoEl.innerHTML = '';
    return;
  }
  const countriesPromise = fetchCountries(event.target.value.trim(), refs.optionsObj);
  countriesPromise
    .then(array => {
      if (array.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          refs.notiflixOpt
        );
        refs.searchBoxEl.value = '';
        console.log(refs.searchBoxEl);
      } else if (array.length < 10 && array.length > 2) {
        renderList(createMarkupList(array));
      } else if (array.length === 1) {
        renderCard(createMarkupCard(array));
      }
    })
    .catch(onError);
}

function createMarkupList(array) {
  return (listCountries = array
    .map(el => {
      return `<li><img width="50" height=30" src="${el.flags.svg}">${el.name.official}</li>`;
    })
    .join(''));
}

function createMarkupCard(array) {
  return (markupCard = array
    .map(({ flags, name, capital, population, languages }) => {
      return `<img width="50" height=30" src="${flags.svg}"><h2>${
        name.official
      }</h2><p><b>Capital:</b> ${
        capital[0]
      }</p><p><b>Population:</b> ${population}<p><b>Languages:</b> ${Object.values(
        languages
      )}</p></p>`;
    })
    .join(''));
}

function renderList(markup) {
  refs.countryInfoEl.innerHTML = '';
  refs.countryListEl.innerHTML = markup;
}

function renderCard(markup) {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = markup;
}

function onError(error) {
  console.log(error);
}
