import firestore from '@react-native-firebase/firestore'


const categories = {}

export default function reducer(state = categories, action) {  
    
    switch (action.type){
        case 'GET_CATEGORIES_DATA':
            state= action.payload
            return state

        default:
            return categories
    }
}