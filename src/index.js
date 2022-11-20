import { fetchCountries} from './fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (e) {
  e.preventDefault();
  const name = e.target.value.trim();
   countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  fetchCountries(name).then(countries => {
if(countries.length > 10) {
  return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
} else {
renderCountryList(countries);
}
  })
  .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
 }

function renderCountryList(countries) {
    const markup = countries
      .map(({ name, flags}) => {
        return `
            <li class = "list__item">
            <img class = "list__img" src="${flags.svg}" alt="Flag of ${name.official}" width="40" hight="30">
            <p class = "list__name">${name.official}</p>
            </li>
        `;
      })
      .join("");
      countryList.innerHTML = markup;

      if (countries.length === 1) {
        renderCountryInfo(countries);
      }
  }

  function renderCountryInfo(countries) {
    const markup = countries
      .map(({ capital, population, languages }) => {
        return `
            <li>
              <p><b>Capital</b>: ${capital}</p>
              <p><b>Population</b>: ${population}</p>
              <p><b>Languages</b>: ${Object.values(languages)}</p>
            </li>
        `;
      })
      .join("");
      countryInfo.innerHTML = markup;
  }