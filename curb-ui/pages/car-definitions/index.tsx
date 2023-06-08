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
  DialogContent, TextField, DialogActions
} from '@mui/material';
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import {StackItem } from '../../components/StackItem';
import {alertDialog, errorDialog} from '../../components/dialogs/ConfirmDialog';
import axios from 'axios';

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
            <Stack direction={'row'} sx={{ borderBottom: '1px solid #ccc' }}>
              <Item sx={{ width: '75%', textAlign: 'left' }}>Car Makes</Item>
              <Item sx={{ width: '25%', textAlign: 'right' }}>+</Item>
            </Stack>
              {carMakes.length > 0 ? (
                <>
                  {carMakes.map((x) => (
                    <>
                      <Stack direction={'row'}>
                        <Item sx={{ width: '85%', textAlign: 'left'}}>{x.name}</Item>
                        <Item sx={{ width: '15%', textAlign: 'right'}}>&gt;</Item>
                      </Stack>
                    </>
                  ))}
                </>
              ) : (
                <>
                </>
              )}
          </div>
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Stack direction={'row'}>
              <Item sx={{ width: '75%', textAlign: 'left' }}>Car Models</Item>
              <Item sx={{ width: '25%', textAlign: 'right' }}>+</Item>
            </Stack>
          </div>
          <div style={{ width: '25%', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Stack direction={'row'}>
              <Item sx={{ width: '75%', textAlign: 'left' }}>Model Year</Item>
              <Item sx={{ width: '25%', textAlign: 'right' }}>+</Item>
            </Stack>
          </div>
          <div style={{ width: '25%', borderBottom: '1px solid #ccc' }}>
            <Stack direction={'row'}>
              <Item sx={{ width: '75%', textAlign: 'left' }}>Trim Level</Item>
              <Item sx={{ width: '25%', textAlign: 'right' }}>+</Item>
            </Stack>
          </div>
        </div>
        <p/>
        <Stack direction={'column'}>
          <Item sx={{ width: '25%', paddingLeft: '6px', borderRight: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex' }}>
              <Item>Car Make</Item>
              <FormControl fullWidth>
                <InputLabel id={'car-make-select-label'}>Car Make</InputLabel>
                <Select labelId={'car-make-select-label'} id={'car-make-select'} label={'Car Make'}>
                  {carMakes.length > 0 ? (
                    <>
                      {carMakes.map((x) => <MenuItem value={x.id}>{x.name}</MenuItem>)}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </Select>
              </FormControl>
              &nbsp;
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant={'outlined'} onClick={() => setCarMakesDialogShowing(true)}>ADD</Button>
              </Box>
            </Box>
          </Item>
        </Stack>
      </Paper>
    </>
  );
}

export default CarDefinitions;
