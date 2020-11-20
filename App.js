/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux'
import store from './app/redux/createStore'

import CreateProduct from './app/scr/07-create-product/create-product'
import CreateCategory from './app/scr/10-create-category/create-category'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
          <CreateCategory/>
    </Provider>
  );
};


export default App;
