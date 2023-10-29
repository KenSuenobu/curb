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
import CarDefinitions from '../../../curb-ui-old/pages/car-definitions/index';
import DeliveryAddress from '../../../curb-ui-old/pages/delivery-address/index';
import Fleet from '../../../curb-ui-old/pages/fleet/index';
import FleetLoans from '../../../curb-ui-old/pages/fleet-loans/index';
import FleetMembership from '../../../curb-ui-old/pages/fleet-membership/index';
import Guests from '../../../curb-ui-old/pages/guest/index';
import Trip from '../../../curb-ui-old/pages/trip/index';
import TripsList, {ITripType} from '../../../curb-ui-old/pages/trip/list';
import Toll from '../../../curb-ui-old/pages/toll/index';
import TollList from '../../../curb-ui-old/pages/toll/list';
import Dashboard from '../../../curb-ui-old/pages/dashboard';
import FleetCarMaintenance from '../../../curb-ui-old/pages/fleet-car-maintenance';
import PasswordTextField from '@/components/common/PasswordTextField';

const Home: NextPage = () => {
  return (
    <>
      <Stack direction={'row'}>
        <Item sx={{ paddingLeft: '15px',
          width: '100%',
          textAlign: 'left',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <Typography fontWeight={'bold'}>
            Dashboard
          </Typography>
        </Item>
      </Stack>

      <p/>

      <Typography>
        Dashboard is coming soon!
      </Typography>
    </>
  );
};

export default Home;
