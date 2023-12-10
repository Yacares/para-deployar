import { LOAD_COUNTRIES_SUCCESS, LOAD_COUNTRIES_FAILURE } from '../action/action';

const initialState = {
  countries: [],
  error: null,
};

function countryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries,
        error: null,
      };
    case LOAD_COUNTRIES_FAILURE:
      return {
        ...state,
        countries: [],
        error: action.error,
      };
    // Otros casos de reducer según sea necesario
    default:
      return state;
  }
}

export default countryReducer;