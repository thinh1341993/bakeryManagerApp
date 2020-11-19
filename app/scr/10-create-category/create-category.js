import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import firestore from '@react-native-firebase/firestore'

// import { connect, useDispatch } from 'react-redux'

import { View, TouchableOpacity, ScrollView, Text, Image } from "react-native"

import { Icon, Input } from "react-native-elements"
import { color, distance, fontSize, typography } from "../../theme"

import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Image',
};

const createCategory = () => {
    //state
    const [nameCategory, setNameCategory] = useState('')
    const [imageProduct, setImageProduct] = useState({ uri: 'https://i.ebayimg.com/images/g/COYAAOSwrANco-hM/s-l640.jpg' })

    const [colorCategory, setColorCategory] = useState('')
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




            }
        });
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
                <Text style={[styles.textHeader, { fontSize: 22, fontWeight: 'bold' }]}>Tạo danh mục</Text>
                <TouchableOpacity
                //save
                >
                    <Text style={styles.textHeader} >Lưu</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infor} >
                {/* name category */}
                <Text style={styles.textInfor}>Tên danh mục</Text>
                <Input
                    value={nameCategory}
                    onChangeText={setNameCategory}
                    containerStyle={styles.input}
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

                <View style={styles.shadow}></View>

                <Text style={styles.textInfor}>Hoặc màu danh mục</Text>
                <View style={styles.colorCategory}>

                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://i.ebayimg.com/images/g/COYAAOSwrANco-hM/s-l640.jpg' })} style={[styles.pickColorCategory, { backgroundColor: '#595D5C' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://offtheloom.co.uk/wp-content/uploads/2019/10/red-vv.jpg' })} style={[styles.pickColorCategory, { backgroundColor: '#F22500' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://images-na.ssl-images-amazon.com/images/I/211E1T8DoAL._AC_SY450_.jpg' })} style={[styles.pickColorCategory, { backgroundColor: '#EE88B0' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://lh3.googleusercontent.com/proxy/ar5dPo0PNzR2JeCeNRTOZY0TQYmQlgubm4TJtAqq-XGMCh9OD1I62YUBT1vTfjZXS7uJznv_rNg' })} style={[styles.pickColorCategory, { backgroundColor: '#EAAE00' }]}></TouchableOpacity>

                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://images-na.ssl-images-amazon.com/images/I/11C7MTeYlOL.jpg' })} style={[styles.pickColorCategory, { backgroundColor: 'chartreuse' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://www.schemecolor.com/wallpaper?i=1227&desktop' })} style={[styles.pickColorCategory, { backgroundColor: '#00B900' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://static.wikia.nocookie.net/p__/images/4/4b/Solid_blue.svg.png/revision/latest?cb=20160330012046&path-prefix=protagonist' })} style={[styles.pickColorCategory, { backgroundColor: 'blue' }]}></TouchableOpacity>
                    <TouchableOpacity onPress={() => setImageProduct({ uri: 'https://artsyfartsylife.com/wp-content/uploads/2019/09/normal-purple-color-200x200.jpg' })} style={[styles.pickColorCategory, { backgroundColor: 'purple' }]}></TouchableOpacity>

                </View>
                <View>

                </View>

            </View>
        </ScrollView>

    )
}

export default createCategory