import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import {Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import moment from 'moment';

export interface ITollListProperties {
  jwt: string;
}

const TollList = (props: ITollListProperties) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [tollList, setTollList] = useState<any>([]);

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadTollList();
      }).catch((x) => {
        errorDialog(`Unable to retrieve login data; please login again: ${x}`);
        return;
      });
  }, [props.jwt]);

  const reloadTollList = () => {
    axios.get('/app/toll/list')
      .then((x) => setTollList(x.data))
      .catch((x) => {
        console.log(`Unable to retrieve toll list: ${x}`, x);
        setTollList([]);
      });
  }

  return (
    <>
      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Trip Tolls</u></Typography>
      </div>

      <TableContainer component={Paper}>
        <Table size={'small'}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#000' }}>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Trip ID</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Toll Time</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tollList.map((row, counter) => (
              <TableRow hover key={counter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.tripId}</TableCell>
                <TableCell>{moment(row.tollTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                <TableCell>{row.tollLocation}</TableCell>
                <TableCell>$ {row.tollAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {tollList.length === 0 && (
              <>
                <TableRow hover key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>No current trips recorded.</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TollList;
