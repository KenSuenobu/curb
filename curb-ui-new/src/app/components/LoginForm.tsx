'use client';

import {useRef, useState} from 'react';
import {signIn} from 'next-auth/react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  LinearProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useRouter} from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginShowing, setLoginShowing] = useState(false);
  const router = useRouter();

  const handleSubmit = (async (e: any) => {
    setLoginShowing(true);
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    .then((res: any) => {
      if (res?.error) {
        clearInputs();
        setLoginShowing(false);
        alertDialog('Failed to login - please check your e-mail or password');
      } else {
        clearInputs();
        setLoginShowing(false);
        router.push('/');
      }
    })
    .catch((e) => {
      setLoginShowing(false);
      console.error(e);
    });
  });

  const onSignup = () => {

  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const handleEmailChange = ((e: any) => setEmail(e.target.value));
  const handlePasswordChange = ((e: any) => setPassword(e.target.value));

  return (
    <>
      <Dialog open={loginShowing}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Stand by, logging you in.
            </Typography>
            <p/>
            <LinearProgress/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <div style={{
        backgroundColor: '#fff', paddingTop: '1.5em', paddingBottom: '1.5em',
        paddingLeft: '1.5em', paddingRight: '1.5em', color: '#000', width: '450px'
      }}>
        <form onSubmit={handleSubmit}>
          <Typography variant={'h5'} fontWeight={'bold'}>Account Login</Typography>

          <br/>
          <TextField type={'text'} fullWidth value={email} onChange={handleEmailChange} placeholder={'Enter your email address'}/>
          <PasswordTextField fullWidth value={password} onChange={handlePasswordChange} placeholder={'Enter your password'}/>

          <br/>
          <br/>

          <Button variant={'contained'}
                  sx={{ backgroundColor: '#66f', fontWeight: 'bold'}}
                  fullWidth
                  type={'submit'}>Log in</Button><br/>
          <Button variant={'contained'}
                  fullWidth
                  onClick={onSignup}
                  disabled={true}>
            Request Early Access
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;