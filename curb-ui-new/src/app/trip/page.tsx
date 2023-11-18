'use client';

import Paper from '@mui/material/Paper';
import {
  Alert, Button,
  FormControl, InputLabel, Link, MenuItem, Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow, TextField,
  Typography
} from '@mui/material';
import {ArrowRightOutlined} from '@mui/icons-material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import FleetList from '@/app/components/fleet/FleetList';
import {useState} from 'react';
import FleetCarList from '@/app/components/fleet/FleetCarList';
import TripForm from '@/app/components/trip/TripForm';
import TripList from '@/app/components/trip/TripList';

const Trip = () => {
  const [fleetId, setFleetId] = useState<number>(0);
  const [fleetCarId, setFleetCarId] = useState<number>(0);
  const [listRefresh, setListRefresh] = useState<boolean>(false);

  const tripSaved = () => {
    setListRefresh(true);
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <FleetList onClick={(x: any) => setFleetId(x.id)} addable={false}/>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <FleetCarList fleetId={fleetId} addable={false}
                          onClick={(fleetCarId: number) => {
                            setFleetCarId(fleetCarId);
                          }}/>
          </div>
        </div>
      </Paper>

      <TripForm fleetId={fleetId}
                fleetCarId={fleetCarId}
                onSaved={() => tripSaved()}/>
      <p/>
      <TripList fleetCarId={fleetCarId}
                needsRefresh={listRefresh}
                onRefresh={() => setListRefresh(false)}/>
    </>
  );
}

export default Trip;
