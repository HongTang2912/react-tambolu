import * as React from 'react'
import {Button as MuiButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MessageDialog({open, handleClose, isLogin}) {
    return <div>
   
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
          OK
        </MuiButton>
      </DialogActions>
    </Dialog>
  </div>
}