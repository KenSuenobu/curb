import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import {
  Button,
  FormControl, InputLabel, MenuItem,
  Paper, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '@/components/car-definitions/TableHeader';
import {ArrowRightOutlined} from '@mui/icons-material';
import {IFleet, LoadFleet} from '@/components/database/fleet';
import {IFleetCar, LoadFleetCars} from '@/components/database/fleet-car';
import Item from '@/components/common/Item';
import {TextareaAutosize} from '@mui/base';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment/moment';
import fleet from '@/pages/fleet';

const SELECTED_COLOR = '#ccf';

export interface IFleetCarMaintenance {
  jwt: string;
}

const FleetCarMaintenance = (props: IFleetCarMaintenance) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [fleetMaintenanceList, setFleetMaintenanceList] = useState([]);
  const [fleetMaintenanceRecord, setFleetMaintenanceRecord] = useState({});

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
        errorDialog(`Unable to retrieve login data; please login again: ${x}`);
        return;
      });
  }, [props.jwt]);

  const reloadFleet = (userId: number) => {
    LoadFleet(userId, (x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  const reloadMaintenance = (fId: number) => {
    axios.get(`/app/fleet/list/maintenance/${fId}`)
      .then((x) => setFleetMaintenanceList(x.data))
      .catch((x) => setFleetMaintenanceList([]));
  }

  const handleChange = (e: any) => {
    setFleetMaintenanceRecord({
      ...fleetMaintenanceRecord,
      [e.target.name]: e.target.value,
    });
  }

  const clearForm = () => {
    setFleetMaintenanceRecord({});
  }

  const saveRecord = () => {
    const payload = fleetMaintenanceRecord;

    if (!payload.cost) {
      errorDialog('Cost of repair required.');
      return;
    }

    payload.fleetCarId = fleetCarId;

    if (payload.id) {
      axios.put('/app/fleet/save/maintenance', payload)
        .then((x) => reloadMaintenance(fleetCarId))
        .catch((x) => {
          errorDialog(`Unable to save maintenance record: ${x}`);
          return;
        });
    } else {
      axios.post('/app/fleet/create/maintenance', payload)
        .then((x) => reloadMaintenance(fleetCarId))
        .catch((x) => {
          errorDialog(`Unable to create maintenance record: ${x}`);
          return;
        });
    }
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
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id!);
                                setFleetCarId(0);
                                reloadFleetCars(x.id!);
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
                                reloadMaintenance(x.id!);
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
          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Maintenance Record Detail</u></Typography>
          </div>

          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label={'Time and Day of Record'} sx={{ width: '100%' }}
                                value={moment(fleetMaintenanceRecord.maintenanceTime)} onChange={(e) => {
                  setFleetMaintenanceRecord({
                    ...fleetMaintenanceRecord,
                    maintenanceTime: e,
                  });
                }}/>
              </LocalizationProvider>
            </Item>

            <Item sx={{ width: '34%' }}>
              <FormControl fullWidth>
                <InputLabel id={'source-label'}>Maintenance Type</InputLabel>
                <Select labelId={'source-label'} label={'maintenanceType'}
                        style={{ textAlign: 'left' }}
                        value={fleetMaintenanceRecord.maintenanceType ?? 0}
                        name={'maintenanceType'}
                        onChange={handleChange}
                        fullWidth>
                  <MenuItem value={'Routine'}>Routine</MenuItem>
                  <MenuItem value={'Warranty'}>Warranty</MenuItem>
                  <MenuItem value={'Recall'}>Recall</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '33%' }}>
              <TextField label={'Cost of Repair'} fullWidth value={fleetMaintenanceRecord.cost ?? ''}
                         name={'cost'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextareaAutosize minRows={3} placeholder={'Enter notes here'} style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
                name={'note'} value={fleetMaintenanceRecord.note ?? ''} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%', textAlign: 'right' }}>
              <Button color={'error'} onClick={() => clearForm()}>Clear Form</Button>
              <Button onClick={() => saveRecord()}>{fleetMaintenanceRecord.id === 0 ? 'Save' : 'Save Changes'}</Button>
            </Item>
          </Stack>

          <TableContainer component={Paper}>
            <Table size={'small'}>
              <TableHead>
                <TableRow style={{ backgroundColor: '#000' }}>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Notes</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fleetMaintenanceList.map((row, counter) => (
                  <TableRow hover key={counter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{moment(row.maintenanceTime).format('MM/DD/YYYY; LT')}</TableCell>
                    <TableCell><b>{row.maintenanceType}:</b> {row.note}</TableCell>
                    <TableCell>${row.cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {fleetMaintenanceList.length === 0 && (
                  <>
                    <TableRow hover key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell colSpan={3} style={{ textAlign: 'center' }}>No maintenance records.</TableCell>
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
};

export default FleetCarMaintenance;