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

import CreateProduct from './app/scr/07-create-product/create-product'
import CreateCategory from './app/scr/10-create-category/create-category'

const App: () => React$Node = () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          > */}
          <CreateCategory/>
        {/* </ScrollView>
      </SafeAreaView> */}
    </>
  );
};


export default App;
