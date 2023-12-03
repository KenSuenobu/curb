'use client';

import FleetList from '@/app/components/fleet/FleetList';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import {getFleetCars} from '@/app/services/fleet';
import {useSession} from 'next-auth/react';
import FleetCarList from '@/app/components/fleet/FleetCarList';
import {alertDialog} from '@/app/components/common/ConfirmDialog';
import {Alert, Snackbar} from '@mui/material';
import FleetCarForm from '@/app/components/fleet/FleetCarForm';

const Fleet = () => {
  const [fleetCarId, setFleetCarId] = useState<number>(0);
  const [fleetId, setFleetId] = useState<number>(0);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <FleetList onClick={(x: any) => setFleetId(x.id)}/>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <FleetCarList fleetId={fleetId}
                          addable={true}
                          onClick={(fleetCarId: number) => {
                            setFleetCarId(fleetCarId);
                          }}/>
          </div>
        </div>
      </Paper>

      <FleetCarForm fleetCarId={fleetCarId}/>
    </>
  );
}

export default Fleet;
