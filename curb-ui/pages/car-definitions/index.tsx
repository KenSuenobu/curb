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

const CarDefinitions: NextPage = () => {
  const [carMakes, setCarMakes] = useState([]);
  const [carMakesInputShowing, setCarMakesInputShowing] = useState(false);
  const [carMakeId, setCarMakeId] = useState(0);
  const carMakeRef = useRef();

  const reloadCarMakes = () => {
    axios.get('/app/car-make/list')
      .then((x) => {
        setCarMakes(x.data);
      });
  };

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

  useEffect(() => reloadCarMakes(), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#ddd' }}>Car Make</TableCell>
                    <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right', borderRight: '1px solid #aaa' }}>
                      <IconButton onClick={() => setCarMakesInputShowing(true)}>
                        <AddOutlined/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
                              sx={{ backgroundColor: bgColor}}
                              onClick={() => setCarMakeId(x.id)}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => setCarMakeId(x.id)}
                              sx={{ textAlign: 'right', backgroundColor: bgColor }}><ArrowRightOutlined/></TableCell>
                          </TableRow>
                        </>
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
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#ddd' }}>Car Models</TableCell>
                    <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right', borderRight: '1px solid #aaa' }}>
                      <IconButton onClick={() => setCarMakesInputShowing(true)}>
                        <AddOutlined/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#ddd' }}>Model Year</TableCell>
                    <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right', borderRight: '1px solid #aaa' }}>
                      <IconButton onClick={() => setCarMakesInputShowing(true)}>
                        <AddOutlined/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
          <div style={{ width: '25%', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#ddd' }}>Trim Level</TableCell>
                    <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right' }}>
                      <IconButton onClick={() => setCarMakesInputShowing(true)}>
                        <AddOutlined/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
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
