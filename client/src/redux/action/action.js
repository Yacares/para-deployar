import axios from 'axios';

// Acción para cargar la lista de países
export const LOAD_COUNTRIES_SUCCESS = 'LOAD_COUNTRIES_SUCCESS';
export const LOAD_COUNTRIES_FAILURE = 'LOAD_COUNTRIES_FAILURE';
export const LOAD_ACTIVITIES_SUCCESS = 'LOAD_ACTIVITIES_SUCCESS';
export const LOAD_ACTIVITIES_FAILURE = 'LOAD_ACTIVITIES_FAILURE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAILURE = 'CREATE_ACTIVITY_FAILURE';

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

export function loadActivities() {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/activities');
      const activities = response.data.creactedActivities;

      dispatch(loadActivitiesSuccess(activities));
    } catch (error) {
      console.error('Error fetching activities:', error.message);
      dispatch(loadActivitiesFailure('Error fetching activities'));
    }
  };
}

export function loadActivitiesSuccess(activities) {
  return { type: LOAD_ACTIVITIES_SUCCESS, activities };
}

export function loadActivitiesFailure(error) {
  return { type: LOAD_ACTIVITIES_FAILURE, error };
}


export function changePage(page) {
  return { type: CHANGE_PAGE, page };
}

export const createActivitySuccess = (activity) => ({
  type: CREATE_ACTIVITY_SUCCESS,
  activity,
});

export const createActivityFailure = (error) => ({
  type: CREATE_ACTIVITY_FAILURE,
  error,
});

export const createActivity = (activityData) => {
  return async (dispatch) => {
    try {
      // Aquí puedes realizar alguna lógica adicional antes de hacer la solicitud al backend
      const response = await axios.post('http://localhost:3001/activities', activityData);
      const createdActivity = response.data;

      dispatch(createActivitySuccess(createdActivity));
    } catch (error) {
      console.error('Error creating activity:', error.message);
      dispatch(createActivityFailure('Error creating activity'));
    }
  };
};
