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
  const [carMakesDialogShowing, setCarMakesDialogShowing] = useState(false);
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

    setCarMakesDialogShowing(false);

    carMakeRef.current.value = '';
  }

  useEffect(() => reloadCarMakes(), []);

  return (
    <>
      <Dialog open={carMakesDialogShowing} maxWidth={'sm'} fullWidth>
        <DialogContent>
          <Stack direction={'column'}>
            <Item sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex' }}>
                <TextField id={'namespace'} label={'Car Make'} variant={'outlined'} required inputRef={carMakeRef}
                           autoFocus fullWidth/>
                &nbsp;
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Button onClick={() => addCarMake()} variant={'contained'}>ADD</Button>&nbsp;
                  <Button onClick={() => setCarMakesDialogShowing(false)} variant={'contained'} color={'error'}>CANCEL</Button>
                </Box>
              </Box>
            </Item>
          </Stack>
        </DialogContent>
      </Dialog>

      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Car Make</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <IconButton onClick={() => setCarMakesDialogShowing(true)}>
                        <AddOutlined/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carMakes.length > 0 ? (
                    <>
                      {carMakes.map((x) => (
                        <>
                          <TableRow hover>
                            <TableCell><Typography>{x.name}</Typography></TableCell>
                            <TableCell sx={{ textAlign: 'right' }}><ArrowRightOutlined/></TableCell>
                          </TableRow>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Car Models</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <IconButton onClick={() => setCarMakesDialogShowing(true)}>
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
          </div>
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Model Year</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <IconButton onClick={() => setCarMakesDialogShowing(true)}>
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
          </div>
          <div style={{ width: '25%', borderBottom: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 400, borderBottom: '1px solid #ccc' }}>
              <Table stickyHeader size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Trim Level</TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <IconButton onClick={() => setCarMakesDialogShowing(true)}>
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
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CarDefinitions;
