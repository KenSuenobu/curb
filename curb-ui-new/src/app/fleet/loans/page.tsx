'use client';

import {
  Alert, Button, FormControl, IconButton, InputLabel, MenuItem,
  Paper, Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow, TextField,
  Typography
} from '@mui/material';
import {AddOutlined, ArrowRightOutlined} from '@mui/icons-material';
import moment from 'moment/moment';
import {useState} from 'react';
import FleetList from '@/app/components/fleet/FleetList';
import FleetCarList from '@/app/components/fleet/FleetCarList';
import FleetLoanForm from '@/app/components/fleet/FleetLoanForm';
import fleetCarList from '@/app/components/fleet/FleetCarList';

const FleetLoans = () => {
  const [fleetId, setFleetId] = useState<number>(0);
  const [fleetCarId, setFleetCarId] = useState<number>(0);
  const [needsClear, setNeedsClear] = useState<boolean>(false);

  const onSave = () => {
  }

  const onClear = () => {
    setFleetCarId(0);
    setNeedsClear(true);
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <FleetList onClick={(x: any) => setFleetId(x.id)} addable={false}/>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <FleetCarList fleetId={fleetId}
                          needsClear={needsClear}
                          onClick={(fleetCarId: number) => setFleetCarId(fleetCarId)}
                          onClear={() => setNeedsClear(false)}/>
          </div>
        </div>
      </Paper>

      {fleetCarId !== 0 && (
        <FleetLoanForm fleetCarId={fleetCarId}
                       onSave={() => onSave()}
                       onClear={() => onClear()}/>
      )}
    </>
  );
}

export default FleetLoans;
