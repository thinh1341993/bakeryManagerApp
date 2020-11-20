import { StyleSheet } from "react-native"
import { color, distance, fontSize, typography } from "../../theme"

const styles = StyleSheet.create({
    textInfor: {
        fontSize: 17,
        color: color.textgray
    },
    colorCategory: {
        marginTop: 10,
        padding: 2,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 40,
        justifyContent: 'space-between'
    },
    pickColorCategory: {
        height: distance.windowWidth * 0.16,
        width: distance.windowWidth * 0.16,
        margin: 5,
        borderRadius: 8,
        backgroundColor: 'black'
    },
    image: {
        height: 100,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 15,
    },
    imageProduct: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: color.textgray
    },
    imageStyle: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 30,

    },
    icon: {
        marginRight: 10,

    },
    
})

export default styles