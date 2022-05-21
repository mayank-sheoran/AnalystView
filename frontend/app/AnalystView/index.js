// Module Imports
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

// File Imports
import App from './src';
import {name as appName} from './app.json';
import configureStore from './src/redux/store';

const store = configureStore();
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
