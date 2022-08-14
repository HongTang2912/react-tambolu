import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Styles from './IntroduceInfo.module.css'
import styled from 'styled-components';


export default function Intro() {

    
    return (
        <div className={Styles.container}>
            <div className={`flex container:flex-row flex-col ${Styles.intro} justify-between`}>
                <div id="item-1" className={Styles.info}>
                    <p>Thông tin liên hệ: </p>
                    <br/>

                    <p>Anh Hồng: <mark className={`${Styles.highlight_text}`}>(+84) 938 151 701</mark></p>
                    <br/>

                    <p>Anh Phong: <mark className={`${Styles.highlight_text}`}>(+84) 918 714 766</mark></p>
                    <br/>

                    <p>
                        Email: <mark className={`${Styles.highlight_text_red}`}>
                            tambolutang@gmail.com
                        </mark>
                    </p>
                </div> 
    
                <div id="item-2" className={Styles.info}>
                    <p>Mạng xã hội: </p>
                    <br/>

                    <p>Facebook: <mark className={`${Styles.highlight_text}`}>https://www.facebook.com/chanhong.tang/</mark></p>
                    <br/>

                    <p>Youtube: <mark className={`${Styles.highlight_text}`}>https://www.facebook.com/chanhong.tang/</mark></p>
                    <br/>

                    <p>Twitter: <mark className={`${Styles.highlight_text}`}>https://www.facebook.com/chanhong.tang/</mark></p>
                    <br/>

                    <p>Tiktok: <mark className={`${Styles.highlight_text}`}>https://www.facebook.com/chanhong.tang/</mark></p>
                    <br/>
                </div> 

              
    
                <div id="item-3" className={Styles.authenticate_field}>
                    <Stack direction="row" spacing={2}>
                        <Button>
                            Đăng nhập
                        </Button>
                        <Button variant="contained" className={Styles.authenticate_button}>
                            Đăng ký
                        </Button>
                       
                    </Stack>
                </div> 
            </div>
        </div>
    )
}
