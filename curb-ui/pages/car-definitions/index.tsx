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
import {AddOutlined, ArrowRightOutlined} from '@mui/icons-material';
import { TableHeader } from '../../components/car-definitions/TableHeader';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ICarMake {
  id?: number;
  name: string;
}

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

const CarDefinitions: NextPage = () => {
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carYears, setCarYears] = useState([]);
  const [carTrims, setCarTrims] = useState([]);
  const [carMakesInputShowing, setCarMakesInputShowing] = useState(false);
  const [carModelsInputShowing, setCarModelsInputShowing] = useState(false);
  const [carYearsInputShowing, setCarYearsInputShowing] = useState(false);
  const [carTrimsInputShowing, setCarTrimsInputShowing] = useState(false);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const carMakeRef = useRef();
  const carModelRef = useRef();
  const carYearRef = useRef();
  const carTrimRef = useRef();

  const reloadCarMakes = () => {
    axios.get('/app/car-make/list')
      .then((x) => {
        setCarMakes(x.data);
      });
  };

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
        reloadCarMakes();
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

  useEffect(() => reloadCarMakes(), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc', width: '100%' }}>
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
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc', width: '100%' }}>
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
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarModelId(x.id);
                              loadModelYears(x.id);
                              setCarYearId(0);
                              setCarTrimId(0);
                              setCarTrims([]);
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
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
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
                            }}><Typography>{x.year}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarYearId(x.id);
                              setCarTrimId(0);
                              loadCarTrims(x.id);
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
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
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
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setCarTrimId(x.id);
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
            <div style={{ height: '360px', textAlign: 'center', paddingTop: '160px' }}/>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CarDefinitions;
