import { LOAD_COUNTRIES_SUCCESS, LOAD_COUNTRIES_FAILURE, CHANGE_PAGE } from '../action/action';

const initialState = {
  countries: [],
  error: null,
  continents: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

function countryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries,
        continents: [...new Set(action.countries.map(country => country.continent))], // Extrae los continentes únicos
        error: null,
      };
    case LOAD_COUNTRIES_FAILURE:
      return {
        ...state,
        countries: [],
        continents: [],
        error: action.error,
      };
      case CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.page,
        },
      };
    // Otros casos de reducer según sea necesario
    default:
      return state;
  }
}

export default countryReducer;