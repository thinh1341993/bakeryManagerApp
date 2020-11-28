/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import store from './app/redux/createStore'

// import SplashScreen from './app/scr/01-splash/splash'
import FlashListItem from './app/components/flash-list/flash-list-item'
import { SplashScreen } from './app/scr/01-splash/splash'
import { OnboardingScreen } from './app/scr/01.1-onboarding/onboarding'
import { AuthStack } from './app/navigation/auth-navigator'
import RootNavigator from './app/navigation/root-navigator'
import { enableScreens } from 'react-native-screens';

enableScreens();
import { NavigationContainer } from '@react-navigation/native';
import { HomeBottomTab } from './app/navigation/primary-navigator'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};


export default App;
