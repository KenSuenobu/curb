import {
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import moment from 'moment/moment';

export enum ITripType {
  CURRENT,
  UPCOMING,
  PAST
}

export interface ITripsListProps {
  jwt: string;
  tripType: ITripType;
}

const TripsList = (props: ITripsListProps) => {
  let tripLabel = '';
  const [tripList, setTripList] = useState<any[]>([]);
  const [guestList, setGuestList] = useState<any[]>([]);

  if (props.tripType === ITripType.CURRENT) {
    tripLabel = 'Current Trips';
  } else if (props.tripType === ITripType.UPCOMING) {
    tripLabel = 'Upcoming Trips';
  } else {
    tripLabel = 'Past Trips';
  }

  useEffect(() => {
    if (props.tripType === ITripType.CURRENT) {
      axios.get('/app/trip/list/current')
        .then((x) => setTripList(x.data));
    } else if (props.tripType === ITripType.UPCOMING) {
      axios.get('/app/trip/list/upcoming')
        .then((x) => setTripList(x.data));
    } else {
      axios.get('/app/trip/list/past')
        .then((x) => setTripList(x.data));
    }

    axios.get('/app/guest/list-all')
      .then((x) => {
        setGuestList(x.data);
      })
      .catch((x) => {
        setGuestList([]);
        console.log(`Unable to get guest list: ${x}`, x);
      });
  }, [props.tripType]);

  const deliveryAddressById = (id: number) => undefined;
  const guestById = (id: number) => guestList.find((x) => x.id === id);

  if (guestList.length === 0) {
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
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Guest</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Delivery Address</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Start Time</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>End Time</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Trip</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Mileage</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Earnings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tripList.map((row, counter) => (
              <TableRow hover key={counter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Typography style={{ color: (guestById(row.guestId).blacklisted ? 'red' : 'black') }}>
                    {guestById(row.guestId).lastName}, {guestById(row.guestId).firstName}
                  </Typography>
                </TableCell>
                <TableCell>{deliveryAddressById(row.deliveryAddressId)?.name ?? 'N/A'}</TableCell>
                <TableCell>{moment(row.startTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                <TableCell>{moment(row.endTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                <TableCell><Link href={row.tripUrl}>{row.tripId}</Link></TableCell>
                <TableCell>{row.mileage}</TableCell>
                <TableCell>$ {row.earnings.toFixed(2)}</TableCell>
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

export default TripsList;
