import MakesForm from '@/app/components/cars/MakesForm';
import Item from '@/app/components/common/Item';
import {Stack} from '@mui/material';

const CarDefinitions = () => {
  return (
    <main className={'bg-black flex flex-col justify-center items-center space-y-8 h-screen'}>
      <Stack direction={'row'}>
        <Item sx={{ width: '25%', padding: '0px' }}>
          <MakesForm/>
        </Item>
      </Stack>
    </main>
  );
}

export default CarDefinitions;
