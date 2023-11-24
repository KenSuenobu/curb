import {
  Alert,
  Button,
  FormControl,
  InputLabel, LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import GuestList from '@/app/components/guests/GuestList';
import AddressList from '@/app/components/addresses/AddressList';
import AirlineCodeList from '@/app/components/common/AirlineCodeDatabase';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment/moment';
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {ITrip} from '@/app/components/trip/TripForm';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import {createTrip, getTrip, saveTrip} from '@/app/services/trip';

export interface ITripEditForm {
  tripId: number;
  onEdited: () => any;
  onCanceled: () => any;
}

const TripEditForm = (props: ITripEditForm) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [guestId, setGuestId] = useState<number>(0);
  const [addressId, setAddressId] = useState<number>(0);
  const [fleetId, setFleetId] = useState<number>(0);
  const [tripData, setTripData] = useState<any>({});
  const [guestCleared, setGuestCleared] = useState<boolean>(false);
  const [addressCleared, setAddressCleared] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const handleChange = (e: any) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  }

  const cancelClicked = () => {
    props.onCanceled();
  }

  const saveClicked = () => {
    if (!tripData.tripId) {
      errorDialog('You must supply a trip ID');
      return;
    }

    if (tripData.endTime < tripData.startTime) {
      errorDialog('Your trip cannot end before the trip starts.');
      return;
    }

    saveTrip(accessToken, tripData)
      .then((x: any) => {
        props.onEdited();
      });
  }

  useEffect(() => {
    if (props.tripId) {
      setLoading(true);
      getTrip(accessToken, props.tripId)
        .then((x: any) => {
          setTripData(x.trip);
          setFleetId(x.trip.fleetId);
        })
        .finally(() => setLoading(false));
    }
  }, [props.tripId]);

  if (loading) {
    return (
      <>
        <LinearProgress/>
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
          <GuestList fleetId={tripData.fleetId ?? 0}
                     cleared={guestCleared}
                     selectedGuestId={tripData.guestId}
                     onGuestSelected={(x: number) => setGuestId(x)}
                     onCleared={() => setGuestCleared(false)}/>
        </Item>

        <Item sx={{ width: '65%' }}>
          <AddressList fleetId={tripData.fleetId ?? 0}
                       cleared={addressCleared}
                       selectedAddressId={tripData.deliveryAddressId}
                       onAddressSelected={(x: number) => setAddressId(x)}
                       onCleared={() => setAddressCleared(false)}/>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%' }}>
          <TextField label={'Trip URL'} fullWidth value={tripData.tripId ?? ''}
                     name={'tripId'} onChange={handleChange}/>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '40%' }}>
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

        <Item sx={{ width: '30%' }}>
          <TextField label={'Flight Number'} fullWidth value={tripData.flightNumber ?? ''}
                     name={'flightNumber'} onChange={handleChange}/>
        </Item>

        <Item sx={{ width: '30%' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={'Arrival Date/Time'}
                            value={moment(tripData.arrival)} onChange={(e) => {
              setTripData({
                ...tripData,
                arrival: e!,
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
                  onClick={() => cancelClicked()}>Cancel</Button>&nbsp;
          <Button  variant={'contained'}
                   onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </>
  );
}

export default TripEditForm;
