import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

import { connect, useDispatch } from 'react-redux'

import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal, } from "react-native"
import { Icon, Input, SearchBar, CheckBox, Slider } from "react-native-elements"
import { Picker } from '@react-native-picker/picker';

import { color, distance, fontSize, typography } from "../../theme"
import SearchInput, { createFilter } from 'react-native-search-filter';

import MultiSlider from '@ptomasroos/react-native-multi-slider';


const categories = (props) => {
    //state
    const navigation = useNavigation()
    const [searchSelect, setSearchSelect] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [sort, setSort] = useState(true)

    const KEYS_TO_FILTERS = ['name'];
    const filteredName = sort ? props.categoriesData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)).sort(function (a, b) { return a.total - b.total })
        : props.categoriesData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)).sort(function (a, b) { return b.total - a.total })

    const filterIcon = () => {
        setSort(!sort)
    }

    return (
        <View style={{ flex: 1 }}>
            
            {searchSelect ? <View style={styles.selectCategory}>
                <SearchInput
                    autoFocus={true}
                    onChangeText={(term) => setSearchTerm(term)}
                    style={{
                        padding: 8,
                        fontSize: 17,
                        width: 300,
                        color: 'white'
                    }}
                    placeholder="Tìm kiếm"
                    placeholderTextColor={color.offWhite}
                    selectionColor={'white'}
                />
                <TouchableOpacity
                    onPress={() => {
                        setSearchTerm('')
                        setSearchSelect(false)
                    }}
                    style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Icon
                        name='close'
                        type='antdesign'
                        size={20}
                        color='white'
                    ></Icon>
                </TouchableOpacity>
            </View>
                : <View style={styles.header}>
                    <TouchableOpacity
                        //back
                        onPress={() => filterIcon()}
                    >
                        <Icon
                            name='sort-amount-asc'
                            type='font-awesome'
                            size={20}
                            color={sort ? 'white' : color.greyText}
                        ></Icon>
                    </TouchableOpacity>
                    <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Danh mục</Text>
                    <TouchableOpacity
                        onPress={() => { setSearchSelect(true) }}
                    >
                        <Icon
                            name='search1'
                            type='antdesign'
                            size={20}
                            color='white'
                        ></Icon>
                    </TouchableOpacity>
                </View>}

            <View style={{ flex: 1, paddingLeft: 16, marginTop: 8 }}>
                <FlatList
                    data={filteredName}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('EditCategoriesScreen', item)}
                                style={styles.containerFL}>
                                <Image source={{ uri: item.image }} style={styles.imageFL} />
                                <View style={styles.centerFL}>
                                    <Text style={styles.textFL}>{item.name}</Text>
                                    <View style={{ width: '100%', height: '50%', paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[styles.textFL, { color: color.textgray }]}>{item.total} mặt hàng</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            
            <TouchableOpacity style={{ position: 'absolute', backgroundColor: color.buttonbuy, borderRadius: 99, bottom: 15, right: 15, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                //Create Produc
                onPress={() => {
                    navigation.navigate('CreateCategoryScreen')
                }}
            >
                <Icon
                    name='add'
                    type='ionicons'
                    size={30}
                    color='white'
                ></Icon>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const CategoriesScreen = connect(mapStateToProps, null)(categories)