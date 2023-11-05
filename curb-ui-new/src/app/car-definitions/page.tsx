'use client';

import MakesForm from '@/app/components/cars/MakesForm';
import Item from '@/app/components/common/Item';
import {Stack} from '@mui/material';
import ModelsForm from '@/app/components/cars/ModelsForm';
import {useState} from 'react';

const CarDefinitions = () => {
  const [selectedMake, setSelectedMake] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<number>(0);

  return (
    <main className={'bg-black flex flex-col justify-center items-center space-y-8 h-screen'}>
      <Stack direction={'row'}>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <MakesForm onSelect={(x: any) => {
            console.log(`Selected make ID: ${x.id}`);
            setSelectedMake(x.id)
          }}/>
        </Item>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <ModelsForm onSelect={(x: any) => setSelectedModel(x.id)}
                      makeId={selectedMake}/>
        </Item>
      </Stack>
    </main>
  );
}

export default CarDefinitions;
