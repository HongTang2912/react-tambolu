import * as React from 'react';
import Box from '@mui/joy/Box';
import OrderList from './OrderList'
import { ViewProductsInCart } from '/public/store/ProductState'
import jwt_decode from 'jwt-decode'

export default function Cart() {

    const [cartProducts, setCartProducts] = React.useState([])

    React.useLayoutEffect(() => {
        const user = window.localStorage.getItem('login-user') == undefined 
        || window.localStorage.getItem('login-user')  == ""
        ? null : jwt_decode(window.localStorage.getItem('login-user'))

        ViewProductsInCart(user.username).then((res) => {
            
           if (res) setCartProducts([...res?.map(r => r[0])])
        })
    },[])

    return(
        <Box
            sx={{ display: "flex", flexDirection: 'column', gap: 2 }}
        >
            {console.log(cartProducts)}
            {
                cartProducts.map((prod, index) => (
                    <div key={index}>
                        <OrderList cart_product={prod}/>
                    </div>
                ))
            }
        </Box>

    )
}