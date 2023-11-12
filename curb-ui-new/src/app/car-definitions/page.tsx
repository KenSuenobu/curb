'use client';

import MakesForm from '@/app/components/cars/MakesForm';
import Item from '@/app/components/common/Item';
import {CircularProgress, IconButton, LinearProgress, Stack, Typography} from '@mui/material';
import ModelsForm from '@/app/components/cars/ModelsForm';
import {useEffect, useRef, useState} from 'react';
import YearsForm from '@/app/components/cars/YearsForm';
import TrimForm from '@/app/components/cars/TrimForm';
import Divider from '@mui/material/Divider';
import TrimInfoForm from '@/app/components/cars/TrimInfoForm';
import {alertDialog} from '@/app/components/common/ConfirmDialog';
import {InfoOutlined} from '@mui/icons-material';
import {useSession} from 'next-auth/react';
import {getCarDefinitionsDashboard} from '@/app/services/dashboard';

const CarDefinitions = () => {
  const [selectedMake, setSelectedMake] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedTrim, setSelectedTrim] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<any>({});
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  useEffect(() => {
    setLoading(true);

    if (accessToken) {
      getCarDefinitionsDashboard(accessToken)
        .then((x) => {
          setDashboard(x.dashboard);
          setLoading(false);
        })
        .catch((x) => {
          setDashboard({
            totalTrims: 'N/A',
            totalContributed: 'N/A',
          });
          setLoading(false);
        });
    }
  }, [accessToken]);

  return (
    <main>
      <Stack direction={'row'}>
        <Item sx={{ paddingLeft: '15px',
          width: '100%',
          textAlign: 'left',
          backgroundColor: '#888',
          color: '#fff'
        }}>
          <Typography fontWeight={'bold'}>
            {loading ? (<LinearProgress/>) : (
              <>
                Contribution Stats: {dashboard.totalTrims ? (
                <>
                  {dashboard.totalTrims} total trims, you contributed {dashboard.totalContributed} trims
                </>
              ) : <></>}
                {(dashboard.totalContributed && dashboard.totalContributed < 5) && (
                  <>
                    ... you should contribute more!
                  </>
                )}
              </>
            )}
          </Typography>
        </Item>
      </Stack>

      <Stack direction={'row'}>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <MakesForm onSelect={(x: any) => {
            setSelectedMake(x.id);
            setSelectedModel(0);
            setSelectedYear(0);
            setSelectedTrim(0);
          }}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <ModelsForm onSelect={(x: any) => {
            setSelectedModel(x.id);
            setSelectedYear(0);
            setSelectedTrim(0);
          }} makeId={selectedMake}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <YearsForm onSelect={(x: any) => {
            setSelectedYear(x.id);
            setSelectedTrim(0);
          }} modelId={selectedModel}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <TrimForm onSelect={(x: any) => setSelectedTrim(x.id)}
                    yearId={selectedYear}/>
        </Item>
      </Stack>

      {selectedTrim !== 0 && (
        <>
          <p/>
          <TrimInfoForm trimId={selectedTrim}/>
        </>
      )}
    </main>
  );
}

export default CarDefinitions;
