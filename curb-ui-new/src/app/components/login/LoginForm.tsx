'use client';

import React, {useRef, useState} from 'react';
import {signIn} from 'next-auth/react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText, DialogTitle, FormControl, InputLabel,
  LinearProgress, MenuItem, Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import PasswordTextField from '@/app/components/common/PasswordTextField';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useRouter} from 'next/navigation';
import {createSignup} from '@/app/services/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginShowing, setLoginShowing] = useState(false);
  const [signupSending, setSendingSending] = useState(false);
  const [signupShowing, setSignupShowing] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const router = useRouter();

  const handleSubmit = (async (e: any) => {
    e.preventDefault();

    if (!email) {
      errorDialog('E-Mail Address cannot be blank.');
      return;
    }

    if (!password) {
      errorDialog('Password cannot be blank.');
      return;
    }

    if (email.indexOf('@') === -1) {
      errorDialog('Your E-Mail address is malformed.');
      return;
    }

    setLoginShowing(true);
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
    setSignupShowing(true);
  }

  const signup = () => {
    if (payload.emailAddress && payload.note) {
      const ipAddress = '127.0.0.1';

      setSignupShowing(true);
      createSignup(payload.emailAddress, ipAddress, payload.source ?? '0', payload.note)
        .then((x: any) => {
          setSignupShowing(false);
          alertDialog(x.message);
        })
        .catch((x) => {
          setSignupShowing(false);
          errorDialog('Your request failed.  If you have already requested access, please be patient.');
        });
    } else {
      errorDialog('All fields are required.');
    }
  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const handleChange = (e: any) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
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

      <Dialog open={signupSending}>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Submitting request, one moment.
            </Typography>
            <p/>
            <LinearProgress/>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog open={signupShowing}>
        <DialogTitle>
          Request Early Access
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              You are requesting early access to the VURB platform.  If you have already signed up,
              please be patient - someone will contact you soon, as long as your request is legitimate.
              <p/>
              <b>Please note</b>: if you don&apos;t supply a note or message, you probably won&apos;t get approved.
            </Typography>

            <p/>

            <Stack direction={'row'}>
              <Item sx={{ width: '40%' }}>
                <FormControl fullWidth>
                  <InputLabel id={'source-label'}>Signup Source</InputLabel>
                  <Select labelId={'source-label'} label={'Signup Source'} style={{ textAlign: 'left' }}
                          value={payload?.signup ?? 0} fullWidth name={'signup'}
                          onChange={handleChange}>
                    <MenuItem value={0}>Word of Mouth</MenuItem>
                    <MenuItem value={1}>Discord</MenuItem>
                    <MenuItem value={2}>Facebook</MenuItem>
                    <MenuItem value={3}>Youtube</MenuItem>
                    <MenuItem value={4}>Turo</MenuItem>
                    <MenuItem value={5}>Google</MenuItem>
                    <MenuItem value={6}>Suenobu Rentals</MenuItem>
                    <MenuItem value={7}>Other (See note)</MenuItem>
                  </Select>
                </FormControl>
              </Item>

              <Item sx={{ width: '60%' }}>
                <TextField label={'E-Mail Address'} fullWidth value={payload?.emailAddress ?? ''} name={'emailAddress'}
                           onChange={handleChange}/>
              </Item>
            </Stack>

            <Stack direction={'row'}>
              <Item sx={{ width: '100%' }}>
                <TextField label={'Note or Message to the Admin'} multiline
                           fullWidth rows={3} value={payload?.note ?? ''} name={'note'}
                           onChange={handleChange}/>
              </Item>
            </Stack>
          </DialogContentText>
          <DialogActions>
            <Button variant={'contained'}
                    color={'success'}
                    onClick={() => signup()}>
              Submit</Button>

            <Button variant={'contained'}
                    color={'error'}
                    onClick={() => {
              setPayload({});
              setSignupShowing(false);
            }}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <div style={{
        backgroundColor: '#fff', paddingTop: '1.5em', paddingBottom: '1.5em',
        paddingLeft: '1.5em', paddingRight: '1.5em', color: '#000', width: '450px'
      }}>
        <form onSubmit={handleSubmit}>
          <TextField type={'text'} fullWidth value={email} onChange={handleEmailChange} placeholder={'Enter your email address'}/>
          <PasswordTextField fullWidth value={password} onChange={handlePasswordChange} placeholder={'Enter your password'}/>

          <br/>
          <br/>

          <Stack direction={'row'}>
            <Item sx={{ width: '25%', paddingLeft: '0px' }}>
              <Button variant={'contained'}
                      sx={{ backgroundColor: '#66f', fontWeight: 'bold'}}
                      fullWidth
                      type={'submit'}>Log in</Button>
            </Item>

            <Item sx={{ width: '25%', paddingLeft: '0px', paddingRight: '20px' }}>
              <Button variant={'contained'}
                      sx={{ fontWeight: 'bold'}}
                      color={'error'}
                      fullWidth
                      onClick={() => {
                        setEmail('');
                        setPassword('');
                      }}>Clear</Button>
            </Item>

            <Item sx={{ width: '50%', paddingLeft: '20px', paddingRight: '0px' }}>
              <Button variant={'contained'}
                      color={'success'}
                      fullWidth
                      onClick={onSignup}>
                Signup
              </Button>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%', fontAlign: 'center', color: '#aaa', paddingBottom: '0px', paddingTop: '15px' }}>
              [Forgot Login] | [Reset Password]
            </Item>
          </Stack>
        </form>
      </div>
    </>
  );
}

export default LoginForm;