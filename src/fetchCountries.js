export function fetchCountries(country, { official, capital, population, flags, languages }) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=${official},${capital},${population},${flags},${languages}`
  )
    .then(response => response.json())
    .then(data => console.log(data));
}

// https://restcountries.com/v3.1/{service}?fields={field},{field},{field
// name.official,capital,population,flag.svg,languages
// ?fields=name.official,capital,population,flags.svg,languages
// ?fulltext=true&fields=name,capital,population,flags,languages
