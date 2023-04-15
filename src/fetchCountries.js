const BASIC_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(country, { official, capital, population, flags, languages }) {
  return fetch(
    `${BASIC_URL}${country}?fields=${official},${capital},${population},${flags},${languages}`
  )
    .then(response => {
      if (!response.ok) {
        return [];
      }

      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}
