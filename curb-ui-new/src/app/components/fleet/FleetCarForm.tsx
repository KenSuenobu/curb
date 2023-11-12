import {useEffect, useRef, useState} from 'react';
import {
  Alert, Button,
  FormControl, IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import UrlTextField from '@/app/components/common/UrlTextField';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import ColorDatabase from '@/app/components/common/ColorDatabase';
import {AddOutlined} from '@mui/icons-material';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {getFleetCarById, saveFleetCarData} from '@/app/services/fleet';

export interface IFleetCarForm {
  fleetCarId: number;
}

const FleetCarForm = (props: IFleetCarForm) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [ownershipInputShowing, setOwnershipInputShowing] = useState<boolean>(false);
  const [insuranceInputShowing, setInsuranceInputShowing] = useState<boolean>(false);
  const [fleetCar, setFleetCar] = useState<any>({});
  const [carFleetData, setCarFleetData] = useState<any>({});
  const ownershipNameRef = useRef<any>('');
  const ownershipPhoneRef = useRef<any>('');
  const ownershipPercentageRef = useRef<any>('');
  const insuranceNameRef = useRef<any>('');
  const insurancePriceRef = useRef<any>('');
  const insuranceScheduleRef = useRef<any>('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  useEffect(() => {
    if (accessToken && props.fleetCarId) {
      getFleetCarById(accessToken, props.fleetCarId)
        .then((x: any) => {
          setFleetCar(x.cars);
          setCarFleetData(x.cars.data);
        });
    }
  }, [accessToken, props.fleetCarId]);

  const handleChange = (e: any) => {
    setCarFleetData({
      ...carFleetData,
      [e.target.name]: e.target.value,
    });
  }

  const addOwnershipDetail = () => {
    const ownerName = ownershipNameRef.current.value;
    const ownerPhone = ownershipPhoneRef.current.value;
    const ownerPercent = ownershipPercentageRef.current.value;

    if (!ownerName || !ownerPhone || !ownerPercent) {
      errorDialog('Owner name, phone, and percentage are required fields.');
      return;
    }

    const ownership: any[] = carFleetData.ownership ?? [];

    ownership.push({
      name: ownerName,
      phone: ownerPhone,
      ownership: ownerPercent,
    });

    setCarFleetData({
      ...carFleetData,
      ownership,
    });

    ownershipNameRef.current.value = '';
    ownershipPhoneRef.current.value = '';
    ownershipPercentageRef.current.value = '';

    setOwnershipInputShowing(false);
  }

  const addInsuranceDetail = () => {
    const insuranceName = insuranceNameRef.current.value;
    const insurancePrice = insurancePriceRef.current.value;
    const insuranceSchedule = insuranceScheduleRef.current.value;

    if (!insuranceName || !insurancePrice || !insuranceSchedule) {
      errorDialog('Insurance name, price, and payment schedule rate are required fields.');
      return;
    }

    const insurance: any[] = carFleetData.insurance ?? [];

    insurance.push({
      name: insuranceName,
      price: insurancePrice,
      schedule: insuranceSchedule,
    });

    setCarFleetData({
      ...carFleetData,
      insurance,
    });

    insuranceNameRef.current.value = '';
    insurancePriceRef.current.value = '';
    insuranceScheduleRef.current.value = '';

    setInsuranceInputShowing(false);
  }

  const saveFleetCar = () => {
    if (props.fleetCarId === 0) {
      errorDialog('Unable to persist data.');
      return;
    }

    const payload: any = { ...fleetCar };

    payload.data = carFleetData;

    console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

    saveFleetCarData(accessToken, payload)
      .then((x) => {
        console.log('Saved fleet car', x);

        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      });
  }

  if (props.fleetCarId === 0) {
    return (<></>);
  }

  return (
    <>
      Fleet Car ID: {props.fleetCarId}

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
        <Alert severity={'success'} sx={{ width: '100%' }}>
          Car fleet information saved successfully.
        </Alert>
      </Snackbar>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
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
            <Item sx={{ width: '25%' }}>
              <UrlTextField label={'VIN'} fullWidth value={carFleetData.vin ?? ''}
                            name={'vin'} onChange={handleChange}
                            onUrlClick={() => {
                              if (carFleetData.vin) {
                                window.open(`https://www.nhtsa.gov/recalls?vin=${carFleetData.vin}#vin`);
                                return;
                              }

                              errorDialog('You need to provide a VIN number for this car');
                            }}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Purchase Price'} fullWidth value={carFleetData.purchasePrice ?? ''}
                         inputProps={{ type: 'number' }} name={'purchasePrice'}
                         onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Purchase Date'} fullWidth value={carFleetData.purchaseDate ?? ''}
                         name={'purchaseDate'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <FormControl fullWidth>
                <InputLabel id={'color-label'}>Color</InputLabel>
                <Select labelId={'color-label'} label={'Color'}
                        style={{ textAlign: 'left' }}
                        value={carFleetData.color ?? 0}
                        name={'color'}
                        onChange={handleChange}
                        fullWidth>
                  {ColorDatabase.map((x, counter) => (
                    <MenuItem value={x.label} key={counter}>
                      <Stack direction={'row'}>
                        <div style={{ width: '24px', backgroundColor: x.color }}>&nbsp;</div>
                        <div style={{ paddingLeft: '10px' }}><Typography>{x.label}</Typography></div>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '20%' }}>
              <TextField label={'License Plate'} fullWidth value={carFleetData.licensePlate ?? ''}
                         name={'licensePlate'}
                         onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Transponder ID'} fullWidth value={carFleetData.transponderId ?? ''}
                         name={'transponderId'}
                         onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'License State'} fullWidth value={carFleetData.licenseState ?? ''}
                         name={'licenseState'}
                         onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'License Country'} fullWidth value={carFleetData.licenseCountry ?? ''}
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

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
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
              <UrlTextField label={'Car Listing URL'} fullWidth value={carFleetData.listingUrl ?? ''}
                            name={'listingUrl'} onChange={handleChange}
                            onUrlClick={() => {
                              if (carFleetData.listingUrl) {
                                window.open(carFleetData.listingUrl);
                                return;
                              }

                              errorDialog('No URL has been specified.');
                            }}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '25%' }}>
              <FormControl fullWidth>
                <InputLabel id={'source-label'}>Tracking Site</InputLabel>
                <Select labelId={'source-label'} label={'trackingSite'}
                        style={{ textAlign: 'left' }}
                        value={carFleetData.trackingSite ?? 0}
                        name={'trackingSite'}
                        onChange={handleChange}
                        fullWidth>
                  <MenuItem value={'Bouncie'}>Bouncie</MenuItem>
                  <MenuItem value={'Zubie'}>Zubie</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '75%' }}>
              <UrlTextField label={'Car Tracker URL'} fullWidth value={carFleetData.trackingUrl ?? ''}
                            name={'trackingUrl'} onChange={handleChange}
                            onUrlClick={() => {
                              if (carFleetData.trackingUrl) {
                                window.open(carFleetData.trackingUrl);
                                return;
                              }

                              errorDialog('No tracker URL was specified.');
                            }}/>
            </Item>
          </Stack>
        </div>
      </div>

      <div style={{ display: 'flex', paddingTop: '1em' }}>
        <div style={{ width: '100%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Car Ownership</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Owner Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Contact Phone</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Percentage</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                    <IconButton size={'small'} onClick={() => setOwnershipInputShowing(!ownershipInputShowing)}>
                      <AddOutlined/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {ownershipInputShowing ? (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label={'Owner Name'} autoFocus fullWidth variant={'standard'}
                          inputRef={ownershipNameRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setOwnershipInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addOwnershipDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Contact Phone'} fullWidth variant={'standard'}
                          inputRef={ownershipPhoneRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setOwnershipInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addOwnershipDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Percentage'} fullWidth variant={'standard'}
                          inputRef={ownershipPercentageRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setOwnershipInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addOwnershipDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <Button variant={'contained'}
                                onClick={() => addOwnershipDetail()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                </>
              )}
              {carFleetData.ownership && (
                <>
                  {carFleetData.ownership.map((x: any, counter: number) => (
                    <TableRow hover key={counter}>
                      <TableCell sx={{ color: '#000' }}>{x.name}</TableCell>
                      <TableCell sx={{ color: '#000' }}>{x.phone}</TableCell>
                      <TableCell sx={{ color: '#000' }}>{x.ownership} %</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>

      <div style={{ display: 'flex', paddingTop: '1em' }}>
        <div style={{ width: '100%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Insurance Detail</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Insurance Provider</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Price</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Payment Schedule</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                    <IconButton size={'small'} onClick={() => setInsuranceInputShowing(!insuranceInputShowing)}>
                      <AddOutlined/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {insuranceInputShowing ? (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label={'Insurance Name'} autoFocus fullWidth variant={'standard'}
                          inputRef={insuranceNameRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setInsuranceInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addInsuranceDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Insurance Payment'} fullWidth variant={'standard'}
                          inputRef={insurancePriceRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setInsuranceInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addInsuranceDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Payment Schedule'} fullWidth variant={'standard'}
                          inputRef={insuranceScheduleRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setInsuranceInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addInsuranceDetail();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <Button variant={'contained'}
                                onClick={() => addInsuranceDetail()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                </>
              )}
              {carFleetData.insurance && (
                <>
                  {carFleetData.insurance.map((x: any, counter: number) => (
                    <TableRow hover key={counter}>
                      <TableCell sx={{ color: '#000' }}>{x.name}</TableCell>
                      <TableCell sx={{ color: '#000' }}>$ {x.price}</TableCell>
                      <TableCell sx={{ color: '#000' }}>{x.schedule}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
        <Button onClick={() => saveFleetCar()}>Save</Button>
      </div>
    </>
  );
}

export default FleetCarForm;
