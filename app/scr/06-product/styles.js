import { StyleSheet } from "react-native"
import { color, distance, fontSize, typography } from "../../theme"

const styles = StyleSheet.create({

    header: {
        backgroundColor: color.main,
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textHeader: {
        color: 'white',
        fontSize: 18,
    },
    actionHeader: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    selectCategory: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingLeft: 8,
        justifyContent: 'space-between',

        alignItems: 'center',
        borderBottomColor: color.textGreen,
        borderBottomWidth: 1
    },
    picker: {
        flex: 1,
        paddingHorizontal: 0,
    },
    containerFL: {
        flexDirection: 'row',
        height: 70,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageFL: {
        height: 60,
        width: 60,

        borderRadius: 8
    },
    centerFL: {
        flex: 1,
        height: '100%',
        borderBottomColor: color.textGreen,
        borderBottomWidth: 1,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textFL: {
        fontSize: 17,
        textAlignVertical: 'center',
    },
    rightFL: {
        height: 50,
        textAlign: 'right',

    }
})

export default styles