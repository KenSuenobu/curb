import {Stack} from '@mui/system';
import {StackItem} from './StackItem';
import {Button, Typography} from '@mui/material';
import React from 'react';

export interface SectionHeaderProps {
  header: string;
  onAdd?: any;
}

const SectionHeader = (props: React.PropsWithChildren<SectionHeaderProps>) => {
  return (
    <>
      <Stack direction={'row'}>
        <StackItem sx={{ width: '50%', textAlign: 'left', backgroundColor: '#ddd' }}>
          <Typography fontWeight={'bold'} sx={{ color: 'black', verticalAlign: 'middle', padding: '1em' }}>
            {props.header}
          </Typography>
        </StackItem>

        <StackItem sx={{ width: '50%', textAlign: 'right', backgroundColor: '#ddd', paddingRight: '1em', paddingTop: '0.5em' }}>
          <Button variant={'outlined'}>IMPORT</Button>&nbsp;
          <Button variant={'outlined'}>EXPORT</Button>
        </StackItem>
      </Stack>

      <Stack direction={'row'}>
        <StackItem sx={{ width: '90%', padding: '1em', color: '#000' }}>
          <Typography>
            {props.children}
          </Typography>
        </StackItem>

        {props.onAdd ? (
          <StackItem sx={{ textAlign: 'right', padding: '1em', width: '10%' }}>
            <Button onClick={() => props.onAdd()} variant={'outlined'}>Add</Button>
          </StackItem>
        ) : (<></>)}
      </Stack>
    </>
  );
}

export default SectionHeader;
