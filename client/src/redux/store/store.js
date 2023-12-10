import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import countryReducer from '../reducer/reducer';

const store = createStore(countryReducer, applyMiddleware(thunk));

export default store;