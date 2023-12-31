import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countryReducer from '../reducer/countryReducer';
import activityReducer from '../reducer/activityReducer';

const rootReducer = combineReducers({
  countries: countryReducer,
  activities: activityReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;