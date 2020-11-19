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

const App: () => React$Node = () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          > */}
          <CreateProduct/>
        {/* </ScrollView>
      </SafeAreaView> */}
    </>
  );
};


export default App;
