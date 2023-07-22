import * as React from "react";
import Typography from "@mui/material/Typography";
import { NextPage } from "next";
import SideBar from "../components/SideBar";
import { SideBarMenuGroupProps } from "../components/SideBarMenuGroup";
import {
  ClassOutlined,
  FormatListBulletedOutlined,
  GroupsOutlined,
  PersonOutlined,
  ReorderOutlined,
  RuleOutlined,
  TypeSpecimenOutlined,
  ViewListOutlined,
  PublicOutlined,
  WorkspacesOutlined,
  Grid3x3Outlined,
  DatasetOutlined,
  DatasetLinkedOutlined,
  LibraryBooksOutlined,
  BackupTableOutlined,
  PeopleOutline,
  LockOutlined,
  DataObjectOutlined,
  DirectionsCarOutlined,
  GarageOutlined,
  MoneyOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  PersonRemoveOutlined,
  PersonOffOutlined,
  LocalAtmOutlined, TollOutlined, PeopleOutlined,
} from '@mui/icons-material';
import CarDefinitions from './car-definitions';
import Fleet from "./fleet";
import FleetLoans from './fleet-loans';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton, LinearProgress,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {Stack} from '@mui/system';
import Item from "../components/common/Item";
import {errorDialog} from '../components/dialogs/ConfirmDialog';
import Link from 'next/link';
import axios from 'axios';
import {CookieValueTypes, deleteCookie, getCookie, setCookie} from 'cookies-next';
import {useRouter} from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import FleetMembership from './fleet-membership';

const drawerWidth = 240;

const Home: NextPage = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();
  // const jwt = getCookie('jwt');
  const [jwt, setJwt] = useState<CookieValueTypes>(null);
  const [checkingJwt, setCheckingJwt] = useState(true);
  const [currentPage, setCurrentPage] = useState(<></>);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setJwt(getCookie('jwt'));
    setCheckingJwt(false);
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

    await axios.get(`/app/user/login/${username}/${password}`)
      .then((x) => {
        const result = x.data;

        if (result === 'error') {
          errorDialog('Your e-mail address and/or password are invalid.  Please try again.');
          return;
        }

        setCookie('jwt', result, {
          path: '/'
        });

        router.reload();
      });
  }

  const onSignup = () => {

  }

  if (!jwt) {
    return (
      <>
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
                <TextField fullWidth inputRef={passwordRef}/>
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

  const carItems: SideBarMenuGroupProps = {
    label: 'Cars',
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Car Definitions',
        onClick: () => setCurrentPage(<CarDefinitions/>),
      },
    ],
  };
  const fleetItems: SideBarMenuGroupProps = {
    label: 'Fleet',
    items: [
      {
        icon: <GarageOutlined/>,
        label: 'Fleet Cars',
        onClick: () => setCurrentPage(<Fleet jwt={jwt}/>),
      },
      {
        icon: <PeopleOutlined/>,
        label: 'Fleet Membership',
        onClick: () => setCurrentPage(<FleetMembership jwt={jwt}/>),
      },
      {
        icon: <MoneyOutlined/>,
        label: 'Fleet Car Loans',
        onClick: () => setCurrentPage(<FleetLoans jwt={jwt}/>),
      },
    ],
  };

  const handleMenu = (e) => {
    setAnchorEl(e);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    deleteCookie('jwt', {
      path: '/'
    });

    router.reload();
  }

  const handleHomeClicked = () => {
    setCurrentPage(
      <>
        <Typography>
          Home
        </Typography>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
         {/* Side Divider, only contains the sidebar, which is static.*/}
         <div style={{ width: '260px' }}>
           <SideBar width={ 260 } sidebarItems={[
             carItems, fleetItems,
           ]} onHomeClicked={() => handleHomeClicked()}/>
         </div>

         {/* Right side, top portion of the page, contains the top navigation bar. */}
         <div style={{ position: 'fixed',
           paddingLeft: '10px',
           paddingRight: '270px',
           borderLeft: '1px solid rgb(35, 60, 82)',
           borderBottom: '1px solid rgb(35, 60, 82)',
           left: '260px',
           width: '100%',
           height: '46px',
           backgroundColor: 'rgb(5, 30, 52)',
           color: '#fff' }}>
           <Stack direction={'row'}>
             <Item sx={{ width: '90%', backgroundColor: 'rgb(5, 30, 52)', color: '#fff', textAlign: 'left' }}>
               <Typography variant={'h6'} fontWeight={'bold'}>
                 {jwt}
               </Typography>
             </Item>

             <Item sx={{ width: '10%', backgroundColor: 'rgb(5, 30, 52)', color: '#fff', textAlign: 'right', paddingTop: '4px' }}>
               <IconButton onClick={handleMenu}>
                 <MenuIcon style={{ color: 'white' }}/>
               </IconButton>
               <Menu id={'menu-appbar'} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                     keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                     open={Boolean(anchorEl)} onClose={handleClose}>
                 <MenuItem onClick={handleClose}>Profile</MenuItem>
                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
               </Menu>
             </Item>
           </Stack>
         </div>

         {/* Right side main container that displays all relevant content regarding the page that was selected */}
         <div style={{ position: 'fixed',
           paddingLeft: '10px',
           paddingRight: '10px',
           paddingTop: '10px',
           left: '260px',
           top: '47px',
           width: 'calc(100% - 260px)',
           height: 'calc(100% - 48px)',
           backgroundColor: '#fff',
           color: '#000',
           overflowY: 'auto',
         }}>
           {currentPage}
         </div>
      </div>
    </>
  );
};

export default Home;