import Notiflix from 'notiflix';

export default class CountriesApiService {
  constructor() {
    this.searchСountry = '';
  }

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchСountry}?fields=name,capital,population,flags,languages`,
    )
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        } else {
          return Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      })
      .then(countries => {
        return countries;
      })
      .catch(erorr => console.log(erorr));
  }

  get country() {
    return this.searchСountry;
  }

  set country(newCountry) {
    this.searchСountry = newCountry;
  }
}
