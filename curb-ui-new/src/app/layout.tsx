'use client';

import './globals.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {NextPage} from 'next';
import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import ConfirmDialog, {alertDialog} from '@/app/components/common/ConfirmDialog';
import {IconButton, Menu, MenuItem, Stack, Typography} from '@mui/material';
import Item from '@/app/components/common/Item';
import AuthProvider from '@/app/providers/AuthProvider';
import {SideBarMenuGroupProps} from '@/app/components/main-layout/SideBarMenuGroup';
import {DirectionsCarOutlined, MenuOpenOutlined} from '@mui/icons-material';
import SideBar from '@/app/components/main-layout/SideBar';
import {signOut} from 'next-auth/react';
import Divider from '@mui/material/Divider';

// import {IconButton, LinearProgress, Menu, MenuItem, Stack, Typography} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import React, {useEffect, useState} from 'react';
// import {
//   CalendarMonthOutlined,
//   CarCrashOutlined,
//   DirectionsCarOutlined, FeedbackOutlined,
//   GarageOutlined,
//   HouseOutlined,
//   MoneyOutlined, PeopleOutlined, PersonOffOutlined, ScheduleOutlined, TodayOutlined, TollOutlined, UpcomingOutlined
// } from '@mui/icons-material';
// import CarDefinitions from '../../../curb-ui-old/pages/car-definitions';
// import Fleet from '../../../curb-ui-old/pages/fleet';
// import FleetCarMaintenance from '../../../curb-ui-old/pages/fleet-car-maintenance';
// import FleetLoans from '../../../curb-ui-old/pages/fleet-loans';
// import DeliveryAddress from '../../../curb-ui-old/pages/delivery-address';
// import FleetMembership from '../../../curb-ui-old/pages/fleet-membership';
// import Guests from '../../../curb-ui-old/pages/guest';
// import Trip from '../../../curb-ui-old/pages/trip';
// import TripsList, {ITripType} from '../../../curb-ui-old/pages/trip/list';
// import Toll from '../../../curb-ui-old/pages/toll';
// import TollList from '../../../curb-ui-old/pages/toll/list';
// import Dashboard from '../../../curb-ui-old/pages/dashboard';
// import {NextPage} from 'next';
// import {usePathname, useRouter} from 'next/navigation';
// import Divider from '@mui/material/Divider';
// import axios from 'axios';
// import AuthProvider from '@/app/providers/AuthProvider';
// import ConfirmDialog from '@/app/components/common/ConfirmDialog';
// import Item from '@/app/components/common/Item';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'CURB: Car Universal Rental App',
//   description: 'CURB 0.1.0',
// }

function MenuIcon(props: { style: { color: string } }) {
  return null;
}

