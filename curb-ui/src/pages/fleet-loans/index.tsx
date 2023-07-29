import moment from 'moment';
import axios from 'axios';
import {
  Alert,
  Button, IconButton,
  Paper, Snackbar, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {AddOutlined, ArrowRightOutlined, DeleteOutlined, PreviewOutlined} from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import { errorDialog } from '@/components/dialogs/ConfirmDialog';
import {IFleet, LoadFleet } from '@/components/database/fleet';
import {IFleetCar, LoadFleetCars } from '@/components/database/fleet-car';
import { TableHeader } from '@/components/car-definitions/TableHeader';
import Item from '@/components/common/Item';

const SELECTED_COLOR = '#ccf';

export interface IFleetLoansProps {
  jwt: string;
}

const FleetLoans = (props: IFleetLoansProps) => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);
  const [fleetCarLoanId, setFleetCarLoanId] = useState(0);
  const [fleetLoanData, setFleetLoanData] = useState<any>({});
  const [currentLoanData, setCurrentLoanData] = useState<any>({});
  const [loanPaymentData, setLoanPaymentData] = useState([]);
  const [loanPaymentDataShowing, setLoanPaymentDataShowing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const formDateRef = useRef('');
  const formPrincipalRef = useRef('');
  const formInterestRef = useRef('');
  const formTotalRef = useRef('');

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
      errorDialog('Unable to retrieve login data; please login again.');
      return;
    });
  }, [props.jwt]);

  const reloadFleet = (userId: number) => {
    LoadFleet(userId, (x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  const saveLoan = () => {
    if (fleetCarId === 0) {
      errorDialog('Unable to persist data.');
      return;
    }

    const payload: any = currentLoanData;

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

  const loadLoanPayments = (id: number) => {
    axios.get(`/app/fleet-loan/list/${id}`)
      .then((x) => {
        if (!x.data) {
          setLoanPaymentData([]);
          return;
        }

        setLoanPaymentData(x.data);
      });
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
        loadLoanPayments(x.data.id);
      });
  }

  const handleChange = (e: any) => {
    setFleetLoanData({
      ...fleetLoanData,
      [e.target.name]: e.target.value,
    });
  }

  const addLoanPayment = () => {
    const paymentDate = formDateRef.current ?? '';
    const principalAmount = formPrincipalRef.current ?? '';
    const interestAmount = formInterestRef.current ?? '';
    const totalAmount = formTotalRef.current ?? '';

    if (paymentDate.length == 0 || principalAmount.length == 0 || interestAmount.length == 0 || totalAmount.length == 0) {
      errorDialog('Payment date, principal amount, interest amount, and total amount are required.');
      return;
    }

    const payload: any = {
      fleetCarLoanId: currentLoanData.id,
      paymentDate,
      principalAmount,
      interestAmount,
      totalAmount,
    };

    console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

    axios.post('/app/fleet-loan/create', payload)
      .then((x) => {
        if (x.data) {
          loadLoanPayments(fleetCarLoanId);
          return;
        }

        errorDialog('Unable to create loan payment information');
      });
  }

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
                                setFleetId(x.id!);
                                setFleetCarId(0);
                                reloadFleetCars(x.id!);
                                setFleetLoanData({});
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id!);
                                setFleetCarId(0);
                                reloadFleetCars(x.id!);
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
                    {fleetCarList.map((x: any) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetCarId(x.id!);
                                loadFleetLoan(x.id!);
                              }}>
                              <Typography>
                                {x.carYear} {x.makeName} {x.modelName} {x.trimName}: &quot;{x.data.listingNickname ?? 'Unnamed'}&quot;
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

          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
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

          <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
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

          {currentLoanData.fleetCarId && (
          <div style={{ display: 'flex', paddingTop: '1em' }}>
            <div style={{ width: '100%', paddingLeft: '0.5em' }}>
              <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Payment Detail</u></Typography>

              <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>
                <Table stickyHeader size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}>#</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Date</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Principal</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Interest</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Total</TableCell>
                      <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>
                        <IconButton size={'small'} onClick={() => setLoanPaymentDataShowing(!loanPaymentDataShowing)}>
                          <AddOutlined/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {loanPaymentDataShowing ? (
                    <>
                      <TableBody>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>
                            <TextField
                              label={'Payment Date'} autoFocus fullWidth variant={'standard'}
                              inputRef={formDateRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setLoanPaymentDataShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Principal Payment'} fullWidth variant={'standard'}
                              inputRef={formPrincipalRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setLoanPaymentDataShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Interest Payment'} fullWidth variant={'standard'}
                              inputRef={formInterestRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setLoanPaymentDataShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label={'Total Payment'} fullWidth variant={'standard'}
                              inputRef={formTotalRef}
                              onKeyDown={(ev) => {
                                if (ev.key === 'Escape') {
                                  setLoanPaymentDataShowing(false);
                                }
                              }}/>
                          </TableCell>
                          <TableCell>
                            <Button variant={'contained'}
                                    onClick={() => addLoanPayment()}>ADD</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  {loanPaymentData.length > 0 ? (
                    <>
                      {loanPaymentData.map((x: any, count) => (
                        <>
                          <TableRow sx={{ color: 'black' }} hover>
                            <TableCell>{loanPaymentData.length - count}</TableCell>
                            <TableCell>{moment(x.paymentDate).format('MM/DD/YYYY')}</TableCell>
                            <TableCell>$ {x.principalAmount}</TableCell>
                            <TableCell>$ {x.interestAmount}</TableCell>
                            <TableCell colSpan={2}>$ {x.totalAmount}</TableCell>
                          </TableRow>
                        </>
                      ))}
                      <TableRow sx={{ color: 'white', backgroundColor: 'black' }}>
                        <TableCell>Total:</TableCell>
                        <TableCell></TableCell>
                        <TableCell>$ {loanPaymentData.map((x: any) => x.principalAmount)
                          .reduce((acc, cur) => acc + cur)}</TableCell>
                        <TableCell>$ {loanPaymentData.map((x: any) => x.interestAmount)
                          .reduce((acc, cur) => acc + cur)}</TableCell>
                        <TableCell colSpan={2}>$ {loanPaymentData.map((x: any) => x.totalAmount)
                          .reduce((acc, cur) => acc + cur)}</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={6}>
                        <Typography fontWeight={'bold'}>
                          No payments recorded.
                        </Typography>
                      </TableCell>
                    </>
                  )}
                </Table>
              </TableContainer>
            </div>
          </div>
          )}

          <div style={{ display: 'flex', width: '100%', textAlign: 'right', paddingTop: '10px' }}>
            <Button onClick={() => saveLoan()}>Save</Button>
          </div>
        </>
      )}
    </>
  );
}

export default FleetLoans;
