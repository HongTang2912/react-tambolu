import { ViewProductsInCart } from '/public/store/ProductState'
import jwt_decode from 'jwt-decode'

const initialState = {
    product: [],
}



const cartProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'cart/add-product': {
            return {
                product: [...state.product, action.payload]
            }
        }
        case 'cart/get-products': {
            return {
                product: action.payload
            }
        }
        default: return state;
    }
}

export default cartProductReducer;