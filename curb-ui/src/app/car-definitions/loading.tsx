import {LinearProgress, Typography} from '@mui/material';

const Loading = () => {
  return (
    <>
      <p/>
      <Typography>
        Loading car definitions, one moment ...
      </Typography>
      <p/>
      <LinearProgress/>
    </>
  );
}

export default Loading;