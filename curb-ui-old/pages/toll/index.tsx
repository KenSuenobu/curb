import {
  Alert, Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem, Paper,
  Select,
  Snackbar,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Item from 'curb-ui/src/components/common/Item';
import {SearchOutlined} from '@mui/icons-material';
import moment from 'moment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {errorDialog} from 'curb-ui/src/components/dialogs/ConfirmDialog';
import axios from 'axios';

export interface ITollProps {
  jwt: string;
}

const Toll = (props: ITollProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fleetCarData, setFleetCarData] = useState<any>({});
  const [tripLookupData, setTripLookupData] = useState<any>(null);
  const [pastTripData, setPastTripData] = useState<any>([]);
  const [tripData, setTripData] = useState<any>({});

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
      }).catch((x) => {
        errorDialog(`Unable to retrieve login data; please login again: ${x}`);
        return;
      });
  }, [props.jwt]);

  const reloadPastTrips = (tripId: number) => {
    axios.get(`/app/toll/list/${tripId}`)
      .then((x) => {
        console.log(`Data: ${x.data}`);
        setPastTripData(x.data);
      })
      .catch((x) => {
        errorDialog('Unable to retrieve list of previous trips');
        setPastTripData([]);
      });
  }

  const handleChange = (e: any) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setTripData({});
    setFleetCarData({});
    setTripLookupData(null);
    setPastTripData([]);
  }

  const searchForLicensePlate = () => {
    const licensePlate = tripData.licensePlate ?? '';
    const transponderId = tripData.transponderId ?? '';

    if (licensePlate.length === 0 && transponderId.length === 0) {
      errorDialog('You must enter a license plate number or transponder ID');
      return;
    }

    if (licensePlate.length > 0 && transponderId.length > 0) {
      errorDialog('You cannot search by both a license plate number and transponder ID');
      return;
    }

    if (licensePlate) {
      axios.get(`/app/fleet/find/fleet-car/licensePlate/${licensePlate}`)
        .then((x) => {
          setFleetCarData(x.data);

          const payload = {
            fleetCarId: x.data[0].id,
            tripTime: tripData.tollTime,
          };

          axios.post('/app/trip/find', payload)
            .then((x) => {
              setTripLookupData(x.data);

              if (x.data) {
                tripData.tripId = x.data.id;

                reloadPastTrips(x.data.id);
              } else {
                errorDialog('No trip was found for the toll time specified.');
              }
            })
            .catch((x) => {
              errorDialog('No trip matches the toll date.');
              return;
            });
        })
        .catch((x) => {
          errorDialog('Fleet car cannot be found by the license plate provided.');
          return;
        });
    } else if (transponderId) {
      axios.get(`/app/fleet/find/fleet-car/transponderId/${transponderId}`)
        .then((x) => {
          setFleetCarData(x.data);

          const payload = {
            fleetCarId: x.data[0].id,
            tripTime: tripData.tollTime,
          };

          axios.post('/app/trip/find', payload)
            .then((x) => {
              setTripLookupData(x.data);

              if (x.data) {
                tripData.tripId = x.data.id;

                reloadPastTrips(x.data.id);
              } else {
                errorDialog('No trip was found for the toll time specified.');
              }
            })
            .catch((x) => {
              errorDialog('No trip matches the toll date.');
              return;
            });
        })
        .catch((x) => {
          errorDialog('Fleet car cannot be found by the license plate provided.');
          return;
        });
    }
  }

  const saveToll = () => {
    const payload = tripData;

    if (!payload.tollLocation) {
      errorDialog('Toll location is required.');
      return;
    }

    if (!payload.tollAmount) {
      errorDialog('Toll amount is required.');
      return;
    }

    if (!tripLookupData.id) {
      errorDialog('You need to search for a trip.');
      return;
    }

    axios.post('/app/toll/create', payload)
      .then((x) => {
        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      })
      .catch((x) => {
        errorDialog(`Unable to save toll entry: ${x}`);
      });
  }

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
        <Alert severity={'success'} sx={{ width: '100%' }}>
          Toll record saved successfully.
        </Alert>
      </Snackbar>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Toll Detail</u></Typography>
      </div>

      {(tripLookupData || fleetCarData.length > 0) && (
        <Stack direction={'row'}>
          <Item sx={{ width: '100%', textAlign: 'left' }}>
            <Typography>
              {fleetCarData.length > 0 && (
                <>
                  <b>Fleet Car:</b> {fleetCarData[0].carYear} {fleetCarData[0].makeName} {fleetCarData[0].modelName} {fleetCarData[0].trimName} ({fleetCarData[0].data.licensePlate})
                </>
              )}
              {tripLookupData && (
                <>
                  <br/>
                  <b>Trip:</b> {moment(tripLookupData.startTime).format('ddd, MMM D YYYY; LT')} to {
                    moment(tripLookupData.endTime).format('ddd, MMM D YYYY; LT')}
                </>
              )}
              {!tripLookupData && fleetCarData.length > 0 && (
                <>
                  <br/>
                  <b>No trip was found for the date specified.</b>
                </>
              )}
            </Typography>
          </Item>
        </Stack>
      )}

      <p/>

      <Stack direction={'row'}>
        <Item sx={{ width: '25%' }}>
          <TextField label={'License Plate'} fullWidth value={tripData.licensePlate ?? ''}
                     name={'licensePlate'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%' }}>
          <TextField label={'Transponder ID'} fullWidth value={tripData.transponderId ?? ''}
                     name={'transponderId'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%', textAlign: 'left' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={'Trip Start'}
                            value={moment(tripData.tollTime)} onChange={(e) => {
              setTripData({
                ...tripData,
                tollTime: e,
              });
            }}/>
          </LocalizationProvider>
        </Item>

        <Item>
          <IconButton onClick={() => searchForLicensePlate()}>
            <SearchOutlined/>
          </IconButton>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '50%' }}>
          <TextField label={'Toll Location'} fullWidth value={tripData.tollLocation ?? ''}
                     name={'tollLocation'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%' }}>
          <TextField label={'Toll Charge'} fullWidth value={tripData.tollAmount ?? ''}
                     name={'tollAmount'} onChange={handleChange}/>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          <Button onClick={() => saveToll()}>{tripData.id === 0 ? 'Save' : 'Save Changes'}</Button>
        </Item>
      </Stack>

      <TableContainer component={Paper}>
        <Table size={'small'}>
          <TableHead>
            <TableRow style={{ backgroundColor: '#000' }}>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Toll #</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Toll Time</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastTripData.map((row, counter) => (
              <TableRow hover key={counter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{pastTripData.length - counter}</TableCell>
                <TableCell>{moment(row.tollTime).format('ddd, MMM D YYYY; LT')}</TableCell>
                <TableCell>{row.tollLocation}</TableCell>
                <TableCell>$ {row.tollAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {pastTripData.length === 0 && (
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

export default Toll;
