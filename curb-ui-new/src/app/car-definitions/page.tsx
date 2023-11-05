'use client';

import MakesForm from '@/app/components/cars/MakesForm';
import Item from '@/app/components/common/Item';
import {Stack} from '@mui/material';
import ModelsForm from '@/app/components/cars/ModelsForm';
import {useState} from 'react';
import YearsForm from '@/app/components/cars/YearsForm';

const CarDefinitions = () => {
  const [selectedMake, setSelectedMake] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  return (
    <main className={'bg-black flex flex-col justify-center items-center space-y-8 h-screen'}>
      <Stack direction={'row'}>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <MakesForm onSelect={(x: any) => {
            setSelectedMake(x.id);
            setSelectedModel(0);
            setSelectedYear(0);
          }}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <ModelsForm onSelect={(x: any) => {
            setSelectedModel(x.id);
            setSelectedYear(0);
          }} makeId={selectedMake}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <YearsForm onSelect={(x: any) => setSelectedYear(x.id)}
                     modelId={selectedModel}/>
        </Item>
      </Stack>
    </main>
  );
}

export default CarDefinitions;
