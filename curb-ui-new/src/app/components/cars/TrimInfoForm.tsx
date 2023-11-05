'use client';

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
import {AddOutlined, ClearOutlined} from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import Item from '@/app/components/common/Item';
import StandardEquipmentList from '@/app/components/common/StandardEquipmentList';
import axios from 'axios';
import CheckboxTableRow from '@/app/components/common/CheckboxTableRow';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import {createCarTrimInfo, getCarTrimInfo, saveCarTrimInfo} from '@/app/services/car-definitions';
import {useSession} from 'next-auth/react';

export interface ITrimInfoForm {
  trimId: number;
}

const TrimInfoForm = (props: ITrimInfoForm) => {
  const [carTrimInfoId, setCarTrimInfoId] = useState<number>(0);
  const [trimInfoPayload, setTrimInfoPayload] = useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [checkedStates, setCheckedStates] = useState<boolean[]>(Array(StandardEquipmentList.length).fill(false));
  const [carOptionsInputShowing, setCarOptionsInputShowing] = useState<boolean>(false);
  const [carColorsInputShowing, setCarColorsInputShowing] = useState<boolean>(false);
  const [carUrlInputShowing, setCarUrlInputShowing] = useState<boolean>(false);
  const trimInfoOptionNameRef = useRef('');
  const trimInfoOptionPriceRef = useRef('');
  const colorNameRef = useRef('');
  const colorPriceRef = useRef('');
  const trimInfoReviewUrlRef = useRef('');
  const trimInfoReviewUrlSiteRef = useRef('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadCarTrimInfo = () => {
    getCarTrimInfo(accessToken, props.trimId)
      .then((res) => {
        if (res.data) {
          setTrimInfoPayload(res.data);
          setCarTrimInfoId(res.id);
          console.log(`Existing record: id=${res.id}`);

          const selectedStandardEquipment = res.data.selectedStandardEquipment ?? [];
          const states = Array(StandardEquipmentList.length).fill(false);

          StandardEquipmentList.forEach((x, position) => {
            if (selectedStandardEquipment.includes(x)) {
              states[position] = true;
            }
          });

          setCheckedStates(states);
        } else {
          setTrimInfoPayload({});
          setCarTrimInfoId(0);
          console.log('New record');
        }
      })
      .catch((x) => console.error(x));
  }

  const handleChange = (e: any) => {
    setTrimInfoPayload({
      ...trimInfoPayload,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    reloadCarTrimInfo();
  }, [props.trimId]);

  const saveRecord = () => {
    const payload = trimInfoPayload;

    payload.selectedStandardEquipment = [];

    StandardEquipmentList.forEach((x, position) => {
      if (checkedStates[position]) {
        payload.selectedStandardEquipment.push(x);
      }
    });

    if (carTrimInfoId === 0) {
      // Create trim info
      createCarTrimInfo(accessToken, props.trimId, trimInfoPayload)
        .then((res) => {
          console.log(`Result: ${JSON.stringify(res, null, 2)}`);
        })
        .catch((res) => {
          console.log('Error', res);
        });
    } else {
      // Edit trim info
      saveCarTrimInfo(accessToken, carTrimInfoId, props.trimId, trimInfoPayload)
        .then((res) => {
          console.log(`Result: ${JSON.stringify(res, null, 2)}`);
        })
        .catch((res) => {
          console.log('Error', res);
        });
    }

    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  }

  const addTrimOption = () => {
    const optionName = trimInfoOptionNameRef.current.value ?? '';
    const optionValue = trimInfoOptionPriceRef.current.value ?? '';

    if (!optionName || !optionValue) {
      errorDialog('Option name and value are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.optionList) {
      tip.optionList = [];
    }

    let found = false;

    tip.optionList.forEach((x: any) => {
      if (x.name === optionName) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Option '${optionName}' already exists in the list.`);
      trimInfoOptionNameRef.current.value = '';
      trimInfoOptionPriceRef.current.value = '';
      return;
    }

    tip.optionList.push({
      name: optionName,
      value: optionValue,
    });

    setTrimInfoPayload(tip);

    trimInfoOptionNameRef.current.value = '';
    trimInfoOptionPriceRef.current.value = '';

    setCarOptionsInputShowing(false);
  }

  const addColorOption = () => {
    const colorName = colorNameRef.current.value ?? '';
    const colorValue = colorPriceRef.current.value ?? '';

    if (!colorName || !colorValue) {
      errorDialog('Color name and value are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.colorList) {
      tip.colorList = [];
    }

    let found = false;

    tip.colorList.forEach((x: any) => {
      if (x.name === colorName) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Color '${colorValue}' already exists in the list.`);
      colorNameRef.current.value = '';
      colorPriceRef.current.value = '';
      return;
    }

    tip.colorList.push({
      name: colorName,
      value: colorValue,
    });

    setTrimInfoPayload(tip);

    colorNameRef.current.value = '';
    colorPriceRef.current.value = '';

    setCarColorsInputShowing(false);
  }

  const addCarSite = () => {
    const carReviewSiteName = trimInfoReviewUrlSiteRef.current.value ?? '';
    const carReviewUrl = trimInfoReviewUrlRef.current.value ?? '';

    if (!carReviewSiteName || !carReviewUrl) {
      errorDialog('Car review site name and video URL are required.');
      return;
    }

    const tip: any = trimInfoPayload;

    if (!tip.siteList) {
      tip.siteList = [];
    }

    let found = false;

    tip.siteList.forEach((x: any) => {
      if (x.url === carReviewUrl) {
        found = true;
      }
    });

    if (found) {
      errorDialog(`Video URL '${carReviewUrl}' already exists in the list.`);
      trimInfoReviewUrlSiteRef.current.value = '';
      trimInfoReviewUrlRef.current.value = '';
      return;
    }

    tip.siteList.push({
      name: carReviewSiteName,
      url: carReviewUrl,
    });

    setTrimInfoPayload(tip);

    trimInfoReviewUrlSiteRef.current.value = '';
    trimInfoReviewUrlRef.current.value = '';

    setCarUrlInputShowing(false);
  }

  const deleteOption = (x: any) => {
    let optionList = trimInfoPayload.optionList ?? [];

    optionList = optionList.filter((y: any) => y.name !== x.name);

    setTrimInfoPayload({
      ...trimInfoPayload,
      optionList,
    });
  }

  const deleteColor = (x: any) => {
    let colorList = trimInfoPayload.colorList ?? [];

    colorList = colorList.filter((y: any) => y.name !== x.name);

    setTrimInfoPayload({
      ...trimInfoPayload,
      colorList,
    });
  }

  const deleteSite = (x: any) => {
    let siteList = trimInfoPayload.siteList ?? [];

    siteList = siteList.filter((y: any) => y.url !== x.url);

    setTrimInfoPayload({
      ...trimInfoPayload,
      siteList,
    });
  }

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
        <Alert severity={'success'} sx={{ width: '100%' }}>
          Trim information saved successfully.
        </Alert>
      </Snackbar>
      <p/>
      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Trim Details</u></Typography>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <TextField label={'MSRP/Base Price'} fullWidth value={trimInfoPayload?.msrp ?? ''}
                         inputProps={{ type: 'number' }} name={'msrp'}
                         onChange={handleChange}/>
            </Item>
            <Item sx={{ width: '34%' }}>
              <FormControl fullWidth>
                <InputLabel id={'fuel-type-label'}>Fuel Type</InputLabel>
                <Select labelId={'fuel-type-label'} label={'Fuel Type'} name={'fuelType'}
                        style={{ textAlign: 'left' }} value={trimInfoPayload?.fuelType ?? 0} fullWidth
                        onChange={handleChange}>
                  <MenuItem value={0}>Regular</MenuItem>
                  <MenuItem value={1}>Mid-Grade</MenuItem>
                  <MenuItem value={2}>Premium</MenuItem>
                  <MenuItem value={3}>Battery</MenuItem>
                  <MenuItem value={4}>E-85/Biofuel</MenuItem>
                  <MenuItem value={5}>Diesel</MenuItem>
                  <MenuItem value={6}>Bio-Diesel</MenuItem>
                  <MenuItem value={7}>Hydrogen</MenuItem>
                  <MenuItem value={8}>LNG/CNG</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: '33%' }}>
              <FormControl fullWidth>
                <InputLabel id={'powertrain-label'}>Powertrain</InputLabel>
                <Select labelId={'powertrain-label'} label={'Powertrain'} name={'powertrain'}
                        style={{ textAlign: 'left' }} value={trimInfoPayload?.powertrain ?? 0} fullWidth
                        onChange={handleChange}>
                  <MenuItem value={0}>ICE</MenuItem>
                  <MenuItem value={1}>Hybrid</MenuItem>
                  <MenuItem value={2}>Plug-in Hybrid</MenuItem>
                  <MenuItem value={3}>EV</MenuItem>
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
                        value={trimInfoPayload?.transmission ?? 0}
                        name={'transmission'}
                        onChange={handleChange}
                        fullWidth>
                  <MenuItem value={0}>5 Speed Manual</MenuItem>
                  <MenuItem value={1}>6 Speed Manual</MenuItem>
                  <MenuItem value={2}>7 Speed Manual</MenuItem>
                  <MenuItem value={3}>Automatic</MenuItem>
                  <MenuItem value={4}>CVT / e-CVT</MenuItem>
                  <MenuItem value={5}>Single Speed Drive</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item sx={{ width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id={'drivetrain-label'}>Drivetrain</InputLabel>
                <Select labelId={'drivetrain-label'} label={'Drivetrain'} style={{ textAlign: 'left' }}
                        value={trimInfoPayload?.driveTrain ?? 0} fullWidth name={'driveTrain'}
                        onChange={handleChange}>
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
              <TextField label={'Doors'} fullWidth value={trimInfoPayload?.doors ?? ''} name={'doors'}
                         onChange={handleChange}/>
            </Item>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Seats'} fullWidth value={trimInfoPayload?.seats ?? ''} name={'seats'}
                         onChange={handleChange}/>
            </Item>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Rows'} fullWidth value={trimInfoPayload?.rows ?? ''} name={'rows'}
                         onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Front Tire Size'} fullWidth value={trimInfoPayload?.frontTire ?? ''} name={'frontTire'}
                         onChange={handleChange}/>
            </Item>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Rear Tire Size'} fullWidth value={trimInfoPayload?.rearTire ?? ''} name={'rearTire'}
                         onChange={handleChange}/>
            </Item>
            <Item sx={{ width: '33%' }}>
              <TextField label={'Cargo Area'} value={trimInfoPayload?.cargoArea ?? ''} helperText={'(ft³)'} fullWidth
                         inputProps={{ type: 'number' }} name={'cargoArea'}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '0.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Performance Figures</u></Typography>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '33%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Horsepower'} fullWidth value={trimInfoPayload?.horsepower ?? ''}
                         inputProps={{ type: 'number' }} name={'horsepower'}
                         onChange={handleChange}/>
            </Item>
          </Stack>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Torque'} fullWidth value={trimInfoPayload?.torque ?? ''}
                         inputProps={{ type: 'number' }} name={'torque'}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </div>

        <div style={{ width: '33%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Top Speed'} fullWidth value={trimInfoPayload?.topSpeed ?? ''} name={'topSpeed'}
                         onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'0-60 Time'} fullWidth value={trimInfoPayload?.timeToSixty ?? ''} name={'timeToSixty'}
                         onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Charge Time to 80%'} fullWidth value={trimInfoPayload?.chargeToEighty ?? ''} name={'chargeToEighty'}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </div>

        <div style={{ width: '33%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'MPG Highway'} fullWidth value={trimInfoPayload?.mpgHwy ?? ''} name={'mpgHwy'}
                         onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'MPG City'} fullWidth value={trimInfoPayload?.mpgCity ?? ''} name={'mpgCity'}
                         onChange={handleChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'MPG Combined / Range'} fullWidth value={trimInfoPayload?.range ?? ''} name={'range'}
                         onChange={handleChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <div style={{ display: 'flex', paddingTop: '1em' }}>
        <div style={{ width: '33%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Standard Equipment</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}></TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '90%' }}>Name</TableCell>
                </TableRow>
              </TableHead>
              {StandardEquipmentList
                .sort((a, b) => (a > b ? 1 : -1))
                .map((x, cnt: number) => (
                  <>
                    <CheckboxTableRow value={x} onClick={() => {
                      const states = checkedStates;

                      states[cnt] = !states[cnt];

                      // Set checked states like this, or it will NOT WORK.
                      setCheckedStates([...states]);
                    }} checked={checkedStates[cnt]}/>
                  </>
                ))}
            </Table>
          </TableContainer>
        </div>

        <div style={{ width: '33%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Optional Equipment</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '65%' }}>Option Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '25%' }}>Price</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
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
                          inputRef={trimInfoOptionNameRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarOptionsInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addTrimOption();
                              setCarOptionsInputShowing(false);
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Price'} fullWidth variant={'standard'}
                          inputRef={trimInfoOptionPriceRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarOptionsInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addTrimOption();
                              setCarOptionsInputShowing(false);
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <Button variant={'contained'}
                                onClick={() => addTrimOption()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                </>
              )}
              <TableBody>
                {(trimInfoPayload?.optionList ? trimInfoPayload.optionList : [])
                  .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                  .map((x: any) => (
                    <>
                      <TableRow hover>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.value}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteOption(x)}>
                            <ClearOutlined/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ width: '33%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Color Options</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '65%' }}>Color Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '25%' }}>Price</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                    <IconButton size={'small'} onClick={() => setCarColorsInputShowing(!carColorsInputShowing)}>
                      <AddOutlined/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {carColorsInputShowing ? (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label={'Name'} autoFocus fullWidth variant={'standard'}
                          inputRef={colorNameRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarColorsInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addColorOption();
                              setCarColorsInputShowing(false);
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Price'} fullWidth variant={'standard'}
                          inputRef={colorPriceRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarColorsInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addColorOption();
                              setCarColorsInputShowing(false);
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <Button variant={'contained'}
                                onClick={() => addColorOption()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                </>
              )}
              <TableBody>
                {(trimInfoPayload?.colorList ? trimInfoPayload.colorList : [])
                  .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                  .map((x: any) => (
                    <>
                      <TableRow hover>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.value}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteColor(x)}>
                            <ClearOutlined/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div style={{ display: 'flex', paddingTop: '1em' }}>
        <div style={{ width: '100%', paddingLeft: '0.5em' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Car Reviews</u></Typography>

          <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#cff', width: '35%' }}>Review Site</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '55%' }}>Review URL</TableCell>
                  <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                    <IconButton size={'small'} onClick={() => setCarUrlInputShowing(!carUrlInputShowing)}>
                      <AddOutlined/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {carUrlInputShowing ? (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label={'Review Site Name'} autoFocus fullWidth variant={'standard'}
                          inputRef={trimInfoReviewUrlSiteRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarUrlInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addCarSite();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={'Review Video URL'} fullWidth variant={'standard'}
                          inputRef={trimInfoReviewUrlRef}
                          onKeyDown={(ev) => {
                            if (ev.key === 'Escape') {
                              setCarUrlInputShowing(false);
                            } else if (ev.key === 'Enter') {
                              addCarSite();
                            }
                          }}/>
                      </TableCell>
                      <TableCell>
                        <Button variant={'contained'}
                                onClick={() => addCarSite()}>ADD</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                </>
              )}
              <TableBody>
                {(trimInfoPayload?.siteList ? trimInfoPayload.siteList : [])
                  .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
                  .map((x: any) => (
                    <>
                      <TableRow hover>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.url}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteSite(x)}>
                            <ClearOutlined/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
        <Button onClick={() => saveRecord()}>Save</Button>
      </div>
    </>
  );
}

export default TrimInfoForm;