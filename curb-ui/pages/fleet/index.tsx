import React, {useEffect, useRef, useState} from 'react';
import {IFleet, LoadFleet} from '../../components/database/fleet';
import {
  Button,
  FormControl, InputLabel, MenuItem,
  Paper, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '../../components/car-definitions/TableHeader';
import {ICarModel, LoadCarModels} from '../../components/database/car-model';
import {ArrowRightOutlined} from '@mui/icons-material';
import {errorDialog} from '../../components/dialogs/ConfirmDialog';
import axios from 'axios';
import {ICarMake, LoadCarMakes} from '../../components/database/car-make';
import Item from '../../components/common/Item';

const SELECTED_COLOR = '#ccf';

const Fleet = () => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [carMakeList, setCarMakeList] = useState<ICarMake[]>([]);
  const [carModelList, setCarModelList] = useState<ICarModel[]>([]);
  // const [carYearList, setCarYearList] = useState<ICarYear[]>([]);
  // const [carTrimList, setCarTrimList] = useState<ICarTrim[]>([]);
  const [fleetInputShowing, setFleetInputShowing] = useState(false);
  const [fleetCarInputShowing, setFleetCarInputShowing] = useState(false);
  const [fleetId, setFleetId] = useState(0);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const fleetRef = useRef();

  const reloadFleet = () => {
    LoadFleet((x: IFleet[]) => setFleetList(x));
  }

  const addFleet = () => {
    const fleetName = fleetRef.current.value.trim();

    if (fleetName.length === 0) {
      errorDialog('Fleet name is required.');
      return;
    }

    axios.post('/app/fleet/create', {
      name: fleetName,
    }).then((x) => {
      reloadFleet();
      setFleetInputShowing(false);
      fleetRef.current.value = null;
    });
  }

  useEffect(() => reloadFleet(), []);
  useEffect(() => LoadCarMakes((x) => setCarMakeList(x)), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet'}
                             onAdd={() => setFleetInputShowing(!fleetInputShowing)}
                             onEdit={() => {}}/>
                {fleetInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField id={'namespace'} variant={'standard'} required inputRef={fleetRef}
                                     autoFocus fullWidth
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setFleetInputShowing(false);
                                         fleetRef.current.value = '';
                                       } else if (ev.key === 'Enter') {
                                         addFleet();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addFleet()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
              </Table>
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
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setFleetId(x.id);
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
            </TableContainer>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet Car'}
                             onAdd={() => {
                               if (fleetId === 0) {
                                 errorDialog('You must first select a fleet.');
                                 return;
                               }
                               setFleetCarInputShowing(!fleetCarInputShowing);
                             }}
                             onEdit={() => {}}/>
                {fleetCarInputShowing ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colspan={2}>
                        <Stack direction={'row'}>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Make</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Make'} name={'carMake'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={((e) => {
                                        setCarMakeId(e.target.value);
                                        LoadCarModels(e.target.value, (x) => setCarModelList(x));
                                      })}>
                                {carMakeList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Model</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Model'} name={'carModel'}
                                      style={{ textAlign: 'left' }} fullWidth>
                                {carModelList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Year</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Year'} name={'carYear'}
                                      style={{ textAlign: 'left' }} fullWidth>
                                {carMakeList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Trim</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Trim'} name={'carTrim'}
                                      style={{ textAlign: 'left' }} fullWidth>
                                {carMakeList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item>
                            <Button variant={'contained'}
                            disabled={carTrimId === 0}
                                    onClick={() => addFleet()}>ADD</Button>
                          </Item>
                        </Stack>
                      </TableCell>
                    </TableRow>
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
    </>
  );
}

export default Fleet;
