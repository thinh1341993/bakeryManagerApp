import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

import { connect, useDispatch } from 'react-redux'

import { View, TouchableOpacity,Text } from "react-native"

const onboarding =(props)=>{

    return(
        <View style={{flex:1}}>
            <Text>onboarding</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const OnboardingScreen =connect(mapStateToProps, null)(onboarding)