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

const CarDefinitions: NextPage = () => {
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carMakesInputShowing, setCarMakesInputShowing] = useState(false);
  const [carModelsInputShowing, setCarModelsInputShowing] = useState(false);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const carMakeRef = useRef();
  const carModelRef = useRef();

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
        console.log(`Data: ${JSON.stringify(x.data, null, 2)}`);
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

    console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

    axios.post('/app/car-model/create', payload)
      .then((x) => {
        console.log(`Data: ${JSON.stringify(x.data, null, 2)}`);
        loadCarModels(carMakeId);
      });

    setCarModelsInputShowing(false);

    carModelRef.current.value = '';
  }

  useEffect(() => reloadCarMakes(), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Car Make'} onClick={() => setCarMakesInputShowing(!carMakesInputShowing)}/>
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
                                loadCarModels(x.id);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setCarMakeId(x.id);
                                setCarModelId(0);
                                loadCarModels(x.id);
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%' }}><ArrowRightOutlined/></TableCell>
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
                <TableHeader header={'Car Models'} onClick={() => {
                  if (carMakeId === 0) {
                    errorDialog('You cannot add a car model without first selecting a car make.');
                    return;
                  }

                  setCarModelsInputShowing(!carModelsInputShowing);
                }}/>
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
                            onClick={() => setCarModelId(x.id)}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => setCarModelId(x.id)}
                            sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%' }}><ArrowRightOutlined/></TableCell>
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
                <TableHeader header={'Model Year'} onClick={() => {}}/>
                <TableBody>
                  {/*{carMakes.length > 0 ? (*/}
                  {/*  <>*/}
                  {/*    {carMakes.map((x) => (*/}
                  {/*      <>*/}
                  {/*        <TableRow hover>*/}
                  {/*          <TableCell><Typography>{x.name}</Typography></TableCell>*/}
                  {/*          <TableCell sx={{ textAlign: 'right' }}><ArrowRightOutlined/></TableCell>*/}
                  {/*        </TableRow>*/}
                  {/*      </>*/}
                  {/*    ))}*/}
                  {/*  </>*/}
                  {/*) : (*/}
                  {/*  <>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ height: '360px', textAlign: 'center', paddingTop: '160px' }}/>
          </div>
          <div style={{ width: '25%' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Trim Level'} onClick={() => {}}/>
                <TableBody>
                  {/*{carMakes.length > 0 ? (*/}
                  {/*  <>*/}
                  {/*    {carMakes.map((x) => (*/}
                  {/*      <>*/}
                  {/*        <TableRow hover>*/}
                  {/*          <TableCell><Typography>{x.name}</Typography></TableCell>*/}
                  {/*          <TableCell sx={{ textAlign: 'right' }}><ArrowRightOutlined/></TableCell>*/}
                  {/*        </TableRow>*/}
                  {/*      </>*/}
                  {/*    ))}*/}
                  {/*  </>*/}
                  {/*) : (*/}
                  {/*  <>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </TableBody>
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
