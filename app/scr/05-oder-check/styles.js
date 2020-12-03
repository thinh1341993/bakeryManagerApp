import { StyleSheet } from "react-native"
import { color, distance, fontSize, typography } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textDonhang: {
        marginTop: 16,
        marginLeft: 16,
        fontFamily: 'SegoeUI-Bold',
        fontSize: 34,
        textAlign: 'left',
        lineHeight: 41,
        fontWeight: 'bold',
        color: 'black'
    },
    loc: {
        marginTop: 8,
        flexDirection: 'row',
        height: 44,
    },
    dangxuly: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#DAD9DD',
        borderBottomColor: '#DAD9DD',
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 999
    },
    textLoc: {
        marginLeft: 8,
        fontFamily: 'SegoeUI-Regular',
        fontSize: 15,
        textAlign: 'left',
        lineHeight: 20,
        color: `rgb(102,102,102)`
    },
    madon: {
        fontFamily: 'SegoeUI-Regular',
        fontSize: 17,
        textAlign: 'left',
        lineHeight: 22,
        color: 'black'
    },
    time: {
        fontFamily: 'SegoeUI-Regular',
        fontSize: 13,
        textAlign: 'left',
        lineHeight: 16,
        color: `rgb(102, 102, 102)`
    },
    vanchuyen: {
        fontFamily: 'SegoeUI-Regular',
        fontSize: 13,
        textAlign: 'left',
        lineHeight: 18,
        color: `rgb(138, 138, 143)`
    },
    listDot: {
        width: 32,
        alignItems: 'flex-end',
        paddingTop: 18,
        paddingRight: 8,
    },
    listDonHang: {
        justifyContent: 'center',
        width: 129,
        flex: 1,
        borderBottomColor: '#DAD9DD',
        borderBottomWidth: 1
    },
    listAnh: {
        justifyContent: 'center',
        width: 38,
        height: 38,
        marginLeft:4,
        alignItems: 'flex-end'
    },
    anh: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        borderBottomColor: '#DAD9DD',
        borderBottomWidth: 1,
        paddingRight: 16
    },
    image: {
        width: 38,
        height: 38,
        borderRadius: 8
    }
})

export default styles