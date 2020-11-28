import { StyleSheet } from "react-native"
import { color, distance, fontSize, typography } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent:'center',

    },
    image: {
        height: 50,
        width: 50,
        backgroundColor: color.textgray,
        borderRadius: 8
    },
    text: {
        fontSize: 17,
        textAlignVertical: 'center',
    },
    center: {
        flex: 1,
        height:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor:color.textGreen,
        borderBottomWidth:1,
        marginLeft:8,

        alignItems:'center'
    },
    right: {
        height: 50,
        textAlign: 'right',

    }

})

export default styles