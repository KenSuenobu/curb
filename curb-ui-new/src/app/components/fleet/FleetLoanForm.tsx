'use client';

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Item from '@/app/components/common/Item';
import UrlTextField from '@/app/components/common/UrlTextField';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import {createFleetLoan, loadFleetLoan, saveFleetLoan} from '@/app/services/fleet';
import {useSession} from 'next-auth/react';

export interface IFleetLoanForm {
  fleetCarId: number;
  onSave: () => any;
  onClear: () => any;
}

const FleetLoanForm = (props: IFleetLoanForm) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fleetLoan, setFleetLoan] = useState<any>({});
  const [fleetLoanData, setFleetLoanData] = useState<any>({});
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const handleChange = (e: any) => {
    setFleetLoanData({
      ...fleetLoanData,
      [e.target.name]: e.target.value,
    });
  }

  const saveClicked = () => {
    if (!fleetLoanData.loanType) {
      errorDialog('A loan type for this detail is required.');
      return;
    }

    const payload: any = {};

    if (fleetLoan.id) {
      payload.id = fleetLoan.id;
    }

    payload.fleetCarId = props.fleetCarId;
    payload.data = fleetLoanData;

    if (!payload.id) {
      createFleetLoan(accessToken, payload)
        .then((x: any) => {
          clearForm();

          setSnackbarOpen(true);

          setTimeout(() => {
            setSnackbarOpen(false);
          }, 3000);
        })
        .catch((x) => console.log(x));
    } else {
      saveFleetLoan(accessToken, payload)
        .then((x: any) => {
          clearForm();

          setSnackbarOpen(true);

          setTimeout(() => {
            setSnackbarOpen(false);
          }, 3000);
        })
        .catch((x) => console.log(x));
    }
  }

  const clearForm = () => {
    setFleetLoan({});
    setFleetLoanData({});
    props.onClear();
  }

  useEffect(() => {
    if (props.fleetCarId !== 0) {
      setLoading(true);
      loadFleetLoan(accessToken, props.fleetCarId)
        .then((x: any) => {
          if (x) {
            setFleetLoan(x ?? {});
            setFleetLoanData(x.data ?? {});
          } else {
            setFleetLoan({});
            setFleetLoanData({});
          }
        })
        .finally(() => setLoading(false));
    }
  }, [props.fleetCarId]);

  return (
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
              <UrlTextField label={'Lien Holder Payment URL'} fullWidth value={fleetLoanData.paymentUrl ?? ''}
                            name={'paymentUrl'} onChange={handleChange}
                            onUrlClick={() => {
                              if (fleetLoanData.paymentUrl) {
                                window.open(fleetLoanData.paymentUrl);
                                return;
                              }

                              errorDialog('No URL has been specified.');
                            }}/>
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
            <Item sx={{ width: '20%' }}>
              <FormControl fullWidth>
                <InputLabel id={'source-label'}>Loan Type</InputLabel>
                <Select labelId={'source-label'} label={'loanType'}
                        style={{ textAlign: 'left' }}
                        value={fleetLoanData.loanType ?? 0}
                        name={'loanType'}
                        onChange={handleChange}
                        fullWidth>
                  <MenuItem value={'Loan'}>Loan</MenuItem>
                  <MenuItem value={'Lease'}>Lease</MenuItem>
                  <MenuItem value={'Owned'}>Owned</MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Original Balance'} fullWidth value={fleetLoanData.originalBalance ?? ''}
                         name={'originalBalance'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Monthly Payment'} fullWidth value={fleetLoanData.monthlyPayment ?? ''}
                         name={'monthlyPayment'} onChange={handleChange}
                         disabled={fleetLoanData.loanType === 'Owned'}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Payment Term'} fullWidth value={fleetLoanData.paymentTerm ?? ''}
                         name={'paymentTerm'} onChange={handleChange}
                         disabled={fleetLoanData.loanType === 'Owned'}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'APR %'} fullWidth value={fleetLoanData.apr ?? ''}
                         name={'apr'} onChange={handleChange}
                         disabled={fleetLoanData.loanType === 'Owned'}/>
            </Item>
          </Stack>
        </div>
      </div>

      {/*{(currentLoanData.fleetCarId && fleetLoanData.loanType != 'Owned') && (*/}
      {/*  <div style={{ display: 'flex', paddingTop: '1em' }}>*/}
      {/*    <div style={{ width: '100%', paddingLeft: '0.5em' }}>*/}
      {/*      <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Payment Detail</u></Typography>*/}

      {/*      <TableContainer sx={{ maxHeight: 300, border: '1px solid #ccc' }}>*/}
      {/*        <Table stickyHeader size={'small'}>*/}
      {/*          <TableHead>*/}
      {/*            <TableRow>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '10%' }}>#</TableCell>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Date</TableCell>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Principal</TableCell>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Interest</TableCell>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '20%' }}>Total</TableCell>*/}
      {/*              <TableCell sx={{ backgroundColor: '#cff', width: '10%', textAlign: 'right' }}>*/}
      {/*                <IconButton size={'small'} onClick={() => setLoanPaymentDataShowing(!loanPaymentDataShowing)}>*/}
      {/*                  <AddOutlined/>*/}
      {/*                </IconButton>*/}
      {/*              </TableCell>*/}
      {/*            </TableRow>*/}
      {/*          </TableHead>*/}
      {/*          {loanPaymentDataShowing ? (*/}
      {/*            <>*/}
      {/*              <TableBody>*/}
      {/*                <TableRow>*/}
      {/*                  <TableCell></TableCell>*/}
      {/*                  <TableCell>*/}
      {/*                    <TextField*/}
      {/*                      label={'Payment Date'} autoFocus fullWidth variant={'standard'}*/}
      {/*                      inputRef={formDateRef}*/}
      {/*                      onKeyDown={(ev) => {*/}
      {/*                        if (ev.key === 'Escape') {*/}
      {/*                          setLoanPaymentDataShowing(false);*/}
      {/*                        }*/}
      {/*                      }}/>*/}
      {/*                  </TableCell>*/}
      {/*                  <TableCell>*/}
      {/*                    <TextField*/}
      {/*                      label={'Principal Payment'} fullWidth variant={'standard'}*/}
      {/*                      inputRef={formPrincipalRef}*/}
      {/*                      onKeyDown={(ev) => {*/}
      {/*                        if (ev.key === 'Escape') {*/}
      {/*                          setLoanPaymentDataShowing(false);*/}
      {/*                        }*/}
      {/*                      }}/>*/}
      {/*                  </TableCell>*/}
      {/*                  <TableCell>*/}
      {/*                    <TextField*/}
      {/*                      label={'Interest Payment'} fullWidth variant={'standard'}*/}
      {/*                      inputRef={formInterestRef}*/}
      {/*                      onKeyDown={(ev) => {*/}
      {/*                        if (ev.key === 'Escape') {*/}
      {/*                          setLoanPaymentDataShowing(false);*/}
      {/*                        }*/}
      {/*                      }}/>*/}
      {/*                  </TableCell>*/}
      {/*                  <TableCell>*/}
      {/*                    <TextField*/}
      {/*                      label={'Total Payment'} fullWidth variant={'standard'}*/}
      {/*                      inputRef={formTotalRef}*/}
      {/*                      onKeyDown={(ev) => {*/}
      {/*                        if (ev.key === 'Escape') {*/}
      {/*                          setLoanPaymentDataShowing(false);*/}
      {/*                        }*/}
      {/*                      }}/>*/}
      {/*                  </TableCell>*/}
      {/*                  <TableCell>*/}
      {/*                    <Button variant={'contained'}*/}
      {/*                            onClick={() => addLoanPayment()}>ADD</Button>*/}
      {/*                  </TableCell>*/}
      {/*                </TableRow>*/}
      {/*              </TableBody>*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <>*/}
      {/*            </>*/}
      {/*          )}*/}
      {/*          {loanPaymentData.length > 0 ? (*/}
      {/*            <>*/}
      {/*              {loanPaymentData.map((x: any, count) => (*/}
      {/*                <>*/}
      {/*                  <TableRow sx={{ color: 'black' }} hover>*/}
      {/*                    <TableCell>{loanPaymentData.length - count}</TableCell>*/}
      {/*                    <TableCell>{moment(x.paymentDate).format('MM/DD/YYYY')}</TableCell>*/}
      {/*                    <TableCell>$ {x.principalAmount.toFixed(2)}</TableCell>*/}
      {/*                    <TableCell>$ {x.interestAmount.toFixed(2)}</TableCell>*/}
      {/*                    <TableCell colSpan={2}>$ {x.totalAmount.toFixed(2)}</TableCell>*/}
      {/*                  </TableRow>*/}
      {/*                </>*/}
      {/*              ))}*/}
      {/*              <TableRow sx={{ color: 'white', backgroundColor: 'black' }}>*/}
      {/*                <TableCell>Total:</TableCell>*/}
      {/*                <TableCell></TableCell>*/}
      {/*                <TableCell>$ {loanPaymentData.map((x: any) => x.principalAmount)*/}
      {/*                  .reduce((acc, cur) => acc + cur).toFixed(2)}</TableCell>*/}
      {/*                <TableCell>$ {loanPaymentData.map((x: any) => x.interestAmount)*/}
      {/*                  .reduce((acc, cur) => acc + cur).toFixed(2)}</TableCell>*/}
      {/*                <TableCell colSpan={2}>$ {loanPaymentData.map((x: any) => x.totalAmount)*/}
      {/*                  .reduce((acc, cur) => acc + cur).toFixed(2)}</TableCell>*/}
      {/*              </TableRow>*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <>*/}
      {/*              <TableCell colSpan={6}>*/}
      {/*                <Typography fontWeight={'bold'}>*/}
      {/*                  No payments recorded.*/}
      {/*                </Typography>*/}
      {/*              </TableCell>*/}
      {/*            </>*/}
      {/*          )}*/}
      {/*        </Table>*/}
      {/*      </TableContainer>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button variant={'contained'} color={'error'} onClick={() => clearForm()}>Clear Form</Button>
          &nbsp;
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </>
  );
}

export default FleetLoanForm;
