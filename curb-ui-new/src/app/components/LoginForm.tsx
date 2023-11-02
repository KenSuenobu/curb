'use client';

import {useRef, useState} from 'react';
import {signIn} from 'next-auth/react';
import {Button, Stack, TextField, Typography} from '@mui/material';
import Item from '@/app/components/common/Item';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useRouter} from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (async (e) => {
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    .then((res) => {
      if (res.error) {
        clearInputs();
        alertDialog(JSON.parse(res.error).message);
      } else {
        clearInputs();
        router.push('/');
      }
    })
    .catch((e) => {
      console.error(e);
    });
  });

  const onSignup = () => {

  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const handleEmailChange = ((e) => setEmail(e.target.value));
  const handlePasswordChange = ((e) => setPassword(e.target.value));

  return (
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
                onClick={onSignup}>
          Request Early Access
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;