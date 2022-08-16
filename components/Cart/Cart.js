import * as React from 'react';

import Box from '@mui/joy/Box';
import OrderList from './OrderList'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Styles from './Cart.module.css'

import jwt_decode from 'jwt-decode'
import { ViewProductsInCart, getQueryById } from '/public/store/ProductState'
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const dispatch = useDispatch()
    const username = useSelector(state => state?.user?.user?.username)

    const getCartProduct = async (username) => {
       
        let prod;
        if (username != null && username !=undefined){
            prod = await ViewProductsInCart(username).then(res =>
                res ? res?.map(r => r[0]) : []
            )
        }
        else {
            const cart = JSON.parse(window.localStorage.getItem('cart-products')) ?? []

            prod = []
            for (let i = 0; i < cart.length; i++) {
                prod.push({
                    products: await getQueryById(cart[i].products).then(res => res), 
                    quantity: {
                        quantity: {
                            low: cart[i].quantity
                        }
                    }
                })
            }
        }
        dispatch({
            type: 'cart/get-products',
            payload: prod
        })

         dispatch({
            type: 'lg',
            payload: prod
        })

    }

    React.useLayoutEffect(() => {
        
        getCartProduct(username)


    }, [])

    return (

    <Box
        className={`flex-col md:flex-row md:items-start items-center`}
        sx={{ display: "flex", gap: 2 }}
    >
        <Box
            className={`${Styles["max-width-auto"]} max-w-screen-sm px-1`}
            sx={{ display: "flex", flexDirection: 'column', gap: 2 }}
        >
            {
                useSelector(state => state.cart.product)?.map((prod, index) => (
                    <div key={index}>
                        <OrderList cart_product={prod} />
                    </div>
                ))
            }
                {
                useSelector(state => state.cart.product)?.map((prod, index) => (
                    console.log(prod)
                ))
            }
        </Box>
        <Box 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            className={`border-right border-dotted border-4 sticky top-0`}
        >

            
            <Box 
                sx={{ my: 3, mx: 2 }}
            >
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                            Đơn giá:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                        {
                            useSelector(state => state.cart.product)?
                            .reduce((sum, i) => 
                                sum + i?.products?.price?.slice(0, -1) * i?.quantity?.quantity?.low, 0)
                        }đ
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                            Phí ship:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                        15.000đ
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4" component="div">
                            Tổng tiền:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div" className={`text-orange-500 font-bold`}>
                        {
                            useSelector(state => state.cart.product)?
                            .reduce((sum, i) => 
                                sum + i?.products?.price?.slice(0, -1) * i?.quantity?.quantity?.low, 0)
                            +
                            15000
                        }đ
                        </Typography>
                    </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                    Sau khi thanh toán, sản phẩm sẽ được giao trong vòng 2,3 ngày sau khi đặt hàng
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Typography gutterBottom variant="body1">
                    Chọn phương thức thanh toán
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip label="Momo" />
                    <Chip color="primary" label="ZaloPay" />
                    <Chip label="Nhận tiền khi giao hàng" />
                </Stack>
            </Box>
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                <Button>Thông tin đặt hàng</Button>
            </Box>
        </Box>
    </Box>

    )
}