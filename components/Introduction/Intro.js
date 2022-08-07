import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Styles from './Intro.module.css'
import styled from 'styled-components';
import Link from 'next/link'


export default function Intro() {
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
                        <Button>
                            <Link href="/login">Đăng nhập</Link>
                        </Button>
                        <Button variant="contained" className={`text-black ${Styles.authenticate_button}`}>
                            Đăng ký
                        </Button>
                       
                    </Stack>
                </div> 
            </div>
        </div>
    )
}
