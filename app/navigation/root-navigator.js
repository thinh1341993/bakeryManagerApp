import React, { useState, useEffect } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import firestore from '@react-native-firebase/firestore'

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { SplashScreen } from '../scr'
import screens from './screen'
import { AuthNavigator } from './auth-navigator'
import { AppNavigator } from './primary-navigator'
import { connect, useDispatch } from 'react-redux'
import { Text, View } from "react-native"

const Stack = createNativeStackNavigator()

 const rootNavigator = (props) => {
    //state
    const [loading, setLoading] = useState(true)
    const [user, setUserToken] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            firestore()
                .collection('Categories')
                .onSnapshot(documentSnapshot => {
                    let result = []
                    for (let data of documentSnapshot.docs) {
                        result.push({
                            categoriesId: data.id,
                            name: data.data().name,
                            productId: data.data().productId,
                            image: data.data().image,
                            total: documentSnapshot.size
                        })
                    }
                    console.log(result)
                    dispatch({
                        type: 'GET_CATEGORIES_DATA',
                        payload: result
                    })
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])



    if (loading) {
        return (      
            <Stack.Navigator>
                <Stack.Screen
                    name={screens.SplashScreen}
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        )
    } else if (user) {
        return (
            AppNavigator()
        )
    } else {
        return (
            AuthNavigator()
        )
    }
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export default connect(mapStateToProps, null)(rootNavigator)