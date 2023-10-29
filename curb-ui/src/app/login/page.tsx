'use client';

import React, {useEffect, useRef, useState} from 'react';
import {CookieValueTypes, getCookie, setCookie} from 'cookies-next';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
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
import Item from '@/components/common/Item';
import PasswordTextField from '@/components/common/PasswordTextField';
import {useRouter} from 'next/navigation';

const Login = () => {
  const [jwt, setJwt] = useState<CookieValueTypes>(null);
  const [checkingJwt, setCheckingJwt] = useState(true);
  const [loginShowing, setLoginShowing] = useState(false);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();

  useEffect(() => {
    const jwtCookie = getCookie('jwt');

    setJwt(jwtCookie);
    setCheckingJwt(false);

    axios.get(`/curb/user/login/${jwtCookie}`)
      .then((x) => {
        setUserInfo(x.data);
      }).catch((x) => {
        return;
      });
  }, [checkingJwt]);

  if (checkingJwt) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  const onLogin = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username.length === 0 || password.length === 0) {
      errorDialog('Username and password fields are required to login.');
      return;
    }

    await axios.get(`/curb/user/login/${username}/${password}`)
      .then((x: any) => {
        const result = x.data;

        if (result === 'error') {
          errorDialog('Your e-mail address and/or password are invalid.  Please try again.');
          return;
        }

        setLoginShowing(true);

        setCookie('jwt', result, {
          path: '/'
        });

        router.push('/');
      });
  }

  const onSignup = () => {

  }

  if (!jwt) {
    return (
      <>
        <Dialog open={loginShowing}>
          <DialogContent>
            <DialogContentText>Stand by, logging you in.</DialogContentText>
          </DialogContent>
        </Dialog>

        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <div style={{display: 'flex', border: '1px solid #000'}}>
            <div style={{
              backgroundColor: '#66f', textAlign: 'center', paddingTop: '2em', paddingBottom: '2em',
              paddingLeft: '1em', paddingRight: '1em', width: '300px', borderRight: '1px solid #000'
            }}>
              <Typography variant={'h4'} fontWeight={'bold'}>
                CURB
              </Typography>
              <Typography>
                <b>Welcome to Curb</b>
                <p/>
                <br/>
                The simplified, enterprise,<br/>
                fleet management software<br/>
                for the rest of us.
              </Typography>
            </div>

            <div style={{
              backgroundColor: '#fff', paddingTop: '1.5em', paddingBottom: '1.5em',
              paddingLeft: '1.5em', paddingRight: '1.5em', color: '#000', width: '450px'
            }}>
              <Typography variant={'h5'} fontWeight={'bold'}>Account Login</Typography>
              <p/>
              <Typography>
                <b>Email Address</b><br/>
                <TextField fullWidth inputRef={usernameRef}/>
                <Stack direction={'row'}>
                  <Item sx={{width: '30%', textAlign: 'left', paddingLeft: '0em', paddingBottom: '0em'}}>
                    <Typography sx={{color: '#000'}}>
                      <b>Password</b>
                    </Typography>
                  </Item>
                  <Item sx={{width: '70%', textAlign: 'right', paddingRight: '0em', paddingBottom: '0em'}}>
                    <Typography sx={{color: '#bbb'}}>
                      Forgot Password? [Disabled]
                    </Typography>
                  </Item>
                </Stack>
                <PasswordTextField fullWidth inputRef={passwordRef}/>
              </Typography>
              <br/>
              <Button variant={'contained'}
                      sx={{backgroundColor: '#66f', fontWeight: 'bold'}}
                      fullWidth
                      onClick={() => onLogin()}>Log in</Button>
              <p/>
              <Button variant={'contained'}
                      fullWidth
                      onClick={() => onSignup()}>
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  router.push('/');
}

export default Login;
