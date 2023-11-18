'use client';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel, InputLabel,
  LinearProgress, MenuItem, Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Item from '@/app/components/common/Item';
import {useSession} from 'next-auth/react';
import {createAddress, getAddress, saveAddress} from '@/app/services/addresses';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {imageForCategory} from '@/app/services/trip';

export interface IDeliveryAddress {
  id?: number;
  creatorId: number;
  fleetId: number;
  name: string;
  public: boolean;
  data: any;
}

export interface IAddressForm {
  fleetId: number;
  addressId: number;
  onSaved: () => any;
  onCleared: () => any;
}

const AddressForm = (props: IAddressForm) => {
  const {data: session} = useSession<any>();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';
  const [loading, setLoading] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<IDeliveryAddress>({
    id: 0,
    creatorId: (session?.user as any) ? (session?.user as any).id : 0,
    fleetId: 0,
    name: '',
    public: true,
    data: {},
  });

  const handleChange = (e: any) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  }

  const handleDataChange = (e: any) => {
    const data = addressData.data;

    data[e.target.name] = e.target.value;

    setAddressData({
      ...addressData,
      data,
    });
  }

  const handleCheckbox = (e: any) => {
    setAddressData({
      ...addressData,
      public: e.target.checked,
    });
  }

  const clearForm = () => {
    setAddressData({
      id: 0,
      creatorId: (session?.user as any) ? (session?.user as any).id : 0,
      fleetId: 0,
      name: '',
      public: true,
      data: {},
    });

    props.onCleared();
  }

  const saveClicked = () => {
    if (!addressData.name || !addressData.data.address1 || !addressData.data.city || !addressData.data.stateProvince ||
        !addressData.data.zipcode || !addressData.data.country) {
      errorDialog('Delivery address is incomplete.  Must include a name, address, city, state, zip, and country');
      return;
    }

    const payload: any = addressData;

    payload.creatorId = (session?.user as any).id ?? 0;
    payload.fleetId = props.fleetId;

    if (addressData.id === 0) {
      createAddress(accessToken, payload)
        .then((x: any) => {
          if (!x) {
            errorDialog('Unable to save address: possibly a duplicate.');
            return;
          }

          props.onSaved();
          clearForm();
        });
    } else {
      saveAddress(accessToken, payload)
        .then((x: any) => {
          if (!x) {
            errorDialog('Unable to save address: possibly a duplicate.');
            return;
          }

          props.onSaved();
        });
    }
  }

  useEffect(() => {
    if (props.addressId === 0) {
      clearForm();
    } else {
      setLoading(true);
      getAddress(accessToken, props.addressId)
        .then((x: any) => {
          setAddressData(x.address);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, props.fleetId, props.addressId]);

  if (loading) {
    return (
      <>
        <LinearProgress/>
      </>
    )
  }

  return (
    <>
      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Delivery Address Detail</u></Typography>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'left' }}>
          <FormControlLabel control={<Checkbox name={'public'}
                                               checked={addressData.public ?? false}
                                               onChange={handleCheckbox}/>} label={'Public to all users'}/>
        </Item>
      </Stack>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <Stack direction={'row'}>
            <Item sx={{ width: '25%' }}>
              <FormControl fullWidth>
                <InputLabel id={'address-category-label'}>Address Category</InputLabel>
                <Select labelId={'address-category-label'} label={'Address Category'}
                        style={{ textAlign: 'left', padding: '0px' }}
                        value={addressData.data.category ?? 0}
                        name={'category'}
                        onChange={handleDataChange}
                        fullWidth>
                  <MenuItem value={0} key={0}>
                    <Stack direction={'row'}>
                      <div style={{ height: '24px' }}>{imageForCategory(0)}</div>
                      <div style={{ paddingLeft: '10px', height: '24px' }}><Typography>Uncategorized</Typography></div>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={1} key={1}>
                    <Stack direction={'row'}>
                      <div style={{ height: '24px' }}>{imageForCategory(1)}</div>
                      <div style={{ paddingLeft: '10px', height: '24px' }}><Typography>Airport</Typography></div>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={2} key={2}>
                    <Stack direction={'row'}>
                      <div style={{ height: '24px' }}>{imageForCategory(2)}</div>
                      <div style={{ paddingLeft: '10px', height: '24px' }}><Typography>Hotel</Typography></div>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={3} key={3}>
                    <Stack direction={'row'}>
                      <div style={{ height: '24px' }}>{imageForCategory(3)}</div>
                      <div style={{ paddingLeft: '10px', height: '24px' }}><Typography>Car Park/Park and Ride</Typography></div>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={4} key={4}>
                    <Stack direction={'row'}>
                      <div style={{ height: '24px' }}>{imageForCategory(4)}</div>
                      <div style={{ paddingLeft: '10px', height: '24px' }}><Typography>Private Residence</Typography></div>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>
            </Item>

            <Item sx={{ width: '50%' }}>
              <TextField label={'Delivery Location Name'} fullWidth value={addressData.name ?? ''}
                         name={'name'} onChange={handleChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Location Phone Number'} fullWidth value={addressData.data.phoneNumber ?? ''}
                         name={'phoneNumber'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 1'} fullWidth value={addressData.data.address1 ?? ''}
                         name={'address1'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 2'} fullWidth value={addressData.data.address2 ?? ''}
                         name={'address2'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '100%' }}>
              <TextField label={'Address 3'} fullWidth value={addressData.data.address3 ?? ''}
                         name={'address3'} onChange={handleDataChange}/>
            </Item>
          </Stack>

          <Stack direction={'row'}>
            <Item sx={{ width: '30%' }}>
              <TextField label={'City'} fullWidth value={addressData.data.city ?? ''}
                         name={'city'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'State/Province'} fullWidth value={addressData.data.stateProvince ?? ''}
                         name={'stateProvince'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '20%' }}>
              <TextField label={'Zipcode'} fullWidth value={addressData.data.zipcode ?? ''}
                         name={'zipcode'} onChange={handleDataChange}/>
            </Item>

            <Item sx={{ width: '25%' }}>
              <TextField label={'Country'} fullWidth value={addressData.data.country ?? ''}
                         name={'country'} onChange={handleDataChange}/>
            </Item>
          </Stack>
        </div>
      </div>

      <Stack direction={'row'}>
        <Item sx={{ width: '100%', textAlign: 'right' }}>
          <Button color={'error'} variant={'contained'} onClick={() => clearForm()}>Clear Form</Button>&nbsp;
          <Button variant={'contained'} onClick={() => saveClicked()}>Save</Button>
        </Item>
      </Stack>
    </>
  );
}

export default AddressForm;
