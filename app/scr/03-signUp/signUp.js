import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

import { connect, useDispatch } from 'react-redux'

import { View, TouchableOpacity } from "react-native"

const signUp =(props)=>{

    return(
        <View>
            <Text>SignUpScreen</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const SignUpScreen =connect(mapStateToProps, null)(signUp)