import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

import { connect, useDispatch } from 'react-redux'

import { View, TouchableOpacity, Text } from "react-native"
import screens from '../../navigation/screen'
import { AppNavigator } from '../../navigation/primary-navigator'
const splash = (props) => {
    const [loading, setLoading] = useState(true)
    // const navigation = useNavigation()
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     try {
    //         firestore()
    //             .collection('Categories')
    //             .onSnapshot(documentSnapshot => {
    //                 let result = {}
    //                 for (let data of documentSnapshot.docs) {
    //                     result[data.id] = {
    //                         name: data.data().name,
    //                         productId: data.data().productId,
    //                         image: data.data().image,
    //                         total: documentSnapshot.size
    //                     }
    //                 }
    //                 console.log(result)
    //                 dispatch({
    //                     type: 'GET_CATEGORIES_DATA',
    //                     payload: result
    //                 })
    //                 setLoading(false)
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>hello</Text>
            <TouchableOpacity>
                <Text>SplashScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

// export default connect(mapStateToProps, null)(splash)

export const SplashScreen = connect(mapStateToProps, null)(splash)