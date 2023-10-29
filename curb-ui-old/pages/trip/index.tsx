import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from 'curb-ui/src/components/dialogs/ConfirmDialog';
import {IFleet, LoadFleet} from 'curb-ui/src/components/database/fleet';
import {IFleetCar, LoadFleetCars} from 'curb-ui/src/components/database/fleet-car';
import {
  Alert,
  Button, FormControl, InputLabel, MenuItem, Select,
  Snackbar, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  TextField,
  Typography,
  Link
} from '@mui/material';
import {TableHeader} from 'curb-ui/src/components/car-definitions/TableHeader';
import {ArrowRightOutlined} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Paper from '@mui/material/Paper';
import Item from 'curb-ui/src/components/common/Item';
import ColorDatabase from 'curb-ui/src/components/common/ColorDatabase';
import {LocalizationProvider} from '@mui/x-date-pickers';
import moment from 'moment';

const SELECTED_COLOR = '#ccf';

export interface ITripProps {
  jwt: string;
}

export interface ITrip {
  id?: number;
  fleetCarId: number;
  guestId: number;
  deliveryAddressId: number;
  tripId: string;
  tripUrl: string;
  startTime: Date;
  endTime: Date;
  mileage: number;
  earnings: number;
}

const Trip = (props: ITripProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [addressList, setAddressList] = useState([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [guestList, setGuestList] = useState<any[]>([]);
  const [tripList, setTripList] = useState<any[]>([]);
  const [tripData, setTripData] = useState<ITrip>({
    id: 0,
    fleetCarId: 0,
    guestId: 0,
    deliveryAddressId: 0,
    tripId: '',
    tripUrl: '',
    startTime: new Date(),
    endTime: new Date(),
    mileage: 0,
    earnings: 0,
  });

  const reloadFleet = (id: number) => {
    LoadFleet(id, (x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  const reloadTrips = (fId: number) => {
    axios.get(`/app/trip/list/car/${fId}`)
      .then((x) => setTripList(x.data as never[]))
      .catch((x) => {
        setTripList([]);
        console.log(`Unable to retrieve trip list: ${x}`, x);
      });
  }

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

  const deliveryAddressById = (id: number) => addressList.find((x) => x.id === id);
  const guestById = (id: number) => guestList.find((x) => x.id === id);

  const handleChange = (e: any) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
        errorDialog(`Unable to retrieve login data; please login again: ${x}`);
        return;
      });

    axios.get('/app/guest/list-all')
      .then((x) => {
        setGuestList(x.data);
      })
      .catch((x) => {
        setGuestList([]);
        console.log(`Unable to get guest list: ${x}`, x);
      });
  }, [props.jwt]);

  const clearForm = () => {
    setTripData({
      id: 0,
      fleetCarId: 0,
      guestId: 0,
      deliveryAddressId: 0,
      tripId: '',
      tripUrl: '',
      startTime: new Date(),
      endTime: new Date(),
      mileage: 0,
      earnings: 0,
    });

    setFleetId(0);
    setFleetCarId(0);
    setFleetCarList([]);
    setTripList([]);
  }

  const clearOnlyForm = () => {
    setTripData({
      id: 0,
      fleetCarId: fleetCarId,
      guestId: 0,
      deliveryAddressId: 0,
      tripId: '',
      tripUrl: '',
      startTime: new Date(),
      endTime: new Date(),
      mileage: 0,
      earnings: 0,
    });
  }

  const saveTrip = () => {
    const payload = tripData;

    if (payload.guestId === 0) {
      errorDialog('You need to select a guest.');
      return;
    }

    if (payload.deliveryAddressId === 0) {
      errorDialog('You need to select a delivery address.');
      return;
    }

    if (payload.tripId.length === 0 || payload.tripUrl.length === 0) {
      errorDialog('Trip ID and Trip URLs are required.');
      return;
    }

    axios.post('/app/trip/create', payload)
      .then((x) => {
        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);

        clearOnlyForm();
        reloadTrips(fleetCarId);
      })
      .catch((x) => {
        errorDialog(`Unable to create trip: ${x}`);
        return;
      });
  }

  return (
    <>
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
                                setFleetId(x.id!);
                                setFleetCarId(0);
                                reloadFleetCars(x.id!);
                                reloadDeliveryAddresses(x.id!);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id!);
                                setFleetCarId(0);
                                reloadFleetCars(x.id!);
                                reloadDeliveryAddresses(x.id!);
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
                <TableHeader header={'Fleet Car'}/>
                {fleetCarList.length > 0 ? (
                  <TableBody>
                    {fleetCarList.map((x: any) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetCarId(x.id!);
                                setTripData({
                                  ...tripData,
                                  fleetCarId: x.id!,
                                });
                                reloadTrips(x.id!);
                              }}>
                              <Typography>
                                {x.carYear} {x.makeName} {x.modelName} {x.trimName}: &quot;{x.data.listingNickname ?? 'Unnamed'}&quot;
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

      {fleetCarId != 0 && (
        <>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
            <Alert severity={'success'} sx={{ width: '100%' }}>
              Trip record saved successfully.
            </Alert>
          </Snackbar>

          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Trip Detail</u></Typography>
          </div>

          <Stack direction={'row'}>
            <Item sx={{ width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id={'guest-label'}>Guest</InputLabel>
                <Select labelId={'guest-label'} label={'Guest'}
                        style={{ textAlign: 'left' }}
                        value={tripData.guestId ?? 0}
                        name={'guestId'}
                        onChange={handleChange}
                        fullWidth>
                  {guestList.map((x, counter) => (
                    <MenuItem value={x.id} key={counter}>
                      <Typography style={{ color: (x.blacklisted ? 'red' : 'black') }}>
                        {x.lastName}, {x.firstName} {x.middleName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id={'address-label'}>Delivery Address</InputLabel>
                <Select labelId={'address-label'} label={'Delivery Address'}
                        style={{ textAlign: 'left' }}
                        value={tripData.deliveryAddressId ?? 0}
                        name={'deliveryAddressId'}
                        onChange={handleChange}
                        fullWidth>
                  {addressList.map((x, counter) => (
                    <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '25%' }}>
              <TextField label={'Trip ID'} fullWidth value={tripData.tripId ?? ''}
                         name={'tripId'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '75%' }}>
              <TextField label={'Trip URL'} fullWidth value={tripData.tripUrl ?? ''}
                         name={'tripUrl'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '25%' }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label={'Trip Start'}
                  value={moment(tripData.startTime)} name={'startTime'} onChange={(e) => {
                    setTripData({
                      ...tripData,
                      startTime: e,
                    });
                  }}/>
              </LocalizationProvider>
            </Item>

            <Item sx={{ width: '25%' }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label={'Trip End'}
                                value={moment(tripData.endTime)} onChange={(e) => {
                  setTripData({
                    ...tripData,
                    endTime: e,
                  });
                }}/>
              </LocalizationProvider>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Total Recorded Mileage'} fullWidth value={tripData.mileage ?? ''}
                         name={'mileage'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Total Earnings'} fullWidth value={tripData.earnings ?? ''}
                         name={'earnings'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%', textAlign: 'right' }}>
              <Button color={'error'} onClick={() => clearForm()}>Clear Form</Button>
              <Button onClick={() => saveTrip()}>{tripData.id === 0 ? 'Save' : 'Save Changes'}</Button>
            </Item>
          </Stack>

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
                {tripList.map((row, counter) => {
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
                      <TableCell>
                        <Typography style={{ color: (guestById(row.guestId).blacklisted ? 'red' : 'black') }}>
                          {guestById(row.guestId).lastName.charAt(0)}., {guestById(row.guestId).firstName}
                        </Typography>
                      </TableCell>
                      <TableCell>{deliveryAddressById(row.deliveryAddressId).name ?? 'N/A'}</TableCell>
                      <TableCell>{moment(row.startTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                      <TableCell>{moment(row.endTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                      <TableCell><Link href={row.tripUrl}>{row.tripId}</Link></TableCell>
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
        </>
      )}
    </>
  );
}

export default Trip;
