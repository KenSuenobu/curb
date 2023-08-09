'use client';

import {NextPage} from 'next';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {CookieValueTypes, deleteCookie, getCookie, setCookie} from 'cookies-next';
import SideBar from '@/components/SideBar';
import {
  IconButton,
  Stack,
  Typography,
  LinearProgress,
  Menu,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import Item from '@/components/common/Item';
import MenuIcon from '@mui/icons-material/Menu';
import { errorDialog } from '@/components/dialogs/ConfirmDialog';
import {
  CalendarMonthOutlined, CarCrashOutlined,
  DirectionsCarOutlined,
  GarageOutlined, HouseOutlined,
  MoneyOutlined,
  PeopleOutlined,
  PersonOffOutlined, ScheduleOutlined, TodayOutlined, TollOutlined, UpcomingOutlined, ViewWeekOutlined
} from '@mui/icons-material';
import { SideBarMenuGroupProps } from '@/components/SideBarMenuGroup';
import CarDefinitions from '@/pages/car-definitions/index';
import DeliveryAddress from '@/pages/delivery-address/index';
import Fleet from '@/pages/fleet/index';
import FleetLoans from '@/pages/fleet-loans/index';
import FleetMembership from '@/pages/fleet-membership/index';
import Guests from '@/pages/guest/index';
import Trip from '@/pages/trip/index';
import TripsList, {ITripType} from '@/pages/trip/list';
import Toll from '@/pages/toll/index';
import TollList from '@/pages/toll/list';
import Dashboard from '@/pages/dashboard';
import FleetCarMaintenance from '@/pages/fleet-car-maintenance';
import PasswordTextField from '@/components/common/PasswordTextField';

const drawerWidth = 240;

const Home: NextPage = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [jwt, setJwt] = useState<CookieValueTypes>(null);
  const [checkingJwt, setCheckingJwt] = useState(true);
  const [currentPage, setCurrentPage] = useState(<></>);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginShowing, setLoginShowing] = useState(false);
  const [logoutShowing, setLogoutShowing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const jwtCookie = getCookie('jwt');

    setJwt(jwtCookie);
    setCheckingJwt(false);

    axios.get(`/app/user/login/${jwtCookie}`)
      .then((x) => {
        setUserInfo(x.data);
      }).catch((x) => {
      errorDialog('Unable to retrieve login data; please login again.');
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

    await axios.get(`/app/user/login/${username}/${password}`)
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

        window.location.reload();
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
        onClick: () => setCurrentPage(<Fleet jwt={jwt as string}/>),
      },
      {
        icon: <CarCrashOutlined/>,
        label: 'Fleet Car Maintenance',
        onClick: () => setCurrentPage(<FleetCarMaintenance jwt={jwt as string}/>),
      },
      {
        icon: <MoneyOutlined/>,
        label: 'Fleet Car Loans',
        onClick: () => setCurrentPage(<FleetLoans jwt={jwt as string}/>),
      },
      {
        icon: <HouseOutlined/>,
        label: 'Delivery Addresses',
        onClick: () => setCurrentPage(<DeliveryAddress jwt={jwt as string}/>),
      },
      {
        icon: <PeopleOutlined/>,
        label: 'Fleet Membership',
        onClick: () => setCurrentPage(<FleetMembership jwt={jwt as string}/>),
      },
    ],
  };
  const guestItems: SideBarMenuGroupProps = {
    label: 'Guests',
    items: [
      {
        icon: <PeopleOutlined/>,
        label: 'Guests',
        onClick: () => setCurrentPage(<Guests jwt={jwt as string} blacklisted={false}/>),
      },
      {
        icon: <PersonOffOutlined/>,
        label: 'Blacklisted Guests',
        onClick: () => setCurrentPage(<Guests jwt={jwt as string} blacklisted={true}/>),
      },
    ],
  }
  const tripItems: SideBarMenuGroupProps = {
    label: 'Trips',
    items: [
      {
        icon: <CalendarMonthOutlined/>,
        label: 'Trip Entry',
        onClick: () => setCurrentPage(<Trip jwt={jwt as string}/>),
      },
      {
        icon: <TodayOutlined/>,
        label: 'Current Trips',
        onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.CURRENT}/>),
      },
      {
        icon: <UpcomingOutlined/>,
        label: 'Upcoming Trips',
        onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.UPCOMING}/>),
      },
      {
        icon: <ScheduleOutlined/>,
        label: 'Past Trips',
        onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.PAST}/>),
      },
    ],
  }
  const tollItems: SideBarMenuGroupProps = {
    label: 'Tolls',
    items: [
      {
        icon: <TollOutlined/>,
        label: 'Toll Entry',
        onClick: () => setCurrentPage(<Toll jwt={jwt as string}/>),
      },
      {
        icon: <MoneyOutlined/>,
        label: 'Trip Tolls',
        onClick: () => setCurrentPage(<TollList jwt={jwt as string}/>),
      },
    ],
  }

  const handleMenu = (e: any) => {
    setAnchorEl(e);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    setLogoutShowing(true);

    deleteCookie('jwt', {
      path: '/'
    });

    window.location.reload();
  }

  const handleHomeClicked = () => {
    setCurrentPage(<Dashboard jwt={jwt as string}/>);
  }

  return (
    <>
      <Dialog open={logoutShowing}>
        <DialogContent>
          <DialogContentText>Stand by, logging you out.</DialogContentText>
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', width: '100%' }}>
        {/* Side Divider, only contains the sidebar, which is static.*/}
        <div style={{ width: '260px' }}>
          <SideBar width={ 260 } sidebarItems={[
            carItems, fleetItems, guestItems, tripItems, tollItems,
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
                {userInfo?.emailAddress ?? 'Loading ...'}
              </Typography>
            </Item>

            <Item sx={{ width: '10%', backgroundColor: 'rgb(5, 30, 52)', color: '#fff', textAlign: 'right', paddingTop: '4px' }}>
              <IconButton onClick={handleMenu}>
                <MenuIcon style={{ color: 'white' }}/>
              </IconButton>
              <Menu id={'menu-appbar'} anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
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
