import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import {Button as MuiButton} from '@mui/material';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import { CssVarsProvider } from '@mui/joy/styles';
import Styles from './Auth.module.css'
import Tambolu from '/components/Logo/Tambolu'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { loginUser } from '../../public/store/ProductState';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Login() {
    const [radius, setRadius] = React.useState(16);
    const [childHeight, setChildHeight] = React.useState(32);
    const [isVisible, setVisible] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isLogin, setLoginState] = React.useState(null);

    const usernameField = React.useRef();
    const passwordField = React.useRef();


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const getValues = () => {
      loginUser(
        usernameField.current.childNodes[0].value, 
        passwordField.current.childNodes[0].value
      ).then(res => {
        setLoginState(res)
      }).catch(err => {
        console.log(err)
      })
      setOpen(true);
    }

    return (
      <>
        <CssVarsProvider>
          <div  className="h-screen flex items-center">

            <Box 
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} 
              className="bg-blue-300 p-3 border border-blue-700 border-dashed border-4"
            >

              <Tambolu/>
              <strong className={`text-xl ${Styles['title-font']} mx-auto`}>ĐĂNG NHẬP</strong>
              <Input
                ref={usernameField}
                size="md"
                placeholder="Nguyenvana1998"
                sx={{
                  '--Input-radius': `${radius}px`,
                  '--Input-decorator-childHeight': `${childHeight}px`,
                }}
              />

              <Input
                ref={passwordField}
                size="md"
                placeholder=""
                type={ isVisible ? "text" : "password" }
                endDecorator={
                  <Button 
                    variant="soft" 
                    size="sm" 
                    className="bg-blur-green hover:bg-blur-blue"
                    onClick={() => setVisible(prev => !prev)}
                  >
                    { isVisible ? <FaEyeSlash/> : <FaEye/> }
                  </Button>
                }
                sx={{
                  '--Input-radius': `${radius}px`,
                  '--Input-decorator-childHeight': `${childHeight}px`,
                }}

                
              />

              <ListDivider component="hr" />
              <Button 
                variant="outlined"
                onClick={() => {getValues()}}
              >Đăng nhập</Button>
            </Box>
          </div>
          
        </CssVarsProvider>

        <div>
          {/* <MuiButton variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
          </MuiButton> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Thông báo đăng nhập
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {isLogin ? "Đăng nhập thành công" : "Đăng nhập thât bại"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <MuiButton onClick={handleClose} autoFocus>
                ?
              </MuiButton>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
}