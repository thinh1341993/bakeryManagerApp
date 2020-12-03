import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';


import { connect } from 'react-redux'

import { View, TouchableOpacity, ScrollView, Text, Image, Modal, } from "react-native"
import { ProgressBar } from '@react-native-community/progress-bar-android';

import { Icon, Input } from "react-native-elements"
import { color } from "../../theme"

import ImagePicker from 'react-native-image-picker';



const options = {
    title: 'Select Image',
};


const editCategories = (props) => {

    const navigation = useNavigation()
    //state
    const [nameCategory, setNameCategory] = useState('')
    const [imageProduct, setImageProduct] = useState({})
    const [selectImageType, setSelectImageType] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [categoriesId, setCategoriesId] = useState('')
console.log(props.route.params.categoriesId)
    //test
    const onResult = (QuerySnapshot) => {
        console.log('Got Users collection result.');
    }

    const onError = (error) => {
        console.log(error);
    }


    useEffect(() => {
        setNameCategory(props.route.params.name)
        setImageProduct({ uri: props.route.params.image })
        setCategoriesId(props.route.params.categoriesId)
    }, [props.route.params]);

    //action
    const back = () => {
        navigation.navigate('CategoriesScreen')
    }

    const save = async () => {

        setModalVisible(true)
        try {
            if (selectImageType) {
                await firestore()
                    .collection('Categories')
                    .doc(categoriesId)
                    .update({
                        name: nameCategory.trim(),
                        image: imageProduct.uri,
                    })
                    .then(() => {
                        console.log('User update!');
                    });
                setModalVisible(false)
                navigation.navigate('CategoriesScreen')
            } else {
                await storage()
                    .ref(`Image/categories/${nameCategory}`)
                    .putFile(imageProduct.uri)
                    .then(async () => {
                        const url = await storage().ref(`Image/categories/${nameCategory}`).getDownloadURL()
                        await firestore()
                            .collection('Categories')
                            .doc(categoriesId)
                            .update({
                                name: nameCategory.trim(),
                                image: imageProduct.uri,
                            })
                            .then(() => {
                                console.log('User update!');
                            });
                        setModalVisible(false)
                        navigation.navigate('CategoriesScreen')
                    }
                    )
            }

        } catch (error) {
            console.log(error)
        }
        setModalVisible(false)
    }

    const deleteCategory = async () => {
        setModalVisible(true)
        try {
            await firestore().collection('Products')
                .where('categoriesId', '==', categoriesId)
                .get()
                .then(async (querySnapshot) => {
                    for (let data of querySnapshot.docs) {
                        await firestore().collection('Products')
                            .doc(data.id)
                            .update({
                                categoriesId: 'Không danh mục'
                            })
                    }
                }
                )
            await firestore()
                .collection('Categories')
                .doc(props.route.params.categoriesId)
                .delete()
                .then(async () => {
                    setModalVisible(false)
                    navigation.navigate('CategoriesScreen')
                    console.log('User deleted!');
                });
        } catch (error) {
            console.log(error)
        }
        setModalVisible(false)
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
                setSelectImageType(false)
                console.log(source);
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
            }
        });
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.actionHeader}
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
                <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Chỉnh sửa danh mục</Text>
                <TouchableOpacity style={styles.actionHeader}
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
                    <View style={{ flex: 1, backgroundColor: 'rgba(200,200,200,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <ProgressBar styleAttr='Large' color="#2196F3" />
                    </View>
                </Modal>



                <View style={styles.infor} >
                    {/* name category */}
                    <Text style={styles.textInfor}>Tên danh mục</Text>
                    <Input
                        value={nameCategory}
                        onChangeText={setNameCategory}
                        containerStyle={styles.input}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errorMessage}
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
                    <TouchableOpacity
                        onPress={() => deleteCategory()}
                        style={{ marginBottom: 40, backgroundColor: color.buttonbuy, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, color: 'white' }}>Xoá</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => ({
    categoriesData: state.categories,
})

export const EditCategoriesScreen = connect(mapStateToProps, null)(editCategories)