const Layout: NextPage = ({children, params}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Login layout
  if (pathname.startsWith('/login')) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ConfirmDialog/>
          {children}
        </body>
      </html>
    );
  }

  // System layout

  const carItems: SideBarMenuGroupProps = {
    label: 'Cars',
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Car Definitions',
        onClick: () => router.push('/car-definitions'),
        url: '/car-definitions',
      },
    ],
  };

  // // const fleetItems: SideBarMenuGroupProps = {
  // //   label: 'Fleet',
  // //   items: [
  // //     {
  // //       icon: <GarageOutlined/>,
  // //       label: 'Fleet Cars',
  // //       onClick: () => setCurrentPage(<Fleet jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <CarCrashOutlined/>,
  // //       label: 'Fleet Car Maintenance',
  // //       onClick: () => setCurrentPage(<FleetCarMaintenance jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <MoneyOutlined/>,
  // //       label: 'Fleet Car Loans',
  // //       onClick: () => setCurrentPage(<FleetLoans jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <HouseOutlined/>,
  // //       label: 'Delivery Addresses',
  // //       onClick: () => setCurrentPage(<DeliveryAddress jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <PeopleOutlined/>,
  // //       label: 'Fleet Membership',
  // //       onClick: () => setCurrentPage(<FleetMembership jwt={jwt as string}/>),
  // //     },
  // //   ],
  // // };
  // // const guestItems: SideBarMenuGroupProps = {
  // //   label: 'Guests',
  // //   items: [
  // //     {
  // //       icon: <PeopleOutlined/>,
  // //       label: 'Guests',
  // //       onClick: () => setCurrentPage(<Guests jwt={jwt as string} blacklisted={false}/>),
  // //     },
  // //     {
  // //       icon: <PersonOffOutlined/>,
  // //       label: 'Blacklisted Guests',
  // //       onClick: () => setCurrentPage(<Guests jwt={jwt as string} blacklisted={true}/>),
  // //     },
  // //   ],
  // // }
  // // const tripItems: SideBarMenuGroupProps = {
  // //   label: 'Trips',
  // //   items: [
  // //     {
  // //       icon: <CalendarMonthOutlined/>,
  // //       label: 'Trip Entry',
  // //       onClick: () => setCurrentPage(<Trip jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <TodayOutlined/>,
  // //       label: 'Current Trips',
  // //       onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.CURRENT}/>),
  // //     },
  // //     {
  // //       icon: <UpcomingOutlined/>,
  // //       label: 'Upcoming Trips',
  // //       onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.UPCOMING}/>),
  // //     },
  // //     {
  // //       icon: <ScheduleOutlined/>,
  // //       label: 'Past Trips',
  // //       onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.PAST}/>),
  // //     },
  // //   ],
  // // }
  // // const tollItems: SideBarMenuGroupProps = {
  // //   label: 'Tolls',
  // //   items: [
  // //     {
  // //       icon: <TollOutlined/>,
  // //       label: 'Toll Entry',
  // //       onClick: () => setCurrentPage(<Toll jwt={jwt as string}/>),
  // //     },
  // //     {
  // //       icon: <MoneyOutlined/>,
  // //       label: 'Trip Tolls',
  // //       onClick: () => setCurrentPage(<TollList jwt={jwt as string}/>),
  // //     },
  // //   ],
  // // }
  const sidebarItems = [carItems];

  const handleHomeClicked = () => {
    router.push('/');
  }

  const handleMenu = (e: any) => {
    setAnchorEl(e);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    handleClose();
    await signOut({});
  }

  const handleFeedback = () => {
    alertDialog('Feedback here');
    handleClose();
  }

  const handleProfile = () => {
    alertDialog('You will be able to fill out and complete your profile soon.  For now, enjoy CURB!');
    handleClose();
  }

  // const headerTitle: string | undefined = sidebarItems.map((x) => {
  //   return x.items.map((x) => {
  //     if (pathname.startsWith(x.url)) {
  //       return x.label;
  //     }
  //   });
  // }) ?? '';
  //
  // if (!userInfo) {
  //   router.push('/login');
  // }
  //
  // if (pathname === '/login') {
  //   return (
  //     <html lang="en">
  //     <body className={inter.className}>
  //     <ConfirmDialog/>
  //     {children}
  //     </body>
  //     </html>
  //   );
  // }

  return (
    <html lang="en">
    <body className={inter.className}>
    <ConfirmDialog/>
    <div style={{ display: 'flex', width: '100%' }}>
      {/* Side Divider, only contains the sidebar, which is static.*/}
      <div style={{ width: '260px' }}>
        <SideBar width={ 260 } sidebarItems={sidebarItems} onHomeClicked={handleHomeClicked}/>
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
              Welcome to Curb
              {/*{userInfo?.emailAddress ?? <LinearProgress/>}*/}
            </Typography>
          </Item>

          <Item sx={{ width: '10%', backgroundColor: 'rgb(5, 30, 52)', color: '#fff', textAlign: 'right', paddingTop: '4px' }}>
            <IconButton onClick={handleMenu}>
              <MenuOpenOutlined style={{ color: 'white' }}/>
            </IconButton>
            <Menu id={'menu-appbar'} anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleFeedback} style={{ fontWeight: 'bold' }} disabled>Feedback</MenuItem>
              <Divider/>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
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
        {/*{headerTitle.toString().trim().length > 0 && (*/}
        {/*  <Stack direction={'row'}>*/}
        {/*    <Item sx={{ paddingLeft: '15px',*/}
        {/*      width: '100%',*/}
        {/*      textAlign: 'left',*/}
        {/*      backgroundColor: '#000',*/}
        {/*      color: '#fff'*/}
        {/*    }}>*/}
        {/*      <Typography fontWeight={'bold'}>*/}
        {/*        {headerTitle}*/}
        {/*      </Typography>*/}
        {/*    </Item>*/}
        {/*  </Stack>*/}
        {/*)}*/}
        <AuthProvider>
          {children}
        </AuthProvider>
      </div>
    </div>
    </body>
    </html>
  );
}

export default Layout;
