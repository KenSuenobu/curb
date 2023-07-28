import {styled} from '@mui/system';
import Box from '@mui/material/Box';

export const StackItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}));
