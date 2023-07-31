import {
  Alert, Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack, TableCell,
  TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Item from '@/components/common/Item';
import {SearchOutlined} from '@mui/icons-material';
import moment from 'moment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import axios from 'axios';

export interface ITollProps {
  jwt: string;
}

const Toll = (props: ITollProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fleetCarData, setFleetCarData] = useState<any>({});
  const [tripLookupData, setTripLookupData] = useState<any>(null);
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
  }

  const searchForLicensePlate = () => {
    const licensePlate = tripData.licensePlate ?? '';

    if (licensePlate.length === 0) {
      errorDialog('You must enter a license plate number');
      return;
    }

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

      <Stack direction={'row'}>
        <Item sx={{ width: '25%' }}>
          <TextField label={'License Plate'} fullWidth value={tripData.licensePlate ?? ''}
                     name={'licensePlate'} onChange={handleChange}/>
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

        <Item sx={{ width: '50%', textAlign: 'left' }}>
          {fleetCarData.length > 0 && (
            <>
              <b>Fleet Car:</b> {fleetCarData[0].carYear} {fleetCarData[0].makeName} {fleetCarData[0].modelName} {fleetCarData[0].trimName}
            </>
          )}
          {tripLookupData && (
            <>
              <br/>
              <b>Trip:</b> {moment(tripLookupData.startTime).format('ddd, MMM D YYYY; LT')} to {moment(tripLookupData.endTime).format('ddd, MMM D YYYY; LT')}
            </>
          )}
          {!tripLookupData && fleetCarData.length > 0 && (
            <>
              <br/>
              <b>No trip was found for the date specified.</b>
            </>
          )}
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

      <pre>
        {JSON.stringify(tripData, null, 2)}
      </pre>
    </>
  );
}

export default Toll;
