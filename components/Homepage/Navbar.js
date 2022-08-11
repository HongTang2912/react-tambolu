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
import { ViewProductsInCart } from '/public/store/ProductState'

const options = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

export default function Navbar() {
  const [username, setUsername] = React.useState(null)
  const [cartProducts, setCartProducts] = React.useState([])
  const [logoSize, setLogoSize] = React.useState({
    width: 100,
    height: 100,
  });

  const getUsername = () => {
    return window.localStorage.getItem('login-user') == undefined || window.localStorage.getItem('login-user') == ""
      ? null : jwt_decode(window.localStorage.getItem('login-user'))
  }


  React.useLayoutEffect(() => {

    ViewProductsInCart(getUsername()?.username).then((res) => {
        if (res) setCartProducts([...res?.map(r => r[0])])
    })
    setUsername(getUsername()?.username)
  },[])

  
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
                <TextField {...params} label="Sản phẩm" />
              )}
            />
            <Button variant="outlined" disabled>
              Tìm kiếm
            </Button>
          </Stack>
        </div>

        <div className={Styles.item_3} id="item-3">
          <a href={`/cart/${username ? username : ''}`}>
            <FaCartArrowDown className={`${Styles.icon} ${Styles.cart_icon}`} />
            <span className={Styles.badge}>{cartProducts.length}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
