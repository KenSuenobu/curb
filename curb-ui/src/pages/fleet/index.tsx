import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  FormControl, IconButton, InputLabel, LinearProgress, MenuItem,
  Paper, Select, Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {AddOutlined, ArrowRightOutlined, ClearOutlined, DeleteOutlined, PreviewOutlined} from '@mui/icons-material';
import axios from 'axios';
import { IFleetCar, LoadFleetCars } from '@/components/database/fleet-car';
import {IFleet, LoadFleet} from '@/components/database/fleet';
import {ICarMake, LoadCarMakes } from '@/components/database/car-make';
import {ICarYear, LoadModelYears } from '@/components/database/car-year';
import { ICarModel, LoadCarModels } from '@/components/database/car-model';
import {ICarTrim, LoadCarTrims} from '@/components/database/car-trim';
import { errorDialog } from '@/components/dialogs/ConfirmDialog';
import { TableHeader } from '@/components/car-definitions/TableHeader';
import ColorDatabase from '@/components/common/ColorDatabase';
import Item from '@/components/common/Item';

const SELECTED_COLOR = '#ccf';

export interface IFleetProps {
  jwt: string;
}

const Fleet = (props: IFleetProps) => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [carMakeList, setCarMakeList] = useState<ICarMake[]>([]);
  const [carModelList, setCarModelList] = useState<ICarModel[]>([]);
  const [carYearList, setCarYearList] = useState<ICarYear[]>([]);
  const [carTrimList, setCarTrimList] = useState<ICarTrim[]>([]);
  const [fleetInputShowing, setFleetInputShowing] = useState(false);
  const [fleetCarInputShowing, setFleetCarInputShowing] = useState(false);
  const [ownershipInputShowing, setOwnershipInputShowing] = useState(false);
  const [insuranceInputShowing, setInsuranceInputShowing] = useState(false);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [carMakeId, setCarMakeId] = useState(0);
  const [carModelId, setCarModelId] = useState(0);
  const [carYearId, setCarYearId] = useState(0);
  const [carTrimId, setCarTrimId] = useState(0);
  const [fleetCar, setFleetCar] = useState<any>({});
  const [carFleetData, setCarFleetData] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const fleetRef = useRef('');
  const ownershipNameRef = useRef('');
  const ownershipPercentageRef = useRef('');
  const ownershipPhoneRef = useRef('');
  const insuranceNameRef = useRef('');
  const insurancePriceRef = useRef('');
  const insuranceScheduleRef = useRef('');

  const reloadFleet = (id: number) => {
    LoadFleet(id, (x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  const addFleet = () => {
    const fleetName = fleetRef.current.trim();

    if (fleetName.length === 0) {
      errorDialog('Fleet name is required.');
      return;
    }

    if (userInfo) {
      axios.post(`/app/fleet/create/fleet/${userInfo.id}`, {
        name: fleetName,
      }).then((x) => {
        reloadFleet(userInfo.id);
        setFleetInputShowing(false);
        fleetRef.current = '';
      });
    }
  }

  const addFleetCar = () => {
    if (carTrimId === 0) {
      errorDialog('Fleet trim ID is required.');
      return;
    }

    axios.post('/app/fleet/create/car', {
      fleetId,
      ownerId: userInfo.id,
      carTrimId,
      data: {},
    }).then((x) => {
      reloadFleetCars(fleetId);
      setCarMakeId(0);
      setCarModelId(0);
      setCarYearId(0);
      setCarTrimId(0);
      setFleetCarId(0);
      setCarModelList([]);
      setCarYearList([]);
      setCarTrimList([]);
      setCarFleetData(x.data.data);
      setFleetCar(x.data);
    });
  }

  const saveFleetCar = () => {
    if (fleetCarId === 0) {
      errorDialog('Unable to persist data.');
      return;
    }

    const payload: any = fleetCar;

    payload.data = carFleetData;
    payload.data.ownerId = userInfo.id;

    axios.put('/app/fleet/save/car', payload)
      .then((x) => {
        if (!x.data) {
          errorDialog('Unable to save fleet car information.  Please check your listing.');
          return;
        }

        setSnackbarOpen(true);

        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      });
  }

  const handleChange = (e: any) => {
    setCarFleetData({
      ...carFleetData,
      [e.target.name]: e.target.value,
    });
  }

  const addOwnershipDetail = () => {
    const ownerName = ownershipNameRef.current;
    const ownerPhone = ownershipPhoneRef.current;
    const ownerPercent = ownershipPercentageRef.current;

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

    ownershipNameRef.current = '';
    ownershipPhoneRef.current = '';
    ownershipPercentageRef.current = '';

    setOwnershipInputShowing(false);
  }

  const addInsuranceDetail = () => {
    const insuranceName = insuranceNameRef.current;
    const insurancePrice = insurancePriceRef.current;
    const insuranceSchedule = insuranceScheduleRef.current;

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

    insuranceNameRef.current = '';
    insurancePriceRef.current = '';
    insuranceScheduleRef.current = '';

    setInsuranceInputShowing(false);
  }

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
        errorDialog(`Unable to retrieve login data; please login again: ${x}`);
        return;
      });
  }, [props.jwt]);

  useEffect(() => LoadCarMakes((x) => setCarMakeList(x)), []);

  if (!userInfo) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet'}
                             onAdd={() => setFleetInputShowing(!fleetInputShowing)}
                             onEdit={() => {}}/>
                {fleetInputShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField id={'namespace'} variant={'standard'} required inputRef={fleetRef}
                                     autoFocus fullWidth
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setFleetInputShowing(false);
                                         fleetRef.current = '';
                                       } else if (ev.key === 'Enter') {
                                         addFleet();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addFleet()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
              {fleetList.length > 0 ? (
                <TableBody>
                  {fleetList.map((x) => {
                    const bgColor = fleetId === x.id ? SELECTED_COLOR : '#fff';

                    return (
                      <>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell
                            sx={{ backgroundColor: bgColor, width: '90%' }}
                            onClick={() => {
                              setFleetId(x.id!);
                              setFleetCarId(0);
                              reloadFleetCars(x.id!);
                            }}><Typography>{x.name}</Typography></TableCell>
                          <TableCell
                            onClick={() => {
                              setFleetId(x.id!);
                              setFleetCarId(0);
                              reloadFleetCars(x.id!);
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

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet Car'}
                             onAdd={() => {
                               if (fleetId === 0) {
                                 errorDialog('You must first select a fleet.');
                                 return;
                               }
                               setFleetCarInputShowing(!fleetCarInputShowing);
                               setCarMakeId(0);
                               setCarModelId(0);
                               setCarYearId(0);
                               setCarTrimId(0);
                               setFleetCarId(0);
                               setCarModelList([]);
                               setCarYearList([]);
                               setCarTrimList([]);
                               setCarFleetData({});
                             }}
                             onEdit={() => {}}/>
                {fleetCarInputShowing ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Stack direction={'row'}>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Make</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Make'} name={'carMake'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={((e: any) => {
                                        setCarMakeId(e.target.value);
                                        setCarModelId(0);
                                        setCarYearId(0);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadCarModels(e.target.value, (x) => setCarModelList(x as never[]));
                                        setCarYearList([]);
                                        setCarTrimList([]);
                                        setCarFleetData({});
                                      })}>
                                {carMakeList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Model</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Model'} name={'carModel'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e: any) => {
                                        setCarModelId(e.target.value);
                                        setCarYearId(0);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadModelYears(e.target.value, (x) => setCarYearList(x as never[]));
                                        setCarTrimList([]);
                                        setCarFleetData({});
                                      }}>
                                {carModelList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Year</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Year'} name={'carYear'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e: any) => {
                                        setCarYearId(e.target.value);
                                        setCarTrimId(0);
                                        setFleetCarId(0);
                                        LoadCarTrims(e.target.value, (x) => setCarTrimList(x));
                                        setCarFleetData({});
                                      }}>
                                {carYearList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.year}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item sx={{ width: '25%' }}>
                            <FormControl sx={{ width: '100%' }}>
                              <InputLabel id={'fuel-type-label'}>Car Trim</InputLabel>
                              <Select labelId={'fuel-type-label'} label={'Car Trim'} name={'carTrim'}
                                      style={{ textAlign: 'left' }} fullWidth
                                      onChange={(e: any) => {
                                        setCarTrimId(e.target.value);
                                        setFleetCarId(0);
                                        setCarFleetData({});
                                      }}>
                                {carTrimList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Item>
                          <Item>
                            <Button variant={'contained'}
                                    disabled={carTrimId === 0}
                                    onClick={() => addFleetCar()}>ADD</Button>
                          </Item>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
                {fleetCarList.length > 0 ? (
                  <TableBody>
                    {fleetCarList.map((x: any) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetCarId(x.id!);
                                setFleetCarInputShowing(false);
                                setFleetCar(x);
                                setCarFleetData(x.data);
                                setCarMakeId(0);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                setCarModelList([]);
                                setCarYearList([]);
                                setCarTrimList([]);
                              }}>
                              <Typography>
                                {x.carYear} {x.makeName} {x.modelName} {x.trimName}: &quot;{x.data.listingNickname ?? 'Unnamed'}&quot;
                              </Typography>
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetCarId(x.id!);
                                setFleetCarInputShowing(false);
                                setFleetCar(x);
                                setCarFleetData(x.data);
                                setCarMakeId(0);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);
                                setCarModelList([]);
                                setCarYearList([]);
                                setCarTrimList([]);
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}>
                              <IconButton>
                                <DeleteOutlined/>
                              </IconButton>
                            </TableCell>
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

      {fleetCarId != 0 ? (
        <>
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
                  <TextField label={'VIN'} fullWidth value={carFleetData.vin ?? ''}
                             name={'vin'} onChange={handleChange}/>
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
                  <TextField label={'Car Listing URL'} fullWidth value={carFleetData.listingUrl ?? ''}
                             name={'listingUrl'} onChange={handleChange}/>
                </Item>

                <Item>
                  <IconButton>
                    <PreviewOutlined
                      onClick={() => {
                        if (carFleetData.listingUrl) {
                          window.open(carFleetData.listingUrl);
                          return;
                        }

                        errorDialog('No URL has been specified.');
                      }}/>
                  </IconButton>
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
      ) : (
        <>
        </>
      )}
    </>
  );
}

export default Fleet;
