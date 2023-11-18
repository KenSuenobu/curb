'use client';

import {
  Alert, Button, LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {ArrowRightOutlined} from '@mui/icons-material';
import FleetList from '@/app/components/fleet/FleetList';
import {TableHeader} from '@/app/components/common/TableHeader';
import {SELECTED_COLOR} from '@/app/components/common/ColorDatabase';
import AddressForm from '@/app/components/addresses/AddressForm';
import {useSession} from 'next-auth/react';
import {listAddresses} from '@/app/services/addresses';
import {errorDialog} from '@/app/components/common/ConfirmDialog';

const Addresses = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [fleetId, setFleetId] = useState<number>(0);
  const [addressId, setAddressId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadAddressList = () => {
    if (fleetId !== 0) {
      setLoading(true);
      listAddresses(accessToken, fleetId)
        .then((x: any) => {
          setAddressList(x.addresses);
        })
        .catch((x: any) => {
          errorDialog(`Unable to retrieve address list: ${x.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setAddressList([]);
      setLoading(false);
    }
  }

  const addressSaved = () => {
    reloadAddressList();
  }

  const addressCleared = () => {
    setAddressId(0);
  }

  useEffect(() => {
    reloadAddressList();
  }, [accessToken, fleetId]);

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
        <Alert severity={'success'} sx={{ width: '100%' }}>
          Delivery Address record saved successfully.
        </Alert>
      </Snackbar>

      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <FleetList onClick={(x: any) => setFleetId(x.id)} addable={false}/>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Delivery Address'}
                             onAdd={() => {
                               setAddressId(0);
                             }}/>
                {loading && (
                  <LinearProgress/>
                )}
                {addressList.length > 0 ? (
                  <TableBody>
                    {addressList.map((x: any) => {
                      const bgColor = addressId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setAddressId(x.id);
                              }}>
                              <Typography>
                                {x.name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    )}
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </Paper>

      <AddressForm fleetId={fleetId} addressId={addressId}
                   onSaved={() => addressSaved()}
                   onCleared={() => addressCleared()}/>
    </>
  );
}

export default Addresses;