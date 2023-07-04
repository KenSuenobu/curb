import {
  Alert,
  Button, FormControl, IconButton, InputLabel, MenuItem,
  Paper, Select, Snackbar, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '../../components/car-definitions/TableHeader';
import {ArrowRightOutlined, DeleteOutlined, PreviewOutlined} from '@mui/icons-material';
import {errorDialog} from '../../components/dialogs/ConfirmDialog';
import Item from '../../components/common/Item';
import {LoadCarModels} from '../../components/database/car-model';
import {LoadModelYears} from '../../components/database/car-year';
import {LoadCarTrims} from '../../components/database/car-trim';
import React, {useEffect, useState} from 'react';
import {IFleet, LoadFleet} from '../../components/database/fleet';
import {IFleetCar, LoadFleetCars} from '../../components/database/fleet-car';
import ColorDatabase from '../../components/common/ColorDatabase';
import axios from 'axios';

const SELECTED_COLOR = '#ccf';

const FleetLoans = () => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [fleetLoanData, setFleetLoanData] = useState({});
  const [currentLoanData, setCurrentLoanData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const reloadFleet = () => {
    LoadFleet((x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  const saveLoan = () => {
    if (fleetCarId === 0) {
      errorDialog('Unable to persist data.');
      return;
    }

    const payload = currentLoanData;

    payload.data = fleetLoanData;

    if (!payload.fleetCarId) {
      payload.fleetCarId = fleetCarId;
    }

    console.log(`Fleet Car: ${JSON.stringify(payload, null, 2)}`);

    if (payload.id) {
      axios.put('/app/fleet/save/loan', payload)
        .then((x) => {
          if (!x.data) {
            errorDialog('Unable to save fleet loan information.  Please check your listing.');
            return;
          }

          setSnackbarOpen(true);

          setTimeout(() => {
            setSnackbarOpen(false);
          }, 3000);
        });
    } else {
      axios.post('/app/fleet/create/loan', payload)
        .then((x) => {
          if (!x.data) {
            errorDialog('Unable to save fleet loan information.  Please check your listing.');
            return;
          }

          setSnackbarOpen(true);

          setTimeout(() => {
            setSnackbarOpen(false);
          }, 3000);
        });
    }
  }

  const loadFleetLoan = (id: number) => {
    axios.get(`/app/fleet/loan/${id}`)
      .then((x) => {
        if (!x.data) {
          setCurrentLoanData({});
          setFleetLoanData({});
          return;
        }

        setCurrentLoanData(x.data);
        setFleetLoanData(x.data.data);
      });
  }

  const handleChange = (e) => {
    setFleetLoanData({
      ...fleetLoanData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => reloadFleet(), []);

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet'}/>
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
                                setFleetId(x.id);
                                setFleetCarId(0);
                                reloadFleetCars(x.id);
                                setFleetLoanData({});
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id);
                                setFleetCarId(0);
                                reloadFleetCars(x.id);
                                setFleetLoanData({});
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
                <TableHeader header={'Fleet Car'}/>
                {fleetCarList.length > 0 ? (
                  <TableBody>
                    {fleetCarList.map((x) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetCarId(x.id);
                                loadFleetLoan(x.id);
                              }}>
                              <Typography>
                                {x.carYear} {x.makeName} {x.modelName} {x.trimName}: "{x.data.listingNickname ?? 'Unnamed'}"
                              </Typography>
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

      {fleetCarId != 0 && (
        <>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen}>
            <Alert severity={'success'} sx={{ width: '100%' }}>
              Car fleet loan information saved successfully.
            </Alert>
          </Snackbar>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Fleet Car Loan Detail</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Lien Holder Name'} fullWidth value={fleetLoanData.lienHolderName ?? ''}
                             name={'lienHolderName'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Lien Holder Address 1'} fullWidth value={fleetLoanData.lienHolderAddress1 ?? ''}
                             name={'lienHolderAddress1'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Lien Holder Address 2'} fullWidth value={fleetLoanData.lienHolderAddress2 ?? ''}
                             name={'lienHolderAddress2'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '35%' }}>
                  <TextField label={'City'} fullWidth value={fleetLoanData.city ?? ''}
                             name={'city'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '15%' }}>
                  <TextField label={'State'} fullWidth value={fleetLoanData.state ?? ''}
                             name={'state'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Zipcode'} fullWidth value={fleetLoanData.zipcode ?? ''}
                             name={'zipcode'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Country'} fullWidth value={fleetLoanData.country ?? ''}
                             name={'country'} onChange={handleChange}/>
                </Item>
              </Stack>
            </div>

            <div style={{ width: '50%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '50%' }}>
                  <TextField label={'Loan Contract Start Date'} fullWidth value={fleetLoanData.contractStartDate ?? ''}
                             name={'contractStartDate'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '50%' }}>
                  <TextField label={'Payment Due Date'} fullWidth value={fleetLoanData.paymentDueDate ?? ''}
                             name={'paymentDueDate'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Account Number'} fullWidth value={fleetLoanData.accountNumber ?? ''}
                             name={'accountNumber'} onChange={handleChange}/>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '100%' }}>
                  <TextField label={'Lien Holder Payment URL'} fullWidth value={fleetLoanData.paymentUrl ?? ''}
                             name={'paymentUrl'} onChange={handleChange}/>
                </Item>

                <Item>
                  <IconButton>
                    <PreviewOutlined
                      onClick={() => {
                        if (fleetLoanData.paymentUrl) {
                          window.open(fleetLoanData.paymentUrl);
                          return;
                        }

                        errorDialog('No URL has been specified.');
                      }}/>
                  </IconButton>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ width: '100%', paddingLeft: '1em', paddingTop: '1.5em' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Payment Schedule Information</u></Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '25%' }}>
                  <TextField label={'Original Balance'} fullWidth value={fleetLoanData.originalBalance ?? ''}
                             name={'originalBalance'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Monthly Payment'} fullWidth value={fleetLoanData.monthlyPayment ?? ''}
                             name={'monthlyPayment'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'Payment Term'} fullWidth value={fleetLoanData.paymentTerm ?? ''}
                             name={'paymentTerm'} onChange={handleChange}/>
                </Item>

                <Item sx={{ width: '25%' }}>
                  <TextField label={'APR %'} fullWidth value={fleetLoanData.apr ?? ''}
                             name={'apr'} onChange={handleChange}/>
                </Item>
              </Stack>
            </div>
          </div>

          <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
            <Button onClick={() => saveLoan()}>Save</Button>
          </div>
        </>
      )}
    </>
  );
}

export default FleetLoans;
