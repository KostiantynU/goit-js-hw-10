const BASIC_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(country, { official, capital, population, flags, languages }) {
  return fetch(
    `${BASIC_URL}${country}?fields=${official},${capital},${population},${flags},${languages}`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.log(error);
    });
}
