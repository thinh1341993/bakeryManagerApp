import React, { useState, useEffect } from "react"
import styles from "./styles"
import { View, TouchableOpacity, ScrollView, Text, Image, Modal, } from "react-native"
import { Icon, Input } from "react-native-elements"
import ImagePicker from 'react-native-image-picker';
import { color, distance, fontSize, typography } from "../../theme"

export default selectImage = (imageProduct,setImageProduct) => {
    const [selectImageType, setSelectImageType] = useState(true)
    
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

            {/* category color */}
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
                    setImageProduct({ uri: 'https://lh3.googleusercontent.com/proxy/ar5dPo0PNzR2JeCeNRTOZY0TQYmQlgubm4TJtAqq-XGMCh9OD1I62YUBT1vTfjZXS7uJznv_rNg' })
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
        </View>
    )
}