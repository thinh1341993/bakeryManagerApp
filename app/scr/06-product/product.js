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
import CustomLabel from './CustomLabel'

const product = (props) => {
    //state
    const [pickerValue, setPickerValue] = useState('Tất cả mặt hàng')
    const [searchSelect, setSearchSelect] = useState(false)
    const [productData, setProductData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [categoriesId, setCategoriesId] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [multiSliderValue, setMultiSliderValue] = useState([0, 1500])
    const [filterValue, setFilterValue] = useState(true)
    const [sortValue, setSortValue] = useState(true)
    const navigation = useNavigation()
    useEffect(() => {
        getAllProduct()
    }, [])
    //action
    const filterIcon = () => {
        setModalVisible(true)
    }
    //search
    const KEYS_TO_FILTERS = ['name'];
    const filteredName = productData.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    //get data
    const getAllProduct = () => {

        try {
            firestore()
                .collection('Products')
                .onSnapshot(documentSnapshot => {
                    let result = []
                    for (let data of documentSnapshot.docs) {
                        result.push(data.data())
                    }
                    setProductData(result)
                })
        } catch (error) {
            console.log(error)
        }
    }
    //filter by category
    const filterCategory = (categoriesId) => {
        try {
            firestore()
                .collection('Products')
                // Filter results
                .where('categoriesId', '==', categoriesId)
                .get()
                .then(documentSnapshot => {

                    let result = []
                    for (let data of documentSnapshot.docs) {
                        result.push(data.data())
                    }
                    console.log(result)
                    setProductData(result)
                });
        } catch (error) {
            console.log(error)
        }
    }

    //filter by conditions
    const filterConditions = () => {
        let ref
        let startAt=multiSliderValue[0]
        let endAt=multiSliderValue[1]
        if(filterValue){
            startAt=startAt*1000
            endAt=endAt*1000
        }
        pickerValue == 'Tất cả mặt hàng' ? ref = firestore().collection('Products')
            : ref = firestore().collection('Products').where('categoriesId', '==', pickerValue)
        try {
            ref.orderBy(filterValue ? 'price' : 'inventory', sortValue ? 'asc' : 'desc')
                .startAt(sortValue ? startAt : endAt)
                .endAt(sortValue ? endAt : startAt)
                .get()
                .then(documentSnapshot => {
                    let result = []
                    for (let data of documentSnapshot.docs) {
                        result.push(data.data())
                    }
                    console.log(result)
                    setProductData(result)
                });
        } catch (error) {
            console.log(error)
        }
    }
    //render
    function currencyFormat(num) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    return (

        <View style={{ flex: 1, }}>
            <View style={styles.header}>
                <TouchableOpacity
                    //back
                    onPress={() => filterIcon()}
                >
                    <Icon
                        name='filter'
                        type='antdesign'
                        size={20}
                        color='white'
                    ></Icon>
                </TouchableOpacity>
                <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Mặt hàng</Text>
                <TouchableOpacity
                    //Create Produc
                    onPress={() => {
                        navigation.navigate('CreateProductScreen')
                    }}
                >
                    <Icon
                        name='pluscircleo'
                        type='antdesign'
                        size={20}
                        color='white'
                    ></Icon>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(85, 85, 85, 0.55)', alignItems: 'center' }}>
                    <ScrollView >
                        <View style={{ backgroundColor: 'white', width: distance.windowWidth * 0.8, borderRadius: 16, marginTop: 70 }}>
                            <Text style={{ fontSize: 17, marginLeft: 16, marginTop: 10, fontWeight: 'bold' }}>Lọc theo</Text>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                title='Giá sản phẩm(K)'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={color.textGreen}
                                uncheckedColor={color.textGreen}
                                checked={filterValue}
                                onPress={() => setFilterValue(true)}
                            />
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', margin: 0, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: color.gray140 }}
                                title='Tồn kho'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={color.textGreen}
                                uncheckedColor={color.textGreen}
                                checked={!filterValue}
                                onPress={() => setFilterValue(false)}
                            />
                            <Text style={{ fontSize: 17, marginLeft: 16, marginTop: 8, fontWeight: 'bold' }}>Sắp xếp</Text>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                title='Tăng dần'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={color.textGreen}
                                uncheckedColor={color.textGreen}
                                checked={sortValue}
                                onPress={() => setSortValue(true)}
                            />
                            <CheckBox
                                containerStyle={{ margin: 0, backgroundColor: 'transparent', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: color.gray140 }}
                                title='Giảm dần'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={color.textGreen}
                                uncheckedColor={color.textGreen}
                                checked={!sortValue}
                                onPress={() => setSortValue(false)}
                            />
                            <Text style={{ fontSize: 17, marginLeft: 16, marginTop: 8, fontWeight: 'bold', marginBottom: 30 }}>Khoảng giá trị</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <MultiSlider
                                    values={multiSliderValue}
                                    sliderLength={distance.windowWidth * 0.8 - 32}
                                    onValuesChange={(value) => setMultiSliderValue(value)}
                                    min={0}
                                    max={3000}
                                    step={1}
                                    allowOverlap
                                    snapped
                                    enableLabel={true}
                                    customMarker={() => { return (<View style={{ height: 20, width: 20, borderRadius: 99, backgroundColor: color.textGreen }} />) }}
                                    customLabel={CustomLabel}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.buttonbuy, height: 40, borderRadius: 8, marginRight: 8 }}
                                    onPress={() => {
                                        filterConditions()
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 17 }}>Xác nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.buttonbuy, height: 40, borderRadius: 8, marginLeft: 8 }}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={{ color: 'white', fontSize: 17 }}>Huỷ bỏ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            {searchSelect ? <View style={styles.selectCategory}>
                <SearchInput
                    autoFocus={true}
                    onChangeText={(term) => setSearchTerm(term)}
                    style={{
                        padding: 8,
                        fontSize: 17,
                        width: 300,
                    }}
                    placeholder="Tìm kiếm"
                />
                <TouchableOpacity
                    onPress={() => {
                        setSearchTerm('')
                        setSearchSelect(false)
                    }}
                    style={{ width: 50, borderLeftColor: color.textGreen, borderLeftWidth: 1, height: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Icon
                        name='close'
                        type='antdesign'
                        size={20}
                        color='black'
                    ></Icon>
                </TouchableOpacity>
            </View>
                : <View style={styles.selectCategory}>
                    <Picker
                        selectedValue={pickerValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue == 'Tạo danh mục') {
                                navigation.navigate('CreateCategoryScreen')

                            } else if (itemValue == 'Tất cả mặt hàng') {
                                setPickerValue(itemValue)
                                getAllProduct()
                            } else {
                                filterCategory(itemValue)
                                setPickerValue(itemValue)
                            }
                        }}
                        mode='dropdown'
                    >
                        <Picker.Item label="Tất cả mặt hàng" value="Tất cả mặt hàng" />
                        <Picker.Item label="Tạo danh mục" value="Tạo danh mục" />
                        {props.categoriesData.map((item, index) => {
                            return (
                                <Picker.Item label={item.name} value={item.categoriesId} />
                            )
                        })}
                    </Picker>
                    <TouchableOpacity
                        onPress={() => { setSearchSelect(true) }}
                        style={{ width: 50, borderLeftColor: color.textGreen, borderLeftWidth: 1, height: 50, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Icon
                            name='search1'
                            type='antdesign'
                            size={20}
                            color='black'
                        ></Icon>
                    </TouchableOpacity>
                </View>}
            {/* <Text>{productData[0].name}</Text> */}
            {/* //flash list mặt hàng */}
            <View style={{ flex: 1, paddingLeft: 16, marginTop: 8 }}>
                <FlatList
                    data={filteredName}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { console.log(item.name) }}
                                style={styles.containerFL}>
                                <Image source={{ uri: item.image }} style={styles.imageFL} />
                                <View style={styles.centerFL}>
                                    <Text style={styles.textFL}>{item.name}</Text>
                                    <View style={{ width: '100%', height: '50%', paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[styles.textFL, { color: color.textgray }]}>{item.inventory} trong kho</Text>
                                        <Text style={[styles.textFL, styles.rightFL]}>{currencyFormat(item.price)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const ProductScreen = connect(mapStateToProps, null)(product)