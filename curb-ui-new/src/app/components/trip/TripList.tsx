import {
  LinearProgress, Link,
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
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {loadTrips} from '@/app/services/trip';

export interface ITripList {
  fleetCarId: number;
  needsRefresh: boolean;
  onRefresh: () => any;
}

const TripList = (props: ITripList) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tripList, setTripList] = useState<any>([]);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadTrips = () => {
    setLoading(true);
    loadTrips(accessToken, props.fleetCarId)
      .then((x: any) => setTripList(x.trips))
      .finally(() => setLoading(false));
  }

  const parseId = (id: string) => id.indexOf('/') !== -1 ? id.substring(id.lastIndexOf('/') + 1) : id;

  useEffect(() => {
    if (props.fleetCarId !== 0) {
      reloadTrips();
    } else {
      setTripList([]);
    }
  }, [accessToken, props.fleetCarId]);

  useEffect(() => {
    if (props.needsRefresh) {
      reloadTrips();
      props.onRefresh();
    }
  }, [props.needsRefresh]);

  return (
    <>
      {loading ? (
        <LinearProgress/>
      ) : (
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
              {tripList.map((row: any, counter: number) => {
                const now = moment();
                const startTime = moment(row.startTime);
                const endTime = moment(row.endTime);
                let bgColor = '#fff';

                if (startTime <= now && endTime >= now) {
                  bgColor = '#ccc';
                } else if (startTime >= now) {
                  bgColor = '#cfc';
                } else if (startTime <= now) {
                  bgColor = '#fcc';
                }

                return (
                  <TableRow hover key={counter} sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: bgColor
                  }}>
                    <TableCell><Link
                      href={'https://turo.com/us/en/drivers/' + parseId(row.url)}
                      target={'_blank'}>{row.lastName}, {row.firstName}</Link></TableCell>
                    <TableCell>{row.deliveryAddressId}</TableCell>
                    <TableCell>{moment(row.startTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                    <TableCell>{moment(row.endTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                    <TableCell><Link
                      href={'https://turo.com/us/en/reservation/' + parseId(row.tripId)}
                      target={'_blank'}>{parseId(row.tripId)}</Link></TableCell>
                    <TableCell>{row.mileage}</TableCell>
                    <TableCell>$ {row.earnings.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
              {tripList.length === 0 && (
                <>
                  <TableRow hover key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={7} style={{ textAlign: 'center' }}>No current trips recorded.</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default TripList;
