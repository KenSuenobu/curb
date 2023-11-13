'use client';

import {
  Alert, Button, Checkbox, FormControl, FormControlLabel, InputLabel, LinearProgress, Link, MenuItem,
  Paper, Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow, TextField,
  Typography
} from '@mui/material';
import {ArrowRightOutlined, ReportProblemOutlined} from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import {TableHeader} from '@/app/components/common/TableHeader';
import Item from '@/app/components/common/Item';
import ColorDatabase, {SELECTED_COLOR} from '@/app/components/common/ColorDatabase';
import FleetList from '@/app/components/fleet/FleetList';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {useSession} from 'next-auth/react';
import {listGuests} from '@/app/services/guests';
import GuestForm from '@/app/components/guests/GuestForm';

const Guests = () => {
  const pathname = usePathname();
  const isBlacklisted = pathname.includes('/blacklisted');
  const [fleetId, setFleetId] = useState<number>(0);
  const [guestId, setGuestId] = useState<number>(0);
  const [guestList, setGuestList] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadGuests = () => {
    setLoading(true);

    if (accessToken) {
      listGuests(accessToken, fleetId, isBlacklisted)
        .then((x: any) => {
          setGuestList(x.guests);
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    reloadGuests();
  }, [accessToken, fleetId]);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <FleetList
              addable={false}
              onClick={(x: any) => {
                setFleetId(x.id);
                reloadGuests();
              }}/>
          </div>
          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                {isBlacklisted ? (
                  <TableHeader header={'Blacklisted Guests'}
                               onAdd={() => {
                                 if (!fleetId) {
                                   alertDialog('You must first select a fleet');
                                   return;
                                 }

                                 setGuestId(0);
                               }}/>
                ) : (
                  <TableHeader header={'Guests'}
                               onAdd={() => {
                                 if (!fleetId) {
                                   alertDialog('You must first select a fleet');
                                   return;
                                 }

                                 setGuestId(0);
                               }}/>
                )}
                <TableBody>
                {loading && (
                  <>
                    <TableRow colSpan={2}>
                      <TableCell>
                        <LinearProgress/>
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {guestList.length > 0 && (
                  <>
                    {guestList.map((x: any) => {
                      const bgColor = guestId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                           <TableRow hover sx={{ cursor: 'pointer' }}>
                             <TableCell
                               sx={{ backgroundColor: bgColor, width: '90%', padding: '0px' }}
                               onClick={() => {
                                 setGuestId(x.id);
                               }}>
                               <Stack direction={'row'}>
                                 {x.incomplete === true && (
                                   <Item sx={{ backgroundColor: bgColor }}>
                                     <ReportProblemOutlined style={{ color: 'red', paddingBottom: '1px' }}/>
                                   </Item>
                                 )}
                                 <Item sx={{ backgroundColor: bgColor }}>
                                   <Typography>{x.lastName}, {x.firstName} {x.middleName}</Typography>
                                 </Item>
                               </Stack>
                             </TableCell>

                             <TableCell
                               onClick={() => {
                                 setGuestId(x.id);
                               }}
                               sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', padding: '0px', paddingRight: '5px' }}><ArrowRightOutlined/></TableCell>
                           </TableRow>
                        </>
                      );
                    })}
                  </>
                )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Paper>

      {fleetId !== 0 && (
        <>
          <GuestForm fleetId={fleetId} guestId={guestId} blacklisted={isBlacklisted}
                     onGuestSaved={() => reloadGuests()}
                     onGuestCleared={() => {
                       setGuestId(0);
                     }}/>
        </>
      )}

      {/*<TableContainer component={Paper}>*/}
      {/*  <Table size={'small'}>*/}
      {/*    <TableHead>*/}
      {/*      <TableRow style={{ backgroundColor: '#000' }}>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Guest</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Delivery Address</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Start Time</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>End Time</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Trip</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Mileage</TableCell>*/}
      {/*        <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Earnings</TableCell>*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      {guestTrips.map((row, counter) => (*/}
      {/*        <TableRow hover key={counter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}
      {/*          <TableCell>*/}
      {/*            <Typography>*/}
      {/*              {guestData.lastName}, {guestData.firstName}*/}
      {/*            </Typography>*/}
      {/*          </TableCell>*/}
      {/*          <TableCell>{row.locationName ?? 'N/A'}</TableCell>*/}
      {/*          <TableCell>{moment(row.startTime).format('ddd, MMM D YYYY; LT')}</TableCell>*/}
      {/*          <TableCell>{moment(row.endTime).format('ddd, MMM D YYYY; LT')}</TableCell>*/}
      {/*          <TableCell><Link href={row.tripUrl}>{row.tripId}</Link></TableCell>*/}
      {/*          <TableCell>{row.mileage}</TableCell>*/}
      {/*          <TableCell>$ {row.earnings.toFixed(2)}</TableCell>*/}
      {/*        </TableRow>*/}
      {/*      ))}*/}
      {/*      {guestTrips.length === 0 && (*/}
      {/*        <>*/}
      {/*          <TableRow hover key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}
      {/*            <TableCell colSpan={7} style={{ textAlign: 'center' }}>No trips recorded.</TableCell>*/}
      {/*          </TableRow>*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</TableContainer>*/}
    </>
  );

}

export default Guests;