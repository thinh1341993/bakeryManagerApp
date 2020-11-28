import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

import { connect, useDispatch } from 'react-redux'

import { View, TouchableOpacity,Text, } from "react-native"

const oderCheck =(props)=>{

    return(
        <View>
            <Text>oderCheck{props.categoriesData[0].name}</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const OderCheckScreen =connect(mapStateToProps, null)(oderCheck)