import {FormControl, InputLabel, LinearProgress, MenuItem, Select} from '@mui/material';
import {useEffect, useState} from 'react';
import {Simulate} from 'react-dom/test-utils';
import {useSession} from 'next-auth/react';
import {listAddresses} from '@/app/services/addresses';

export interface IAddressList {
  fleetId: number;
  cleared: boolean;
  onAddressSelected: (x: number) => any;
  onCleared: () => any;
}

const AddressList = (props: IAddressList) => {
  const [addressId, setAddressId] = useState<number>(0);
  const [addressList, setAddressList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadAddressList = () => {
    if (accessToken && props.fleetId) {
      setLoading(true);
      listAddresses(accessToken, props.fleetId)
        .then((x: any) => setAddressList(x.addresses))
        .finally(() => setLoading(false));
    } else {
      setAddressList([]);
    }
  }

  useEffect(() => {
    reloadAddressList();
  }, [accessToken, props.fleetId]);

  useEffect(() => {
    if (props.cleared) {
      setAddressId(0);
      props.onCleared();
    }
  }, [props.cleared]);

  if (!props.fleetId || loading) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={'address-label'}>Delivery Address</InputLabel>
        <Select labelId={'address-label'} label={'Delivery Address'}
                style={{ textAlign: 'left' }}
                value={addressId ?? 0}
                name={'addressId'}
                onChange={(x) => {
                  const selectedId = x.target.value as number;

                  setAddressId(selectedId);
                  props.onAddressSelected(selectedId);
                }}
                fullWidth>
          <MenuItem value={0} key={0}>None selected</MenuItem>
          {addressList.map((x: any, counter: number) => (
            <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default AddressList;
