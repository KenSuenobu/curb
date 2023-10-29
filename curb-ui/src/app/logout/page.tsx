'use client';

import {Dialog, DialogContent, DialogContentText} from '@mui/material';
import React, {useEffect} from 'react';
import {deleteCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  deleteCookie('jwt', {
    path: '/'
  });

  router.push('/login');

  return (<>
    <Dialog open>
      <DialogContent>
        <DialogContentText>Stand by, logging you out.</DialogContentText>
      </DialogContent>
    </Dialog>
  </>);
}

export default Logout;
