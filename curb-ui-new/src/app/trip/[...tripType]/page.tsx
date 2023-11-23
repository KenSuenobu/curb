'use client';

import {
  Dialog, DialogContent, DialogTitle,
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
import {deleteTrip, getTripsByType} from '@/app/services/trip';
import {confirmDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import TripForm from '@/app/components/trip/TripForm';
import TripEditForm from '@/app/components/trip/TripEditForm';

const CurrentTrips = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tripList, setTripList] = useState<any>([]);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [tripId, setTripId] = useState<number>(0);
  const pathname = usePathname();
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';
  let tripLabel = '';
  let tripType: string = pathname.substring(pathname.lastIndexOf('/') + 1);

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

  const editClicked = (id: number) => {
    setTripId(id);
    setEditOpen(true);
  }

  const deleteClicked = (id: number) => {
    confirmDialog('Are you sure you wish to delete this trip?', () => {
      deleteTrip(accessToken, id)
        .then((x) => {
          if (x) {
            reloadTrips();
          } else {
            errorDialog('Unable to delete trip: trip may have already been deleted, or you may lack permission to delete this trip.');
          }
        });
    });
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
      <Dialog open={editOpen} fullWidth={true} maxWidth={'md'}>
        <DialogTitle>Edit Trip</DialogTitle>
        <DialogContent>
          <TripEditForm tripId={tripId}
                        onEdited={() => {
                          setEditOpen(false);
                          reloadTrips();
                        }}
                        onCanceled={() => setEditOpen(false)}/>
        </DialogContent>
      </Dialog>

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
                  <Stack direction={'row'}>
                    <IconButton onClick={() => editClicked(row.id)}>
                      <EditCalendarOutlined/>
                    </IconButton>
                    <IconButton onClick={() => deleteClicked(row.id)}>
                      <DeleteOutlined/>
                    </IconButton>
                  </Stack>
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
