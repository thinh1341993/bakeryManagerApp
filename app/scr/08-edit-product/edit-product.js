import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { connect, useDispatch } from 'react-redux'

import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { color, distance, fontSize, typography } from "../../theme"
// import ModalDropdown from 'react-native-modal-dropdown';
import { Icon, Input } from "react-native-elements"

import ImagePicker from 'react-native-image-picker';

import TextInputMask from 'react-native-text-input-mask';
import CurrencyInput from 'react-native-currency-input';
const options = {
    title: 'Select Image',
};

const editProduct = (props) => {
    console.log(props.route.params)
    //state
    const [nameProduct, setNameProduct] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [pickerValue, setPickerValue] = useState(props.route.params.categoriesId)
    const [imageProduct, setImageProduct] = useState({})
    const [selectImageType, setSelectImageType] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [indexCategory, setIndexCategory] = useState(0)
    const navigation = useNavigation()

    useEffect(() => {
        setNameProduct(props.route.params.name)
        setDescription(props.route.params.description)
        setPrice(props.route.params.price)
        setInventory(props.route.params.inventory)
        setPickerValue(props.route.params.categoriesId)
        setImageProduct({ uri: props.route.params.image })
    }, [props.route.params])
    console.log('pickerValue', pickerValue)
    console.log('route', props.route.params.categoriesId)

    //action
    const back = () => {
        navigation.navigate('ProductScreen')
    }


    const save = async () => {

        if (nameProduct == '') {
            setErrorMessage('Bạn chưa nhập thông tin')
        } else {
            setModalVisible(true)
            try {
                if (selectImageType) {


                    if (pickerValue !== props.route.params.categoriesId) {
                        if (pickerValue == "Không danh mục") {
                            let totalProps = props.categoriesData[props.categoriesData.findIndex((item) => { return item.categoriesId == props.route.params.categoriesId })].total
                            await firestore().collection('Categories').doc(props.route.params.categoriesId).update({
                                total: --totalProps,
                            })
                        } else if (props.route.params.categoriesId == "Không danh mục") {
                            let totalPickerValue = props.categoriesData[props.categoriesData.findIndex((item) => { return item.categoriesId == pickerValue })].total
                            console.log(totalPickerValue)
                            await firestore().collection('Categories').doc(pickerValue).update({
                                total: ++totalPickerValue,
                            })
                        } else {
                            await firestore().collection('Categories').doc(props.route.params.categoriesId).update({
                                total: --props.categoriesData[props.categoriesData.findIndex((item) => { return item.categoriesId == props.route.params.categoriesId })].total,
                            })
                            await firestore().collection('Categories').doc(pickerValue).update({
                                total: ++props.categoriesData[props.categoriesData.findIndex((item) => { return item.categoriesId == pickerValue })].total,
                            })
                        }
                    }

                    await firestore()
                        .collection('Products')
                        .doc(props.route.params.id)
                        .update({
                            name: nameProduct.trim(),
                            price: price,
                            inventory: inventory,
                            categoriesId: pickerValue,
                            description: description.trim(),
                            image: imageProduct.uri,
                        })
                        .then(() => {
                            setModalVisible(false)
                            navigation.navigate('ProductScreen')
                            console.log('User update!');
                        });

                    setModalVisible(false)

                } else {


                    await storage()
                        .ref(`Image/products/${nameProduct}`)
                        .putFile(imageProduct.uri)
                        .then(async () => {

                            const url = await storage().ref(`Image/products/${nameProduct}`).getDownloadURL()

                            await firestore()
                                .collection('Products')
                                .doc(props.route.params.id)
                                .update({
                                    name: nameProduct.trim(),
                                    price: price,
                                    inventory: inventory,
                                    categoriesId: pickerValue,
                                    description: description.trim(),
                                    image: imageProduct.uri,
                                })
                                .then(() => {
                                    setModalVisible(false)
                                    navigation.navigate('ProductScreen')
                                    console.log('User update!');
                                });

                        }
                        )

                }
            } catch (error) {
                console.log(error)
            }
            setModalVisible(false)
        }
    }

    const deleteProduct = async () => {
        setModalVisible(true)
        try {
            await firestore()
                .collection('Products')
                .doc(props.route.params.id)
                .delete()
            await firestore().collection('Categories').doc(pickerValue).update({
                total: --props.categoriesData[props.categoriesData.findIndex((item) => { return item.categoriesId == pickerValue })].total,
            })
            setModalVisible(false)
            navigation.navigate('ProductScreen')
        } catch (error) {
            setModalVisible(false)
            console.log(error)
        }
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
                setImageProduct(source)
                setSelectImageType(false)

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
                setSelectImageType(false)

                console.log(source)
                //   this.setState({
                //     avatarSource: source,
                //   });
            }
        });
    }


    //render


    return (
        <View style={styles.container}>
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
                <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Chỉnh sửa mặt hàng</Text>
                <TouchableOpacity
                    //save
                    onPress={() => {
                        save()
                    }}
                >
                    <Text style={styles.textHeader} >Lưu</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(85, 85, 85, 0.55)', justifyContent: 'center', alignItems: 'center' }}>
                        <ProgressBar styleAttr='Large' color="#2196F3" />
                    </View>
                </Modal>


                {/* infor */}
                <View style={styles.infor}>
                    <Text style={[styles.textInfor, { marginTop: 16 }]}>Tên mặt hàng</Text>
                    <Input
                        inputStyle={{ fontSize: 17, paddingHorizontal: 0, }}
                        inputContainerStyle={{ borderBottomColor: color.textGreen }}
                        value={nameProduct}
                        onChangeText={(text) => setNameProduct(text)}
                        containerStyle={styles.input}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errorMessage}
                    ></Input>
                    <Text style={styles.textInfor}>Danh mục</Text>
                    <Picker
                        selectedValue={pickerValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue == 'Không danh mục') {
                                setPickerValue(itemValue)
                            } else {
                                setPickerValue(itemValue)
                            }

                        }}
                        mode='dropdown'
                    >
                        <Picker.Item key="Không danh mục" label="Không danh mục" value="Không danh mục" />
                        {props.categoriesData.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.name} value={item.categoriesId} />
                            )
                        })}
                    </Picker>

                    <Text style={styles.textInfor}>Giá</Text>
                    <CurrencyInput
                        placeholder='0'
                        value={price}
                        onChangeValue={setPrice}
                        ignoreNegative={true}
                        unit=""
                        maxValue={999999999}
                        delimiter=","
                        separator="."
                        precision={0}

                        style={styles.inputMask}
                    />


                    <Text style={styles.textInfor}>Số lượng</Text>
                    <CurrencyInput
                        placeholder='0'
                        value={inventory}
                        onChangeValue={(extracted) => setInventory(extracted)}
                        ignoreNegative={true}
                        unit=""
                        maxValue={999}
                        delimiter=","
                        separator="."
                        precision={0}
                        style={styles.inputMask}
                    ></CurrencyInput>

                    <Text style={styles.textInfor}>Mô tả</Text>

                    <Input
                        inputStyle={{ alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', fontSize: 17, paddingHorizontal: 0, alignSelf: 'flex-start', }}
                        inputContainerStyle={{ borderColor: color.textGreen, borderWidth: 2, borderTopWidth: 1 }}
                        containerStyle={[styles.input, { marginTop: 10 }]}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        multiline={true}

                    ></Input>

                    {/* category image */}
                    <Text style={styles.textInfor}>Chọn hình ảnh</Text>
                    <View style={styles.image}>

                        <Image
                            resizeMode='cover'
                            source={imageProduct} style={styles.imageProduct}></Image>

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
                    </View >

                    {/* <View style={styles.shadow}></View> */}

                    <Text style={styles.textInfor}>Hoặc màu danh mục</Text>
                    <View style={styles.colorCategory}>

                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://i.ebayimg.com/images/g/COYAAOSwrANco-hM/s-l640.jpg' })
                        }} style={[styles.pickColorCategory, { backgroundColor: '#595D5C' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://offtheloom.co.uk/wp-content/uploads/2019/10/red-vv.jpg' })
                        }} style={[styles.pickColorCategory, { backgroundColor: '#F22500' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://images-na.ssl-images-amazon.com/images/I/211E1T8DoAL._AC_SY450_.jpg' })
                        }} style={[styles.pickColorCategory, { backgroundColor: '#EE88B0' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://www.htmlcsscolor.com/preview/gallery/FFA500.png' })
                        }} style={[styles.pickColorCategory, { backgroundColor: '#EAAE00' }]}></TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://images-na.ssl-images-amazon.com/images/I/11C7MTeYlOL.jpg' })
                        }} style={[styles.pickColorCategory, { backgroundColor: 'chartreuse' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://www.schemecolor.com/wallpaper?i=1227&desktop' })
                        }} style={[styles.pickColorCategory, { backgroundColor: '#00B900' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://static.wikia.nocookie.net/p__/images/4/4b/Solid_blue.svg.png/revision/latest?cb=20160330012046&path-prefix=protagonist' })
                        }} style={[styles.pickColorCategory, { backgroundColor: 'blue' }]}></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectImageType(true)
                            setImageProduct({ uri: 'https://artsyfartsylife.com/wp-content/uploads/2019/09/normal-purple-color-200x200.jpg' })
                        }} style={[styles.pickColorCategory, { backgroundColor: 'purple' }]}></TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{ height: 50, backgroundColor: color.buttonbuy, borderRadius: 8, justifyContent: 'center', alignContent: 'center', marginBottom: 40, }}
                        onPress={() => { deleteProduct() }}
                    >
                        <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>Xoá mặt hàng</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView >
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const EditProductScreen = connect(mapStateToProps, null)(editProduct)