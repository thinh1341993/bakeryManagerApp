import { StyleSheet } from "react-native"
import { color, distance, fontSize, typography } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: color.main,
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textHearder: {
        color: 'white',
    },
    infor: {
        paddingHorizontal: 16,
    },
    textInfor: {
        fontSize: 17,
        color: color.textgray
    },
    input: {
        marginHorizontal: 0,
        paddingHorizontal: 0,
    },
    picker: {
        height: 50,

        color: 'black',

    },
    image: {
        height: 100,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
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

    }
})

export default styles