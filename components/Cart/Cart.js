import * as React from 'react';

import Box from '@mui/joy/Box';
import OrderList from './OrderList'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import jwt_decode from 'jwt-decode'

import { ViewProductsInCart } from '/public/store/ProductState'
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const dispatch = useDispatch()


    const getCartProduct = async () => {
        const user = window.localStorage.getItem('login-user') == undefined ||
            window.localStorage.getItem('login-user') == ""
            ? null : jwt_decode(window.localStorage.getItem('login-user'))

        const prod = await ViewProductsInCart(user?.username).then(res =>
            res ? res?.map(r => r[0]) : []
        )
        dispatch({
            type: 'cart/get-products',
            payload: prod
        })

    }

    React.useLayoutEffect(() => {

        getCartProduct()


    }, [])

    return (
    <Box
        sx={{ display: "flex", gap: 2 }}
    >
        <Box
            sx={{ display: "flex", flexDirection: 'column', gap: 2, borderRight: '1px dotted'}}
        >
            {
                useSelector(state => state.cart.product)?.map((prod, index) => (
                    <div key={index}>
                        <OrderList cart_product={prod}/>
                    </div>
                ))
            }
        </Box>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                    Toothbrush
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                    $4.50
                    </Typography>
                </Grid>
                </Grid>
                <Typography color="text.secondary" variant="body2">
                Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                just down the hall.
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Typography gutterBottom variant="body1">
                Select type
                </Typography>
                <Stack direction="row" spacing={1}>
                <Chip label="Extra Soft" />
                <Chip color="primary" label="Soft" />
                <Chip label="Medium" />
                <Chip label="Hard" />
                </Stack>
            </Box>
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                <Button>Add to cart</Button>
            </Box>
        </Box>
    </Box>

    )
}