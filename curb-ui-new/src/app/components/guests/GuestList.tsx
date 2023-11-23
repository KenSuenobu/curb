import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack, Typography} from '@mui/material';
import {listAllGuests, listGuests} from '@/app/services/guests';
import {ReportProblemOutlined} from '@mui/icons-material';
import Item from '@/app/components/common/Item';

export interface IGuestList {
  fleetId: number;
  selectedGuestId?: number;
  cleared: boolean;
  onGuestSelected: (x: number) => any;
  onCleared: () => any;
}

const GuestList = (props: IGuestList) => {
  const [guestList, setGuestList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [guestId, setGuestId] = useState<number>(0);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadList = () => {
    if (accessToken && props.fleetId) {
      setLoading(true);
      listAllGuests(accessToken, props.fleetId)
        .then((x: any) => {
          setGuestList(x.guests);

          if (props.selectedGuestId) {
            setGuestId(props.selectedGuestId);
          }
        })
        .catch((x) => setGuestList([]))
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    reloadList();
  }, [accessToken, props.fleetId, props.selectedGuestId]);

  useEffect(() => {
    if (props.cleared) {
      setGuestId(0);
      props.onCleared();
    }
  }, [props.cleared])

  if (loading) {
    return (
      <>
        <LinearProgress/>
      </>
    );
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={'guest-label'}>Guest</InputLabel>
        <Select labelId={'guest-label'} label={'Guest'}
                style={{ textAlign: 'left' }}
                value={guestId ?? 0}
                name={'guestId'}
                onChange={(x) => {
                  const selectedId = x.target.value as number;

                  setGuestId(selectedId);
                  props.onGuestSelected(selectedId);
                }}
                fullWidth>
          <MenuItem value={0} key={0}>
            <Typography style={{ color: 'black' }}>
              None selected
            </Typography>
          </MenuItem>
          {guestList.map((x: any, counter: number) => (
            <MenuItem value={x.id} key={counter}>
              <Stack direction={'row'}>
                {x.incomplete === true ? (
                  <>
                    <div>
                      <ReportProblemOutlined style={{ color: 'red', padding: '0px' }}/>
                    </div>

                    <div style={{ color: 'black', paddingLeft: '10px' }}>
                      <Typography>{x.lastName}, {x.firstName} {x.middleName}</Typography>
                    </div>
                  </>
                ) : (
                  <div style={{ paddingLeft: '10px', color: 'black' }}>
                    <Typography>{x.lastName}, {x.firstName} {x.middleName}</Typography>
                  </div>
                )}
              </Stack>
              {/*<Typography style={{ color: (x.blacklisted ? 'red' : 'black') }}>*/}
              {/*  {x.incomplete && (<ReportProblemOutlined style={{ color: 'red', paddingBottom: '1px', paddingRight: '0px' }}/>)} {x.lastName}, {x.firstName} {x.middleName}*/}
              {/*</Typography>*/}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default GuestList;