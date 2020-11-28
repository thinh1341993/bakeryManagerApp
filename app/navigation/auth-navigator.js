import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
    OnboardingScreen,
    LoginScreen,
    SignUpScreen,
    ResetPasswordScreen,
} from "../scr"
import screens from "./screen"


const Stack = createNativeStackNavigator()

export function AuthStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName={screens.OnboardingScreen}
        >
            <Stack.Screen name={screens.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={screens.SignUpScreen} component={SignUpScreen} />
            <Stack.Screen name={screens.ResetPasswordScreen} component={ResetPasswordScreen} />
            <Stack.Screen name={screens.OnboardingScreen} component={OnboardingScreen} />
        </Stack.Navigator>
    )
}