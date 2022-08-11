import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Styles from './Intro.module.css'
import styled from 'styled-components';
import Link from 'next/link'
import jwt_decode from "jwt-decode"

export default function Intro() {

    const [user, setUser] = React.useState(null)

    const getValue = () => {
        return window.localStorage.getItem('login-user') == undefined || window.localStorage.getItem('login-user')  == ""
        ? null : jwt_decode(window.localStorage.getItem('login-user'))
    }

    const removeUser = () => {
        window.localStorage.setItem('login-user' ,"")
    }

    React.useEffect(() => {
        setUser(getValue())
    },[])
    
    return (
        <div className={Styles.container}>
            <div className={Styles.intro}>
                <div id="item-1" className={Styles.info}>
                    Hotline: <mark className={`${Styles.highlight_text}`}>(+84) 938151701</mark>
                </div> 
    
                <div id="item-2" className={Styles.info}>
                    Địa chỉ: <mark className={`${Styles.highlight_text}`}>73/5E Văn Thân P8 Q6 TPHCM</mark>
                </div> 
    
                <div id="item-3" className={Styles.authenticate_field}>
                    <Stack direction="row" spacing={2}>
                        {
                            user == null ?
                            <Button>
                                <Link href="/login">Đăng nhập</Link>
                            </Button>
                            :
                            <>

                                <Button className={`text-black`}>
                                    Hello {user.username}
                                </Button>
                                <Button onClick={() => {removeUser()}}>
                                    <Link href="/login">Đăng xuất</Link>
                                </Button>
                            </>
                        }

                        <Button variant="contained" className={`text-black ${Styles.authenticate_button}`}>
                            <Link href="/register">Đăng ký</Link> 
                        </Button>
                       
                    </Stack>
                </div> 
            </div>
        </div>
    )
}
