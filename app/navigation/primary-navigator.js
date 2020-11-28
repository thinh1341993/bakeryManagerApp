
import React from "react"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
    OderCheckScreen,
    ProductScreen,
    CreateProductScreen,
    EditProductScreen,
    CategoriesScreen,
    CreateCategoryScreen,
    MapCategoriesScreen,
    EditCategoriesScreen
} from "../scr"
import screens from "./screen"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "react-native-elements"
import { color } from "../theme"


const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
export function HomeBottomTab() {
    return (
        <Tab.Navigator
            initialRouteName={screens.ProductScreen}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName

                    if (route.name === screens.ProductScreen) {
                        iconName = focused ? "search" : "search-outline"
                    } else if (route.name === screens.CategoriesScreen) {
                        iconName = focused ? "list" : "list-outline"
                    } else if (route.name === screens.OderCheckScreen) {
                        iconName = focused ? "newspaper" : "newspaper-outline"
                    }

                    return (
                        <Icon
                            name={iconName}
                            size={25}
                            type="ionicon"
                            color={focused ? color.main : color.gray140}
                            style={{ marginBottom: 4 }}
                        />
                    )
                },
            })}
            barStyle={{ backgroundColor: color.white }}
            activeColor={color.main}
        >
            <Tab.Screen name={screens.ProductScreen} component={ProductScreen} />
            <Tab.Screen name={screens.CategoriesScreen} component={CategoriesScreen} />
            <Tab.Screen name={screens.OderCheckScreen} component={OderCheckScreen} />
            {/* <Tab.Screen name={screens.NotificationsScreen} component={NotificationsScreen} />
      <Tab.Screen name={screens.AccountScreen} component={AccountScreen} /> */}
        </Tab.Navigator>
    )
}



export function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >
            <Stack.Screen name={screens.HomeBottomTab} component={HomeBottomTab} />
            <Stack.Screen name={screens.OderCheckScreen} component={OderCheckScreen} />
            <Stack.Screen name={screens.ProductScreen} component={ProductScreen} />
            <Stack.Screen name={screens.CreateProductScreen} component={CreateProductScreen} />
            <Stack.Screen name={screens.EditProductScreen} component={EditProductScreen} />
            <Stack.Screen name={screens.CreateCategoryScreen} component={CreateCategoryScreen} />
            <Stack.Screen name={screens.MapCategoriesScreen} component={MapCategoriesScreen} />
            <Stack.Screen name={screens.EditCategoriesScreen} component={EditCategoriesScreen} />
        </Stack.Navigator>
    )
}

