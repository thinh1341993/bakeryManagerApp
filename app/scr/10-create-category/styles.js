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
    actionHeader: {

        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textHeader: {

        color: 'white',
        fontSize: 18
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    shadow: {
        backgroundColor: color.offWhite,
        height: 1,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 15
    }
})

export default styles