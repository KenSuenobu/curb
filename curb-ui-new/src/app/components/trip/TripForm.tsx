import {
  Alert,
  Button,
  FormControl,
  InputLabel, LinearProgress, Link,
  MenuItem,
  Select,
  Snackbar,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import GuestList from '@/app/components/guests/GuestList';
import Item from '@/app/components/common/Item';
import {useSession} from 'next-auth/react';
import AddressList from '@/app/components/addresses/AddressList';
import moment from 'moment';
import {createTrip, loadTrips, saveTrip} from '@/app/services/trip';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import AirlineCodeList from '@/app/components/common/AirlineCodeDatabase';

export interface ITrip {
  id?: number;
  fleetCarId: number;
  guestId: number;
  deliveryAddressId: number;
  tripId: string;
  startTime: any;
  endTime: any;
  mileage: number;
  earnings: number;
  airlineIana: string;
  flightNumber: string;
  arrival: any;
}

export interface ITripForm {
  fleetId: number;
  fleetCarId: number;
  onSaved: () => any;
}

const TripForm = (props: ITripForm) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTrips, setLoadingTrips] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [guestCleared, setGuestCleared] = useState<boolean>(false);
  const [addressCleared, setAddressCleared] = useState<boolean>(false);
  const [guestId, setGuestId] = useState<number>(0);
  const [addressId, setAddressId] = useState<number>(0);
  const [tripList, setTripList] = useState<any>([]);
  const [tripData, setTripData] = useState<ITrip>({
    id: 0,
    fleetCarId: 0,
    guestId: 0,
    deliveryAddressId: 0,
    tripId: '',
    startTime: new Date(),
    endTime: new Date(),
    mileage: 0,
    earnings: 0,
    airlineIana: '',
    flightNumber: '',
    arrival: new Date(),
  });
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const handleChange = (e: any) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setTripData( {
      id: 0,
      fleetCarId: 0,
      guestId: 0,
      deliveryAddressId: 0,
      tripId: '',
      startTime: new Date(),
      endTime: new Date(),
      mileage: 0,
      earnings: 0,
      airlineIana: '',
      flightNumber: '',
      arrival: new Date(),
    });
    setGuestId(0);
    setAddressId(0);
    setGuestCleared(true);
    setAddressCleared(true);
  }

  const saveClicked = () => {
    if (tripData.id === 0) {
      if (!guestId) {
        errorDialog('You must select a guest.');
        return;
      }

      if (!addressId) {
        errorDialog('You must select a delivery address location.');
        return;
      }

      if (!tripData.tripId) {
        errorDialog('You must supply a trip ID');
        return;
      }

      const payload = tripData;

      payload.fleetCarId = props.fleetCarId;
      payload.guestId = guestId;
      payload.deliveryAddressId = addressId;

      createTrip(accessToken, tripData)
        .then((x) => {
          clearForm();
          props.onSaved();
        });
    }
  }

  if (loading) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  if (!props.fleetCarId) {
    return (
      <>
      </>
    );
  }

  return (
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
        <Item sx={{ width: '35%' }}>
          <GuestList fleetId={props.fleetId}
                     cleared={guestCleared}
                     onGuestSelected={(x: number) => setGuestId(x)}
                     onCleared={() => setGuestCleared(false)}/>
        </Item>

        <Item sx={{ width: '65%' }}>
          <AddressList fleetId={props.fleetId}
                       cleared={addressCleared}
                       onAddressSelected={(x: number) => setAddressId(x)}
                       onCleared={() => setAddressCleared(false)}/>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '30%' }}>
          <TextField label={'Trip URL'} fullWidth value={tripData.tripId ?? ''}
                     name={'tripId'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '30%' }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id={'airline-label'}>Airline</InputLabel>
            <Select labelId={'airline-label'} label={'Airline'} name={'airlineIana'}
                    style={{ textAlign: 'left' }} fullWidth
                    onChange={handleChange}>
              {AirlineCodeList.map((x: any, counter: number) => (
                <MenuItem value={x.carrierCode} key={counter}>{x.airline}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Item>

        <Item sx={{ width: '15%' }}>
          <TextField label={'Flight Number'} fullWidth value={tripData.flightNumber ?? ''}
                     name={'flightNumber'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={'Arrival Date/Time'}
                            value={moment(tripData.arrival)} onChange={(e) => {
              setTripData({
                ...tripData,
                endTime: e!,
              });
            }}/>
          </LocalizationProvider>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '25%' }}>
          <TextField label={'Total Recorded Mileage'} fullWidth value={tripData.mileage ?? ''}
                     name={'mileage'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%' }}>
          <TextField label={'Total Earnings'} fullWidth value={tripData.earnings ?? ''}
                     name={'earnings'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '25%' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={'Trip Start'}
                            value={moment(tripData.startTime)} onChange={(e) => {
              setTripData({
                ...tripData,
                startTime: e!,
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
                endTime: e!,
              });
            }}/>
          </LocalizationProvider>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button color={'error'} variant={'contained'}
                  onClick={() => clearForm()}>Clear Form</Button>&nbsp;
          <Button  variant={'contained'}
                   onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </>
  );
}

export default TripForm;
