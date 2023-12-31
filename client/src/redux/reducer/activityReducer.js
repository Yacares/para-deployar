import { LOAD_ACTIVITIES_SUCCESS, LOAD_ACTIVITIES_FAILURE, CREATE_ACTIVITY_SUCCESS, CREATE_ACTIVITY_FAILURE} from '../action/action';

const initialState = {
  activities: [],
  filteredActivities: [],
  error: null,
};

function activityReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.activities,
        filteredActivities: action.activities,
        error: null,
      };
    case LOAD_ACTIVITIES_FAILURE:
      return {
        ...state,
        activities: [],
        filteredActivities: [],
        error: action.error,
      };
      case CREATE_ACTIVITY_SUCCESS:
        return {
          ...state,
          activities: [...state.activities, action.activity],
          filteredActivities: [...state.filteredActivities, action.activity],
          error: null,
        };
      case CREATE_ACTIVITY_FAILURE:
        return {
          ...state,
          error: action.error,
        };
    default:
      return state;
  }
}

export default activityReducer;