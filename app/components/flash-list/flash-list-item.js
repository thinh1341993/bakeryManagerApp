import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import styles from './styles'


const FlashListItem = (data,action) => {

    return (
        <View style={{ flex: 1, }}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity 
                        key={index} 
                        onPress={action(item.id,)}
                        style={styles.container}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.center}>
                                <View style={{justifyContent:'center'}}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text}>{item.inventory}</Text>
                                </View>
                                <Text style={[styles.text, styles.right]}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default FlashListItem