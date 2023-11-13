import {
  Alert, Button, Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel, LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  Stack, Table, TableBody, TableCell, TableContainer, TableRow,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import {TableHeader} from '@/app/components/common/TableHeader';
import React, {useEffect, useRef, useState} from 'react';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import {useSession} from 'next-auth/react';
import {createGuest, getGuest, saveGuest} from '@/app/services/guests';
import UrlTextField from '@/app/components/common/UrlTextField';

export interface IGuestForm {
  fleetId: number;
  guestId: number;
  blacklisted: boolean;
  onGuestSaved: () => any;
  onGuestCleared: () => any;
}

export class IGuest {
  id: number;
  fleetId: number;
  guestIdSource: string;
  guestId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  blacklisted: boolean;
  data: any;
}

const GuestForm = (props: IGuestForm) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [notesShowing, setNotesShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [guestData, setGuestData] = useState<IGuest>({
    id: props.guestId,
    fleetId: props.fleetId,
    guestIdSource: '',
    guestId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    blacklisted: props.blacklisted,
    data: {},
  });
  const noteRef = useRef<any>('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  useEffect(() => {
    console.log(`Load: fleet=${props.fleetId} guest=${props.guestId}`);

    if (props.guestId !== 0) {
      setLoading(true);
      getGuest(accessToken, props.guestId)
        .then((x) => {
          setGuestData(x.guest);
          setLoading(false);
        });
    }
  }, [props.fleetId, props.guestId]);

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

  const clearForm = () => {
    props.onGuestCleared();
    setGuestData(
    {
      id: props.guestId,
      fleetId: props.fleetId,
      guestIdSource: '',
      guestId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      blacklisted: props.blacklisted,
      data: {},
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

  const addNote = () => {
    const notes = guestData.data.notes ?? [];
    const noteMessage = noteRef.current?.value;
    const data = guestData.data;

    if (!noteMessage) {
      errorDialog('Note is required.');
      return;
    }

    notes.push(noteMessage);

    data['notes'] = notes;

    setGuestData({
      ...guestData,
      data,
    });

    setNotesShowing(false);
    noteRef.current.value = null;
  }

  const whitelistClicked = () => {
    const newGuestData = guestData;

    newGuestData.blacklisted = false;

    saveGuest(accessToken, newGuestData)
      .then((x) => {
        if (!x.result.created) {
          errorDialog('Unable to save guest record: may be a duplicate.');
          return;
        }

        props.onGuestSaved();
      });

    props.onGuestCleared();
  }

  const blacklistClicked = () => {
    const newGuestData = guestData;

    newGuestData.blacklisted = true;

    saveGuest(accessToken, newGuestData)
      .then((x) => {
        if (!x.result.created) {
          errorDialog('Unable to save guest record: may be a duplicate.');
          return;
        }

        props.onGuestSaved();
      });

    props.onGuestCleared();
  }

  const saveClicked = () => {
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

    if (props.guestId === 0) {
      createGuest(accessToken, guestData)
        .then((x) => {
          if (!x.result.created) {
            errorDialog('Unable to create guest record: may be a duplicate.');
            return;
          }

          props.onGuestSaved();
        });
    } else if (props.guestId) {
      saveGuest(accessToken, guestData)
        .then((x) => {
          if (!x.result.created) {
            errorDialog('Unable to save guest record: may be a duplicate.');
            return;
          }

          props.onGuestSaved();
        });
    }
  }

  if (loading) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  return (
    <>
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
                  <MenuItem value={99}>Other</MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '67%' }}>
              <UrlTextField label={'Guest URL'} fullWidth value={guestData.data.url ?? ''}
                            name={'url'} onChange={handleDataChange}
                            onUrlClick={() => {
                              if (guestData.data.url) {
                                window.open(guestData.data.url, '_blank');
                              }
                            }}/>
            </Item>
          </Stack>
        </div>
      </div>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Driver&apos;s License Detail</u></Typography>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'left' }}>
          <FormControlLabel control={<Checkbox name={'incomplete'}
                                               checked={guestData.data.incomplete ?? false}
                                               onChange={handleCheckbox}/>} label={'Info not yet provided / not necessary'}/>
        </Item>
      </Stack>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Phone Number'} fullWidth value={guestData.data.phoneNumber ?? ''}
                         name={'phoneNumber'} onChange={handleDataChange}/>
            </Item>
          </Stack>

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
            <Item sx={{ width: '50%' }}>
              <TextField label={'Drivers License Number'} fullWidth value={guestData.data.dlNumber ?? ''}
                         name={'dlNumber'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '50%' }}>
              <TextField label={'State of Issue'} fullWidth value={guestData.data.issueState ?? ''}
                         name={'issueState'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '25%' }}>
              <TextField label={'Issue Date'} fullWidth value={guestData.data.issueDate ?? ''}
                         name={'issueDate'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Birth Date'} fullWidth value={guestData.data.dob ?? ''}
                         name={'dob'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Expire Date'} fullWidth value={guestData.data.expireDate ?? ''}
                         name={'expireDate'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Country'} fullWidth value={guestData.data.country ?? ''}
                         name={'country'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
          </Stack>
        </div>
      </div>

      <p/>

      <TableContainer sx={{ borderBottom: '1px solid #ccc', width: '100%' }}>
        <Table stickyHeader size={'small'}>
          <TableHeader header={'Guest Notes'}
                       onAdd={() => setNotesShowing(!notesShowing)}
                       onEdit={() => {}}/>
          <TableBody>
            {notesShowing && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Stack direction={'row'}>
                    <Item sx={{ width: '100%' }}>
                      <TextField label={'Note'} fullWidth inputRef={noteRef}/>
                    </Item>

                    <Item sx={{ textAlign: 'right' }}>
                      <Button style={{ padding: '1em' }}
                              onClick={() => addNote()}
                              variant={'contained'}>
                        Add
                      </Button>
                    </Item>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
            {guestData.data.notes ? guestData.data.notes.map((x: any) => (
              <>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography color={'black'}>
                      {x}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )) : <></>}
          </TableBody>
        </Table>
      </TableContainer>

      <p/>

      <Stack direction={'row'}>
        <Item sx={{ width: '50%', textAlign: 'left' }}>
          {props.guestId !== 0 && (
            <>
              {props.blacklisted ? (
                <Button variant={'contained'} color={'error'} disabled={!guestData.id}
                        onClick={() => whitelistClicked()}>Whitelist this guest</Button>
              ) : (
                <Button variant={'contained'} color={'error'} disabled={!guestData.id}
                        onClick={() => blacklistClicked()}>Blacklist this guest</Button>
              )}
            </>
          )}
        </Item>

        <Item sx={{ width: '50%', textAlign: 'right' }}>
          <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          &nbsp;
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </>
  );
}

export default GuestForm;