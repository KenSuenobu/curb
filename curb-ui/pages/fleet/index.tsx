import React, {useEffect, useRef, useState} from 'react';
import {IFleet, LoadFleet} from '../../components/database/fleet';
import {
  Alert,
  Button,
  FormControl, IconButton, InputLabel, MenuItem,
  Paper, Select, Snackbar,
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
import {ArrowRightOutlined, PreviewOutlined} from '@mui/icons-material';
import {errorDialog} from '../../components/dialogs/ConfirmDialog';
import axios from 'axios';
import {ICarMake, LoadCarMakes} from '../../components/database/car-make';
import Item from '../../components/common/Item';
import {ICarYear, LoadModelYears} from '../../components/database/car-year';
import {ICarTrim, LoadCarTrims} from '../../components/database/car-trim';
import {IFleetCar, LoadFleetCars } from '../../components/database/fleet-car';

const SELECTED_COLOR = '#ccf';

const Fleet = () => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [carMakeList, setCarMakeList] = useState<ICarMake[]>([]);
  const [carModelList, setCarModelList] = useState<ICarModel[]>([]);
  const [carYearList, setCarYearList] = useState<ICarYear[]>([]);
  const [carTrimList, setCarTrimList] = useState<ICarTrim[]>([]);
  const [fleetInputShowing, setFleetInputShowing] = useState(false);
  const [fleetCarInputShowing, setFleetCarInputShowing] = useState(false);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const [fleetCar, setFleetCar] = useState({});
  const [carFleetData, setCarFleetData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const fleetRef = useRef();

  const reloadFleet = () => {
    LoadFleet((x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
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

  const addFleetCar = () => {
    if (carTrimId === 0) {
      errorDialog('Fleet trim ID is required.');
      return;
    }

    axios.post('/app/fleet/create/car', {
      fleetId,
      carTrimId,
      data: {},
    }).then((x) => {
      reloadFleetCars(fleetId);
      setCarMakeId(0);
      setCarModelId(0);
      setCarYearId(0);
      setCarTrimId(0);
      setFleetCarId(0);
      setCarModelList([]);
      setCarYearList([]);
      setCarTrimList([]);
      setCarFleetData(x.data.data);
      setFleetCar(x.data);
    });
  }

  const saveFleetCar = () => {
    if (fleetCarId === 0) {
      errorDialog('Unable to persist data.');
      return;
    }

    const payload = fleetCar;

    payload.data = carFleetData;

    console.log(`Fleet Car: ${JSON.stringify(payload, null, 2)}`);

    axios.put('/app/fleet/save/car', payload)
      .then((x) => {
        if (!x.data) {
          errorDialog('Unable to save fleet car information.  Please check your listing.');
          return;
        }

        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      });
  }

  const handleChange = (e) => {
    setCarFleetData({
      ...carFleetData,
      [e.target.name]: e.target.value,
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
                              reloadFleetCars(x.id);
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setFleetId(x.id);
                              reloadFleetCars(x.id);
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
                <TableHeader header={'Fleet Car'}
                             onAdd={() => {
                               if (fleetId === 0) {
                                 errorDialog('You must first select a fleet.');
                                 return;
                               }
                               setFleetCarInputShowing(!fleetCarInputShowing);
                               setCarMakeId(0);
                               setCarModelId(0);
                               setCarYearId(0);
                               setCarTrimId(0);
                               setFleetCarId(0);
                               setCarModelList([]);
                               setCarYearList([]);
                               setCarTrimList([]);
                               setCarFleetData({});
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
                                        setCarModelId(0);
                                        setCarYearId(0);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadCarModels(e.target.value, (x) => setCarModelList(x));
                                        setCarYearList([]);
                                        setCarTrimList([]);
                                        setCarFleetData({});
                                      })}>
                                {carMakeList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Model</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Model'} name={'carModel'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e) => {
                                        setCarModelId(e.target.value);
                                        setCarYearId(0);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadModelYears(e.target.value, (x) => setCarYearList(x));
                                        setCarTrimList([]);
                                        setCarFleetData({});
                                      }}>
                                {carModelList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Year</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Year'} name={'carYear'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e) => {
                                        setCarYearId(e.target.value);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadCarTrims(e.target.value, (x) => setCarTrimList(x));
                                        setCarFleetData({});
                                      }}>
                                {carYearList.map((x) => <MenuItem value={x.id}>{x.year}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Trim</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Trim'} name={'carTrim'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e) => {
                                        setCarTrimId(e.target.value);
                                        setFleetCarId(0);
                                        setCarFleetData({});
                                      }}>
                                {carTrimList.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item>
                            <Button variant={'contained'}
                                    disabled={carTrimId === 0}
                                    onClick={() => addFleetCar()}>ADD</Button>
                          </Item>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
                {fleetCarList.length > 0 ? (
                  <TableBody>
                    {fleetCarList.map((x) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetCarId(x.id);
                                setFleetCarInputShowing(false);
                                setFleetCar(x);
                                setCarFleetData(x.data);
                                setCarMakeId(0);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                setCarModelList([]);
                                setCarYearList([]);
                                setCarTrimList([]);
                              }}><Typography>{x.carTrimId}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetCarId(x.id);
                                setFleetCarInputShowing(false);
                                setFleetCar(x);
                                setCarFleetData(x.data);
                                setCarMakeId(0);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                setCarModelList([]);
                                setCarYearList([]);
                                setCarTrimList([]);
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}></TableCell>
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

      {fleetCarId != 0 ? (
        <>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
            <Alert severity={'success'} sx={{ width: '100%' }}>
              Car fleet information saved successfully.
            </Alert>
          </Snackbar>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Fleet Car Detail</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '25%' }}>
                  <TextField label={'Dealership Name'} fullWidth value={carFleetData.dealershipName ?? ''}
                             name={'dealershipName'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Dealership Phone'} fullWidth value={carFleetData.dealershipPhone ?? ''}
                             name={'dealershipPhone'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Dealership State/Province'} fullWidth value={carFleetData.dealershipState ?? ''}
                             name={'dealershipState'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Dealership Country'} fullWidth value={carFleetData.dealershipCountry ?? ''}
                             name={'dealershipCountry'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'VIN'} fullWidth value={carFleetData.vin ?? ''}
                             name={'vin'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '34%' }}>
                  <TextField label={'Purchase Price'} fullWidth value={carFleetData.purchasePrice ?? ''}
                             inputProps={{ type: 'number' }} name={'purchasePrice'}
                             onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '33%' }}>
                  <TextField label={'Purchase Date'} fullWidth value={carFleetData.purchaseDate ?? ''}
                             name={'purchaseDate'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '25%' }}>
                  <TextField label={'License Plate'} fullWidth value={carFleetData.licensePlate ?? ''}
                             name={'licensePlate'}
                             onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'License Registration State'} fullWidth value={carFleetData.licenseState ?? ''}
                             name={'licenseState'}
                             onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'License Registration Country'} fullWidth value={carFleetData.licenseCountry ?? ''}
                             name={'licenseCountry'}
                             onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '17%' }}>
                  <TextField label={'Expire Month'} fullWidth value={carFleetData.licenseExpireMonth ?? ''}
                             name={'licenseExpireMonth'}
                             onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '17%' }}>
                  <TextField label={'Expire Year'} fullWidth value={carFleetData.licenseExpireYear ?? ''}
                             name={'licenseExpireYear'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Car Listing Details</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '25%' }}>
                  <TextField label={'Car Nickname'} fullWidth value={carFleetData.listingNickname ?? ''}
                             name={'listingNickname'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '75%' }}>
                  <TextField label={'Car Listing URL'} fullWidth value={carFleetData.listingUrl ?? ''}
                             name={'listingUrl'} onChange={handleChange}/>
                </Item>

                <Item>
                  <IconButton>
                    <PreviewOutlined
                      onClick={() => {
                        if (carFleetData.listingUrl) {
                          window.open(carFleetData.listingUrl);
                          return;
                        }

                        errorDialog('No URL has been specified.');
                      }}/>
                  </IconButton>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Car Ownership</u></Typography>
          </div>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Registration Detail</u></Typography>
          </div>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Insurance Detail</u></Typography>
          </div>

          <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
            <Button onClick={() => saveFleetCar()}>Save</Button>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
}

export default Fleet;
