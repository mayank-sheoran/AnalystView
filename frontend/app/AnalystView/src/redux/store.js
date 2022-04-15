import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {addReducer} from './reducers/add';
import {loginReducer} from './reducers/login';

const rootReducer = combineReducers({add: addReducer, login: loginReducer});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
