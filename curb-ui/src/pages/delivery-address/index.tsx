import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import {IFleet, LoadFleet} from '@/components/database/fleet';
import {
  Alert, Button,
  Paper, Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '@/components/car-definitions/TableHeader';
import {ArrowRightOutlined} from '@mui/icons-material';
import Item from '@/components/common/Item';

const SELECTED_COLOR = '#ccf';

export interface IDeliveryAddressProps {
  jwt: string;
}

export interface IDeliveryAddress {
  id?: number;
  fleetId: number;
  name: string;
  data: any;
}

const DeliveryAddress = (props: IDeliveryAddressProps) => {
  const [userInfo, setUserInfo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [addressData, setAddressData] = useState<IDeliveryAddress>({
    id: 0,
    fleetId: 0,
    name: '',
    data: {},
  });

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
        errorDialog('Unable to retrieve login data; please login again.');
        return;
      });
  }, []);

  const reloadDeliveryAddresses = (fleetId: number) => {
    axios.get(`/app/address/delivery/list/${fleetId}`)
      .then((x) => {
        setAddressList(x.data)
      })
      .catch((x) => {
        errorDialog(`Unable to retrieve address list for fleet: ${x}`);
        return;
      });
  }

  const reloadFleet = (userId: number) => {
    LoadFleet(userId, (x: IFleet[]) => setFleetList(x));
  }


  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  }

  const handleDataChange = (e) => {
    const data = addressData.data;

    data[e.target.name] = e.target.value;

    setAddressData({
      ...addressData,
      data,
    });
  }

  const clearForm = () => {
    setAddressData({
      id: 0,
      fleetId: 0,
      name: '',
      data: {},
    });
  }

  const saveDeliveryAddress = () => {
    const payload = addressData;

    if (addressData.name.length === 0) {
      errorDialog('Address name is required.');
      return;
    }

    if (!payload.fleetId) {
      payload.fleetId = fleetId;
    }

    if (!addressData.data.address1 || !addressData.data.city || !addressData.data.stateProvince ||
      !addressData.data.zipcode || !addressData.data.country) {
      errorDialog('Address information is incomplete.');
      return;
    }

    if (payload.id !== 0) {
      axios.put(`/app/address/delivery/edit`, payload)
        .then((x) => {
          clearForm();

          if (fleetId) {
            reloadDeliveryAddresses(fleetId);
          }
        })
        .catch((x) => {
          errorDialog(`Unable to save guest: ${x}`);
        })
    } else {
      axios.post(`/app/address/delivery/create`, payload)
        .then((x) => {
          clearForm();

          if (fleetId) {
            reloadDeliveryAddresses(fleetId);
          }
        })
        .catch((x) => {
          errorDialog(`Unable to add guest: ${x}`);
        });
    }
  }

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
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet'}/>
                {fleetList.length > 0 ? (
                  <TableBody>
                    {fleetList.map((x) => {
                      const bgColor = fleetId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetId(x.id);
                                clearForm();
                                reloadDeliveryAddresses(x.id);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id);
                                clearForm();
                                reloadDeliveryAddresses(x.id);
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}><ArrowRightOutlined/></TableCell>
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

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Delivery Address'}/>
                {addressList.length > 0 ? (
                  <TableBody>
                    {addressList.map((x) => {
                      const bgColor = addressData.id === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setAddressData(x);
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

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Delivery Address Detail</u></Typography>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Delivery Location Name'} fullWidth value={addressData.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 1'} fullWidth value={addressData.data.address1 ?? ''}
                         name={'address1'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 2'} fullWidth value={addressData.data.address2 ?? ''}
                         name={'address2'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 3'} fullWidth value={addressData.data.address3 ?? ''}
                         name={'address3'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '30%' }}>
              <TextField label={'City'} fullWidth value={addressData.data.city ?? ''}
                         name={'city'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'State/Province'} fullWidth value={addressData.data.stateProvince ?? ''}
                         name={'stateProvince'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Zipcode'} fullWidth value={addressData.data.zipcode ?? ''}
                         name={'zipcode'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Country'} fullWidth value={addressData.data.country ?? ''}
                         name={'country'} onChange={handleDataChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          <Button onClick={() => saveDeliveryAddress()}>{addressData.id === 0 ? 'Save' : 'Save Changes'}</Button>
        </Item>
      </Stack>
    </>
  );
}

export default DeliveryAddress;