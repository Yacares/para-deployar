import axios from 'axios';

// Acción para cargar la lista de países
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_COUNTRIES_FAILURE = 'LOAD_COUNTRIES_FAILURE';

export function loadCountriesSuccess(countries) {
  return { type: LOAD_COUNTRIES_SUCCESS, countries };
}

export function loadCountriesFailure(error) {
  return { type: LOAD_COUNTRIES_FAILURE, error };
}

// Acción asincrónica para cargar los países desde la API
export function loadCountries() {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      const countries = response.data.createdCountries;

      dispatch(loadCountriesSuccess(countries));
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      dispatch(loadCountriesFailure('Error fetching countries'));
    }
  };
}