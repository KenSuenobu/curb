// Created with assistance from the following video tutorial: https://www.youtube.com/watch?v=-fnLEO4e-3Y

'use client';

import { create } from 'zustand';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

enum ConfirmDialogEnum {
  CONFIRM,
  ALERT,
  ERROR = 2,
};

type ConfirmDialogStore = {
  message: string;
  title: string;
  dialogType: ConfirmDialogEnum;
  onSubmit?: () => void;
  isOpen: boolean;
  close: () => void;
}

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  message: '',
  title: '',
  dialogType: ConfirmDialogEnum.CONFIRM,
  onSubmit: undefined,
  isOpen: false,

  // This close function will unset the onSubmit function, which tells the confirm dialog's "open" field that
  // the dialog is closed.  This is a fire-and-forget function: close will be called once, unsetting the
  // onSubmit function.  Each subsequent open to the dialog is based on whether the onSubmit function
  // has been populated at runtime.
  close: () =>
    set({
      onSubmit: undefined,
      isOpen: false,
      dialogType: ConfirmDialogEnum.CONFIRM,
    }),
}));

export const confirmDialog = (message: string, onSubmit: () => void) => {
  useConfirmDialogStore.setState({
    message, title: 'Confirm', dialogType: ConfirmDialogEnum.CONFIRM, onSubmit, isOpen: true
  });
}

export const alertDialog = (message: string) => {
  useConfirmDialogStore.setState({
    message, title: '', dialogType: ConfirmDialogEnum.ALERT, isOpen: true
  });
}

export const errorDialog = (message: string) => {
  useConfirmDialogStore.setState({
    message, title: 'Error', dialogType: ConfirmDialogEnum.ERROR, isOpen: true
  })
}

const dialogButtons = (dialogType: ConfirmDialogEnum, close: () => void, onSubmit: () => void) => {
  if (dialogType === ConfirmDialogEnum.CONFIRM) {
    return (
      <>
        <Button color={'error'} variant={'contained'} onClick={close}>No</Button>
        <Button color={'primary'} variant={'contained'} onClick={() => {
          if (onSubmit) {
            onSubmit();
          }

          close();
        }}>Yes</Button>
      </>
    );
  }

  if (dialogType === ConfirmDialogEnum.ALERT) {
    return (
      <>
        <Button color={'primary'} variant={'contained'} onClick={() => {
          if (onSubmit) {
            onSubmit();
          }

          close();
        }}>OK</Button>
      </>
    );
  }

  if (dialogType === ConfirmDialogEnum.ERROR) {
    return (
      <>
        <Button color={'error'} variant={'contained'} onClick={() => {
          if (onSubmit) {
            onSubmit();
          }

          close();
        }}>OK</Button>
      </>
    );
  }
}

const ConfirmDialog: React.FC = () => {
  const { message, title, dialogType, onSubmit, isOpen, close } = useConfirmDialogStore();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle fontWeight={'bold'}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {dialogButtons(dialogType, close, onSubmit!)}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;