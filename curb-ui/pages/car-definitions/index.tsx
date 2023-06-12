import {
  Box,
  Paper,
  Stack,
  styled,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent, TextField, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton
} from '@mui/material';
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import {StackItem } from '../../components/StackItem';
import {alertDialog, errorDialog} from '../../components/dialogs/ConfirmDialog';
import axios from 'axios';
import {AddOutlined, ArrowRightOutlined, CheckBoxOutlineBlankOutlined, CheckBoxOutlined} from '@mui/icons-material';
import { TableHeader } from '../../components/car-definitions/TableHeader';
import {ICarMake, ListCarMakes, StandardEquipmentList} from '../../components/database/car-make';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ICarModel {
  id?: number;
  makeId: number;
  name: string;
}

interface ICarYear {
  id?: number;
  modelId: number;
  year: number;
}

interface ICarTrim {
  id?: number;
  yearId: number;
  name: string;
}

interface ICarTrimInfo {
  id?: number;
  trimId: number;
  data: any;
}

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
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const [trimInfoPayload, setTrimInfoPayload] = useState({});
  const carMakeRef = useRef();
  const carModelRef = useRef();
  const carYearRef = useRef();
  const carTrimRef = useRef();

  const loadCarModels = (makeId: number) => {
    axios.get(`/app/car-model/list/${makeId}`)
      .then((x) => {
        setCarModels(x.data);
      });
  }

  const loadModelYears = (modelId: number) => {
    axios.get(`/app/car-year/list/${modelId}`)
      .then((x) => {
        setCarYears(x.data);
      });
  }

  const loadCarTrims = (yearId) => {
    axios.get(`/app/car-trim/list/${yearId}`)
      .then((x) => {
        setCarTrims(x.data);
      });
  }

  const loadCarTrimInfo = (trimId) => {
    axios.get(`/app/car-trim-info/get/${trimId}`)
      .then((x) => {
        if (!x.data.id) {
          setCarTrimInfo(undefined);
          setTrimInfoPayload({});
        } else {
          console.log(`Get: ${JSON.stringify(x.data, null, 2)}`);
          setCarTrimInfo(x.data);
          setTrimInfoPayload(x.data.data);
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

    axios.post('/app/car-make/create', payload)
      .then((x) => {
        ListCarMakes((x: ICarMake[]) => setCarMakes(x));
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

    axios.post('/app/car-model/create', payload)
      .then((x) => {
        loadCarModels(carMakeId);
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

    axios.post('/app/car-year/create', payload)
      .then((x) => {
        loadModelYears(carModelId);
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

    axios.post('/app/car-trim/create', payload)
      .then((x) => {
        loadCarTrims(carYearId);
      });

    setCarTrimsInputShowing(false);

    carTrimRef.current.value = '';
  }

  const saveCarTrimInfo = () => {
    const payload: ICarTrimInfo = carTrimInfo ? carTrimInfo :
      {
        trimId: carTrimId,
      };

    payload.data = trimInfoPayload;

    if (carTrimInfo) {
      console.log(`Sending payload: ${JSON.stringify(payload, null, 2)}`);

      const result = axios.put(`/app/car-trim-info/edit/${payload.id}`, payload)
        .then((x) => {
          console.log(`Edit: ${JSON.stringify(result, null, 2)}`);
          return x.data;
        });

    } else {
      console.log(`Sending payload: ${JSON.stringify(payload, null, 2)}`);

      const result = axios.post('/app/car-trim-info/create', payload)
        .then((x) => {
          console.log(`Save: ${JSON.stringify(x, null, 2)}`);
          return x.data;
        });

      setCarTrimInfo(result);
      setTrimInfoPayload(result.data);
    }
  }

  useEffect(() => ListCarMakes((x) => setCarMakes(x)), []);

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
                        <TableCell colSpan={2}>
                          <TextField id={'namespace'} variant={'standard'}
                            required inputRef={carMakeRef} autoFocus fullWidth
                                     helperText={'[Enter] Saves, [ESC] cancels'}
                            onKeyDown={(ev) => {
                              if (ev.key === 'Escape') {
                                setCarMakesInputShowing(false);
                                carMakeRef.current.value = null;
                              } else if (ev.key === 'Enter') {
                                addCarMake();
                              }
                            }}/></TableCell>
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
                      const bgColor = carMakeId === x.id ? '#ccc' : '#fff';

                      return (
                        <>
                          <TableRow hover>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setCarMakeId(x.id);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                loadCarModels(x.id);
                                setCarYears([]);
                                setCarTrims([]);
                                setCarTrimInfo(undefined);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setCarMakeId(x.id);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                loadCarModels(x.id);
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
                      <TableCell colSpan={2}>
                        <TextField id={'namespace'} variant={'standard'}
                                   required inputRef={carModelRef} autoFocus fullWidth
                                   helperText={'[Enter] Saves, [ESC] cancels'}
                                   onKeyDown={(ev) => {
                                     if (ev.key === 'Escape') {
                                       setCarModelsInputShowing(false);
                                       carModelRef.current.value = null;
                                     } else if (ev.key === 'Enter') {
                                       addCarModel();
                                     }
                                   }}/></TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
                {carModels.length > 0 ? (
                  <TableBody>
                    {carModels.map((x) => {
                      const bgColor = carModelId === x.id ? '#ccc' : '#fff';

                      return (
                        <TableRow hover>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setCarModelId(x.id);
                              loadModelYears(x.id);
                              setCarYearId(0);
                              setCarTrimId(0);
                              setCarTrims([]);
                              setCarTrimInfo(undefined);
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarModelId(x.id);
                              loadModelYears(x.id);
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
                        <TableCell colSpan={2}>
                          <TextField id={'namespace'} variant={'standard'}
                                     required inputRef={carYearRef} autoFocus fullWidth
                                     helperText={'[Enter] Saves, [ESC] cancels'}
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setCarYearsInputShowing(false);
                                         carYearRef.current.value = null;
                                       } else if (ev.key === 'Enter') {
                                         addCarYear();
                                       }
                                     }}/></TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {carYears.length > 0 ? (
                  <TableBody>
                    {carYears.map((x) => {
                      const bgColor = carYearId === x.id ? '#ccc' : '#fff';

                      return (
                        <TableRow hover>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setCarYearId(x.id);
                              setCarTrimId(0);
                              loadCarTrims(x.id);
                              setCarTrimInfo(undefined);
                            }}><Typography>{x.year}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarYearId(x.id);
                              setCarTrimId(0);
                              loadCarTrims(x.id);
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

                  setCarTrimsInputShowing(!carYearsInputShowing);
                }}
                  onEdit={() => {}}/>
                {carTrimsInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <TextField id={'namespace'} variant={'standard'}
                                     required inputRef={carTrimRef} autoFocus fullWidth
                                     helperText={'[Enter] Saves, [ESC] cancels'}
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setCarTrimsInputShowing(false);
                                         carTrimRef.current.value = null;
                                       } else if (ev.key === 'Enter') {
                                         addCarTrim();
                                       }
                                     }}/></TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {carTrims.length > 0 ? (
                  <TableBody>
                    {carTrims.map((x) => {
                      const bgColor = carTrimId === x.id ? '#ccc' : '#fff';

                      return (
                        <TableRow hover>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setCarTrimId(x.id);
                              loadCarTrimInfo(x.id);
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarTrimId(x.id);
                              loadCarTrimInfo(x.id);
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
        </div>
      </Paper>

      {carTrimId != 0 ? (
        <>
          <p/>
          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1em' }}>
            <Typography sx={{ fontWeight: 'bold' }}><u>Trim Details</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '50%' }}>
                  <TextField label={'MSRP/Base Price'} fullWidth/>
                </Item>
                <Item sx={{ width: '50%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'fuel-type-label'}>Fuel Type</InputLabel>
                    <Select labelId={'fuel-type-label'} label={'Fuel Type'}
                            style={{ textAlign: 'left' }}
                            fullWidth>
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
                            fullWidth>
                      <MenuItem value={0}>5 Speed Manual</MenuItem>
                      <MenuItem value={1}>6 Speed Manual</MenuItem>
                      <MenuItem value={2}>7 Speed Manual</MenuItem>
                      <MenuItem value={3}>Automatic</MenuItem>
                      <MenuItem value={4}>CVT</MenuItem>
                      <MenuItem value={5}>Single Speed Drive</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
                <Item sx={{ width: '50%' }}>
                  <FormControl fullWidth>
                    <InputLabel id={'drivetrain-label'}>Drivetrain</InputLabel>
                    <Select labelId={'drivetrain-label'} label={'Drivetrain'}
                            style={{ textAlign: 'left' }}
                            fullWidth>
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
                  <TextField label={'Doors'} fullWidth/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Seats'} fullWidth/>
                </Item>
                <Item sx={{ width: '33%' }}>
                  <TextField label={'Rows'} fullWidth/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '37%' }}>
                  <TextField label={'Front Tire Size'} fullWidth/>
                </Item>
                <Item sx={{ width: '37%' }}>
                  <TextField label={'Rear Tire Size'} fullWidth/>
                </Item>
                <Item sx={{ width: '25%' }}>
                  <TextField label={'Cargo Area'}
                             helperText={'(ft³)'} fullWidth/>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', paddingLeft: '1em' }}>
              <Typography sx={{ fontWeight: 'bold' }}><u>Standard Equipment</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}></TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '90%' }}>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  {StandardEquipmentList.map((x) => (
                    <TableRow hover>
                      <TableCell><CheckBoxOutlineBlankOutlined/></TableCell>
                      <TableCell>{x}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </div>

            <div style={{ width: '50%', paddingLeft: '1em' }}>
              <Typography sx={{ fontWeight: 'bold' }}><u>Standard Equipment</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '65%' }}>Option Name</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '25%' }}>Price</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}>
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
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarOptionsInputShowing(false);
                                  // carTrimRef.current.value = null;
                                } else if (ev.key === 'Enter') {
                                  setCarOptionsInputShowing(false);
                                  // addCarTrim();
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Price'} autoFocus fullWidth variant={'standard'}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setCarOptionsInputShowing(false);
                                  // carTrimRef.current.value = null;
                                } else if (ev.key === 'Enter') {
                                  setCarOptionsInputShowing(false);
                                  // addCarTrim();
                                }
                              }}/>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div sx={{ display: 'flex', width: '100%', textAlign: 'right' }}>
            <Button onClick={() => saveCarTrimInfo()}>Save</Button>
            <Button>Cancel</Button>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
}

export default CarDefinitions;
