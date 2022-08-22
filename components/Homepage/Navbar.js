import React from "react";
import Styles from "./Navbar.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FaCartArrowDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TamboluLogo from "../Logo/Tambolu";
import jwt_decode from 'jwt-decode'
import { ViewProductsInCart, getQueryById, readDataBySearch } from '/public/store/ProductState'
import { useDispatch, useSelector } from 'react-redux';

const options = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

export default function Navbar() {
  const dispatch = useDispatch()
  const username = useSelector(state => state?.user?.user?.username)
  const [searchValue, setSearchValue] = React.useState("")

  const [logoSize, setLogoSize] = React.useState({
    width: 100,
    height: 100,
  });

  const handleSearchValue = async(string) => [
    dispatch({
      type: "paginate/goto-search",
      payload: string
    })
  ]

  const getCartProduct = async() => {
       
      if (username){
        const prod = await ViewProductsInCart(username).then(res => 
            res ? res?.map(r => r[0]) : []
        )
        dispatch({
            type: 'cart/get-products',
            payload: prod
        })
        
      }
      else {
          const cart = JSON.parse(window.localStorage.getItem('cart-products')) ?? []

          let prods = []
          for (let i = 0; i < cart.length; i++) {
              prods.push({
                  products: await getQueryById(cart[i].products).then(res => res), 
                  quantity: {
                      quantity: {
                          low: cart[i].quantity
                      }
                  }
              })
          }
          dispatch({
              type: 'cart/get-products',
              payload: prods
          })
      }
    }

  React.useLayoutEffect(() => {
    getCartProduct()
    console.log(username)
  }, [username])

  
  return (
    <div className={Styles.container}>
      <div className={`bg-white ${Styles.navbar} flex flex-col container:flex-row`}>
        <Link href="/">
          <div id="item-1" className="hidden container:block">
            <TamboluLogo width={logoSize.width} height={logoSize.height} />
          </div>
        </Link>

        <div id="item-2">
          <Stack direction="row" spacing={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Sản phẩm" 
                onChange={(e) => {setSearchValue(e.target.value)}}/>
              )}
            />
            <Button variant="outlined" disabled={false} onClick={() => handleSearchValue(searchValue)}>
              Tìm kiếm
            </Button>
          </Stack>
        </div>

        <div className={Styles.item_3} id="item-3">
          <a href={`/cart`}>
            <FaCartArrowDown className={`${Styles.icon} ${Styles.cart_icon}`} />
            <span className={Styles.badge}>{useSelector(state => state.cart.product.length)}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
