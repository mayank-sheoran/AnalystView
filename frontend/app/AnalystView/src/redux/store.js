import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {addReducer} from './reducers/add';
import {loginReducer} from './reducers/login';
import {analyseReducer} from './reducers/analyse';

const rootReducer = combineReducers({
  add: addReducer,
  login: loginReducer,
  analysis: analyseReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
