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
import {
  DirectionsCarOutlined, GarageOutlined, InfoOutlined,
  MenuOpenOutlined,
  PeopleOutlined,
  PersonOffOutlined,
  RefreshOutlined,
  HouseOutlined, CalendarMonthOutlined,
} from '@mui/icons-material';
import SideBar from '@/app/components/main-layout/SideBar';
import {signOut, useSession} from 'next-auth/react';
import Divider from '@mui/material/Divider';
import ProfileForm from '@/app/components/main-layout/ProfileForm';
import {encrypt} from 'unixcrypt';
import * as React from 'react';

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

const APPLICATION_VERSION = '0.0.5';

const Layout: NextPage = ({children, params}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
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
    label: 'Community',
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Car Definitions',
        onClick: () => router.push('/car-definitions'),
        url: '/car-definitions',
        info:
          <>
            <Typography>
              <b>Car Definitions</b>
              <p/>
              Car definitions is a database of car makes, models, years, and trims.
              This database is used to define the cars that are members of fleets, so the more
              information contained in this database, the better.
              <p/>
              You are encouraged to add more car information to this database to help fill out
              defined cars in your fleet.  Use sites like Consumer Reports&trade; and Car and Driver&trade;
              to help enrichen the car information.
              <p/>
              The data here will eventually help give more information about your cars in the
              dashboard, and will help show you depreciation schedules, comparisons with prices
              other people paid, etc.
            </Typography>
          </>
      },
      {
        icon: <HouseOutlined/>,
        label: 'Delivery Addresses',
        onClick: () => router.push('/addresses'),
        url: '/addresses',
        info:
          <>
            <Typography>
              <b>Delivery Addresses</b>
              <p/>
              These are sets of delivery destinations.  These include places like hotels, airports,
              off-airport parking lots, and such.
              <p/>
              You have the ability to share the addresses with other Curb users by selecting &quot;Public&quot;
              in the address lists.
              <p/>
              If you are adding an address that is intended for personal use, please do not mark it Public.
              <p/>
              You can add any address you like, but only you can add an address.  If the address is in use
              by another fleet, you cannot delete the address, but you can modify it.
            </Typography>
          </>
      },
    ],
  };

  const fleetItems: SideBarMenuGroupProps = {
    label: 'Fleet',
    items: [
      {
        icon: <GarageOutlined/>,
        label: 'Fleet Cars',
        onClick: () => router.push('/fleet'),
        url: '/fleet',
        info:
          <>
            <Typography>
              <b>Fleet Cars</b>
              <p/>
              Use this section to create your fleet by name, and add the cars that your
              fleet owns.
              <p/>
              Once each car is defined, you can provide a nickname, original purchase
              price, car color, and much more.  As Curb grows, so will your fleet, and
              so will your fleet info!  Stay tuned to these pages, and the What&apos;s
              New pages to learn more as the project matures.
            </Typography>
          </>
      },
  //     {
  //       icon: <CarCrashOutlined/>,
  //       label: 'Fleet Car Maintenance',
  //       onClick: () => setCurrentPage(<FleetCarMaintenance jwt={jwt as string}/>),
  //     },
  //     {
  //       icon: <MoneyOutlined/>,
  //       label: 'Fleet Car Loans',
  //       onClick: () => setCurrentPage(<FleetLoans jwt={jwt as string}/>),
  //     },
  //     {
  //       icon: <PeopleOutlined/>,
  //       label: 'Fleet Membership',
  //       onClick: () => setCurrentPage(<FleetMembership jwt={jwt as string}/>),
  //     },
    ],
  };
  const guestItems: SideBarMenuGroupProps = {
    label: 'Guests',
    items: [
      {
        icon: <PeopleOutlined/>,
        label: 'Guests',
        onClick: () => router.push('/guests/whitelisted'),
        url: '/guests/whitelisted',
        info:
          <>
            <Typography>
              <b>Whitelisted Guests</b>
              <p/>
              Whitelisted guests are guests that you trust, and have proven to be good.  These are generally
              guests who have had no complaints, and have not left bad or derogatory feedback for you.
              <p/>
              Each guest area has notes, so if any guests mistreat your cars, leave inflamatory comments, or
              anything else, you can leave notes here regarding the guests, and what they did.
              <p/>
              You also have the ability to blacklist a guest at any time.
            </Typography>
          </>
      },
      {
        icon: <PersonOffOutlined/>,
        label: 'Blacklisted Guests',
        onClick: () => router.push('/guests/blacklisted'),
        url: '/guests/blacklisted',
        info:
          <>
            <Typography>
              <b>Blacklisted Guests</b>
              <p/>
              Blacklisted guests are guests that you do not trust, and have proven to be bad actors.
              <p/>
              Each guest area has notes, so if any guests mistreat your cars, leave inflamatory comments, or
              anything else, you can leave notes here regarding the guests, and what they did.
              <p/>
              You also have the ability to whitelist a guest at any time.
            </Typography>
          </>
      },
    ],
  };
  const tripItems: SideBarMenuGroupProps = {
    label: 'Trips',
    items: [
      {
        icon: <CalendarMonthOutlined/>,
        label: 'Trip Entry',
        onClick: () => router.push('/trip'),
        url: '/trip',
        info:
          <>
            <Typography>
              <b>Trips</b>
              <p/>
              Guests who book trips with you on any platform should be entered into this system as well.
              This way, all trips - past, present, and future, can be accounted for, along with earnings,
              losses, reimbursements, repairs, tolls, and more.
              <p/>
              You are also able to leave notes about trips to help keep track of what a guest did during
              a trip, or any other worthwhile notes about the trip related to the guest.
            </Typography>
          </>
      },
      // {
      //   icon: <TodayOutlined/>,
      //   label: 'Current Trips',
      //   onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.CURRENT}/>),
      // },
      // {
      //   icon: <UpcomingOutlined/>,
      //   label: 'Upcoming Trips',
      //   onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.UPCOMING}/>),
      // },
      // {
      //   icon: <ScheduleOutlined/>,
      //   label: 'Past Trips',
      //   onClick: () => setCurrentPage(<TripsList jwt={jwt as string} tripType={ITripType.PAST}/>),
      // },
    ],
  }
  // const tollItems: SideBarMenuGroupProps = {
  //   label: 'Tolls',
  //   items: [
  //     {
  //       icon: <TollOutlined/>,
  //       label: 'Toll Entry',
  //       onClick: () => setCurrentPage(<Toll jwt={jwt as string}/>),
  //     },
  //     {
  //       icon: <MoneyOutlined/>,
  //       label: 'Trip Tolls',
  //       onClick: () => setCurrentPage(<TollList jwt={jwt as string}/>),
  //     },
  //   ],
  // }
  const sidebarItems = [carItems, fleetItems, guestItems, tripItems];

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
    setProfileOpen(true);
    handleClose();
  }

  const headerTitle: any = sidebarItems.map((x) => {
    return x.items.map((x) => {
      if (pathname.startsWith(x.url)) {
        return x.label;
      }
    });
  }) ?? '';

  const headerInfo: any = sidebarItems.map((x) => {
    return x.items.map((x) => {
      if (pathname.startsWith(x.url)) {
        return x.info;
      }
    });
  }) ?? '';

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ConfirmDialog/>
          <ProfileForm open={profileOpen}
                       onPropsSaved={() => setProfileOpen(false)}
                       onPropsClosed={() => setProfileOpen(false)}/>

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
              {headerTitle && (
                <Stack direction={'row'}>
                  <Item sx={{ paddingLeft: '15px',
                    width: '90%',
                    textAlign: 'left',
                    backgroundColor: '#000',
                    color: '#fff'
                  }}>
                    <Typography fontWeight={'bold'}>
                      {headerTitle}
                    </Typography>
                  </Item>
                  <Item sx={{ paddingLeft: '15px',
                    width: '10%',
                    textAlign: 'right',
                    backgroundColor: '#000',
                    color: '#fff'
                  }}>
                    <IconButton style={{ padding: '0px' }}
                                onClick={() => alertDialog(headerInfo)}>
                      <InfoOutlined style={{ color: 'white' }}/>
                    </IconButton>
                  </Item>
                </Stack>
              )}
                {children}
            </div>
          </div>

          <div style={{ position: 'fixed', bottom: 0, width: '260px', height: '24px', backgroundColor: 'white', borderTop: '1px solid #000', borderRight: '1px solid #000' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '260px', paddingLeft: '10px', color: '#000', backgroundColor: 'rgb(55, 80, 102)' }}>
                <Typography>
                  v{APPLICATION_VERSION}
                </Typography>
              </div>
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}

export default Layout;
