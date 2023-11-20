'use client';

import {
  IconButton, LinearProgress,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import {DeleteOutlined, EditCalendarOutlined} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {getTripsByType} from '@/app/services/trip';

const CurrentTrips = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tripList, setTripList] = useState<any>([]);
  const pathname = usePathname();
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';
  let tripLabel = '';
  let tripType: string = pathname.substring(pathname.lastIndexOf('/') + 1);

  if (pathname.includes('/current')) {
    tripLabel = 'Current Trips';
  } else if (pathname.includes('/upcoming')) {
    tripLabel = 'Upcoming Trips';
  } else if (pathname.includes('/past')) {
    tripLabel = 'Past Trips';
  }

  const reloadTrips = () => {
    if (accessToken) {
      setLoading(true);
      getTripsByType(accessToken, 1, tripType)
        .then((x: any) => {
          setTripList(x.trips);
        })
        .finally(() => setLoading(false));
    }
  }

  const editTrip = (id: number) => {

  }

  const deleteTrip = (id: number) => {

  }

  useEffect(() => {
    reloadTrips();
  }, [accessToken]);

  if (loading) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  return (
    <>
      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>{tripLabel}</u></Typography>
      </div>

      <TableContainer component={Paper}>
        <Table size={'small'}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#000' }}>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Vehicle</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Guest</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Time</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Trip ID</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Mileage</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Earnings</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {tripList.map((row: any, counter: number) => (
              <TableRow key={counter}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/*style={{ backgroundColor: (guestById(row.guestId).blacklisted ? 'red' : 'white') }}>*/}
                <TableCell>
                  {row.nickname}
                </TableCell>
                <TableCell>
                  {row.lastName}, {row.firstName}
                </TableCell>
                <TableCell>{row.locationName ?? 'N/A'}</TableCell>
                <TableCell>
                  {moment(row.startTime).format('MM/DD/YY; LT')}<br/>
                  {moment(row.endTime).format('MM/DD/YY; LT')}
                </TableCell>
                <TableCell><Link href={row.tripId}>{row.tripId.substring(row.tripId.lastIndexOf('/') + 1)}</Link></TableCell>
                <TableCell>{row.mileage}</TableCell>
                <TableCell>$ {row.earnings.toFixed(2)}</TableCell>
                <TableCell>
                  {/*<Stack direction={'row'}>*/}
                  {/*  <IconButton onClick={() => {}}>*/}
                  {/*    <EditCalendarOutlined/>*/}
                  {/*  </IconButton>*/}
                  {/*  <IconButton onClick={() => deleteTrip(row.id)}>*/}
                  {/*    <DeleteOutlined/>*/}
                  {/*  </IconButton>*/}
                  {/*</Stack>*/}
                </TableCell>
              </TableRow>
            ))}
            {tripList.length === 0 && (
              <>
                <TableRow hover key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell colSpan={7} style={{ textAlign: 'center' }}>No trips recorded.</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CurrentTrips;
