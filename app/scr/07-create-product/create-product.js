import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

// import firestore from '@react-native-firebase/firestore'

// import { connect, useDispatch } from 'react-redux'

import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { color, distance, fontSize, typography } from "../../theme"
// import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Input } from "react-native-elements"

import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Image',
  };



const createProduct = () => {
    //state
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [pickerValue, setPickerValue] = useState('Không danh mục')
    const [imageProduct, setImageProduct] = useState('')
    const [linkImage, setLinkImage] = useState('')
    const [selectImage, setSelectImage] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    
    //action
    const back = () => {
        console.log('back')
    }

    const selectFileImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
              setImageProduct(source)
              setSelectImage(true)
              
              console.log(source)
            //   this.setState({
            //     avatarSource: source,
            //   });
            }
          });
    }

    const selectCameraImage = () => {
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
              setImageProduct(source)
              setSelectImage(true)
              
              console.log(source)
            //   this.setState({
            //     avatarSource: source,
            //   });
            }
          });
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
                <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Tạo mặt hàng</Text>
                <TouchableOpacity
                //save
                >
                    <Text style={styles.textHeader} >Lưu</Text>
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
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue == 'Tạo danh mục') {
                            console.log('Tạo danh mục')
                        } else if (itemValue == 'Không danh mục') {
                            setPickerValue('')
                            console.log(pickerValue)
                        } else {
                            setPickerValue(itemValue)
                            console.log(pickerValue)
                        }
                    }}
                    mode='dropdown'

                >
                    <Picker.Item label="Không danh mục" value="Không danh mục" />
                    <Picker.Item label="Tạo danh mục" value="Tạo danh mục" />
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
                <Text style={styles.textInfor}>Chọn hình ảnh</Text>
                <View style={styles.image}>

                    <Image 
                    resizeMode='cover'
                    source={
                        selectImage ? imageProduct : require('../../images/backgroundImage.jpg')
                    } style={styles.imageProduct}></Image>

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
                            <Text style={[styles.textInfor, { color: color.gray100 }]}>Chọn ảnh từ thư viện</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={() => selectCameraImage()}
                        >
                            <Icon
                                style={styles.icon}
                                name='camera'
                                type='entypo'
                                size={20}
                                color={color.icon}
                            ></Icon>
                            <Text style={[styles.textInfor, { color: color.gray100 }]}>Chụp ảnh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </ScrollView >
    )
}

export default createProduct