import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button, Checkbox,
  FormControl, FormControlLabel,
  InputLabel, MenuItem,
  Paper, Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {ArrowRightOutlined} from '@mui/icons-material';
import {confirmDialog, errorDialog} from '@/components/dialogs/ConfirmDialog';
import { TableHeader } from '@/components/car-definitions/TableHeader';
import Item from '@/components/common/Item';

const SELECTED_COLOR = '#ccf';

export interface IGuest {
  id: number;
  guestId: string;
  guestIdSource: string;
  blacklisted: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  data: any;
}

export interface IGuestProps {
  jwt: string;
  blacklisted: boolean;
}

const Guests = (props: IGuestProps) => {
  const [userInfo, setUserInfo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formShowing, setFormShowing] = useState(false);
  const [guestList, setGuestList] = useState([]);
  const [guestData, setGuestData] = useState<IGuest>({
    id: 0,
    guestId: '',
    guestIdSource: '',
    blacklisted: props.blacklisted,
    firstName: '',
    middleName: '',
    lastName: '',
    data: {},
  });

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
      }).catch((x) => {
        errorDialog('Unable to retrieve login data; please login again.');
        return;
      });
  }, [props.jwt]);

  const reloadGuestList = () => {
    axios.get(`/app/guest/list/${props.blacklisted}`)
      .then((x) => {
        setGuestList(x.data);
      })
      .catch((x) => {
        setGuestList([]);
        console.log(`Unable to get guest list: ${x}`, x);
      });
  }

  const clearForm = () => {
    setGuestData({
      id: 0,
      guestId: '',
      guestIdSource: '',
      blacklisted: props.blacklisted,
      firstName: '',
      middleName: '',
      lastName: '',
      data: {},
    });
  }

  const whitelistClicked = () => {
    confirmDialog('Are you sure you wish to whitelist this guest?', () => {
      saveGuest(false);
    });
  }

  const blacklistClicked = () => {
    confirmDialog('Are you sure you wish to blacklist this guest?', () => {
      saveGuest(true);
    });
  }

  const handleChange = (e: any) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value,
    });
  }

  const handleDataChange = (e: any) => {
    const data = guestData.data;

    data[e.target.name] = e.target.value;

    setGuestData({
      ...guestData,
      data,
    });
  }

  const handleCheckbox = (e: any) => {
    const data = guestData.data;

    data.incomplete = e.target.checked;

    setGuestData({
      ...guestData,
      data,
    });
  }

  const getGuest = (id: number) => {
    console.log(`Retrieve: ${id}`);
    axios.get(`/app/guest/get/${id}`)
      .then((x) => {
        setGuestData(x.data);
        console.log(`Data: ${JSON.stringify(x.data, null, 2)}`);
      })
      .catch((x) => {
        errorDialog(`Unable to retrieve guest: ${x}`);
      });
  }

  const saveGuest = (blacklisted?: boolean) => {
    const payload = guestData;

    if (guestData.firstName.length === 0 || guestData.lastName.length === 0) {
      errorDialog('Guest first and last name are required.');
      return;
    }

    if (!guestData.data.incomplete) {
      if (!guestData.data.address1 || !guestData.data.city || !guestData.data.stateProvince ||
        !guestData.data.zipcode || !guestData.data.country) {
        errorDialog('Address information is incomplete.');
        return;
      }
    }

    if (blacklisted) {
      payload.blacklisted = blacklisted;
    }

    if (payload.id !== 0) {
      axios.put(`/app/guest/edit`, payload)
        .then((x) => {
          clearForm();
          reloadGuestList();
        })
        .catch((x) => {
          errorDialog(`Unable to save guest: ${x}`);
        })
    } else {
      axios.post(`/app/guest/create`, payload)
        .then((x) => {
          clearForm();
          reloadGuestList();
        })
        .catch((x) => {
          errorDialog(`Unable to add guest: ${x}`);
        });
    }
  }

  useEffect(() => {
    reloadGuestList();
  }, [props.blacklisted]);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '100%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                {props.blacklisted ? (
                  <>
                    <TableHeader header={'Blacklisted Guests'}
                                 onAdd={() => clearForm()}
                                 onEdit={() => {}}/>
                  </>
                ) : (
                  <>
                    <TableHeader header={'Guests'}
                                 onAdd={() => clearForm()}
                                 onEdit={() => {}}/>
                  </>
                )}
                {guestList.length > 0 ? (
                  <TableBody>
                    {guestList.map((x: any) => {
                      const bgColor = guestData.id === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                getGuest(x.id);
                              }}><Typography>{x.lastName}, {x.firstName} {x.middleName}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                getGuest(x.id);
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
        </div>
      </Paper>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
        <Alert severity={'success'} sx={{ width: '100%' }}>
          Guest record saved successfully.
        </Alert>
      </Snackbar>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Guest Detail</u></Typography>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <TextField label={'First Name'} fullWidth value={guestData.firstName ?? ''}
                         name={'firstName'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '34%' }}>
              <TextField label={'Middle Name/Initial'} fullWidth value={guestData.middleName ?? ''}
                         name={'middleName'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '33%' }}>
              <TextField label={'Last Name'} fullWidth value={guestData.lastName ?? ''}
                         name={'lastName'} onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <FormControl fullWidth>
                <InputLabel id={'source-label'}>Guest ID Source</InputLabel>
                <Select labelId={'source-label'} label={'Guest ID Source'}
                        style={{ textAlign: 'left' }}
                        value={guestData.guestIdSource ?? 0}
                        name={'guestIdSource'}
                        onChange={handleChange}
                        fullWidth>
                  <MenuItem value={0}>Turo</MenuItem>
                  <MenuItem value={1}>getAround</MenuItem>
                  <MenuItem value={2}>Uber Car Share</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '67%' }}>
              <TextField label={'Guest URL'} fullWidth value={guestData.data.url ?? ''}
                         name={'url'} onChange={handleDataChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Driver&apos;s License Detail</u></Typography>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'left' }}>
          <FormControlLabel control={<Checkbox name={'incomplete'} checked={guestData.data.incomplete ?? false} onChange={handleCheckbox}/>} label={'Info not yet provided'}/>
        </Item>
      </Stack>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 1'} fullWidth value={guestData.data.address1 ?? ''}
                         name={'address1'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 2'} fullWidth value={guestData.data.address2 ?? ''}
                         name={'address2'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 3'} fullWidth value={guestData.data.address3 ?? ''}
                         name={'address3'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '30%' }}>
              <TextField label={'City'} fullWidth value={guestData.data.city ?? ''}
                         name={'city'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'State/Province'} fullWidth value={guestData.data.stateProvince ?? ''}
                         name={'stateProvince'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Zipcode'} fullWidth value={guestData.data.zipcode ?? ''}
                         name={'zipcode'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Country'} fullWidth value={guestData.data.country ?? ''}
                         name={'country'} onChange={handleDataChange}/>
            </Item>
          </Stack>
        </div>

        <div style={{ width: '50%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Phone Number'} fullWidth value={guestData.data.phoneNumber ?? ''}
                         name={'phoneNumber'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Birth Date'} fullWidth value={guestData.data.dob ?? ''}
                         name={'dob'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '34%' }}>
              <TextField label={'Issue Date'} fullWidth value={guestData.data.issueDate ?? ''}
                         name={'issueDate'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '33%' }}>
              <TextField label={'Expire Date'} fullWidth value={guestData.data.expireDate ?? ''}
                         name={'expireDate'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '50%' }}>
              <TextField label={'Issue State/Location'} fullWidth value={guestData.data.issueState ?? ''}
                         name={'issueState'} onChange={handleDataChange}/>
            </Item>
            <Item sx={{ width: '50%' }}>
              <TextField label={'Issue Country'} fullWidth value={guestData.data.issueCountry ?? ''}
                         name={'issueCountry'} onChange={handleDataChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '50%', textAlign: 'left' }}>
          {(props.blacklisted) && (
            <Button color={'error'} onClick={() => whitelistClicked()}>Whitelist this guest</Button>
          )}
          {(!props.blacklisted) && (
            <Button color={'error'} onClick={() => blacklistClicked()}>Blacklist this guest</Button>
          )}
        </Item>

        <Item sx={{ width: '50%', textAlign: 'right' }}>
          <Button color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          <Button onClick={() => saveGuest()}>{guestData.id === 0 ? 'Save' : 'Save Changes'}</Button>
        </Item>
      </Stack>
    </>
  );
}

export default Guests;
