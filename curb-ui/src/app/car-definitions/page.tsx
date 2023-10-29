'use client';

import {
  Paper,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Snackbar, Alert
} from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  AddOutlined,
  ArrowRightOutlined,
  ClearOutlined,
} from '@mui/icons-material';
import {ICarModel, LoadCarModels } from '@/components/database/car-model';
import {ICarMake, LoadCarMakes, StandardEquipmentList } from '@/components/database/car-make';
import { errorDialog } from '@/components/dialogs/ConfirmDialog';
import {ICarYear, LoadModelYears } from '@/components/database/car-year';
import { ICarTrim, LoadCarTrims } from '@/components/database/car-trim';
import { TableHeader } from '@/components/car-definitions/TableHeader';
import Item from '@/components/common/Item';
import CheckboxTableRow from '@/components/common/CheckboxTableRow';

interface ICarTrimInfo {
  id?: number;
  trimId: number;
  data: any;
}

const SELECTED_COLOR = '#ccf';

const CarDefinitions: NextPage = () => {
  const [carMakes, setCarMakes] = useState<ICarMake[]>([]);
  const [carModels, setCarModels] = useState([]);
  const [carYears, setCarYears] = useState([]);
  const [carTrims, setCarTrims] = useState([]);
  const [carTrimInfo, setCarTrimInfo] = useState(undefined);
  const [carMakesInputShowing, setCarMakesInputShowing] = useState(false);
  const [carModelsInputShowing, setCarModelsInputShowing] = useState(false);
  const [carYearsInputShowing, setCarYearsInputShowing] = useState(false);
  const [carTrimsInputShowing, setCarTrimsInputShowing] = useState(false);
  const [carOptionsInputShowing, setCarOptionsInputShowing] = useState(false);
  const [carColorsInputShowing, setCarColorsInputShowing] = useState(false);
  const [carUrlInputShowing, setCarUrlInputShowing] = useState(false);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const [trimInfoPayload, setTrimInfoPayload] = useState<any>({});
  const [checkedStates, setCheckedStates] = useState(Array(StandardEquipmentList.length).fill(false));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const carMakeRef = useRef('');
  const carModelRef = useRef('');
  const carYearRef = useRef('');
  const carTrimRef = useRef('');
  const trimInfoOptionNameRef = useRef('');
  const trimInfoOptionPriceRef = useRef('');
  const colorNameRef = useRef('');
  const colorPriceRef = useRef('');
  const trimInfoReviewUrlRef = useRef('');
  const trimInfoReviewUrlSiteRef = useRef('');

  const loadCarTrimInfo = (trimId: string) => {
    axios.get(`/curb/car-trim-info/get/${trimId}`)
      .then((x) => {
        if (!x.data.id) {
          setCarTrimInfo(undefined);
          setTrimInfoPayload({});
          setCheckedStates(Array(StandardEquipmentList.length).fill(false));
        } else {
          setCarTrimInfo(x.data);
          setTrimInfoPayload(x.data.data);

          const equipmentStates = StandardEquipmentList.map((y) => {
            return (x.data.data.selectedStandardEquipment.includes(y));
          });

          setCheckedStates(equipmentStates);
        }
      });
  }

  const addCarMake = () => {
    const carMake = carMakeRef.current.value;

    if (carMake.length === 0) {
      errorDialog('Car Make is required.');
      return;
    }

    const payload: ICarMake = {
      name: carMake,
    };

    axios.post('/curb/car-make/create', payload)
      .then((x) => {
        LoadCarMakes((x: ICarMake[]) => setCarMakes(x));
      });

    setCarMakesInputShowing(false);

    carMakeRef.current.value = '';
  }

  const addCarModel = () => {
    const carModel = carModelRef.current.value;

    if (carModel.length === 0) {
      errorDialog('Car Model is required.');
      return;
    }

    const payload: ICarModel = {
      name: carModel,
      makeId: carMakeId,
    };

    axios.post('/curb/car-model/create', payload)
      .then((x) => {
        LoadCarModels(carMakeId, (x: ICarModel[]) => setCarModels(x as never[]));
      });

    setCarModelsInputShowing(false);

    carModelRef.current.value = '';
  }

  const addCarYear = () => {
    const carYear = carYearRef.current.value;

    if (carYear.length === 0) {
      errorDialog('Car Year is required.');
      return;
    }

    const payload: ICarYear = {
      year: parseInt(carYear, 10),
      modelId: carModelId,
    };

    console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

    axios.post('/curb/car-year/create', payload)
      .then((x) => {
        LoadModelYears(carModelId, (x) => setCarYears(x as never[]));
      });

    setCarYearsInputShowing(false);

    carYearRef.current.value = '';
  }

  const addCarTrim = () => {
    const carTrim = carTrimRef.current.value;

    if (carTrim.length === 0) {
      errorDialog('Car Trim level is required.');
      return;
    }

    const payload: ICarTrim = {
      name: carTrim,
      yearId: carYearId,
    };

    console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

    axios.post('/curb/car-trim/create', payload)
      .then((x) => {
        LoadCarTrims(carYearId, (y) => setCarTrims(y as never[]));
      });

    setCarTrimsInputShowing(false);

    carTrimRef.current.value = '';
  }

  const saveCarTrimInfo = () => {
    const payload: ICarTrimInfo = carTrimInfo ? carTrimInfo :
      {
        trimId: carTrimId,
        data: trimInfoPayload,
      };

    payload.data = trimInfoPayload;
    payload.data.selectedStandardEquipment = [];

    StandardEquipmentList.forEach((x, position) => {
      if (checkedStates[position]) {
        payload.data.selectedStandardEquipment.push(x);
      }
    });

    if (carTrimInfo) {
      const result = axios.put(`/curb/car-trim-info/edit/${payload.id}`, payload)
        .then((x) => x.data);

      if (!result) {
        errorDialog('Unable to save trim information.  Please check your listing.');
        return;
      }
    } else {
      axios.post('/curb/car-trim-info/create', payload)
        .then((x) => {
          setCarTrimInfo(x.data);
          setTrimInfoPayload(x.data.data);
        });
    }

    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  }

  const addTrimOption = () => {
    const optionName = trimInfoOptionNameRef.current.value ?? '';
    const optionValue = trimInfoOptionPriceRef.current.value ?? '';

    if (!optionName || !optionValue) {
      errorDialog('Option name and value are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.optionList) {
      tip.optionList = [];
    }

    let found = false;

    tip.optionList.forEach((x: any) => {
      if (x.name === optionName) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Option '${optionName}' already exists in the list.`);
      trimInfoOptionNameRef.current.value = '';
      trimInfoOptionPriceRef.current.value = '';
      return;
    }

    tip.optionList.push({
      name: optionName,
      value: optionValue,
    });

    setTrimInfoPayload(tip);

    trimInfoOptionNameRef.current.value = '';
    trimInfoOptionPriceRef.current.value = '';

    setCarOptionsInputShowing(false);
  }

  const addColorOption = () => {
    const colorName = colorNameRef.current.value ?? '';
    const colorValue = colorPriceRef.current.value ?? '';

    if (!colorName || !colorValue) {
      errorDialog('Color name and value are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.colorList) {
      tip.colorList = [];
    }

    let found = false;

    tip.colorList.forEach((x: any) => {
      if (x.name === colorName) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Color '${colorValue}' already exists in the list.`);
      colorNameRef.current.value = '';
      colorPriceRef.current.value = '';
      return;
    }

    tip.colorList.push({
      name: colorName,
      value: colorValue,
    });

    setTrimInfoPayload(tip);

    colorNameRef.current.value = '';
    colorPriceRef.current.value = '';

    setCarColorsInputShowing(false);
  }

  const addCarSite = () => {
    const carReviewSiteName = trimInfoReviewUrlSiteRef.current.value ?? '';
    const carReviewUrl = trimInfoReviewUrlRef.current.value ?? '';

    if (!carReviewSiteName || !carReviewUrl) {
      errorDialog('Car review site name and video URL are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.siteList) {
      tip.siteList = [];
    }

    let found = false;

    tip.siteList.forEach((x: any) => {
      if (x.url === carReviewUrl) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Video URL '${carReviewUrl}' already exists in the list.`);
      trimInfoReviewUrlSiteRef.current.value = '';
      trimInfoReviewUrlRef.current.value = '';
      return;
    }

    tip.siteList.push({
      name: carReviewSiteName,
      url: carReviewUrl,
    });

    setTrimInfoPayload(tip);

    trimInfoReviewUrlSiteRef.current.value = '';
    trimInfoReviewUrlRef.current.value = '';

    setCarUrlInputShowing(false);
  }

  const deleteOption = (x: any) => {
    let optionList = trimInfoPayload.optionList ?? [];

    optionList = optionList.filter((y: any) => y.name !== x.name);

    setTrimInfoPayload({
      ...trimInfoPayload,
      optionList,
    });
  }

  const deleteColor = (x: any) => {
    let colorList = trimInfoPayload.colorList ?? [];

    colorList = colorList.filter((y: any) => y.name !== x.name);

    setTrimInfoPayload({
      ...trimInfoPayload,
      colorList,
    });
  }

  const deleteSite = (x: any) => {
    let siteList = trimInfoPayload.siteList ?? [];

    siteList = siteList.filter((y: any) => y.url !== x.url);

    setTrimInfoPayload({
      ...trimInfoPayload,
      siteList,
    });
  }

  const handleChange = (e: any) => {
    setTrimInfoPayload({
      ...trimInfoPayload,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => LoadCarMakes((x) => setCarMakes(x)), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Car Make'}
                             onAdd={() => setCarMakesInputShowing(!carMakesInputShowing)}
                             onEdit={() => {}}/>
                {carMakesInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField id={'namespace'} variant={'standard'} required inputRef={carMakeRef}
                                     autoFocus fullWidth
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setCarMakesInputShowing(false);
                                         carMakeRef.current.value = '';
                                       } else if (ev.key === 'Enter') {
                                         addCarMake();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addCarMake()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {carMakes.length > 0 ? (
                  <TableBody>
                    {carMakes.map((x) => {
                      const bgColor = carMakeId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setCarMakeId(x.id!);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                LoadCarModels(x.id!, (y: ICarModel[]) => setCarModels(y as never[]));
                                setCarYears([]);
                                setCarTrims([]);
                                setCarTrimInfo(undefined);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setCarMakeId(x.id!);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                LoadCarModels(x.id!, (y: ICarModel[]) => setCarModels(y as never[]));
                                setCarYears([]);
                                setCarTrims([]);
                                setCarTrimInfo(undefined);
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
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Car Models'}
                             onAdd={() => {
                               if (carMakeId === 0) {
                                 errorDialog('You cannot add a car model without first selecting a car make.');
                                 return;
                               }

                               setCarModelsInputShowing(!carModelsInputShowing);
                             }} onEdit={() => {}}/>
                {carModelsInputShowing ? (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField id={'namespace'} variant={'standard'}
                                   required inputRef={carModelRef} autoFocus fullWidth
                                   onKeyDown={(ev) => {
                                     if (ev.key === 'Escape') {
                                       setCarModelsInputShowing(false);
                                       carModelRef.current.value = '';
                                     } else if (ev.key === 'Enter') {
                                       addCarModel();
                                     }
                                   }}/></TableCell>
                      <TableCell>
                        <Button variant={'contained'} onClick={() => addCarModel()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
                {carModels.length > 0 ? (
                  <TableBody>
                    {carModels.map((x: any, counter) => {
                      const bgColor = carModelId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={counter}>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setCarModelId(x.id);
                              LoadModelYears(x.id, (y) => setCarYears(y as never[]));
                              setCarYearId(0);
                              setCarTrimId(0);
                              setCarTrims([]);
                              setCarTrimInfo(undefined);
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarModelId(x.id);
                              LoadModelYears(x.id, (y) => setCarYears(y as never[]));
                              setCarYearId(0);
                              setCarTrimId(0);
                              setCarTrims([]);
                              setCarTrimInfo(undefined);
                            }}
                            sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}><ArrowRightOutlined/></TableCell>
                        </TableRow>
                      )})}
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Model Year'} onAdd={() => {
                  if (carModelId === 0) {
                    errorDialog('You cannot add a car year without first selecting a car model.');
                    return;
                  }

                  setCarYearsInputShowing(!carYearsInputShowing);
                }}
                             onEdit={() => {}}/>
                {carYearsInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField id={'namespace'} variant={'standard'}
                                     required inputRef={carYearRef} autoFocus fullWidth
                                     inputProps={{ type: 'number' }}
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setCarYearsInputShowing(false);
                                         carYearRef.current.value = '';
                                       } else if (ev.key === 'Enter') {
                                         addCarYear();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addCarYear()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {carYears.length > 0 ? (
                  <TableBody>
                    {carYears.map((x: any, counter) => {
                      const bgColor = carYearId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={counter}>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setCarYearId(x.id);
                              setCarTrimId(0);
                              LoadCarTrims(x.id, (y) => setCarTrims(y as never[]));
                              setCarTrimInfo(undefined);
                            }}><Typography>{x.year}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarYearId(x.id);
                              setCarTrimId(0);
                              LoadCarTrims(x.id, (y) => setCarTrims(y as never[]));
                              setCarTrimInfo(undefined);
                            }}
                            sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}><ArrowRightOutlined/></TableCell>
                        </TableRow>
                      )})}
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: '25%' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Trim Level'} onAdd={() => {
                  if (carYearId === 0) {
                    errorDialog('You cannot add a car trim without first selecting a car year.');
                    return;
                  }

                  setCarTrimsInputShowing(!carTrimsInputShowing);
                }}
                             onEdit={() => {}}/>
                {carTrimsInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField id={'namespace'} variant={'standard'}
                                     required inputRef={carTrimRef} autoFocus fullWidth
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setCarTrimsInputShowing(false);
                                         carTrimRef.current.value = '';
                                       } else if (ev.key === 'Enter') {
                                         addCarTrim();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addCarTrim()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {carTrims.length > 0 ? (
                  <TableBody>
                    {carTrims.map((x: any, counter) => {
                      const bgColor = carTrimId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={counter}>
                          <TableCell colSpan={2}
                                     sx={{ backgroundColor: bgColor, width: '90%' }}
                                     onClick={() => {
                                       setCarTrimId(x.id);
                                       loadCarTrimInfo(x.id);
                                     }}><Typography>{x.name}</Typography></TableCell>
                        </TableRow>
                      )})}
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

      {carTrimId != 0 ? (
        <>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
            <Alert severity={'success'} sx={{ width: '100%' }}>
              Trim information saved successfully.
            </Alert>
          </Snackbar>
          <p/>
          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Trim Details</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '50%' }}>
                  <TextField label={'MSRP/Base Price'} fullWidth value={trimInfoPayload?.msrp ?? ''}
                             inputProps={{ type: 'number' }} name={'msrp'}
                             onChange={handleChange}/>
                </Item>
                <Item sx={{ width: '50%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'fuel-type-label'}>Fuel Type</InputLabel>
                    <Select labelId={'fuel-type-label'} label={'Fuel Type'} name={'fuelType'}
                            style={{ textAlign: 'left' }} value={trimInfoPayload?.fuelType ?? 0} fullWidth
                            onChange={handleChange}>
                      <MenuItem value={0}>Regular</MenuItem>
                      <MenuItem value={1}>Mid-Grade</MenuItem>
                      <MenuItem value={2}>Premium</MenuItem>
                      <MenuItem value={3}>Battery</MenuItem>
                      <MenuItem value={4}>E-85/Bio-Ethanol</MenuItem>
                      <MenuItem value={5}>Diesel</MenuItem>
                      <MenuItem value={6}>Bio-Diesel</MenuItem>
                      <MenuItem value={7}>Hydrogen</MenuItem>
                      <MenuItem value={8}>LNG/CNG</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Stack>
              <Stack direction={'row'}>
                <Item sx={{ width: '50%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'transmission-label'}>Transmission</InputLabel>
                    <Select labelId={'transmission-label'} label={'Transmission'}
                            style={{ textAlign: 'left' }}
                            value={trimInfoPayload?.transmission ?? 0}
                            name={'transmission'}
                            onChange={handleChange}
                            fullWidth>
                      <MenuItem value={0}>5 Speed Manual</MenuItem>
                      <MenuItem value={1}>6 Speed Manual</MenuItem>
                      <MenuItem value={2}>7 Speed Manual</MenuItem>
                      <MenuItem value={3}>Automatic</MenuItem>
                      <MenuItem value={4}>CVT / e-CVT</MenuItem>
                      <MenuItem value={5}>Single Speed Drive</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
                <Item sx={{ width: '50%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'drivetrain-label'}>Drivetrain</InputLabel>
                    <Select labelId={'drivetrain-label'} label={'Drivetrain'} style={{ textAlign: 'left' }}
                            value={trimInfoPayload?.driveTrain ?? 0} fullWidth name={'driveTrain'}
                            onChange={handleChange}>
                      <MenuItem value={0}>Front-Wheel Drive</MenuItem>
                      <MenuItem value={1}>Rear-Wheel Drive</MenuItem>
                      <MenuItem value={2}>4WD</MenuItem>
                      <MenuItem value={3}>All Wheel Drive</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Stack>
            </div>

            <div style={{ width: '50%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Doors'} fullWidth value={trimInfoPayload?.doors ?? ''} name={'doors'}
                             onChange={handleChange}/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Seats'} fullWidth value={trimInfoPayload?.seats ?? ''} name={'seats'}
                             onChange={handleChange}/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Rows'} fullWidth value={trimInfoPayload?.rows ?? ''} name={'rows'}
                             onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Front Tire Size'} fullWidth value={trimInfoPayload?.frontTire ?? ''} name={'frontTire'}
                             onChange={handleChange}/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Rear Tire Size'} fullWidth value={trimInfoPayload?.rearTire ?? ''} name={'rearTire'}
                             onChange={handleChange}/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Cargo Area'} value={trimInfoPayload?.cargoArea ?? ''} helperText={'(ft³)'} fullWidth
                             inputProps={{ type: 'number' }} name={'cargoArea'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '0.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Performance Figures</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '33%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Horsepower'} fullWidth value={trimInfoPayload?.horsepower ?? ''}
                             inputProps={{ type: 'number' }} name={'horsepower'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Torque'} fullWidth value={trimInfoPayload?.torque ?? ''}
                             inputProps={{ type: 'number' }} name={'torque'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
            </div>

            <div style={{ width: '33%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Top Speed'} fullWidth value={trimInfoPayload?.topSpeed ?? ''} name={'topSpeed'}
                             onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'0-60 Time'} fullWidth value={trimInfoPayload?.timeToSixty ?? ''} name={'timeToSixty'}
                             onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Charge Time to 80%'} fullWidth value={trimInfoPayload?.chargeToEighty ?? ''} name={'chargeToEighty'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
            </div>

            <div style={{ width: '33%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'MPG Highway'} fullWidth value={trimInfoPayload?.mpgHwy ?? ''} name={'mpgHwy'}
                             onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'MPG City'} fullWidth value={trimInfoPayload?.mpgCity ?? ''} name={'mpgCity'}
                             onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'MPG Combined / Range'} fullWidth value={trimInfoPayload?.range ?? ''} name={'range'}
                             onChange={handleChange}/>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ display: 'flex', paddingTop: '1em' }}>
            <div style={{ width: '33%', paddingLeft: '0.5em' }}>
              <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Standard Equipment</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}></TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '90%' }}>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  {StandardEquipmentList
                    .sort((a, b) => (a > b ? 1 : -1))
                    .map((x, cnt: number) => (
                      <>
                        <CheckboxTableRow value={x} onClick={() => {
                          const states = checkedStates;

                          states[cnt] = !states[cnt];

                          // Set checked states like this, or it will NOT WORK.
                          setCheckedStates([...states]);
                        }} checked={checkedStates[cnt]}/>
                      </>
                    ))}
                </Table>
              </TableContainer>
            </div>

            <div style={{ width: '33%', paddingLeft: '0.5em' }}>
              <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Optional Equipment</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '65%' }}>Option Name</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '25%' }}>Price</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                        <IconButton size={'small'} onClick={() => setCarOptionsInputShowing(!carOptionsInputShowing)}>
                          <AddOutlined/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {carOptionsInputShowing ? (
                    <>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TextField
                              label={'Name'} autoFocus fullWidth variant={'standard'}
                              inputRef={trimInfoOptionNameRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarOptionsInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addTrimOption();
                                  setCarOptionsInputShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Price'} fullWidth variant={'standard'}
                              inputRef={trimInfoOptionPriceRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarOptionsInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addTrimOption();
                                  setCarOptionsInputShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <Button variant={'contained'}
                                    onClick={() => addTrimOption()}>ADD</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  <TableBody>
                    {(trimInfoPayload?.optionList ? trimInfoPayload.optionList : [])
                      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                      .map((x: any) => (
                        <>
                          <TableRow hover>
                            <TableCell>{x.name}</TableCell>
                            <TableCell>{x.value}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => deleteOption(x)}>
                                <ClearOutlined/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div style={{ width: '33%', paddingLeft: '0.5em' }}>
              <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Color Options</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '65%' }}>Color Name</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '25%' }}>Price</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                        <IconButton size={'small'} onClick={() => setCarColorsInputShowing(!carColorsInputShowing)}>
                          <AddOutlined/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {carColorsInputShowing ? (
                    <>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TextField
                              label={'Name'} autoFocus fullWidth variant={'standard'}
                              inputRef={colorNameRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarColorsInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addColorOption();
                                  setCarColorsInputShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Price'} fullWidth variant={'standard'}
                              inputRef={colorPriceRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarColorsInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addColorOption();
                                  setCarColorsInputShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <Button variant={'contained'}
                                    onClick={() => addColorOption()}>ADD</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  <TableBody>
                    {(trimInfoPayload?.colorList ? trimInfoPayload.colorList : [])
                      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                      .map((x: any) => (
                        <>
                          <TableRow hover>
                            <TableCell>{x.name}</TableCell>
                            <TableCell>{x.value}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => deleteColor(x)}>
                                <ClearOutlined/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div style={{ display: 'flex', paddingTop: '1em' }}>
            <div style={{ width: '100%', paddingLeft: '0.5em' }}>
              <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Car Reviews</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Review Site</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '55%' }}>Review URL</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                        <IconButton size={'small'} onClick={() => setCarUrlInputShowing(!carUrlInputShowing)}>
                          <AddOutlined/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {carUrlInputShowing ? (
                    <>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TextField
                              label={'Review Site Name'} autoFocus fullWidth variant={'standard'}
                              inputRef={trimInfoReviewUrlSiteRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarUrlInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addCarSite();
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Review Video URL'} fullWidth variant={'standard'}
                              inputRef={trimInfoReviewUrlRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarUrlInputShowing(false);
                                } else if (ev.key === 'Enter') {
                                  addCarSite();
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <Button variant={'contained'}
                                    onClick={() => addCarSite()}>ADD</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  <TableBody>
                    {(trimInfoPayload?.siteList ? trimInfoPayload.siteList : [])
                      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                      .map((x: any) => (
                        <>
                          <TableRow hover>
                            <TableCell>{x.name}</TableCell>
                            <TableCell>{x.url}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => deleteSite(x)}>
                                <ClearOutlined/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
            <Button onClick={() => saveCarTrimInfo()}>Save</Button>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
  // return (<></>);
}

export default CarDefinitions;
