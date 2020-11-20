import firestore from '@react-native-firebase/firestore'


const categories = [{a:'hello'}]
//itemInCart:{product,quantity}
export default function reducer(state = categories, action) {
    let copyState = [...state]
    let result = []
    let productIds = []
    switch (action.type){
        case 'GET_CATEGORIES_DATA':
            try {
                firestore()
                    .collection('Categories')
                    .onSnapshot(documentSnapshot => {
                        for (let data of documentSnapshot.docs) {
                            copyState.push({
                                id: data.id,
                                name: data.data().name,
                                productId: data.data().productId,
                                image: data.data().image
                            })
                        }
                        result = [...copyState]
                        console.log(result)   
                        return result       
                    })         
            } catch (error) {
                console.log(error)
            }
        case 'ADD_CATEGORIES_DATA':

        case 'REMOVE_CATEGORIES_DATA':

        default:
            return state
    }
    

    
    // switch (action.type) {

    //     case "ADD_CATEGORIES":
    //         if  (copyState.length == 0) {
    //             result.push({ product: action.payload, quantity: 1 })
    //         } else {
    //             //Check productId
    //             copyState.map((item, index) => {
    //                 productIds.push(item.product.productId)
    //                 if (item.product.productId === action.payload.productId) {
    //                     copyState[index].quantity++
    //                 }
    //             })
    //             if (productIds.indexOf(action.payload.productId) < 0) {
    //                 copyState.push({ product: action.payload, quantity: 1 })
    //             }
    //             result = [...copyState]
    //         }
    //         console.log(result)
    //         return result
    //     case "REMOVE_PRODUCT_FROM_CART":
    //         //find
    //         copyState.map((item) => {
    //             if (item.product.productId === action.payload.productId) {
    //                 item.quantity--
    //                 if (item.quantity > 0) {
    //                     result.push(item)
    //                 }
    //             }
    //         })
    //         //Check quantity if=0 ->remove from state
    //         return result
    //     default:
    //         return state
    // }
}