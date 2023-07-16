import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NextPage } from "next";
import MainAppBar from "../components/MainAppBar";
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
  LocalAtmOutlined, TollOutlined,
} from '@mui/icons-material';
import CarDefinitions from './car-definitions';
import Fleet from "./fleet";
import FleetLoans from './fleet-loans';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useRef} from 'react';
import {Stack} from '@mui/system';
import Item from "../components/common/Item";
import {errorDialog} from '../components/dialogs/ConfirmDialog';
import Link from 'next/link';
import axios from 'axios';
import {getCookie, setCookie} from 'cookies-next';
import {useRouter} from 'next/router';

const drawerWidth = 240;

const Home: NextPage = () => {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [currentPage, setCurrentPage] = React.useState(<></>);
  const router = useRouter();
  const jwt = getCookie('jwt');

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
        onClick: () => setCurrentPage(<Fleet/>),
      },
      {
        icon: <MoneyOutlined/>,
        label: 'Fleet Car Loans',
        onClick: () => setCurrentPage(<FleetLoans/>),
      },
    ],
  };
  const tripsItems: SideBarMenuGroupProps = {
    label: 'Trips',
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Trips',
        onClick: () => setCurrentPage(<></>),
      },
      {
        icon: <CalendarMonthOutlined/>,
        label: 'Past Trip History',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };
  const tollItems: SideBarMenuGroupProps = {
    label: 'Tolls',
    items: [
      {
        icon: <TollOutlined/>,
        label: 'Toll Records',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };
  const guestsItems: SideBarMenuGroupProps = {
    label: 'Guests',
    items: [
      {
        icon: <PersonOutlined/>,
        label: 'Guests',
        onClick: () => setCurrentPage(<></>),
      },
      {
        icon: <PersonOffOutlined/>,
        label: 'Blacklisted Guests',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };

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

        router.replace('/');
      });
  }

  const onSignup = () => {

  }

  if (!jwt) {
    return (
      <>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <div style={{display: 'flex'}}>
            <div style={{
              backgroundColor: '#66f', textAlign: 'center', paddingTop: '2em', paddingBottom: '2em',
              paddingLeft: '1em', paddingRight: '1em', width: '300px'
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
                      Forgot Password?
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
  } else {
    return (
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <SideBar width={260} sidebarItems={[
          carItems,
          fleetItems,
          tripsItems,
          tollItems,
          guestsItems,
        ]}/>
        <Box
          component="main"
          sx={{flexGrow: 1, p: 3, backgroundColor: '#fff'}}
          position={"relative"}
          left={260}
          marginRight={"260px"}
        >
          {currentPage}
        </Box>
      </Box>
    );
  }
};

export default Home;