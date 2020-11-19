import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

// import firestore from '@react-native-firebase/firestore'

// import { connect, useDispatch } from 'react-redux'

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { Picker } from '@react-native-picker/picker';
// import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Input } from "react-native-elements"
import { color } from "../../theme"







const createProduct = () => {
    //state
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [pickerValue, setPickerValue] = useState('Không danh mục')
    //action
    const back = () => {
        console.log('back')
    }

    const selectFileImage = () => {

    }

    const selectUrlImage = () => {

    }


    //render
    const listPicker = () => {

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    //back
                    onPress={() => back()}
                >
                    <Icon
                        name='arrowleft'
                        type='antdesign'
                        size={20}
                        color='white'
                    ></Icon>
                </TouchableOpacity>
                <Text style={[styles.textHearder, { fontSize: 22, fontWeight: 'bold' }]}>Tạo mặt hàng</Text>
                <TouchableOpacity
                //save
                >
                    <Text style={styles.textHearder} >Lưu</Text>
                </TouchableOpacity>
            </View>

            {/* infor */}
            <View style={styles.infor}>
                <Text style={styles.textInfor}>Tên mặt hàng</Text>
                <Input
                    value={nameProduct}
                    onChangeText={setNameProduct}
                    containerStyle={styles.input}
                ></Input>
                <Text style={styles.textInfor}>Danh mục</Text>
                <Picker
                    selectedValue={pickerValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setPickerValue(itemValue)
                    }
                    mode='dropdown'

                >
                    <Picker.Item label="Không danh mục" value="Không danh mục" />
                    <Picker.Item onPress={()=>{console.log('ok')}} label="Tạo danh mục" value="Tạo danh mục" />
                </Picker>
                <Text style={styles.textInfor}>Giá</Text>
                <Input
                    keyboardType='number-pad'
                    value={price}
                    onChangeText={setPrice}
                    containerStyle={styles.input}
                ></Input>
                <Text style={styles.textInfor}>Số lượng</Text>
                <Input
                    keyboardType='number-pad'
                    value={inventory}
                    onChangeText={setInventory}
                    containerStyle={styles.input}
                    errorStyle={{ color: 'red' }}
                    errorMessage={nameProduct}
                ></Input>
                <Text style={styles.textInfor}>Hình ảnh</Text>
                <View style={styles.image}>

                    <Image style={styles.imageProduct}></Image>

                    <View style={styles.imageStyle}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}
                            onPress={() => selectFileImage()}
                        >
                            <Icon
                                style={styles.icon}
                                name='folder-images'
                                type='entypo'
                                size={20}
                                color={color.icon}
                            ></Icon>
                            <Text style={[styles.textInfor, { color: color.gray100 }]}>Chọn hình ảnh</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={() => selectUrlImage()}
                        >
                            <Icon
                                style={styles.icon}
                                name='link'
                                type='entypo'
                                size={20}
                                color={color.icon}
                            ></Icon>
                            <Text style={[styles.textInfor, { color: color.gray100 }]}>Chọn đường link</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </ScrollView>
    )
}

export default createProduct