import React, { useState } from "react"
import styles from "./styles"


import { connect } from 'react-redux'

import { View, TouchableOpacity, Text } from "react-native"

const splash = (props) => {
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

export const SplashScreen = connect(mapStateToProps, null)(splash)