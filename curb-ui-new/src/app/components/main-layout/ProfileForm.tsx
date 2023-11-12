import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText, DialogTitle,
  LinearProgress, TextField,
  Typography
} from '@mui/material';
import React, {useRef} from 'react';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {changePassword} from '@/app/services/auth';
import {useSession} from 'next-auth/react';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';

export interface IProfileForm {
  open: boolean;
  onPropsSaved: () => any;
  onPropsClosed: () => any;
}

const ProfileForm = (props: IProfileForm) => {
  const oldPasswordRef = useRef<any>('');
  const newPassword1Ref = useRef<any>('');
  const newPassword2Ref = useRef<any>('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const saveProfile = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword1 = newPassword1Ref.current.value;
    const newPassword2 = newPassword2Ref.current.value;

    if (!oldPassword) {
      errorDialog('Old password is required.');
      return;
    }

    if (!newPassword1 || !newPassword2) {
      errorDialog('New password cannot be blank.');
      return;
    }

    if (newPassword1 !== newPassword2) {
      errorDialog('New passwords do not match.');
      return;
    }

    changePassword(accessToken, oldPassword, newPassword1)
      .then((x) => {
        if (x.result.result) {
          alertDialog('Your password has been successfully changed.');
          props.onPropsSaved();
        } else {
          errorDialog('Your password could not be changed.  Please double-check your passwords and try again.');
        }
      });
  }

  const closeProfile = () => {
    props.onPropsClosed();
  }

  return (
    <>
      <Dialog open={props.open} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle style={{ fontWeight: 'bold' }}>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <PasswordTextField type={'text'} fullWidth inputRef={oldPasswordRef} placeholder={'Enter your old password'}/><br/>
            <PasswordTextField type={'text'} fullWidth inputRef={newPassword1Ref} placeholder={'Enter your new password'}/><br/>
            <PasswordTextField type={'text'} fullWidth inputRef={newPassword2Ref} placeholder={'Enter your new password again'}/>
          </DialogContentText>
          <DialogActions>
            <Button onClick={saveProfile}
                    variant={'contained'}
                    color={'success'}>
              Save
            </Button>

            <Button onClick={closeProfile}
                    variant={'contained'}
                    color={'error'}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileForm;
